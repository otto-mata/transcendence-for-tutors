import { Prisma } from '$prisma';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Put,
	Query,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	async getAllUsers(
		@Query('skip') skip?: string,
		@Query('take') take?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const skipNum = skip ? parseInt(skip) : 0;
			const takeNum = take ? parseInt(take) : 10;
			const users = await this.userService.findAll(skipNum, takeNum);
			return JSON.stringify(users);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving users', error });
		}
	}

	@Get('/profile/:login')
	async getUserByLogin(
		@Param() params: { login: string },
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const { login } = params;
			const user = await this.userService.findByLogin(login);
			return JSON.stringify(user);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({
					message: `Cannot GET /user/profile/${params.login}`,
					error: 'Not Found',
					statusCode: 404,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}

	@Get('/me')
	async getCurrentUser(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findByLogin(user.login);
			return JSON.stringify(currentUser);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({
				message: 'User not found',
				error: 'Not Found',
				statusCode: 404,
			});
		}
	}

	@Put('/me')
	async updateCurrentUser(
		@Body() data: Prisma.UserUpdateInput,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findByLogin(user.login);
			const updatedUser = await this.userService.update(currentUser.id, data);
			return JSON.stringify(updatedUser);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({
					message: 'User not found',
					error: 'Not Found',
					statusCode: 404,
				});
			}
			if (error instanceof Prisma.PrismaClientValidationError) {
				res.status(HttpStatus.BAD_REQUEST);
				return JSON.stringify({
					message: 'Invalid user data',
					error: 'Bad Request',
					statusCode: 400,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}

	@Delete('/me')
	async deleteCurrentUser(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const currentUser = await this.userService.findByLogin(user.login);
			const deletedUser = await this.userService.delete(currentUser.id);
			return JSON.stringify(deletedUser);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(HttpStatus.NOT_FOUND);
				return JSON.stringify({
					message: 'User not found',
					error: 'Not Found',
					statusCode: 404,
				});
			}
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify(error);
		}
	}
}
