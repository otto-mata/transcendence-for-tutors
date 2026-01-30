/**
 * DTOs for the follow/subscription system
 */

// User info shown in follow lists
export interface FollowUserDto {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
	bio?: string;
}

// Follow relationship with user info
export interface FollowerDto {
	id: string;
	followerId: string;
	followingId: string;
	createdAt: Date;
	follower: FollowUserDto;
}

export interface FollowingDto {
	id: string;
	followerId: string;
	followingId: string;
	createdAt: Date;
	following: FollowUserDto;
}

// Relationship status between current user and another user
export interface RelationshipStatusDto {
	isFollowing: boolean;
	isFollowedBy: boolean;
	isPending?: boolean; // true if follow request is pending (for private accounts)
}

// Pending follow request
export interface PendingRequestDto {
	id: string;
	followerId: string;
	followingId: string;
	createdAt: Date;
	follower: FollowUserDto;
}

// Response for follow/unfollow actions
export interface FollowActionResponseDto {
	message: string;
}

// Response for pending request count
export interface PendingRequestCountDto {
	count: number;
}

// Paginated follow lists
export interface PaginatedFollowersDto {
	data: FollowerDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export interface PaginatedFollowingDto {
	data: FollowingDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

// Follow counts for a user profile
export interface FollowCountsDto {
	followerCount: number;
	followingCount: number;
}
