'use server';
import { Axios } from 'axios';

type Ok<R> = { ok: true; value: R };
type Err<E> = { ok: false; value: E };
type ResultType<R, E = null> = Ok<R> | Err<E>;

class Result {
	static ok<R>(value: R): ResultType<R, never> {
		return { ok: true, value };
	}
	static err<E>(value: E): ResultType<never, E> {
		return { ok: false, value };
	}
}

class RequestError extends Error {
	readonly type = 'request-error';
}

const ClientFactory = (client: Axios) => {
	return {
		register: async ({
			username,
			password,
			email,
		}: {
			username: string;
			password: string;
			email: string;
		}) => {
			try {
				const response = await client.post('/auth/register', {
					username,
					password,
					email,
				});
				return Result.ok(response.data);
			} catch (error) {
				return Result.err(error as RequestError);
			}
		},
		login: async ({
			username,
			password,
		}: {
			username: string;
			password: string;
		}) => {
			try {
				const response = await client.post('/auth/login', {
					username,
					password,
				});
				return Result.ok(response.data);
			} catch (error) {
				return Result.err(error as RequestError);
			}
		},
		me: {},
		users: {
			$: (id: string) => {
				return {
					get: async () => {
						try {
							const response = await client.get(`/users/${id}`);
							return Result.ok(response.data);
						} catch (error) {
							return Result.err(error as RequestError);
						}
					},
				};
			},
			get: async () => {
				try {
					const response = await client.get('/users');
					return Result.ok(response.data);
				} catch (error) {
					return Result.err(error as RequestError);
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
	public async refresh() {}
}
