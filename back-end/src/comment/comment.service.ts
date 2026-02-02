import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '$prisma';
import { CommentRepository } from './comment.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { CommentResponseDto } from './comment.dto';

@Injectable()
export class CommentService {
	constructor(private readonly commentRepository: CommentRepository,
				private readonly prisma: PrismaService,
			) {}

	async findById(id: string): Promise<Comment> {
		return this.commentRepository.findById(id);
	}

	async findByPostId(
		postId: string,
		skip: number,
		take: number,
		userId : string,
	): Promise<CommentResponseDto[]> {
		const res = await this.commentRepository.findByPostId(postId, skip, take);
		return Promise.all(res.map(async (comment) => {
			const author = await this.prisma.user.findUnique({where : { id : comment.authorId}});
			return {
				id : comment.id,
				postId : comment.postId,
				content: comment.content,
				authorId: comment.authorId,
				likeCount : comment.likeCount,
				liked: await this.prisma.like.findFirst({where : {userId : userId, commentId : comment.id}}) !== null,
				createdAt : comment.createdAt,
				updatedAt : comment.updatedAt,
				...(author && { author : {
					username : author.username,
					id : author.id,
					...(author.displayName &&  	 	{displayName : author.displayName,}),
					...( author.avatarUrl && {avatarUrl : author.avatarUrl,})
				}})
			}
		}
		))
	}

	async findReplies(
		parentCommentId: string,
		skip: number,
		take: number
	): Promise<CommentResponseDto[]> {
		return this.commentRepository.findReplies(parentCommentId, skip, take);
	}

	async create(postId : string, data: Prisma.CommentCreateInput): Promise<Comment> {
		await this.prisma.post.update({
			where: { id: postId },
			data: { replyCount: { increment: 1 } },
		});
		return this.commentRepository.create(data);
	}

	async delete(id: string): Promise<Comment> {
		return this.commentRepository.delete(id);
	}

	async permanentDelete(id: string): Promise<Comment> {
		return this.commentRepository.permanentDelete(id);
	}

	async likeComment(commentId: string, userId: string): Promise<void> {
		return this.commentRepository.addLike(commentId, userId);
	}

	async unlikeComment(commentId: string, userId: string): Promise<void> {
		return this.commentRepository.removeLike(commentId, userId);
	}

	async getCommentLikes(commentId: string): Promise<any[]> {
		return this.commentRepository.getLikes(commentId);
	}
}
