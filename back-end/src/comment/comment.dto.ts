import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	parentCommentId?: string;

	@IsArray()
	@IsOptional()
	mediaIds?: string[];

	@IsArray()
	@IsOptional()
	mentions?: string[];
}

export class UpdateCommentDto {
	@IsString()
	content: string;

	@IsArray()
	@IsOptional()
	mediaIds?: string[];

	@IsArray()
	@IsOptional()
	mentions?: string[];
}

export class CommentResponseDto {
	id: string;
	content: string;
	authorId: string;
	author?: {
		id: string;
		displayName? : string;
		username: string;
		avatarUrl?: string;
	};
	postId: string;
	likeCount: number;
	createdAt: Date;
	updatedAt: Date;
	liked?: boolean;
	}

export class PaginatedCommentsDto {
	data: CommentResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class CommentMediaDto {
	id: string;
	url: string;
	mediaType: string;
	mimetype: string;
}

export class CommentLikeResponseDto {
	message: string;
	success: boolean;
	likeCount?: number;
}

export class CommentThreadDto {
	id: string;
	replies: CommentResponseDto[];
	parent?: CommentResponseDto;
	replyCount: number;
}

export class CommentAuthorDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
}
