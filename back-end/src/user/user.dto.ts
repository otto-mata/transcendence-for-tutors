import {
	IsBoolean,
	IsEmail,
	IsOptional,
	IsString,
	IsUrl,
	IsArray,
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	passwordHash: string;

	@IsString()
	@IsOptional()
	displayName?: string;

	@IsString()
	@IsOptional()
	bio?: string;
}

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	displayName?: string;

	@IsString()
	@IsOptional()
	bio?: string;

	@IsString()
	@IsOptional()
	website?: string;

	@IsBoolean()
	@IsOptional()
	isPrivate?: boolean;

	@IsUrl()
	@IsOptional()
	avatarUrl?: string;

	@IsUrl()
	@IsOptional()
	coverImageUrl?: string;

	@IsString()
	@IsOptional()
	locationName?: string;

	@IsString()
	@IsOptional()
	twitterUrl?: string;

	@IsString()
	@IsOptional()
	instagramUrl?: string;

	@IsString()
	@IsOptional()
	linkedinUrl?: string;

	@IsString()
	@IsOptional()
	githubUrl?: string;
}

export class UpdatePreferencesDto {
	@IsString()
	@IsOptional()
	theme?: string; // 'light' | 'dark' | 'auto'

	@IsString()
	@IsOptional()
	language?: string; // 'en' | 'fr' | 'es' | etc.

	@IsBoolean()
	@IsOptional()
	emailNotifications?: boolean;

	@IsBoolean()
	@IsOptional()
	pushNotifications?: boolean;
}

export class ChangePasswordDto {
	@IsString()
	currentPassword: string;

	@IsString()
	newPassword: string;
}

export class ChangeEmailDto {
	@IsEmail()
	newEmail: string;

	@IsString()
	password: string;
}

export class UserResponseDto {
	id: string;
	username: string;
	email: string;
	displayName?: string;
	bio?: string;
	avatarUrl?: string;
	coverImageUrl?: string;
	website?: string;
	isVerified: boolean;
	isPrivate: boolean;
	isActive: boolean;
	isSuspended: boolean;
	role: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	createdAt: Date;
}

export class UserListDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
	bio?: string;
}

export class PaginatedUsersDto {
	data: UserResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class UserFollowStatsDto {
	followerCount: number;
	followingCount: number;
	postCount: number;
	likeCount: number;
}

export class UserPreferencesDto {
	theme: string;
	language: string;
	emailNotifications: boolean;
	pushNotifications: boolean;
}

export class UserAnalyticsDto {
	userId: string;
	totalViews: number;
	totalLikes: number;
	totalComments: number;
	totalFollowers: number;
	totalFollowing: number;
	totalPosts: number;
	engagementRate: number;
	startDate: Date;
	endDate: Date;
}

export class UserMetadataDto {
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
}

export class BlockedUserResponseDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	blockedAt: Date;
}

export class MutedUserResponseDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	mutedAt: Date;
}

export class PaginatedBlockedUsersDto {
	data: BlockedUserResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class PaginatedMutedUsersDto {
	data: MutedUserResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
