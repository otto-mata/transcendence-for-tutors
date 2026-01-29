import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Media, Prisma } from '$prisma';

@Injectable()
export class MediaRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.MediaCreateInput): Promise<Media> {
		return this.prisma.media.create({
			data,
			include: {
				user: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				...(data.post && {
					post : {
						select : {
							id: true,
							mediaUrl: true,
						}
					}}
				)
			},
		});
	}

	async findById(id: string): Promise<Media | null> {
		return this.prisma.media.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
			},
		});
	}

	async findByPostId(postId: string): Promise<Media[]> {
		return this.prisma.media.findMany({
			where: { postId },
			orderBy: { createdAt: 'asc' },
		});
	}

	async findByUserId(userId: string, skip: number, take: number): Promise<Media[]> {
		return this.prisma.media.findMany({
			where: { userId },
			skip,
			take,
			orderBy: { createdAt: 'desc' },
		});
	}

	async findByUrl(url: string): Promise<Media | null> {
		return this.prisma.media.findFirst({
			where: { url },
		});
	}

	async delete(id: string): Promise<Media> {
		return this.prisma.media.delete({
			where: { id },
		});
	}

	async deleteMany(ids: string[]): Promise<number> {
		const result = await this.prisma.media.deleteMany({
			where: { id: { in: ids } },
		});
		return result.count;
	}
}