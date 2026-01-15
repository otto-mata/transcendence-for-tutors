import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
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
	async verifyEmail(
		@Body() data: VerifyEmailDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Email verification logic
			return JSON.stringify({ message: 'Email verified successfully' });
		} catch (e) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ error: 'Email verification failed' });
		}
	}

	@Post('resend-verification')
	async resendVerification(
		@Body() data: ResendVerificationDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Resend verification email logic
			return JSON.stringify({ message: 'Verification email sent' });
		} catch (e) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				error: 'Failed to send verification email',
			});
		}
	}

	@Post('forgot-password')
	async forgotPassword(
		@Body() data: ForgotPasswordDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Forgot password logic
			return JSON.stringify({ message: 'Password reset email sent' });
		} catch (e) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				error: 'Failed to send password reset email',
			});
		}
	}

	@Post('reset-password')
	async resetPassword(
		@Body() data: ResetPasswordDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// Reset password logic
			return JSON.stringify({ message: 'Password reset successfully' });
		} catch (e) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ error: 'Password reset failed' });
		}
	}
}
