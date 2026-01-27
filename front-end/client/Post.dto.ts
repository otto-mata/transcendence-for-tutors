export interface CreatePostDto {
	content: string;
	visibility?: string;
	mentions?: string[];
	mediaIds?: string[];
}

export interface UpdatePostDto {
	content?: string;
	visibility?: string;
	mentions?: string[];
	mediaIds?: string[];
}
