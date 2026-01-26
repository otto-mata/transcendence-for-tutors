import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { Media } from '$prisma';
import { access, unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class MediaService {
	constructor(private readonly mediaRepository: MediaRepository) {}

	private buildFilePath(filename: string): string {
		return join(process.cwd(), 'uploads', 'posts', filename);
	}

	private async fileExists(filePath: string): Promise<boolean> {
		try {
			await access(filePath);
			return true;
		} catch {
			return false;
		}
	}

	async uploadMedia(
		userId: string,
		file: Express.Multer.File,
		postId?: string,
	): Promise<Media> {
		let type = 'image';
		if (file.mimetype.startsWith('video/')) {
			type = 'video';
		} else if (file.mimetype === 'image/gif') {
			type = 'gif';
		}

		const url = `/uploads/posts/${file.filename}`;

		return this.mediaRepository.create({
			user: { connect: { id: userId } },
			...(postId && { post: { connect: { id: postId } } }),
			filename: file.filename,
			mimetype: file.mimetype,
			size: file.size,
			url,
			type,
		});
	}

	async getMedia(id: string): Promise<Media> {
		const media = await this.mediaRepository.findById(id);
		if (!media) {
			throw new NotFoundException(`Media with ID ${id} not found`);
		}

		const filePath = this.buildFilePath(media.filename);
		const exists = await this.fileExists(filePath);
		if (!exists) {
			await this.mediaRepository.delete(id);
			throw new NotFoundException(`Media with ID ${id} not found`);
		}

		return media;
	}

	async getMediaByPostId(postId: string): Promise<Media[]> {
		return this.mediaRepository.findByPostId(postId);
	}

	async getUserMedia(
		userId: string,
		page: number = 1,
		limit: number = 20,
	): Promise<Media[]> {
		const skip = (page - 1) * limit;
		const mediaList = await this.mediaRepository.findByUserId(userId, skip, limit);
		const validatedMedia = await Promise.all(
			mediaList.map(async (media) => {
				const filePath = this.buildFilePath(media.filename);
				const exists = await this.fileExists(filePath);

				if (!exists) {
					try {
						await this.mediaRepository.delete(media.id);
					} catch (error) {
						console.error(`Error cleaning up missing media ${media.id}: ${error}`);
					}
					return null;
				}

				return media;
			}),
		);

		return validatedMedia.filter(Boolean) as Media[];
	}

	async deleteMedia(id: string, userId?: string): Promise<void> {
		const media = await this.mediaRepository.findById(id);
		if (!media) {
			return; // idempotent delete when media is already gone
		}

		// check that the media belongs to the requester
		if (userId && media.userId !== userId) {
			throw new NotFoundException(`Media with ID ${id} not found`);
		}

		const filePath = this.buildFilePath(media.filename);
		const exists = await this.fileExists(filePath);
		if (exists) {
			try {
				await unlink(filePath);
			} catch (error) {
				console.error(`Error deleting file: ${error}`);
			}
		}

		await this.mediaRepository.delete(id);
	}
}
