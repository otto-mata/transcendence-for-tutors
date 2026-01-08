import { Post } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
	constructor(private readonly prismaService: PrismaService) { }
	async findById(id: number): Promise<Post> {
		return this.prismaService.post.findFirstOrThrow({ where: { id } });
	}
}
