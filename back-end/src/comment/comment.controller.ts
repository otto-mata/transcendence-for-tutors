import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	Query,
	HttpStatus,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Prisma } from '$prisma';
import type { Response } from 'express';
import { CommentService } from './comment.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('posts/:postId/comments')
@UseGuards(AuthGuard)
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get()
	async getComments(
		@Param('postId') postId: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const comments = await this.commentService.findByPostId(
				postId,
				skip,
				limitNum,
			);
			return JSON.stringify(comments);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving comments',
				error,
			});
		}
	}

	@Get(':id')
	async getCommentById(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const comment = await this.commentService.findById(id);
			return JSON.stringify(comment);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Comment not found', error });
		}
	}

	@Post()
	async createComment(
		@Param('postId') postId: string,
		@Body() data: CreateCommentDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const comment = await this.commentService.create(
				postId, 
				{
					...data,
					post: { connect: { id: postId } },
					author: { connect: { id: user.id } },
			});
			res.status(HttpStatus.CREATED);
			return JSON.stringify(comment);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error creating comment', error });
		}
	}

	@Post(':id/reply')
	async replyToComment(
		@Param('id') id: string,
		@Param('postId') postId: string,
		@Body() data: CreateCommentDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const comment = await this.commentService.create(
				postId, {
					...data,
					parentComment: { connect: { id } },
					author: { connect: { id: user.id } },
					post: { connect: { id: postId } },
			});
			res.status(HttpStatus.CREATED);
			return JSON.stringify(comment);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error creating reply', error });
		}
	}

	@Get(':id/replies')
	async getReplies(
		@Param('id') id: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const replies = await this.commentService.findReplies(
				id,
				skip,
				limitNum,
			);
			return JSON.stringify(replies);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving replies',
				error,
			});
		}
	}

	@Delete(':id')
	async deleteComment(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const comment = await this.commentService.delete(id);
			return JSON.stringify(comment);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({
				message: 'Comment not found or unauthorized',
				error,
			});
		}
	}

	@Post(':id/like')
	async likeComment(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.commentService.likeComment(id, user.id);
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'Comment liked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error liking comment', error });
		}
	}

	@Delete(':id/like')
	async unlikeComment(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.commentService.unlikeComment(id, user.id);
			return JSON.stringify({ message: 'Comment unliked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error unliking comment', error });
		}
	}

	@Get(':id/likes')
	async getCommentLikes(
		@Param('id') id: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const likes = await this.commentService.getCommentLikes(id);
			return JSON.stringify(likes);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving likes', error });
		}
	}
}
