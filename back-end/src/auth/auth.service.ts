import { User } from '$prisma';
import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserRegistration } from './auth.type';
import { ResetPasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	private async sendVerificationEmail(
		email: string,
		token: string,
	): Promise<void> {
		const verificationLink = `${this.configService.get(
			'BASE_URL',
		)}/auth/verify-email?token=${token}`;
		console.log(
			`Sending verification email to ${email} with link: ${verificationLink}`,
		);
	}

	private async sendPasswordResetEmail(
		email: string,
		token: string,
	): Promise<void> {
		const resetLink = `${this.configService.get(
			'BASE_URL',
		)}/auth/reset-password?token=${token}`;
		console.log(`Sending password reset email to ${email} with link: ${resetLink}`);
	}

	async createUser(data: AuthUserRegistration): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(data.password, salt);
		const verificationToken = crypto.randomBytes(32).toString('hex');

		const user = await this.prisma.user.create({
			data: {
				email: data.email,
				username: data.username,
				passwordHash: hash,
				displayName: data.displayName,
				emailVerificationToken: verificationToken,
			},
		});

		await this.sendVerificationEmail(user.email, verificationToken);
		return user;
	}

	async verifyEmail(token: string): Promise<void> {
		const user = await this.prisma.user.findFirst({
			where: { emailVerificationToken: token },
		});

		if (!user) {
			throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
		}

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				isVerified: true,
				emailVerificationToken: null,
			},
		});
	}

	async resendVerificationEmail(email: string): Promise<void> {
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new HttpException(
				'User not found',
				HttpStatus.NOT_FOUND,
			);
		}

		if (user.isVerified) {
			throw new HttpException(
				'Email already verified',
				HttpStatus.BAD_REQUEST,
			);
		}

		const verificationToken = crypto.randomBytes(32).toString('hex');
		await this.prisma.user.update({
			where: { id: user.id },
			data: { emailVerificationToken: verificationToken },
		});

		await this.sendVerificationEmail(user.email, verificationToken);
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			return;
		}

		const resetToken = crypto.randomBytes(32).toString('hex');
		const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				passwordResetToken: resetToken,
				passwordResetExpires,
			},
		});

		await this.sendPasswordResetEmail(user.email, resetToken);
	}

	async resetPassword(data: ResetPasswordDto): Promise<void> {
		const user = await this.prisma.user.findFirst({
			where: {
				passwordResetToken: data.token,
				passwordResetExpires: { gt: new Date() },
			},
		});

		if (!user) {
			throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
		}

		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(data.newPassword, salt);

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				passwordHash: hash,
				passwordResetToken: null,
				passwordResetExpires: null,
			},
		});
	}

	async LoginUser(
		login: string,
		password: string,
	): Promise<{ access_token: string }> {
		const user = await this.prisma.user.findUnique({
			where: { username: login },
		});
		if (user == null) throw new UnauthorizedException();
		if (!user.isVerified) {
			throw new HttpException('Email not verified', HttpStatus.UNAUTHORIZED);
		}
		if (!(await bcrypt.compare(password, user.passwordHash)))
			throw new UnauthorizedException();
		const payload = {
			id: user.id,
			username: user.username,
			email: user.email,
			role: user.role,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async RefreshToken(token: string): Promise<{ access_token: string }> {
		try {
			const data = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get('JWT_SECRET'),
			});
			if (!data || !data['password'] || !data['login'])
				throw new UnauthorizedException();
			return {
				access_token: await this.jwtService.signAsync({
					login: data['login'],
					password: data['password'],
				}),
			};
		} catch {
			throw new UnauthorizedException();
		}
	}
}
