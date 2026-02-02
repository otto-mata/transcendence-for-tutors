import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Query,
	HttpStatus,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { FollowService } from './follow.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class FollowController {
	constructor(private readonly followService: FollowService) {}

	// ============================================
	// ROUTES "me/*" MUST BE DEFINED FIRST
	// to avoid being captured by :username or :id
	// ============================================

	@Get('me/followers')
	async getCurrentUserFollowers(
@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const followers = await this.followService.getFollowers(
user.id,
skip,
limitNum,
);
			return JSON.stringify(followers);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
message: 'Error retrieving followers',
error,
});
		}
	}

	@Get('me/following')
	async getCurrentUserFollowing(
@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const following = await this.followService.getFollowing(
user.id,
skip,
limitNum,
);
			return JSON.stringify(following);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
message: 'Error retrieving following',
error,
});
		}
	}

	@Delete('me/followers/:id')
	async removeFollower(
@Param('id') followerId: string,
@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.followService.removeFollower(user.id, followerId);
			return JSON.stringify({ message: 'Follower removed successfully' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error removing follower', error });
		}
	}

	@Get('me/follow-requests')
	async getPendingRequests(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const requests = await this.followService.getPendingRequests(
				user.id,
				skip,
				limitNum,
			);
			return JSON.stringify(requests);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving pending requests',
				error,
			});
		}
	}

	@Get('me/follow-requests/count')
	async getPendingRequestCount(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const count = await this.followService.getPendingRequestCount(user.id);
			return JSON.stringify({ count });
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving count', error });
		}
	}

	@Post('me/follow-requests/:id/accept')
	async acceptFollowRequest(
		@Param('id') followerId: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.followService.acceptFollowRequest(user.id, followerId);
			return JSON.stringify({ message: 'Follow request accepted' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error accepting request', error });
		}
	}

	@Delete('me/follow-requests/:id')
	async rejectFollowRequest(
		@Param('id') followerId: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.followService.rejectFollowRequest(user.id, followerId);
			return JSON.stringify({ message: 'Follow request rejected' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error rejecting request', error });
		}
	}

	@Get(':username/followers')
	async getFollowers(
@Param('username') username: string,
@Query('page') page?: string,
@Query('limit') limit?: string,
@Res({ passthrough: true }) res?: Response,
): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const followers = await this.followService.getFollowers(
username,
skip,
limitNum,
);
			return JSON.stringify(followers);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
message: 'Error retrieving followers',
error,
});
		}
	}

	@Get(':username/following')
	async getFollowing(
@Param('username') username: string,
@Query('page') page?: string,
@Query('limit') limit?: string,
@Res({ passthrough: true }) res?: Response,
): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const following = await this.followService.getFollowing(
username,
skip,
limitNum,
);
			return JSON.stringify(following);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
message: 'Error retrieving following',
error,
});
		}
	}

	@Post(':id/follow')
	async followUser(
@Param('id') id: string,
@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			if (user.id === id) {
				res.status(HttpStatus.BAD_REQUEST);
				return JSON.stringify({ message: 'You cannot follow yourself' });
			}
			await this.followService.follow(user.id, id);
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'User followed' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error following user', error });
		}
	}

	@Delete(':id/follow')
	async unfollowUser(
@Param('id') id: string,
@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.followService.unfollow(user.id, id);
			return JSON.stringify({ message: 'User unfollowed' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error unfollowing user', error });
		}
	}

	@Get(':id/relationship')
	async getRelationship(
@Param('id') id: string,
@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const relationship = await this.followService.getRelationshipStatus(
user.id,
id,
);
			return JSON.stringify(relationship);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
message: 'Error retrieving relationship',
error,
});
		}
	}
}
