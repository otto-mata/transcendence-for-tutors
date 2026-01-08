import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@/generated/prisma/client';
import type { Response } from 'express';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) { }
	@Get("/:id")
	async getPostById(@Param() params: { id: string }, @Res({ passthrough: true }) res: Response): Promise<string> {
		try {
			const { id } = params;
			let idNum = parseInt(id);
			if (Number.isNaN(idNum))
				idNum = -1;
			const post = await this.postService.findById(idNum);
			return JSON.stringify(post);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({ "message": `Cannot GET /post/${params.id}`, "error": "Not Found", "statusCode": 404 });
			}
			return JSON.stringify(error)
		}
	}
}



