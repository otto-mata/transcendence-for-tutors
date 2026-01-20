import { User } from '$prisma';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserRegistration } from './auth.type';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async createUser(data: AuthUserRegistration): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(data.password, salt);
		const createData: any = {
			email: data.email,
			username: data.username,
			passwordHash: hash,
			displayName: data.displayName,
		};

		// allow role to be set when provided (used for seeding/admin creation)
		if (data.role) {
			// Prisma enum values are uppercased in schema: USER, MODERATOR, ADMIN
			createData.role = data.role.toUpperCase();
		}

		return this.prisma.user.create({ data: createData });
	}

	async LoginUser(
		login: string,
		password: string,
	): Promise<{ access_token: string }> {
		const user = await this.prisma.user.findUnique({
			where: { username: login },
		});
		if (user == null)
			throw new UnauthorizedException();
		if (!await bcrypt.compare(password, user.passwordHash))
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
