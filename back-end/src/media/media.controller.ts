import {
	Controller,
	Post,
	Delete,
	Get,
	Param,
	HttpStatus,
	Res,
	NotFoundException,
	UseGuards,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	MaxFileSizeValidator,
	FileTypeValidator,
	Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { MediaService } from './media.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';
import { multerConfig, MAX_FILE_SIZE } from './multer.config';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file', multerConfig))
	async uploadMedia(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
				],
				fileIsRequired: true,
			}),
		)
		file: Express.Multer.File,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const media = await this.mediaService.uploadMedia(user.id, file);
			res.status(HttpStatus.CREATED);
			return JSON.stringify(media);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error uploading media', error });
		}
	}

	@Get(':id')
	async getMedia(
		@Param('id') id: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const media = await this.mediaService.getMedia(id);
			return JSON.stringify(media);
		} catch (error) {
			if (res) res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Media not found', error });
		}
	}

	@Get('user/:userId')
	async getUserMedia(
		@Param('userId') userId: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const media = await this.mediaService.getUserMedia(
				userId,
				pageNum,
				limitNum,
			);
			return JSON.stringify(media);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving media', error });
		}
	}

	@Delete(':id')
	async deleteMedia(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.mediaService.deleteMedia(id, user.id);
			return JSON.stringify({ message: 'Media deleted successfully' });
		} catch (error) {
			const status =
				error instanceof NotFoundException
					? HttpStatus.NOT_FOUND
					: HttpStatus.BAD_REQUEST;
			res.status(status);
			return JSON.stringify({
				message: error?.message || 'Error deleting media',
				error,
			});
		}
	}
}
