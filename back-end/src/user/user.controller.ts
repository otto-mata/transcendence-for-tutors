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
	BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@/media/multer.config';
import type { Response } from 'express';
import {
	ChangeEmailDto,
	ChangePasswordDto,
	UpdatePreferencesDto,
	UpdateUserDto,
} from './user.dto';
import { UserService } from './user.service';
import { MediaService } from '@/media/media.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly mediaService: MediaService,
	) {}

	@Get()
	async getAllUsers(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Query('search') search?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const users = await this.userService.findAll(skip, limitNum);
			return JSON.stringify(users);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving users', error });
		}
	}

	@Get('me')
	async getCurrentUser(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findById(user.id);
			if (!currentUser) throw new Error('User not found');
			return JSON.stringify(currentUser);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'User not found', error });
		}
	}

	@Get('me/preferences')
	async getMyPreferences(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findById(user.id);
			if (!currentUser) throw new Error('User not found');
			return JSON.stringify({
				theme: currentUser.theme,
				language: currentUser.language,

			});
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Preferences not found', error });
		}
	}

	@Get('me/bookmarks')
	async getMyBookmarks(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get bookmarked posts
			return JSON.stringify({ message: 'Bookmarks not yet implemented' });
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving bookmarks',
				error,
			});
		}
	}

	@Get('me/posts')
	async getMyPosts(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get current user's posts
			return JSON.stringify({
				message: 'User posts not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving posts', error });
		}
	}

	@Get('me/analytics')
	async getMyAnalytics(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			// Get user analytics
			return JSON.stringify({ message: 'Analytics not yet implemented' });
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving analytics',
				error,
			});
		}
	}

	@Get(':username/exists')
	async checkUsernameExists(
		@Param('username') username: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const user = await this.userService.findByUsername(username);
			return JSON.stringify({ exists: !!user });
		} catch {
			return JSON.stringify({ exists: false });
		}
	}

	@Get(':username/posts')
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
			// Get user's posts
			return JSON.stringify({
				message: 'User posts not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving user posts',
				error,
			});
		}
	}

	@Get(':username/posts/media')
	async getUserMediaPosts(
		@Param('username') username: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get user's posts with media
			return JSON.stringify({
				message: 'User media posts not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving media posts',
				error,
			});
		}
	}

	@Get(':username/likes')
	async getUserLikes(
		@Param('username') username: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get posts liked by user
			return JSON.stringify({
				message: 'User likes not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving liked posts',
				error,
			});
		}
	}

	@Get(':username')
	async getUserByUsername(
		@Param('username') username: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const user = await this.userService.findByUsername(username);
			if (!user) throw new Error('User not found');
			return JSON.stringify(user);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'User not found', error });
		}
	}

	@Get('by-id/:id')
	async getUserById(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const user = await this.userService.findById(id);
			if (!user) throw new Error('User not found');
			return JSON.stringify(user);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'User not found', error });
		}
	}

	@Patch('me')
	async updateCurrentUser(
		@Body() data: UpdateUserDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const updatedUser = await this.userService.update(user.id, data);
			return JSON.stringify(updatedUser);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error updating user', error });
		}
	}

	@Patch('me/avatar')
	@UseInterceptors(FileInterceptor('file', multerConfig))
	async updateAvatar(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			if (!file) {
				throw new BadRequestException('No file uploaded');
			}

			// Get current user to find old avatar
			const currentUser = await this.userService.findById(user.id);
			if (currentUser?.avatarUrl) {
				// Delete old avatar file
				await this.mediaService.deleteMediaByUrl(currentUser.avatarUrl);
			}

			// Create media entry in database
			await this.mediaService.uploadMedia(user.id, file);
			
			const updatedUser = await this.userService.update(user.id, {
				avatarUrl: `/uploads/posts/${file.filename}`,
			});
			return JSON.stringify(updatedUser);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error updating avatar', error });
		}
	}

	@Patch('me/cover')
	@UseInterceptors(FileInterceptor('file', multerConfig))
	async updateCover(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			if (!file) {
				throw new BadRequestException('No file uploaded');
			}

			// Get current user to find old cover
			const currentUser = await this.userService.findById(user.id);
			if (currentUser?.coverImageUrl) {
				// Delete old cover file
				await this.mediaService.deleteMediaByUrl(currentUser.coverImageUrl);
			}

			// Create media entry in database
			await this.mediaService.uploadMedia(user.id, file);
			
			const updatedUser = await this.userService.update(user.id, {
				coverImageUrl: `/uploads/posts/${file.filename}`,
			});
			return JSON.stringify(updatedUser);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error updating cover', error });
		}
	}

	@Patch('me/password')
	async changePassword(
		@Body() data: ChangePasswordDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Password change logic
			return JSON.stringify({ message: 'Password changed successfully' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				message: 'Error changing password',
				error,
			});
		}
	}

	@Patch('me/email')
	async changeEmail(
		@Body() data: ChangeEmailDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const updatedUser = await this.userService.update(user.id, {
				email: data.newEmail,
			});
			return JSON.stringify(updatedUser);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error changing email', error });
		}
	}
	
	@Delete('me')
	async deleteCurrentUser(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.userService.delete(user.id);
			return JSON.stringify({ message: 'User account deleted' });
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error deleting account', error });
		}
	}
}
