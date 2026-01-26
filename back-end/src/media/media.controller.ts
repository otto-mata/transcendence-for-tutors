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
	Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { MediaService } from './media.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';
import { multerConfig, MAX_FILE_SIZE } from './multer.config';
import { MediaUploadResponseDto, MediaResponseDto } from './media.dto';

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
	): Promise<MediaUploadResponseDto> {
		try {
			const media = await this.mediaService.uploadMedia(user.id, file);
			res.status(HttpStatus.CREATED);
			return media;
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			throw error;
		}
	}

	@Get(':id')
	async getMedia(
		@Param('id') id: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<MediaResponseDto> {
		try {
			const media = await this.mediaService.getMedia(id);
			return media;
		} catch (error) {
			if (res) res.status(HttpStatus.NOT_FOUND);
			throw error;
		}
	}

	@Get('user/:userId')
	async getUserMedia(
		@Param('userId') userId: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<MediaResponseDto[]> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const media = await this.mediaService.getUserMedia(
				userId,
				pageNum,
				limitNum,
			);
			return media;
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			throw error;
		}
	}

	@Delete(':id')
	async deleteMedia(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<{ message: string }> {
		try {
			await this.mediaService.deleteMedia(id, user.id);
			return { message: 'Media deleted successfully' };
		} catch (error) {
			const status =
				error instanceof NotFoundException
					? HttpStatus.NOT_FOUND
					: HttpStatus.BAD_REQUEST;
			res.status(status);
			throw error;
		}
	}
}
