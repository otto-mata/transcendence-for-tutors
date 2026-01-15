import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '$prisma';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
	constructor(private readonly commentRepository: CommentRepository) {}

	async findById(id: string): Promise<Comment> {
		return this.commentRepository.findById(id);
	}

	async findByPostId(
		postId: string,
		skip: number,
		take: number,
	): Promise<Comment[]> {
		return this.commentRepository.findByPostId(postId, skip, take);
	}

	async findReplies(
		parentCommentId: string,
		skip: number,
		take: number,
	): Promise<Comment[]> {
		return this.commentRepository.findReplies(parentCommentId, skip, take);
	}

	async create(data: Prisma.CommentCreateInput): Promise<Comment> {
		return this.commentRepository.create(data);
	}

	async update(
		id: string,
		data: Prisma.CommentUpdateInput,
	): Promise<Comment> {
		return this.commentRepository.update(id, {
			...data,
			isEdited: true,
			editedAt: new Date(),
		});
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
