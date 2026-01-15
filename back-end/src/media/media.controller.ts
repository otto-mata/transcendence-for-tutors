import {
	Controller,
	Post,
	Delete,
	Get,
	Param,
	HttpStatus,
	Res,
	UseGuards,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { MediaService } from './media.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadMedia(
		@UploadedFile() file: Express.Multer.File,
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

	@Delete(':id')
	async deleteMedia(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.mediaService.deleteMedia(id);
			return JSON.stringify({ message: 'Media deleted' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error deleting media', error });
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
}
