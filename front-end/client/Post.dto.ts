export interface PostDto {
	id: string;
	content: string;
	authorId: string;
	author: string;

	likeCount: number;
	commentCount: number;
	shareCount: number;
	viewCount: number;

	isLikedByCurrentUser: boolean;
	isBookmarkedByCurrentUser: boolean;

	// Hashtags and mentions are optional for PASS 1
	hashtags: string[];
	mentions: string[]; // User IDs mentioned in the post

	// Metadata
	createdAt: Date;
	editedAt?: Date;
	isEdited: boolean;
}
