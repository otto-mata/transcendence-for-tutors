import { PrismaService } from '@/prisma/prisma.service';
import { Post, Prisma } from '$prisma';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostResponseDto, MediaInPostDto } from './post.dto';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly prisma: PrismaService,
	) {}

	private async mapPostToResponse(postId: string): Promise<PostResponseDto> {
		const post = await this.prisma.post.findFirstOrThrow({
			where: { id: postId },
			include: {
				author: true,
				media: true,
			},
		});

		const media: MediaInPostDto[] | undefined = post.media?.map((item) => ({
			id: item.id,
			url: item.url,
			type: item.type,
			mimetype: item.mimetype,
			filename: item.filename,
		}));

		return {
			id: post.id,
			content: post.content,
			authorId: post.authorId,
			author: post.author
				? {
						id: post.author.id,
						username: post.author.username,
						avatarUrl: post.author.avatarUrl ?? undefined,
					}
				: undefined,
			visibility: post.visibility,
			likeCount: post.likeCount,
			commentCount: post.commentCount,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
			isReply: post.isReply,
			media,
		};
	}

	async findById(id: string): Promise<PostResponseDto> {
		return this.mapPostToResponse(id);
	}

	async findAll(skip: number, take: number): Promise<PostResponseDto[]> {
		const posts = await this.postRepository.findAll(skip, take);
		return Promise.all(posts.map((post) => this.mapPostToResponse(post.id)));
	}

	async create(data: Prisma.PostCreateInput): Promise<PostResponseDto> {
		const post = await this.postRepository.create(data);
		return this.mapPostToResponse(post.id);
	}

	async createWithMedia(
		data: Prisma.PostCreateInput,
		mediaIds?: string[],
	): Promise<PostResponseDto> {
		let createdPost: Post;
		if (mediaIds && mediaIds.length > 0) {
			const postData = {
				...data,
				media: {
					connect: mediaIds.map((id) => ({ id })),
				},
			};
			createdPost = await this.postRepository.create(postData);
		} else {
			createdPost = await this.postRepository.create(data);
		}
		return this.mapPostToResponse(createdPost.id);
	}

	async update(id: string, data: Prisma.PostUpdateInput): Promise<PostResponseDto> {
		await this.postRepository.update(id, data);
		return this.mapPostToResponse(id);
	}

	async updateWithMedia(
		id: string,
		data: Prisma.PostUpdateInput,
		mediaIds?: string[],
	): Promise<PostResponseDto> {
		// If media IDs are provided, update the connections
		if (mediaIds !== undefined) {
			const updateData = {
				...data,
				media: {
					set: mediaIds.map((mediaId) => ({ id: mediaId })),
				},
			};
			await this.postRepository.update(id, updateData);
		} else {
			await this.postRepository.update(id, data);
		}
		return this.mapPostToResponse(id);
	}

	async delete(id: string): Promise<PostResponseDto> {
		await this.postRepository.delete(id);
		// Return data as-is since post is deleted
		return {
			id,
			content: '',
			authorId: '',
			visibility: '',
			likeCount: 0,
			commentCount: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
			isReply: false,
		};
	}

	async likePost(postId: string, userId: string): Promise<void> {
		await this.prisma.like.create({
			data: {
				userId,
				postId,
			},
		});
		await this.prisma.post.update({
			where: { id: postId },
			data: { likeCount: { increment: 1 } },
		});
	}

	async unlikePost(postId: string, userId: string): Promise<void> {
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

	async createReply(
		parentPostId: string,
		data: Prisma.PostCreateInput,
		userId: string,
	): Promise<PostResponseDto> {
		const reply = await this.postRepository.create({
			...data,
			author: { connect: { id: userId } },
			parentPost: { connect: { id: parentPostId } },
			isReply: true,
		});
		return this.mapPostToResponse(reply.id);
	}
}
