import { MailerService } from '@nestjs-modules/mailer';
import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '$prisma';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ResetPasswordDto } from './auth.dto';
import { AuthUserRegistration } from './auth.type';
import { User } from '$prisma';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService,
		private mailerService: MailerService,
	) {}

	private async sendVerificationEmail(
		email: string,
		token: string,
	): Promise<void> {
		const verificationLink = `${this.configService.get(
			'BASE_URL',
		)}/auth/verify-email?token=${token}`;

		await this.mailerService.sendMail({
			to: email,
			from: `"${this.configService.get(
				'MAIL_FROM_NAME',
			)}" <${this.configService.get('MAIL_FROM_EMAIL')}>`,
			subject: 'Welcome! Please Verify Your Email',
			html: `<p>Please click the following link to verify your email address:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
		});
	}

	private async sendPasswordResetEmail(
		email: string,
		token: string,
	): Promise<void> {
		const resetLink = `${this.configService.get(
			'BASE_URL',
		)}/auth/reset-password?token=${token}`;
		await this.mailerService.sendMail({
			to: email,
			from: `"${this.configService.get(
				'MAIL_FROM_NAME',
			)}" <${this.configService.get('MAIL_FROM_EMAIL')}>`,
			subject: 'Password Reset Request',
			html: `<p>Please click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
		});
	}

	async createUser(data: AuthUserRegistration): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(data.password, salt);
		const verificationToken = crypto.randomBytes(32).toString('hex');

		try {
			const user = await this.prisma.user.create({
				data: {
					email: data.email,
					username: data.username,
					passwordHash: hash,
					displayName: data.displayName,
					emailVerificationToken: verificationToken,
					lastVerificationEmailSentAt: new Date(),
				},
			});

			await this.sendVerificationEmail(user.email, verificationToken);
			return user;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
				const target = (e as any).meta?.target as string[] | undefined;
				if (target && target.includes('email')) {
					const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
					if (existing && (!existing.passwordHash || existing.passwordHash === '')) {
						throw new HttpException(
							'An account with this email exists using Google sign-in. Please sign in with Google.',
							HttpStatus.CONFLICT,
						);
					}
				}

				// Generic conflict message
				throw new HttpException(
					'User with this username or email already exists',
					HttpStatus.CONFLICT,
				);
			}
			throw e;
		}
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

		if (user.lastVerificationEmailSentAt) {
			const timeDiff =
				new Date().getTime() -
				user.lastVerificationEmailSentAt.getTime();
			if (timeDiff < 60000) {
				// 1 minute
				throw new HttpException(
					'Please wait a minute before resending.',
					HttpStatus.TOO_MANY_REQUESTS,
				);
			}
		}

		const verificationToken = crypto.randomBytes(32).toString('hex');
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				emailVerificationToken: verificationToken,
				lastVerificationEmailSentAt: new Date(),
			},
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
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async loginOauthUser(
		login: string,
	): Promise<{ access_token: string }> {
		console.time('AuthService - loginOauthUser - findUnique');
		const user = await this.prisma.user.findUnique({
			where: { username: login },
		});
		console.timeEnd('AuthService - loginOauthUser - findUnique');

		if (user == null)
			throw new UnauthorizedException();

		const payload = {
			id: user.id,
			username: user.username,
			email: user.email,
		};
		console.time('AuthService - loginOauthUser - signAsync');
		const accessToken = await this.jwtService.signAsync(payload);
		console.timeEnd('AuthService - loginOauthUser - signAsync');
		return {
			access_token: accessToken,
		};
	}

	async RefreshToken(token: string): Promise<{ access_token: string }> {
		try {
			const data = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get('JWT_SECRET'),
			});
			if (!data || !data['username'] || !data['email'] || !data['id'])
				throw new UnauthorizedException();
			return {
				access_token: await this.jwtService.signAsync({
					id : data['id'],
					username: data['username'],
					email: data['email'],
				}),
			};
		} catch {
			throw new UnauthorizedException();
		}
	}
}
