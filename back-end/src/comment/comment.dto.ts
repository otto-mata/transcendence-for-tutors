import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	parentCommentId?: string;
}

export class UpdateCommentDto {
	@IsString()
	content: string;
}

export class CommentResponseDto {
	id: string;
	content: string;
	authorId: string;
	author?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	postId: string;
	parentCommentId?: string;
	likeCount: number;
	replyCount: number;
	createdAt: Date;
}

export class PaginatedCommentsDto {
	data: CommentResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
