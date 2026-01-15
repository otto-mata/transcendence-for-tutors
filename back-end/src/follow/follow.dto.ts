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
