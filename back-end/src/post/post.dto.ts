import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	visibility?: string; // 'public' | 'followers' | 'friends' | 'private'

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	mediaIds?: string[];
}

export class UpdatePostDto {
	@IsString()
	@IsOptional()
	content?: string;

	@IsString()
	@IsOptional()
	visibility?: string;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	mediaIds?: string[];
}

export class PostResponseDto {
	id: string;
	content: string;
	authorId: string;
	author?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	visibility: string;
	likeCount: number;
	commentCount: number;
	createdAt: Date;
	updatedAt: Date;
	isReply: boolean;
	media?: MediaInPostDto[];
}

export class MediaInPostDto {
	id: string;
	url: string;
	type: string;
	mimetype: string;
	filename: string;
}

