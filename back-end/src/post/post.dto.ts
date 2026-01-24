import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	visibility?: string; // 'public' | 'followers' | 'friends' | 'private'
}

export class UpdatePostDto {
	@IsString()
	@IsOptional()
	content?: string;

	@IsString()
	@IsOptional()
	visibility?: string;

}

export class PostResponseDto {
	id: string;
	content: string;
	authorId: string;
	author?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	visibility: string;
	likeCount: number;
	commentCount: number;
	createdAt: Date;
	updatedAt: Date;
	isReply: boolean;
}

export class PaginatedPostsDto {
	data: PostResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
