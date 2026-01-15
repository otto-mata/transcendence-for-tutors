import {
	Controller,
	Post,
	Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	CreateUserDto,
	LoginUserDto,
	ResetPasswordDto,
	AuthResponseDto,
	LoginResponseDto
} from './auth.dto';
import { ApiResponseDto } from '@/app.dto';
import { Prisma } from '@p/generated/client';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	async createUser(
		@Body() data: CreateUserDto
	): Promise<AuthResponseDto> {
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
			}
			else {
				throw e
			}
		}
		return ({
			"message": 'Registered successfully',
			"code":"Poui",
			"error":"non"
		});
	}

	@Post('login')
	LoginUser(
		@Body() data: LoginUserDto) : LoginResponseDto {
		return ({
			"access_token": "accessTok",
			"refresh_token": "refreshTok",
			"user": {
				"id": "1",
				"username": "MonUser",
				"email": "email@unmail.com",
				"role": "userRole"
			}
		});
		return this.authService.LoginUser(data.login, data.password);

	}

	@Post('refresh')
	RefreshToken(
		@Body('access_token') access_token: string) {
		return ({
			"access_token":access_token,
			"refresh_token":"refreshTok",
		});
		// return this.authService.RefreshToken(access_token);
	}

	@Post('verify-email')
	VerifyEmail(@Body('access_token') access_token: string) : ApiResponseDto {
		if (access_token === 'accessTok')
			return({"message":"Email verified successfully"});
		return ({"message":"Email verification failed"});
	}
	
	@Post('resend-verification')
	ResendVerif(@Body('email') email : string) : ApiResponseDto {
		return ({"message":"verification email sent"});
	}
	
	@Post('forgot-password')
	ForgotPassword(@Body('email') email : string) : ApiResponseDto {
		return ({"message":"verification email sent"});
	}

	@Post('reset-password')
	ResetPassword(@Body() data: ResetPasswordDto) : ApiResponseDto {
		if (data.access_token === 'accessTok')
			return ({"message":"Password reset successfully"});
		return ({"message":"Unauthorized password reset"});
	}
}
