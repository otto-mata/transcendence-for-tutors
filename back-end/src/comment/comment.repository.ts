import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Comment, Prisma } from '$prisma';

@Injectable()
export class CommentRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Comment> {
		return this.prisma.comment.findFirstOrThrow({
			where: { id },
			include: {
				author: true,
				likes: true,
				replies: true,
			},
		});
	}

	async findByPostId(
		postId: string,
		skip: number,
		take: number,
	): Promise<Comment[]> {
		return this.prisma.comment.findMany({
			where: {postId: postId },
			skip,
			take,
			include: {
				author: true,
				likes: true,
				replies: { include: { author: true, likes: true } },
			},
			orderBy: { createdAt: 'desc' },
		});
	}

	async findReplies(
		parentCommentId: string,
		skip: number,
		take: number,
	): Promise<Comment[]> {
		return this.prisma.comment.findMany({
			where: { parentCommentId },
			skip,
			take,
			include: { author: true, likes: true },
			orderBy: { createdAt: 'desc' },
		});
	}

	async create(data: Prisma.CommentCreateInput): Promise<Comment> {
		return this.prisma.comment.create({
			data,
			include: { author: true, likes: true },
		});
	}

	async delete(id: string): Promise<Comment> {
		return this.prisma.comment.update({
			where: { id },
			data: { },
			include: { author: true, likes: true },
		});
	}

	async permanentDelete(id: string): Promise<Comment> {
		return this.prisma.comment.delete({ where: { id } });
	}

	async addLike(commentId: string, userId: string): Promise<void> {
		await this.prisma.like.create({
			data: {
				userId,
				commentId,
			},
		});
		await this.prisma.comment.update({
			where: { id: commentId },
			data: { likeCount: { increment: 1 } },
		});
	}

	async removeLike(commentId: string, userId: string): Promise<void> {
		await this.prisma.like.deleteMany({
			where: {
				userId,
				commentId,
			},
		});
		await this.prisma.comment.update({
			where: { id: commentId },
			data: { likeCount: { decrement: 1 } },
		});
	}

	async getLikes(commentId: string): Promise<any[]> {
		return this.prisma.like.findMany({
			where: { commentId },
			include: { user: true },
		});
	}
}
