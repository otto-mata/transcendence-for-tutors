export class MediaUploadResponseDto {
	id: string;
	userId: string;
	postId?: string;
	filename: string;
	mimetype: string;
	size: number;
	url: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
	user?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
}

export class MediaUrlDto {
	url: string;
}

export class MediaResponseDto {
	id: string;
	url: string;
	type: string;
	mimetype: string;
	size: number;
	filename: string;
}
