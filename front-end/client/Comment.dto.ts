export interface CommentResponseDto {
	id: string;
	content: string;
	authorId: string;
	author?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	postId: string;
	parentCommentId?: string;
	likeCount: number;
	replyCount: number;
	createdAt: Date;
	updatedAt: Date;
	liked: boolean;
	// media?: CommentMediaDto[];
	mentions?: string[];
}

export type CreateCommentDto = {
  content: string;
  parentCommentId?: string;
  mediaIds?: string[];
  mentions?: string[];
};

export type UpdateCommentDto = {
  content?: string;
  mediaIds?: string[];
  mentions?: string[];
};
