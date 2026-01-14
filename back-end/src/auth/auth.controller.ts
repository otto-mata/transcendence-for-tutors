import {
	Controller,
	Post,
	Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './auth.dto';
import { Prisma } from '@p/generated/client';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	async createUser(
		@Body() data: CreateUserDto
	): Promise<{ message: string }
		| { error: string, code: string, message: string }> {
		try {
			await this.authService.createUser(data);
		}
		catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				//handle other errors
				if (e.code == 'P2002') {
					const message = typeof e.message.split(/\r?\n/).pop() === 'string' ?
						e.message.split(/\r?\n/).pop() as string : "duplicate key";
					return ({
						"error": "Cannot create User",
						"code": "P2002",
						"message": message
					});
				}
				else 
					console.log(e);
			}
			else {
				throw e
			}
			return ({ "message": "yenecomprendspas"});
		}
		return ({
			"message": 'Registered successfully'
		});
	}

	@Post('login')
	LoginUser(
		@Body() data: LoginUserDto) {
		return this.authService.LoginUser(data.login, data.password);
	}

	@Post('refresh')
	RefreshToken(
		@Body('access_token') access_token: string) {
		return this.authService.RefreshToken(access_token);
	}
}
