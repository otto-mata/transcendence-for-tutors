'use server';
import { Axios } from 'axios';
import { UpdateUserDto, UserProfileResponse } from './Users.dto';
import {
	LoginDto,
	RegisterDto,
	GoogleTokenDto,
	GoogleAuthResponseDto,
	FortyTwoVerifyTokenDto,
	FortyTwoVerifyResponseDto,
} from './Auth.dto';
import { CreatePostDto, UpdatePostDto } from './Post.dto';
import { CreateCommentDto, UpdateCommentDto } from './Comment.dto';

type Ok<R> = ResultClass<R, never>;
type Err<E> = ResultClass<never, E>;

class Result {
	static ok(): Ok<void>;
	static ok<R>(value: R): Ok<R>;
	static ok(value?: unknown) {
		return new ResultClass(value, undefined);
	}

	static error<const E extends string>(error: E): Err<E>;
	static error<E>(error: E): Err<E>;
	static error<E>(error: E): Err<E> {
		return new ResultClass<never, E>(undefined as never, error);
	}
}

class ResultClass<R, E> {
	constructor(
		private readonly val: R,
		private readonly err: E,
	) {}

	declare $inferValue: R;
	declare $inferError: E;

	private get success() {
		return this.err === undefined;
	}
	private get failure() {
		return this.err !== undefined;
	}

	get ok() {
		return this.success as [E] extends [never] ? true : false;
	}
	get value() {
		return this.val as [E] extends [never]
			? [R] extends [never]
				? undefined
				: R
			: R | undefined;
	}
	get error() {
		return this.err as [R] extends [never]
			? [E] extends [never]
				? undefined
				: E
			: E | undefined;
	}
}

class RequestError extends Error {
	readonly type = 'request-error';
}

const ClientFactory = (client: Axios) => {
	return {
		auth: {
			register: async (data: RegisterDto) => {
				try {
					const response = await client.post('/auth/register', {
						...data,
					});
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			login: async (data: LoginDto) => {
				try {
					const response = await client.post('/auth/login', {
						...data,
					});
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			logout: async () => {
				try {
					const response = await client.post('/auth/logout', {});
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			refresh: async ({ refreshToken }: { refreshToken: string }) => {
				try {
					const response = await client.post('/auth/refresh', {
						refreshToken,
					});
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			reset: async () => {
				try {
					const response = await client.post(
						'/auth/reset-password',
						{},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			forgot: async () => {
				try {
					const response = await client.post(
						'/auth/forgot-password',
						{},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			verify: async () => {
				try {
					const response = await client.post(
						'/auth/verify-email',
						{},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			resend: async () => {
				try {
					const response = await client.post(
						'/auth/resend-verification',
						{},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			// Google oauth
			google: {
				signIn: async (data: GoogleTokenDto) => {
					try {
						const response =
							await client.post<GoogleAuthResponseDto>(
								'/auth/google',
								data,
							);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
				getRedirectUrl: () => {
					const baseUrl =
						process.env.API_URL || 'http://localhost:3000';
					return `${baseUrl}/auth/google/redirect`;
				},
			},
			// 42 oauth
			fortyTwo: {
				getLoginUrl: () => {
					const baseUrl =
						process.env.API_URL || 'http://localhost:3000';
					return `${baseUrl}/auth/42/login`;
				},
				verify: async (data: FortyTwoVerifyTokenDto) => {
					try {
						const response =
							await client.post<FortyTwoVerifyResponseDto>(
								'/auth/42/verify',
								data,
							);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
			},
		},
		me: {
			get: async () => {
				try {
					const response =
						await client.get<UserProfileResponse>('/users/me');
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			patch: async (data: UpdateUserDto) => {
				try {
					const response = await client.patch<UserProfileResponse>(
						'/users/me',
						data,
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
		},
		users: {
			$: (id: string) => {
				return {
					get: async () => {
						try {
							const response = await client.get(`/users/${id}`);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
				};
			},
			get: async () => {
				try {
					const response = await client.get('/users');
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
		},
		posts: {
			$: (id: string) => {
				return {
					get: async () => {
						try {
							const response = await client.get(`/posts/${id}`);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					patch: async (data: UpdatePostDto) => {
						try {
							const response = await client.patch(
								`/posts/${id}`,
								data,
							);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					delete: async () => {
						try {
							const response = await client.post(
								`/posts/${id}`,
								{},
							);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					like: async () => {
						try {
							const response = await client.post(
								`/posts/${id}like`,
								{},
							);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					unlike: async () => {
						try {
							const response = await client.delete(
								`/posts/${id}/like`,
								{},
							);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					save: async () => {
						try {
							const response = await client.post(
								`/posts/${id}/bookmark`,
								{},
							);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					unsave: async () => {
						try {
							const response = await client.delete(
								`/posts/${id}/bookmark`,
								{},
							);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					comments: {
						$: async (commentId: string) => {
							return {
								get: async () => {
									try {
										const response = await client.get(
											`/posts/${id}/comments/${commentId}`,
										);
										return Result.ok(response.data);
									} catch (error) {
										return Result.error(
											error as RequestError,
										);
									}
								},
								patch: async (data: UpdateCommentDto) => {
									try {
										const response = await client.patch(
											`/posts/${id}/comments/${commentId}`,
											data,
										);
										return Result.ok(response.data);
									} catch (error) {
										return Result.error(
											error as RequestError,
										);
									}
								},
								delete: async () => {
									try {
										const response = await client.delete(
											`/posts/${id}/comments/${commentId}`,
										);
										return Result.ok(response.data);
									} catch (error) {
										return Result.error(
											error as RequestError,
										);
									}
								},
								replies: async () => {
									try {
										const response = await client.get(
											`/posts/${id}/comments/${commentId}/replies`,
										);
										return Result.ok(response.data);
									} catch (error) {
										return Result.error(
											error as RequestError,
										);
									}
								},
								reply: async (data: CreateCommentDto) => {
									try {
										const response = await client.post(
											`/posts/${id}/comments/${commentId}/reply`,
											data,
										);
										return Result.ok(response.data);
									} catch (error) {
										return Result.error(
											error as RequestError,
										);
									}
								},
							};
						},
						get: async () => {
							try {
								const response = await client.get(
									`/posts/${id}/comments`,
								);
								return Result.ok(response.data);
							} catch (error) {
								return Result.error(error as RequestError);
							}
						},
						post: async (data: CreateCommentDto) => {
							try {
								const response = await client.post(
									`/posts/${id}/comments`,
									data,
								);
								return Result.ok(response.data);
							} catch (error) {
								return Result.error(error as RequestError);
							}
						},
					},
				};
			},
			get: async () => {
				try {
					const response = await client.get('/posts');
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			post: async (data: CreatePostDto) => {
				try {
					const response = await client.post('/posts', data);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
		},
	};
};

type ClientType = ReturnType<typeof ClientFactory>;

export class Backend {
	private static _instance: Backend | null = null;
	private _cl: ClientType;

	private constructor() {
		this._cl = ClientFactory(new Axios({ baseURL: process.env.API_URL || 'http://localhost:3000/' }));
	}

	public get api(): ClientType {
		if (Backend._instance == null) Backend._instance = new Backend();
		return Backend._instance._cl;
	}
	public async refresh() {
		this._cl.auth.refresh({ refreshToken: 'coucou' });
	}
}
