import { Axios } from "axios";
import { PostFiltering } from "./Post";
import { AuthResponseDto, LoginDto, RegisterDto } from "./auth.dto";
import { CreatePostDto, QueryParametersDto, PostResponseDto, UpdatePostDto } from "./post.dto";
import { ApiResponseDto, PaginatedResponseDto, QueryParametersDto } from "./common.dto";
import { refresh } from "next/cache";
import { ChangeEmailDto, ChangePasswordDto, ChangePreferencesDto, UserResponseDto } from "./profile.dto";
import { CommentResponseDto } from "./comment.dto";
import { MediaUploadResponseDto } from "./media.dto";
import { NotificationResponseDto, UnreadCountDto } from "./notification.dto";


// type ClientResponse<T> = Promise<ApiResponseDto<T>>;

//Important : A lot of thoses call will in the end use an access token, so I don't put it inside the parameters, because it is stored in localStorage

class Response<DataType>{
	constructor(
		private readonly ok : boolean,
		private readonly message: string,
		public readonly data? : DataType){}
	
	Ok() : boolean{
		return this.ok;
	}

	getMessage() : string {
		return this.message;
	}

	getData() : DataType | null{
		return this.data ? this.data : null;
	}
}

type ClientResponse<T> = Promise<Response<T>>;


const ClientMockApi = (client : Axios ) => {
	return {
		auth:{
			register : async ( data : RegisterDto) => {
				//fetch POST /auth/register
				if (data.login == 'false')
				  return new Response(false, 'Wrong input');
				return new Response(false, 'Registered Successfully');
			},
			login : async ( data : LoginDto) => {
				//fetch POST /auth/login
			  if (data.login != 'login' || data.password != 'password')
				return new Response<AuthResponseDto>(false, 'Wrong login or password');
			  return new Response<AuthResponseDto>(true, 'Logged Successfully', {
				  access_token : 'access_token',
				  refresh_token : 'refresh_token'
				});
			},
			refresh : async ()=>{
				//fetch POST /auth/refresh
				return new Response<AuthResponseDto>(true, 'Refresh Sucessfully', {
					access_token : 'access_token'
				});
			},
			verifyEmail : async (email_token : string)=>{
				//fetch POST /auth/verify-email
				return new Response<null>(true, 'Email verified');
			},
			forgotPassword : async (email : string)=>{
				//fetch POST /auth/reset-password
				return new Response<null>(true, 'Email sent');
			},
			resendEmail : async (email : string)=>{
				//fetch POST /auth/forgot-password
				return new Response<null>(true, 'Email re sent');
			},
		},
		users:{
			get : async ( query : QueryParametersDto) => {
				//fetch Get /users
				return new Response<PaginatedResponseDto<UserResponseDto>>(true, 'Users query success', PaginatedUsers);
			},
			suggested : async (page? : number, lmit? : number ) => {
				//fetch GET /users/suggested
				return new Response<PaginatedResponseDto<UserResponseDto>>(true, 'Users query success', PaginatedUsers);
			},
			$ : async (data : {id? 		: number,
				username?	: string}
			) => {
				//fetch GET /user/:Parameters
				return new Response<UserResponseDto>(true, 'User query success', User1);
			},
			delete : async (id : number) => {
				//fetch Delete /user/:id
				return new Response<null>(true, 'User deleted');
			},
			follow : async (id : number) => {
				//fetch POSt /user/:id/follow
				return new Response<null>(true, 'User Followed');
			},
			unfollow : async (id : number) => {
				//fetch delete /user/:id/follow
				return new Response<null>(true, 'User unfollowed');
			},
		},
		me:{
			get : async () => {
				//fetch GET /user/me it will use JWT to know who you are
				return new Response<UserResponseDto>(true, 'User query success', User1);	
			},
			avatar : async (/* No idea what is suposed to be the file type*/) => {
				//fetch PATCH /user/me/avatar
				return new Response<UserResponseDto>(true, 'User query success', User1);	
			},
			cover : async (/* No idea what is suposed to be the file type*/) => {
				//fetch PATCH /user/me/cover
				return new Response<UserResponseDto>(true, 'User query success', User1);	
			},
			password : async (data : ChangePasswordDto) => {
				//fetch PATCH /user/me/password
				return new Response<UserResponseDto>(true, 'User query success', User1);	
			},
			email : async (data : ChangeEmailDto) => {
				//fetch PATCH /user/me/email
				return new Response<UserResponseDto>(true, 'User query success', User1);	
			},
			preferences : async (data : ChangePreferencesDto) => {
				//fetch PATCH /user/me/preferences
				return new Response<UserResponseDto>(true, 'User query success', User1);	
			},
			followers : async () => {
				//fetch GET /users/suggested
				return new Response<PaginatedResponseDto<UserResponseDto>>(true, 'Users query success', PaginatedUsers);
			},
			following : async () => {
				//fetch GET /users/suggested
				return new Response<PaginatedResponseDto<UserResponseDto>>(true, 'Users query success', PaginatedUsers);
			},
			bookmarked : async () => {
				//fetch GET /users/suggested
				return new Response<PaginatedResponseDto<PostResponseDto>>(true, 'Users query success', PaginatedPosts);
			},
			block : async (id : number) => {
				//fetch POST /user/:id/block
				return new Response<null>(true, 'User blocked');
			},
			unblock : async (id : number) => {
				//fetch Delete /user/:id/block
				return new Response<null>(true, 'User unblocked');
			},
			muted : async (id : number) => {
				//fetch POST /user/:id/muted
				return new Response<null>(true, 'User muteded');
			},
			unmuted : async (id : number) => {
				//fetch Delete /user/:id/muted
				return new Response<null>(true, 'User unmuteded');
			}
		},
		posts:{
			$: async (id : number ) => {
				// fetch Get /posts/:id
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<PostResponseDto>(false, 'No such post');	
				return new Response<PostResponseDto>(true, 'Post Retrieved well :D', post);
			},
			thread : async (id : number ) => {
				// fetch Get /posts/:id/thread
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<PostResponseDto>(false, 'No such post');	
				return new Response<PostResponseDto>(true, 'Post Retrieved well :D', post);
			},
			get : async ( query : QueryParametersDto) => {
				// fetch Get /posts
				return new Response<PaginatedResponseDto<PostResponseDto>>
					(true, 'Post List Retrieved well :D', PaginatedPosts);
			},
			create : async (data : CreatePostDto) => {
				//fetch POST /posts
				return new Response<PostResponseDto>(false, 'Post Created', Post1);	
			},
			reply : async (data : CreatePostDto) => {
				//fetch POST /posts/:id/reply
				return new Response<PostResponseDto>(false, 'Reply Created', Post1);	
			},
			update : async (data : UpdatePostDto) => {
				//fetch UPDATE /posts/:id
				return new Response<PostResponseDto>(false, 'Post updated', Post1);	
			},
			replies : async ( query : QueryParametersDto, id : number) => {
				// fetch Get /posts/:id/replies
				return new Response<PaginatedResponseDto<PostResponseDto>>
					(true, 'Post List Retrieved well :D', PaginatedPosts);
			},
			delete : async (id : number) => {
				//fetch Delete /posts/:id
				return new Response<PostResponseDto>(false, 'Post deleted', Post1);	
			},
			like : async (id : number ) => {
				// fetch Get /posts/:id/like
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<null>(false, 'No such post');	
				return new Response<null>(true, 'Post Liked');
			},
			unlike : async (id : number ) => {
				// fetch Delete /posts/:id/like
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<null>(false, 'No such post');	
				return new Response<null>(true, 'Post unliked');
			},
			share : async (id : number ) => {
				// fetch Get /posts/:id/share
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<null>(false, 'No such post');	
				return new Response<null>(true, 'Post shared');
			},
			unshare : async (id : number ) => {
				// fetch Delete /posts/:id/share
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<null>(false, 'No such post');	
				return new Response<null>(true, 'Post unshared');
			},
			bookmark : async (id : number ) => {
				// fetch Get /posts/:id/bookmark
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<null>(false, 'No such post');	
				return new Response<null>(true, 'Post bookmarked');
			},
			removeBookmark : async (id : number ) => {
				// fetch Delete /posts/:id/bookmark
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<null>(false, 'No such post');	
				return new Response<null>(true, 'Post remove from bookmarked');
			},
			likes : async ( id : number) => {
				// fetch Get /posts/:id/likes
				const post = id == 2 ? Post2 : Post1;
				if (id > 2)
					return new Response<PaginatedResponseDto<UserResponseDto>>(false, 'No such post');	
				return new Response<PaginatedResponseDto<UserResponseDto>>
					(true, 'Post List Retrieved well :D', PaginatedUsers);
			},
			feed : async ( query : QueryParametersDto) => {
				// fetch Get /posts/feed
				return new Response<PaginatedResponseDto<PostResponseDto>>
					(true, 'Post List Retrieved well :D', PaginatedPosts);
			},
			trending : async ( query : QueryParametersDto) => {
				// fetch Get /posts/trending
				return new Response<PaginatedResponseDto<PostResponseDto>>
					(true, 'Post List Retrieved well :D', PaginatedPosts);
			},
			latest : async ( query : QueryParametersDto) => {
				// fetch Get /posts/latest
				return new Response<PaginatedResponseDto<PostResponseDto>>
					(true, 'Post List Retrieved well :D', PaginatedPosts);
			}

		},
		comment : {
			getPost : async (postId : number) => {
				//fetch GET /posts/:postId/comments
				if (postId > 2)
					return new Response<PaginatedResponseDto<CommentResponseDto>>
						(true, 'No such Post')
				return new Response<PaginatedResponseDto<CommentResponseDto>>
					(true, 'Comment Query completed', PaginatedComment)
			},
			get : async (postId : number, commentId : number) => {
				//fetch GET /posts/:postId/comments/:id
				if (postId > 2 || commentId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such comment')
				return new Response<CommentResponseDto>
					(true, 'Comment retrieved', comment1)
			},
			delete : async (postId : number, commentId : number) => {
				//fetch delete /posts/:postId/comments/:id
				if (postId > 2 || commentId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such comment')
				return new Response<CommentResponseDto>
					(true, 'Comment deleted', comment1)
			},
			create : async (postId : number, content : string) => {
				//fetch POST /posts/:postId/comments
				if (postId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such Post')
				return new Response<CommentResponseDto>
					(true, 'Comment posted', comment1)
			},
			reply : async (postId : number, commentId : number) => {
				//fetch POST /posts/:postId/comments/:id/reply
				if (postId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such Post')
				return new Response<CommentResponseDto>
					(true, 'Reply posted', comment1)
			},
			update : async (postId : number, commentId : number) => {
				//fetch UPDATE /posts/:postId/comments/:id
				if (postId > 2 || commentId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such comment')
				return new Response<CommentResponseDto>
					(true, 'Comment updated', comment1)
			},
			like : async (postId : number, commentId : number) => {
				//fetch POST /posts/:postId/comments/:id/like
				if (postId > 2 || commentId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such comment')
				return new Response<CommentResponseDto>
					(true, 'Comment liked', comment1)
			},
			unlike : async (postId : number, commentId : number) => {
				//fetch Delete /posts/:postId/comments/:id/like
				if (postId > 2 || commentId > 2)
					return new Response<CommentResponseDto>
						(true, 'No such comment')
				return new Response<CommentResponseDto>
					(true, 'Comment unliked', comment1)
			},
			
		},
		media : {
			updload : async () => {
				//Fetch POST /media/upload
				return new Response<MediaUploadResponseDto>(true, 'Mdeia uploaded');
			},
			$ : async (id : number ) => {
				//Fetch Get /media/:id
				return new Response<MediaUploadResponseDto>(true, 'Media Retrieved');
			},
			delete : async (id : number ) => {
				//Fetch delete /media/:id
				return new Response<null>(true, 'Media Deleted');
			}
		},
		notification : {
			get : async ( query : QueryParametersDto) => {
				// fetch Get /notifications
				return new Response<PaginatedResponseDto<NotificationResponseDto>>
					(true, 'Notification List Retrieved well :D', PaginatedNotifications);
			},
			unread : async () => {
				//fetch GET /notifications/unread
				return new Response<UnreadCountDto>(true, 'You got unread notifications', Notif1);
			},
			markRead : async (id : number ) => {
				// fetch PATCH /notifications/:id
				return new Response<NotificationResponseDto>(true, 'Notification read', Notif1)
			},
			allRead : async () => {
				// fetch PATCH /notifications/read-all
				return new Response<null>(true, 'All notification read')
			},
			delete : async (id : number ) => {
				// fetch delete /notifications/:id
				return new Response<null>(true, 'Notification deleted')
			},
			deleteAll : async () => {
				// fetch delete /notifications
				return new Response<null>(true, 'All notification deleted')
			}
		}
	}
}

type ClientType = ReturnType<typeof ClientMockApi>;

export class TransClient {

	private static _instance: TransClient | null = null;
	private _cl: ClientType

	private constructor() {
		this._cl = ClientMockApi(new Axios({ baseURL: process.env.API_URL }))
	}

	static get_instance(): TransClient {
		if (TransClient._instance == null)
			TransClient._instance = new TransClient();
		return TransClient._instance;
	}

	public async login(data : LoginDto) : ClientResponse<AuthResponseDto> {
		return await this._cl.auth.login(data);
	}

	public async register(data : RegisterDto) : ClientResponse<AuthResponseDto> {
		return await this._cl.auth.login(data);
	}

	public async getUser(data : {id? : number, username? : string}) : ClientResponse<UserResponseDto> {
		return await this._cl.users.$(data);
	}


	public async getPost({ where }: PostFiltering): ClientResponse<PostResponseDto> {
		return await this._cl.posts.$(where.id);
	}

	public async createPost(data : CreatePostDto): ClientResponse<PostResponseDto> {
		return await this._cl.posts.create(data);
	}

	public async feed(data? : {page? : number, limit? : number}): ClientResponse<PaginatedResponseDto<PostResponseDto>> {
		return await this._cl.posts.get({});
	}

	public async likePost(id : number, isSet : boolean): ClientResponse<null> {
		if (isSet)
			return await this._cl.posts.unlike(id);
		return await this._cl.posts.like(id);
		
	}

}



//===============Random Values================

export const User1={
  id: 1,
  username: 'login',
  email: 'marme@laid.fr',
  displayName: 'Marmelator',
  bio: 'I love marmelaid and like to put it in sandwishes',
  verified: false,
  role: 'User',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const User2={
  id: 2,
  username: 'login2',
  email: 'meme@pas.mal',
  displayName: 'MempaMal',
  bio: 'J ai meme pas mal quand on est mechant avec moi',
  verified: true,
  role: 'Administrator',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const Post1 = {
  id: 1,
  content: "I guess this is what is supposed to be the string content of the post ?",
  author: User1,
  likes: 20000,
  replies: 3,
  shares: 45,
  views: 40000,
  liked: true,
  bookmarked: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const Post2 = {
  id: 2,
  content: "mhhhh Good content, yes, this is content, verry verry good",
  author: User2,
  likes: 3,
  replies: 20,
  shares: 2,
  views: 465984,
  liked: false,
  bookmarked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const comment1 = {
  id: 1,
  content: 'Jadore ce contenus, merveilleux !',
  author: User1,
  post: Post1,
  likes: 4,
  replies: 1,
  liked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const comment2 = {
  id: 2,
  content: 'moi personellement je deteste',
  author: User2,
  post: Post1,
  likes: 4,
  replies: 2,
  liked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const Notif1 = {
  id: 1,
  type: 'follow',
  message: 'you just got followed by someonw',
  read: false,
  relatedUser: User1,
  createdAt: new Date(),
}

export const Notif2 = {
  id: 1,
  type: 'comment',
  message: 'This is a comment',
  read: false,
  relatedPost: Post1,
  createdAt: new Date(),
}

export const PaginatedUsers = {
	data : [User1, User2],
	page : 1,
	limit : 2,
	total : 2,
	hasMore : false
}

export const PaginatedPosts = {
	data : [Post1, Post2],
	page : 1,
	limit : 2,
	total : 2,
	hasMore : false
}

export const PaginatedComment = {
	data : [comment1, comment2],
	page : 1,
	limit : 2,
	total : 2,
	hasMore : false
}

export const PaginatedNotifications = {
	data : [Notif1, Notif2],
	page : 1,
	limit : 2,
	total : 2,
	hasMore : false
}
