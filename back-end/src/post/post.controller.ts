import { Prisma } from '$prisma';
import type { CurrentUserType } from '@/decorators/current-user.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
	constructor(private readonly postService: PostService) { }

	@Get()
	async getAllPosts(
		@Query('skip') skip?: string,
		@Query('take') take?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const skipNum = skip ? parseInt(skip) : 0;
			const takeNum = take ? parseInt(take) : 10;
			const posts = await this.postService.findAll(skipNum, takeNum);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving posts', error });
		}
	}

	@Get('/:id')
	async getPostById(
		@Param() params: { id: string },
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const { id } = params;
			const post = await this.postService.findById(id);
			return JSON.stringify(post);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({
					message: `Cannot GET /post/${params.id}`,
					error: 'Not Found',
					statusCode: 404,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}

	@Post()
	async createPost(
		@Body() data: Prisma.PostCreateInput,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// You can now use the current user data
			console.log('Creating post for user:', user);
			const post = await this.postService.create({ ...data, author: { connect: { username: user.login } } });
			res.status(HttpStatus.CREATED);
			return JSON.stringify(post);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientValidationError) {
				res.status(HttpStatus.BAD_REQUEST);
				return JSON.stringify({
					message: 'Invalid post data',
					error: 'Bad Request',
					statusCode: 400,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}

	@Put('/:id')
	async updatePost(
		@Param() params: { id: string },
		@Body() data: Prisma.PostUpdateInput,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const { id } = params;
			const post = await this.postService.update(id, data);
			return JSON.stringify(post);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({
					message: `Cannot PUT /post/${params.id}`,
					error: 'Not Found',
					statusCode: 404,
				});
			}
			if (error instanceof Prisma.PrismaClientValidationError) {
				res.status(HttpStatus.BAD_REQUEST);
				return JSON.stringify({
					message: 'Invalid post data',
					error: 'Bad Request',
					statusCode: 400,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}

	@Delete('/:id')
	async deletePost(
		@Param() params: { id: string },
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const { id } = params;
			const post = await this.postService.delete(id);
			return JSON.stringify(post);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({
					message: `Cannot DELETE /post/${params.id}`,
					error: 'Not Found',
					statusCode: 404,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}
}

