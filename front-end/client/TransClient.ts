import { Axios } from "axios";
import { PostFiltering } from "./Post";
import { PostDto } from "./Post.dto";

export class TransClient {

	private static _instance: TransClient | null = null;
	private _cl: Axios

	private constructor() {
		this._cl = new Axios({ baseURL: process.env.API_URL })
	}

	public get instance(): TransClient {
		if (TransClient._instance == null)
			TransClient._instance = new TransClient();
		return TransClient._instance;
	}

	public async post({ where }: PostFiltering): Promise<PostDto> {
		return this._cl.get(`/post/${where.id}`);
	}
}
