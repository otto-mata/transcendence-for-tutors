import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Post, Prisma } from '$prisma';

@Injectable()
export class PostRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Post> {
		return this.prisma.post.findFirstOrThrow({
			where: { id },
			include: {
				author: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				media: {
					select: {
						id: true,
						url: true,
						type: true,
						mimetype: true,
						filename: true,
					},
				},
			},
		});
	}

	async findAll(skip: number, take: number): Promise<Post[]> {
		return this.prisma.post.findMany({
			skip,
			take,
			orderBy: { createdAt: 'desc' },
			include: {
				author: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				media: {
					select: {
						id: true,
						url: true,
						type: true,
						mimetype: true,
						filename: true,
					},
				},
			},
		});
	}

	async create(data: Prisma.PostCreateInput): Promise<Post> {
		return this.prisma.post.create({
			data,
			include: {
				author: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				media: {
					select: {
						id: true,
						url: true,
						type: true,
						mimetype: true,
						filename: true,
					},
				},
			},
		});
	}

	async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
		return this.prisma.post.update({
			where: { id },
			data,
			include: {
				author: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				media: {
					select: {
						id: true,
						url: true,
						type: true,
						mimetype: true,
						filename: true,
					},
				},
			},
		});
	}

	async delete(id: string): Promise<Post> {
		return this.prisma.post.delete({
			where: { id },
			include: {
				author: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				media: {
					select: {
						id: true,
						url: true,
						type: true,
						mimetype: true,
						filename: true,
					},
				},
			},
		});
	}
}
