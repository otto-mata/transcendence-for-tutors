import { PrismaService } from '@/prisma/prisma.service';
import { Post, Prisma } from '$prisma';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
	constructor(private readonly postRepository: PostRepository) { }

	async findById(id: string): Promise<Post> {
		return this.postRepository.findById(id);
	}

	async findAll(skip: number, take: number): Promise<Post[]> {
		return this.postRepository.findAll(skip, take);
	}

	async create(data: Prisma.PostCreateInput): Promise<Post> {
		return this.postRepository.create(data);
	}

	async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
		return this.postRepository.update(id, data);
	}

	async delete(id: string): Promise<Post> {
		return this.postRepository.delete(id);
	}
}
