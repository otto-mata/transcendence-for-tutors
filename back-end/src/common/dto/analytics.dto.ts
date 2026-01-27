import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class UserAnalyticsDto {
	userId: string;
	totalViews: number;
	totalLikes: number;
	totalComments: number;
	totalFollowers: number;
	totalFollowing: number;
	totalPosts: number;
	engagementRate: number;
	averageLikesPerPost: number;
	averageCommentsPerPost: number;
	mostLikedPost?: {
		id: string;
		likes: number;
	};
	startDate: Date;
	endDate: Date;
}

export class PostAnalyticsDto {
	postId: string;
	views: number;
	likes: number;
	comments: number;
	shares: number;
	engagement: number;
	engagementRate: number;
	reachCount: number;
	impressionCount: number;
	topCommenters: string[];
	createdAt: Date;
	lastEngagementAt?: Date;
}

export class AnalyticsFilterDto {
	@IsOptional()
	@IsString()
	userId?: string;

	@IsOptional()
	@IsString()
	startDate?: string; // ISO date format

	@IsOptional()
	@IsString()
	endDate?: string; // ISO date format

	@IsOptional()
	@IsString()
	timeframe?: 'day' | 'week' | 'month' | 'year';
}

export class TimeSeriesAnalyticsDto {
	timestamp: Date;
	views: number;
	likes: number;
	comments: number;
	shares: number;
	followers: number;
}

export class TimeSeriesDataDto {
	data: TimeSeriesAnalyticsDto[];
	timeframe: string;
	startDate: Date;
	endDate: Date;
}

export class PlatformStatisticsDto {
	totalUsers: number;
	activeUsers: number;
	totalPosts: number;
	totalComments: number;
	totalFollows: number;
	averagePostsPerUser: number;
	averageEngagementRate: number;
	topTrendingTopics: string[];
	timestamp: Date;
}

export class InsightsDto {
	userId: string;
	followerGrowth: number;
	postGrowth: number;
	engagementTrend: string; // 'up' | 'down' | 'stable'
	topPostsByEngagement: PostAnalyticsDto[];
	recommendedPostingTimes: string[];
	audienceDemographics?: {
		avgAge?: number;
		genderDistribution?: { male: number; female: number; other: number };
		topCountries?: { country: string; count: number }[];
	};
}

export class DashboardAnalyticsDto {
	userMetrics: {
		totalFollowers: number;
		totalFollowing: number;
		followerGrowthRate: number;
	};
	postMetrics: {
		totalPosts: number;
		totalViews: number;
		totalLikes: number;
		averageEngagement: number;
	};
	recentPosts: PostAnalyticsDto[];
	topEngagingContent: PostAnalyticsDto[];
	engagementTrend: TimeSeriesDataDto;
}

export class EngagementMetricsDto {
	likeCount: number;
	commentCount: number;
	shareCount: number;
	viewCount: number;
	engagementRate: number; // (likes + comments + shares) / views
	engagementScore: number;
}

export class AudienceInsightsDto {
	activeFollowers: number;
	inactiveFollowers: number;
	newFollowers: number;
	lostFollowers: number;
	followerEngagementRate: number;
	topFollowersByEngagement: {
		userId: string;
		username: string;
		engagementCount: number;
	}[];
}
