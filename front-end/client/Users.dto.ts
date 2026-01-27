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
