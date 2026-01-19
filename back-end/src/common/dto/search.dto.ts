import { IsOptional, IsString, IsNumber } from 'class-validator';

export class HashtagDto {
	id: string;
	name: string;
	count: number;
	trend: number; // trending score
	createdAt: Date;
	updatedAt: Date;
}

export class TrendingHashtagDto {
	name: string;
	count: number;
	trend: number;
	rank: number;
}

export class PaginatedHashtagsDto {
	data: HashtagDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class PaginatedTrendingHashtagsDto {
	data: TrendingHashtagDto[];
	page: number;
	limit: number;
	total: number;
}

export class SearchQueryDto {
	@IsString()
	query: string;

	@IsOptional()
	@IsString()
	type?: 'posts' | 'users' | 'hashtags' | 'comments' | 'all';

	@IsOptional()
	@IsNumber()
	page?: number;

	@IsOptional()
	@IsNumber()
	limit?: number;
}

export class SearchResultDto<T> {
	query: string;
	resultType: string;
	results: T[];
	total: number;
	timestamp: Date;
}

export class SearchPostResultDto {
	id: string;
	content: string;
	author: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	createdAt: Date;
	relevanceScore: number;
}

export class SearchUserResultDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
	bio?: string;
	relevanceScore: number;
}

export class SearchCommentResultDto {
	id: string;
	content: string;
	postId: string;
	author: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	createdAt: Date;
	relevanceScore: number;
}

export class CombinedSearchResultDto {
	query: string;
	posts: SearchPostResultDto[];
	users: SearchUserResultDto[];
	hashtags: HashtagDto[];
	comments: SearchCommentResultDto[];
	postCount: number;
	userCount: number;
	hashtagCount: number;
	commentCount: number;
	timestamp: Date;
}

export class SearchFilterDto {
	@IsOptional()
	@IsString()
	from?: string; // search from specific user

	@IsOptional()
	@IsString()
	since?: string; // date range

	@IsOptional()
	@IsString()
	until?: string; // date range

	@IsOptional()
	@IsString()
	lang?: string; // language filter
}

export class AutocompleteResultDto {
	query: string;
	suggestions: string[];
	type: string; // 'hashtag' | 'mention' | 'keyword'
}

export class SearchSuggestionDto {
	text: string;
	type: string;
	icon?: string;
	count?: number;
}
