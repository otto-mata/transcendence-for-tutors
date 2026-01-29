// 'use server';
import { Axios } from 'axios';
import {
	UpdateUserDto,
	UserProfileResponse,
	UserPreferencesResponse,
	UpdatePreferencesDto,
	ChangePasswordDto,
	ChangeEmailDto,
} from './Users.dto';
import {
	LoginDto,
	RegisterDto,
	GoogleTokenDto,
	GoogleAuthResponseDto,
	FortyTwoVerifyTokenDto,
	FortyTwoVerifyResponseDto,
} from './auth.dto';
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
	client.interceptors.request.use(
  	(config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  	},
  	(error) => Promise.reject(error)
);
	return {
		auth: {
			register: async (data: RegisterDto) => {
				console.log("datas are : ", data);
				try {
					const response = await client.post('/auth/register', JSON.stringify(data), {
							headers : {
							'Content-Type':'application/json'
						}});
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			login: async (data: LoginDto) => {
				try {
					const response = await client.post('/auth/login', JSON.stringify(data), {
							headers : {
							'Content-Type':'application/json'
						}}
					);
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
			refresh: async (refreshToken : { token : string }) => {
				try {
					const response = await client.post('/auth/refresh',
						JSON.stringify(refreshToken),{
							headers : {
							'Content-Type':'application/json'
						}});
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
			verify: async (data: { token: string }) => {
				try {
					const response = await client.post(
						'/auth/verify-email',
						JSON.stringify(data),
						{
							headers: {
								'Content-Type': 'application/json'
							}
						}
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
					console.log("doesn go here");
					return Result.error(error as Error);
				}
			},
			patch: async (data: UpdateUserDto) => {
				try {
					// Filter out undefined values to avoid sending them
					const cleanData = Object.fromEntries(
						Object.entries(data).filter(([_, v]) => v !== undefined)
					);
					const response = await client.patch<UserProfileResponse>(
						'/users/me',
						JSON.stringify(cleanData),
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			updateAvatar: async (file: File) => {
				try {
					const formData = new FormData();
					formData.append('file', file);
					const response = await client.patch<UserProfileResponse>(
						'/users/me/avatar',
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			updateCover: async (file: File) => {
				try {
					const formData = new FormData();
					formData.append('file', file);
					const response = await client.patch<UserProfileResponse>(
						'/users/me/cover',
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			preferences: {
				get: async () => {
					try {
						const response = await client.get<UserPreferencesResponse>(
							'/users/me/preferences',
						);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
				patch: async (data: UpdatePreferencesDto) => {
					try {
						const response = await client.patch<UserPreferencesResponse>(
							'/users/me/preferences',
							data,
						);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
			},
			changePassword: async (data: ChangePasswordDto) => {
				try {
					const response = await client.patch('/users/me/password', data);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			changeEmail: async (data: ChangeEmailDto) => {
				try {
					const response = await client.patch<UserProfileResponse>(
						'/users/me/email',
						data,
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			delete: async () => {
				try {
					const response = await client.delete('/users/me');
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
		},
		users: {
			$: ({id, username} : {id?: string, username? : string}) => {
				return {
					get: async () => {
						try {
							if (!username && !id) throw new Error("wrong input");
							const str = username ? username : "by-id/" + id; 
							const response = await client.get(`/users/${str}`);
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
							if (response.statusText !== 'OK')
								throw new Error(response.data.error);
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
								`/posts/${id}/like`
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
						$: (commentId: string) => {
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
								like: async () => {
									try {
										const response = await client.post(
											`/posts/${id}/comments/${commentId}/like`,
										);
										return Result.ok(response.data);
									} catch (error) {
										return Result.error(
											error as RequestError,
										);
									}
								},
								unlike: async () => {
									try {
										const response = await client.delete(
											`/posts/${id}/comments/${commentId}/like`,
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
						post: async (data : string) => {
							try {
								const response = await client.post(
									`/posts/${id}/comments`,
									JSON.stringify({content : data}),{
							headers : {
							'Content-Type':'application/json'
						}}
								);
								return Result.ok(response.data);
							} catch (error) {
								return Result.error(error as RequestError);
							}
						},
					},
				};
			},
			get: () => {
				return {
					all : async () => {
						try {
						const response = await client.get('/posts');
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
				 byName : async (username : string) => {
						try {
						const response = await client.get(`/posts/user/${username}`);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				 }
			};
			},
			liked: () => {
				return {
					get : async () => {
						try {
						const response = await client.get('/posts/liked');
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
				 byName : async (username : string) => {
						try {
						const response = await client.get(`/posts/liked/${username}`);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				 }
			};
			},
			saved: () => {
				return {
					get : async () => {
						try {
						const response = await client.get('/posts/saved');
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				},
				 byName : async (username : string) => {
						try {
						const response = await client.get(`/posts/saved/${username}`);
						return Result.ok(response.data);
					} catch (error) {
						return Result.error(error as RequestError);
					}
				 }
			};
			},
			post: async (data: CreatePostDto) => {
				try {
					const formData = new FormData();
					formData.append('content', data.content);
					if (data.file) formData.append('file', data.file);
					const response = await client.post('/posts', formData);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
		},
		media: {
			upload: async (file: File) => {
				try {
					const formData = new FormData();
					formData.append('file', file);
					const response = await client.post(
						'/media/upload',
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						},
					);
					return Result.ok(response.data);
				} catch (error) {
					return Result.error(error as RequestError);
				}
			},
			$: (id: string) => {
				return {
					get: async () => {
						try {
							const response = await client.get(`/media/${id}`);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
					delete: async () => {
						try {
							const response = await client.delete(`/media/${id}`);
							return Result.ok(response.data);
						} catch (error) {
							return Result.error(error as RequestError);
						}
					},
				};
			},
			user: {
				$: (userId: string) => {
					return {
						get: async (page?: number, limit?: number) => {
							try {
								const params = new URLSearchParams();
								if (page) params.append('page', page.toString());
								if (limit) params.append('limit', limit.toString());
								const query = params.toString() ? `?${params.toString()}` : '';
								const response = await client.get(
									`/media/user/${userId}${query}`,
								);
								return Result.ok(response.data);
							} catch (error) {
								return Result.error(error as RequestError);
							}
						},
					};
				},
			},
		},
	};
};

type ClientType = ReturnType<typeof ClientFactory>;

export class Backend {
	private static _instance: Backend | null = null;
	private _cl: ClientType;

	// test le back tqt
	private constructor() {
		this._cl = ClientFactory(new Axios({ baseURL: 'http://localhost:3000' })); //process.env.API_URL
	}

	public static getInstance(): ClientType {
		if (Backend._instance == null) Backend._instance = new Backend();
		return Backend._instance._cl;
	}
}
