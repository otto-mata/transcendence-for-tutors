import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Post, Prisma } from '$prisma';

@Injectable()
export class PostRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Post> {
		return this.prisma.post.findFirstOrThrow({ where: { id } });
	}

	async findAll(skip: number, take: number): Promise<Post[]> {
		return this.prisma.post.findMany({
			skip,
			take,
			orderBy: { id: 'desc' },
		});
	}

	async create(data: Prisma.PostCreateInput): Promise<Post> {
		return this.prisma.post.create({ data });
	}

	async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
		return this.prisma.post.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<Post> {
		return this.prisma.post.delete({
			where: { id },
		});
	}
}
