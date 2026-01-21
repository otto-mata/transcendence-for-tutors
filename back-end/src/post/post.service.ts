import { PrismaService } from '@/prisma/prisma.service';
import { Post, Prisma } from '$prisma';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly prisma: PrismaService,
	) {}

	async findById(id: string): Promise<Post> {
		return this.postRepository.findById(id);
	}

	async findAll(skip: number, take: number): Promise<Post[]> {
		return this.postRepository.findAll(skip, take);
	}

	async create(data: Prisma.PostCreateInput): Promise<Post> {
		return this.postRepository.create(data);
	}

	async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
		return this.postRepository.update(id, data);
	}

	async delete(id: string): Promise<Post> {
		return this.postRepository.delete(id);
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
	): Promise<Post> {
		return this.postRepository.create({
			...data,
			author: { connect: { id: userId } },
			parentPost: { connect: { id: parentPostId } },
			isReply: true,
		});
	}
}
