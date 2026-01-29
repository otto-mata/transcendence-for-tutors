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
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@/media/multer.config';
import { MediaService } from '@/media/media.service';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostController {
	constructor(private readonly postService: PostService,
				private readonly mediaService: MediaService,
	) {}

	@Get()
	async getAllPosts(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
		@CurrentUser() user?: CurrentUserType,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findAll(skip, limitNum, user?.id);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving posts', error });
		}
	}

	@Get('saved')
	async getSaved(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findSaved(skip, limitNum, user.id);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving feed', error });
		}
	}

	@Get('saved/:username')
	async getUserSaved(
		@Param('username') username: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findSaved(skip, limitNum, username);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving user posts',
				error,
			});
		}
	}

	@Get('user/:username')
	async getUserPosts(
		@Param('username') username: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findByName(skip, limitNum, username);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving user posts',
				error,
			});
		}
	}

	@Get('liked')
	async getLiked(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const posts = await this.postService.findLiked(skip, limitNum, user.id);
			return JSON.stringify(posts);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving feed', error });
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
	@UseInterceptors(FileInterceptor('file', multerConfig))
	async createPost(
		@UploadedFile() file: Express.Multer.File,
		@Body() content : CreatePostDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			if (!content.content) throw new Error('No content');
			const post = await this.postService.create({
				...content,
				author: { connect: { id: user.id } },
			});
			if (file) {
				console.log("ca vas bien la sale batard");
				await this.mediaService.uploadMedia(user.id, file, post.id);
				const updatedPost = await this.postService.update(post.id, {
					mediaUrl: `/uploads/posts/${file.filename}`,
				});
				res.status(HttpStatus.CREATED);
				return JSON.stringify(updatedPost);
			}
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
	
	@Patch(':id')
	async updatePost(
		@Param('id') id: string,
		@Body() data: UpdatePostDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const post = await this.postService.update(id, data);
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
