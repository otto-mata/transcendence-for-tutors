import { PrismaService } from '@/prisma/prisma.service';
import { Post, Prisma } from '$prisma';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostResponseDto } from './post.dto';
import { connect } from 'node:http2';
import { CommentResponseDto } from '@/comment/comment.dto';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly prisma: PrismaService,
	) {}

	async findById(id: string, userId : string): Promise<PostResponseDto> {
		const post = await this.postRepository.findById(id);
		const author = await this.prisma.user.findUnique({where : { id : post.authorId}});
		if (author?.id != userId &&  author?.isPrivate){
			const follow = await this.prisma.follow.findFirstOrThrow({where : {
				followerId : userId,
				following : author,
				status : "accepted"
			}})
		}
		
		return ({
			id: post.id,
			content: post.content,
			authorId: post.authorId,
			visibility: post.visibility,
			likeCount: post.likeCount,
			replyCount: post.replyCount,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
			isReply: post.isReply,
			liked: await this.prisma.like.findFirst({where : {userId : post.authorId, postId : post.id}}) !== null,
			bookmarked: await this.prisma.bookmark.findFirst({where : {userId : post.authorId, postId : post.id}}) !== null,
			...(post.mediaUrl && {mediaUrl : post.mediaUrl}),
		});
	}

	async findAll(skip: number, take: number, userId? : string): Promise<PostResponseDto[]> {
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			OR : [
				{
					author : {
						isPrivate : false,
					}
				},
				{
				author : {
					isPrivate : true,
					followers : {
						some : {
							followerId : userId,
							status : "accepted"
						}
					}
				
				}
			},
			{
				authorId : userId
			}]
		}
	});

  return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
}));
}

	async findFollowed(skip: number, take: number, userId? : string): Promise<PostResponseDto[]> {
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			author : {
				followers : {
					some : {
						followerId : userId,
						status : "accepted"
					}
				}
			
			}
		}
	});

  return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
}));
}


async findLiked(skip: number, take: number, userId : string): Promise<PostResponseDto[]> {
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			OR : [
				{
					author : {
						isPrivate : false,
					}
				},
				{
				author : {
					isPrivate : true,
					followers : {
						some : {
							followerId : userId,
							status : "accepted"
						}
					}
				
				}
			},
			{
				authorId : userId
			}],
			likes: {
				some : {
					userId : userId
				}
			},
		},
		});
	return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
}));}

async findSaved(skip: number, take: number, userId : string): Promise<PostResponseDto[]> {
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			bookmarks : {
				some : {
					userId : userId
				}
			},
			OR : [
				{
					author : {
						isPrivate : false,
					}
				},
				{
				author : {
					isPrivate : true,
					followers : {
						some : {
							followerId : userId,
							status : "accepted"
						}
					}
				
				}
			},
			{
				authorId : userId
			}]
		},
		});
	return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : userId, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
	}));
}

async findLikedByName(skip: number, take: number, username : string, userId : string): Promise<PostResponseDto[]> {
	const user = await this.prisma.user.findUnique({where : { username : username}});
	if (user === null)
		return [];
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			OR : [
				{
					author : {
						isPrivate : false,
					}
				},
				{
				author : {
					isPrivate : true,
					followers : {
						some : {
							followerId : userId,
							status : "accepted"
						}
					}
				
				}
			},
			{
				authorId : userId
			}],
			likes : {
				some : {
					userId : user?.id
				}
			},
		},
		});
	return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : user?.id, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : user?.id, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
	}));
}

async findSavedByName(skip: number, take: number, username : string, userId : string): Promise<PostResponseDto[]> {
	const user = await this.prisma.user.findUnique({where : { username : username}});
	if (user === null)
		return [];
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			bookmarks : {
				some : {
					userId : user?.id
				}
			},
			OR : [
				{
					author : {
						isPrivate : false,
					}
				},
				{
				author : {
					isPrivate : true,
					followers : {
						some : {
							followerId : userId,
							status : "accepted"
						}
					}
				
				}
			},
			{
				authorId : userId
			}]
		},
		});
	return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : user?.id, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : user?.id, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
	}));
}


async findByName(skip: number, take: number, username : string, userId : string): Promise<PostResponseDto[]> {
	const user = await this.prisma.user.findUnique({where : { username : username}});
	if (user === null)
		return [];
	const posts = await this.prisma.post.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : {
			authorId : user?.id,
			OR : [
				{
					author : {
						isPrivate : false,
					}
				},
				{
				author : {
					isPrivate : true,
					followers : {
						some : {
							followerId : userId,
							status : "accepted"
						}
					}
				
				}
			},
			{
				authorId : userId
			}
		]
		},
		});
	return Promise.all(posts.map(async (post) => {
	return {
		id: post.id,
		content: post.content,
		authorId: post.authorId,
		visibility: post.visibility,
		likeCount: post.likeCount,
		replyCount: post.replyCount,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		isReply: post.isReply,
		liked: await this.prisma.like.findFirst({where : {userId : user?.id, postId : post.id}}) !== null,
		bookmarked: await this.prisma.bookmark.findFirst({where : {userId : user?.id, postId : post.id}}) !== null,
		...(post.mediaUrl && {mediaUrl : post.mediaUrl})
	}
	}));
}




	async create(data: Prisma.PostCreateInput, userId : string): Promise<Post> {
		return this.postRepository.create(data, userId);
	}

	async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
		return this.postRepository.update(id, data);
	}

	async delete(id: string): Promise<Post> {
		return this.postRepository.delete(id);
	}

	async likePost(postId: string, userId: string): Promise<void> {
		await this.prisma.like.create(
			{
				data : {
					userId : userId,
					postId : postId,
				}
			}
		);
		await this.prisma.post.update({
			where: { id: postId },
			data: { likeCount: { increment: 1 } },
		});
	}

	async unlikePost(postId: string, userId: string): Promise<void> {
		if (! await this.prisma.like.findFirst({
			where: {
				userId,
				postId,
			},
		})) return;
		await this.prisma.like.deleteMany({
			where: {
				userId,
				postId,
			},
		});
		await this.prisma.post.update({
			where: { id: postId },
			data: { likeCount: { decrement: 1 } },
		});
	}

	async getPostLikes(postId: string): Promise<any[]> {
		return this.prisma.like.findMany({
			where: { postId },
			include: { user: true },
		});
	}

	async bookmarkPost(postId: string, userId: string): Promise<void> {
		await this.prisma.bookmark.create({
			data: {
				userId,
				postId,
			},
		});
	}

	async removeBookmark(postId: string, userId: string): Promise<void> {
		await this.prisma.bookmark.deleteMany({
			where: {
				userId,
				postId,
			},
		});
	}

	async getReplies(postId : string, skip: number, take: number, userId? : string): Promise<CommentResponseDto[]> {
	const comments = await this.prisma.comment.findMany({
		skip,
		take,
		orderBy: { createdAt: 'desc' },
		where : { postId : postId}
	});

  return Promise.all(comments.map(async (comment) => {
	const author = await this.prisma.user.findUnique({where : {id : comment.authorId}})
	const authorSent = author? {id : author.id, username : author.username} :  {id : "charging...", username : "charging..."}
	return {
		id: comment.id,
		postId:comment.postId,
		content: comment.content,
		authorId: comment.authorId,
		author : authorSent,
		likeCount: comment.likeCount,
		replyCount: comment.replyCount,
		createdAt: comment.createdAt,
		updatedAt: comment.updatedAt,
		liked: await this.prisma.like.findFirst({where : {userId : userId, commentId : comment.id}}) !== null,
	}
}));
}
	async createReply(
		parentPostId: string,
		data: Prisma.PostCreateInput,
		userId: string,
	): Promise<Post | null> {
		return null;
	}
}
