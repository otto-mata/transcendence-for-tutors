export class FollowResponseDto {
	id: string;
	followerId: string;
	followingId: string;
	createdAt: Date;
}

export class RelationshipStatusDto {
	isFollowing: boolean;
	isFollowedBy: boolean;
	isBlocking: boolean;
	isBlockedBy: boolean;
	isMuting: boolean;
}

export class UserFollowListDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
	followerCount: number;
	followingCount: number;
}

export class PaginatedFollowsDto {
	data: UserFollowListDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class FollowActionResponseDto {
	message: string;
	success: boolean;
	data?: {
		isFollowing: boolean;
		followingId: string;
	};
}

export class FollowCountDto {
	followerCount: number;
	followingCount: number;
}

export class FollowListResponseDto {
	data: UserFollowListDto[];
	total: number;
	count: number;
}

export class FollowerDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
	isMutual: boolean;
}

export class FollowingDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
}
