export interface UserProfileResponse {
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

export interface UserPreferencesResponse {
	theme: string;
	language: string;
}

export class UpdateUserDto {
	displayName?: string;
	bio?: string;
	website?: string;
	isPrivate?: boolean;
	avatarUrl?: string;
	coverImageUrl?: string;
	locationName?: string;
	twitterUrl?: string;
	instagramUrl?: string;
	linkedinUrl?: string;
	githubUrl?: string;
}

export interface UpdatePreferencesDto {
	theme?: string;
	language?: string;
}

export interface ChangePasswordDto {
	currentPassword: string;
	newPassword: string;
}

export interface ChangeEmailDto {
	newEmail: string;
	password: string;
}

export interface UserListItem {
	id: string;
	username: string;
	displayName?: string;
	avatarUrl?: string;
	isVerified: boolean;
	bio?: string;
}

export interface PaginatedUsers {
	data: UserProfileResponse[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
