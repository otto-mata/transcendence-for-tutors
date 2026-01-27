import {
	IsArray,
	IsOptional,
	IsString,
	IsBoolean,
	IsNumber,
} from 'class-validator';

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

	@IsArray()
	@IsOptional()
	mediaIds?: string[];
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

	@IsArray()
	@IsOptional()
	mediaIds?: string[];
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
	liked?: boolean;
	bookmarked?: boolean;
	media?: PostMediaDto[];
	hashtags?: string[];
	mentions?: string[];
}

export class PaginatedPostsDto {
	data: PostResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class PostMediaDto {
	id: string;
	url: string;
	mediaType: string;
	mimetype: string;
}

export class LikeCountDto {
	count: number;
	liked: boolean;
}

export class PostLikeResponseDto {
	message: string;
	success: boolean;
	likeCount?: number;
}

export class BookmarkDto {
	message: string;
	success: boolean;
	bookmarked: boolean;
}

export class RepostDto {
	message: string;
	success: boolean;
	post?: PostResponseDto;
}

export class PostViewResponseDto {
	message: string;
	success: boolean;
	viewCount?: number;
}

export class PostThreadDto {
	id: string;
	replies: PostResponseDto[];
	parent?: PostResponseDto;
	replyCount: number;
}

export class PostListMetadataDto {
	totalCount: number;
	filteredCount: number;
	hasMore: boolean;
}

export class UserPostStatisticsDto {
	totalPosts: number;
	totalLikes: number;
	totalComments: number;
	totalViews: number;
	averageEngagement: number;
}
