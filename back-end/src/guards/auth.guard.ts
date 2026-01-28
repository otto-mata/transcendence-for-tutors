import {
	UnauthorizedException,
	CanActivate,
	Injectable,
	ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractToken(request);
		if (!token) throw new UnauthorizedException();
		try {
			const data = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get('JWT_SECRET'),
			});
			request['user'] = data;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractToken(request: Request): string | undefined {
		const cookieToken = request.cookies?.access_token;
		if (cookieToken) {
			return cookieToken;
		}

		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
