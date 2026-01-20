
export class MediaUploadResponseDto {
  id: string;
  url: string;
  mediaType: string;
  size: number;
  uploadedAt: Date;
}

export class MediaUrlDto {
  id: string;
  url: string;
  mediaType: string;
}