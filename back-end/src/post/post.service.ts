import { Post, Prisma } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
	constructor(private readonly prismaService: PrismaService) { }

	async findById(id: number): Promise<Post> {
		return this.prismaService.post.findFirstOrThrow({ where: { id } });
	}

	async findAll(skip?: number, take?: number): Promise<Post[]> {
		return this.prismaService.post.findMany({
			skip: skip || 0,
			take: take || 10,
			orderBy: { id: 'desc' },
		});
	}

	async create(data: Prisma.PostCreateInput): Promise<Post> {
		return this.prismaService.post.create({ data });
	}

	async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
		return this.prismaService.post.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<Post> {
		return this.prismaService.post.delete({
			where: { id },
		});
	}
}
