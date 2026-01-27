import { UserResponseDto } from "./profile.dto";

export class PostResponseDto {
  id: string;
  content: string;
  authorId: string ;
  likeCount: number;
  replyCount: number;
  shares: number;
  views: number;
  liked: boolean;
  bookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreatePostDto {
  content: string;            // 1-280 chars, required
  media?: string[];           // optional URLs
  isReply?: boolean;          // optional
  isRepost?: boolean;         // optional
}

export class UpdatePostDto {
  content?: string;           // 1-280 chars, optional
  media?: string[];           // optional URLs
}

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
	mentions: string[];  // User IDs mentioned in the post

	// Metadata
	createdAt: Date;
	editedAt?: Date;
	isEdited: boolean;
}
