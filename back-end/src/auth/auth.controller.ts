import { Controller, Post, Body, HttpStatus, Res, HttpCode, HttpException } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import {
	CreateUserDto,
	LoginDto,
	RefreshTokenDto,
	AuthResponseDto,
	VerifyEmailDto,
	ForgotPasswordDto,
	ResetPasswordDto,
	ResendVerificationDto,
} from './auth.dto';
import { Prisma } from '$prisma';
import { AuthUserRegistration } from './auth.type';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(
		@Body() data: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const userData: AuthUserRegistration = {
				displayName:
					data.displayName === undefined
						? data.username
						: data.displayName,
				...data,
			};
			await this.authService.createUser(userData);
			res.status(HttpStatus.CREATED);
			return JSON.stringify({ message: 'Registered successfully' });
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					res.status(HttpStatus.CONFLICT);
					return JSON.stringify({
						error: 'Cannot create User',
						code: 'P2002',
						message:
							'User with this username or email already exists',
					});
				}
				else 
					console.log(e);
			}
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				error: 'Registration failed',
				message: e.message,
			});
		}
	}

	@Post('login')
	async login(
		@Body() data: LoginDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const result = await this.authService.LoginUser(
				data.username,
				data.password,
			);
			res.status(HttpStatus.OK);
			return JSON.stringify(result);
		} catch (e) {
			res.status(HttpStatus.UNAUTHORIZED);
			return JSON.stringify({ error: 'Invalid credentials' });
		}
	}

	@Post('refresh')
	async refresh(
		@Body() data: RefreshTokenDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const result = await this.authService.RefreshToken(data.token);
			return JSON.stringify(result);
		} catch (e) {
			res.status(HttpStatus.UNAUTHORIZED);
			return JSON.stringify({ error: 'Invalid or expired token' });
		}
	}

	@Post('verify-email')
	@HttpCode(HttpStatus.OK)
	async verifyEmail(
		@Body() data: VerifyEmailDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<{ message: string }> {
		try {
			await this.authService.verifyEmail(data.token);
			return { message: 'Email verified successfully' };
		} catch (e) {
			if (e instanceof HttpException) {
				res.status(e.getStatus());
				return { message: e.message };
			}
			res.status(HttpStatus.BAD_REQUEST);
			return { message: 'Email verification failed' };
		}
	}

	@Post('resend-verification')
	@HttpCode(HttpStatus.OK)
	async resendVerification(
		@Body() data: ResendVerificationDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<{ message: string }> {
		try {
			await this.authService.resendVerificationEmail(data.email);
			return { message: 'Verification email sent' };
		} catch (e) {
			if (e instanceof HttpException) {
				res.status(e.getStatus());
				return { message: e.message };
			}
			res.status(HttpStatus.BAD_REQUEST);
			return { message: 'Failed to send verification email' };
		}
	}

	@Post('forgot-password')
	@HttpCode(HttpStatus.OK)
	async forgotPassword(
		@Body() data: ForgotPasswordDto,
	): Promise<{ message: string }> {
		await this.authService.forgotPassword(data.email);
		return { message: 'Password reset email sent' };
	}

	@Post('reset-password')
	@HttpCode(HttpStatus.OK)
	async resetPassword(
		@Body() data: ResetPasswordDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<{ message: string }> {
		try {
			await this.authService.resetPassword(data);
			return { message: 'Password reset successfully' };
		} catch (e) {
			if (e instanceof HttpException) {
				res.status(e.getStatus());
				return { message: e.message };
			}
			res.status(HttpStatus.BAD_REQUEST);
			return { message: 'Password reset failed' };
		}
	}
}
