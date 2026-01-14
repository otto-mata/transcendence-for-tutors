import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
	constructor(private readonly mediaRepository: MediaRepository) { }

	async uploadMedia(userId: string, file: Express.Multer.File): Promise<any> {
		return this.mediaRepository.saveMedia(
			userId,
			file.filename,
			file.mimetype,
			file.size,
		);
	}

	async deleteMedia(id: string): Promise<void> {
		return this.mediaRepository.deleteMedia(id);
	}

	async getMedia(id: string): Promise<any> {
		return this.mediaRepository.getMedia(id);
	}
}
