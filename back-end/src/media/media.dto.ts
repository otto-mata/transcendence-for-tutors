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
