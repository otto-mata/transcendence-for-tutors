import { Axios } from "axios";
import { PostFiltering } from "./Post";
import { PostDto } from "./Post.dto";
import { UserDto } from "./User.dto";

export class TransClient {

	private static _instance: TransClient | null = null;
	private _cl: Axios

	private constructor() {
		this._cl = new Axios({ baseURL: "http://localhost:3001" })
	}

	public static get instance(): TransClient {
		if (TransClient._instance == null)
			TransClient._instance = new TransClient();
		return TransClient._instance;
	}

	public async post({ where }: PostFiltering): Promise<PostDto> {
		return this._cl.get(`/post/${where.id}`);
	}

	public async getUserByUsername(username: string): Promise<UserDto> {
		const res = await this._cl.get(`/mock/users/${username}`);
		return JSON.parse(res.data);
	}
}
