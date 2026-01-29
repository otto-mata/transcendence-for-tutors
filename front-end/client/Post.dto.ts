export interface CreatePostDto {
	content: string;
	visibility?: string;
	mentions?: string[];
	file? : File;
}

export interface UpdatePostDto {
	content?: string;
	visibility?: string;
	mentions?: string[];
	mediaIds?: string[];
}
