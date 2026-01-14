import { PrismaService } from '@/prisma/prisma.service';
import {
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '$prisma';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService,
		private jwtService: JwtService, private configService: ConfigService) { }

	async createUser(
		data: Prisma.UserCreateInput
	): Promise<User> {
		return this.prisma.user.create({ data });
	}

	async LoginUser(
		login: string,
		password: string
	): Promise<{ access_token: string }> {
		const user = await this.prisma.user.findUnique({ where: { username: login } });
		if (user == null || user['passwordHash'] !== password)
			throw new UnauthorizedException();
		const payload = {
			id: user.id,
			username: user.username,
			email: user.email,
			role: user.role,
		}
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}

	async RefreshToken(
		token: string
	): Promise<{ access_token: string }> {
		try {
			const data = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get("JWT_SECRET")
			});
			if (!data || !data['password'] || !data['login'])
				throw new UnauthorizedException();
			return {
				access_token: await this.jwtService.signAsync({
					login: data['login'],
					password: data['password']
				})
			};
		}
		catch {
			throw new UnauthorizedException();
		}
	}
}
