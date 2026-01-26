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
	Patch,
	Post,
	Query,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import {
	CreatePostDto,
	PostResponseDto,
	UpdatePostDto,
} from './post.dto';
import { PostService } from './post.service';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	async getAllPosts(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findAll(skip, limitNum);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving posts', error });
		}
	}

	@Get('feed')
	async getFeed(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<{ message: string } | { message: string; error: unknown }> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Implementation depends on following list
			return { message: 'Feed not yet implemented' };
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return { message: 'Error retrieving feed', error };
		}
	}

	@Get('latest')
	async getLatestPosts(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findAll(skip, limitNum);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving latest posts',
				error,
			});
		}
	}

	@Get(':id')
	async getPostById(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const post = await this.postService.findById(id);
			return JSON.stringify(post);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({
				message: `Cannot GET /posts/${id}`,
				error: 'Not Found',
				statusCode: 404,
			});
		}
	}

	@Get(':id/thread')
	async getPostThread(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Get post and all related replies
			const post = await this.postService.findById(id);
			return JSON.stringify(post);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Post thread not found', error });
		}
	}

	@Post()
	async createPost(
		@Body() data: CreatePostDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const { mediaIds, ...postData } = data;
			const post = await this.postService.createWithMedia(
				{
					...postData,
					author: { connect: { id: user.id } },
				},
				mediaIds,
			);
			res.status(HttpStatus.CREATED);
			return JSON.stringify(post);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Invalid post data', error });
		}
	}

	@Post(':id/like')
	async likePost(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.postService.likePost(id, user.id);
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'Post liked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error liking post', error });
		}
	}

	@Delete(':id/like')
	async unlikePost(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.postService.unlikePost(id, user.id);
			return JSON.stringify({ message: 'Post unliked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error unliking post', error });
		}
	}

	@Get(':id/likes')
	async getPostLikes(
		@Param('id') id: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const likes = await this.postService.getPostLikes(id);
			return JSON.stringify(likes);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving likes', error });
		}
	}

	@Post(':id/bookmark')
	async bookmarkPost(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.postService.bookmarkPost(id, user.id);
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'Post bookmarked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error bookmarking post', error });
		}
	}

	@Delete(':id/bookmark')
	async removeBookmark(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.postService.removeBookmark(id, user.id);
			return JSON.stringify({ message: 'Bookmark removed' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				message: 'Error removing bookmark',
				error,
			});
		}
	}

	@Get(':id/replies')
	async getPostReplies(
		@Param('id') id: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<{ message: string } | { message: string; error: unknown }> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get replies to this post
			return { message: 'Replies not yet implemented' };
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return {
				message: 'Error retrieving replies',
				error,
			};
		}
	}

	@Post(':id/reply')
	async replyToPost(
		@Param('id') id: string,
		@Body() data: Prisma.PostCreateInput,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const reply = await this.postService.createReply(id, data, user.id);
			res.status(HttpStatus.CREATED);
			return JSON.stringify(reply);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error creating reply', error });
		}
	}

	@Patch(':id')
	async updatePost(
		@Param('id') id: string,
		@Body() data: UpdatePostDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const { mediaIds, ...postData } = data;
			const post = await this.postService.updateWithMedia(id, postData, mediaIds);
			return JSON.stringify(post);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({
				message: 'Post not found or unauthorized',
				error,
			});
		}
	}

	@Delete(':id')
	async deletePost(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const post = await this.postService.delete(id);
			return JSON.stringify(post);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({
				message: 'Post not found or unauthorized',
				error,
			});
		}
	}
}
