'use server';
import { Axios } from 'axios';
import { UserProfileResponse } from './Users.dto';
import { LoginDto, RegisterDto } from './Auth.dto';

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
						...data
					});
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
			patch: async ({
				data,
			}: {
				data: {
					displayName?: string;
					bio?: string;
					avatar?: string;
					coverImage?: string;
				};
			}) => {
				try {
					const response = await client.patch<UserProfileResponse>(
						'/users/me',
						{
							...data,
						},
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
	};
};

type ClientType = ReturnType<typeof ClientFactory>;

export class TransClient {
	private static _instance: TransClient | null = null;
	private _cl: ClientType;

	private constructor() {
		this._cl = ClientFactory(new Axios({ baseURL: process.env.API_URL }));
	}

	public get instance(): ClientType {
		if (TransClient._instance == null)
			TransClient._instance = new TransClient();
		return TransClient._instance._cl;
	}
	public async refresh() {
		this._cl.auth.refresh({ refreshToken: 'coucou' });
	}
}
