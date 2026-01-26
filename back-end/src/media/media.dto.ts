import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class MediaUploadResponseDto {
	id: string;
	userId: string;
	filename: string;
	mimetype: string;
	size: number;
	url: string;
	createdAt: Date;
}

export class MediaUrlDto {
	url: string;
}

export class MediaResponseDto {
	id: string;
	userId: string;
	filename: string;
	mimetype: string;
	size: number;
	url: string;
	width?: number;
	height?: number;
	duration?: number; // for videos
	thumbnailUrl?: string;
	createdAt: Date;
	updatedAt: Date;
}

export class MediaDeleteResponseDto {
	message: string;
	success: boolean;
	deletedId: string;
}

export class MultiMediaUploadResponseDto {
	data: MediaUploadResponseDto[];
	successCount: number;
	failedCount: number;
	message: string;
}

export class MediaMetadataDto {
	id: string;
	filename: string;
	mimetype: string;
	size: number;
	width?: number;
	height?: number;
	duration?: number;
}

export class MediaListDto {
	data: MediaResponseDto[];
	total: number;
	count: number;
}

export class MediaTypeDto {
	mimeType: string;
	category: string; // 'image' | 'video' | 'audio' | 'document'
	extension: string;
}
