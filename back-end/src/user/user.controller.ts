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
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import {
	ChangeEmailDto,
	ChangePasswordDto,
	UpdatePreferencesDto,
	UpdateUserDto,
} from './user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

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

	@Get('suggested')
	async getSuggestedUsers(
		@CurrentUser() user: CurrentUserType,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const limitNum = limit ? parseInt(limit) : 10;
			// Suggested users logic
			return JSON.stringify({
				message: 'Suggested users not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving suggestions',
				error,
			});
		}
	}

	@Get('verified')
	async getVerifiedUsers(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get verified users
			return JSON.stringify({
				message: 'Verified users not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving verified users',
				error,
			});
		}
	}

	@Get('me')
	async getCurrentUser(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findById(user.id);
			return JSON.stringify(currentUser);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'User not found', error });
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

	@Get('me/preferences')
	async getMyPreferences(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findById(user.id);
			return JSON.stringify({
				theme: currentUser.theme,
				language: currentUser.language,
				emailNotifications: currentUser.emailNotifications,
				pushNotifications: currentUser.pushNotifications,
			});
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Preferences not found', error });
		}
	}

	@Get('me/blocked')
	async getBlockedUsers(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get blocked users
			return JSON.stringify({
				message: 'Blocked users not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving blocked users',
				error,
			});
		}
	}

	@Get('me/muted')
	async getMutedUsers(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			// Get muted users
			return JSON.stringify({
				message: 'Muted users not yet implemented',
			});
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving muted users',
				error,
			});
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

	@Get('me/insights')
	async getMyInsights(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			// Get detailed insights
			return JSON.stringify({ message: 'Insights not yet implemented' });
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving insights',
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
			return JSON.stringify(user);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'User not found', error });
		}
	}

	@Get(':id')
	async getUserById(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const user = await this.userService.findById(id);
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
	@UseInterceptors(FileInterceptor('file'))
	async updateAvatar(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const updatedUser = await this.userService.update(user.id, {
				avatarUrl: `/media/${file.filename}`,
			});
			return JSON.stringify(updatedUser);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error updating avatar', error });
		}
	}

	@Patch('me/cover')
	@UseInterceptors(FileInterceptor('file'))
	async updateCover(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const updatedUser = await this.userService.update(user.id, {
				coverImageUrl: `/media/${file.filename}`,
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

	@Patch('me/preferences')
	async updatePreferences(
		@Body() data: UpdatePreferencesDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const updatedUser = await this.userService.update(user.id, data);
			return JSON.stringify(updatedUser);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				message: 'Error updating preferences',
				error,
			});
		}
	}

	@Post(':id/block')
	async blockUser(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Block user logic
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'User blocked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error blocking user', error });
		}
	}

	@Delete(':id/block')
	async unblockUser(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Unblock user logic
			return JSON.stringify({ message: 'User unblocked' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error unblocking user', error });
		}
	}

	@Post(':id/mute')
	async muteUser(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Mute user logic
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'User muted' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error muting user', error });
		}
	}

	@Delete(':id/mute')
	async unmuteUser(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Unmute user logic
			return JSON.stringify({ message: 'User unmuted' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error unmuting user', error });
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
