import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	visibility?: string; // 'public' | 'followers' | 'friends' | 'private'

	@IsArray()
	@IsOptional()
	hashtags?: string[];

	@IsArray()
	@IsOptional()
	mentions?: string[];

	@IsString()
	@IsOptional()
	locationName?: string;

	@IsOptional()
	locationLatitude?: number;

	@IsOptional()
	locationLongitude?: number;
}

export class UpdatePostDto {
	@IsString()
	@IsOptional()
	content?: string;

	@IsString()
	@IsOptional()
	visibility?: string;

	@IsArray()
	@IsOptional()
	hashtags?: string[];

	@IsArray()
	@IsOptional()
	mentions?: string[];
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
	shareCount: number;
	viewCount: number;
	createdAt: Date;
	updatedAt: Date;
	isEdited: boolean;
	isRepost: boolean;
	isReply: boolean;
}

export class PaginatedPostsDto {
	data: PostResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
