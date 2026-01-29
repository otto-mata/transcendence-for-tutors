
export interface MediaUploadResponseDto {
  id: string;
  url: string;
  mediaType: string;
  size: number;
  uploadedAt: Date;
}

export interface MediaUrlDto {
  id: string;
  url: string;
  mediaType: string;
}