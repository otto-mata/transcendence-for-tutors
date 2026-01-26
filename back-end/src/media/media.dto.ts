export class MediaUploadResponseDto {
	id: string;
	userId: string;
	postId?: string | null;
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

export class MediaResponseDto {
	id: string;
	url: string;
	type: string;
	mimetype: string;
	size: number;
	filename: string;
}
