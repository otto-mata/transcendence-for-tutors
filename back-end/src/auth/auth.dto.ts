import {
	IsString,
	IsEmail,
	MinLength,
	MaxLength,
	IsOptional,
} from 'class-validator';

export class RegisterDto {
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	password: string;

	@IsString()
	@MaxLength(100)
	@IsOptional()
	displayName?: string;
}

export class LoginDto {
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	username: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	password: string;
}

export class LoginUserDto {
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	username: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	password: string;
}

export class CreateUserDto {
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	password: string;

	@IsString()
	@MaxLength(100)
	@IsOptional()
	displayName: string;
}

export class RefreshTokenDto {
	@IsString()
	token: string;
}

export class AuthResponseDto {
	access_token: string;
	refresh_token?: string;
	user?: {
		id: string;
		username: string;
		email: string;
		role: string;
	};
}

export class LoginResponseDto {
	access_token: string;
	refresh_token?: string;
	user: {
		id: string;
		username: string;
		email: string;
		displayName?: string;
		role: string;
		isVerified: boolean;
		isSuspended: boolean;
	};
}

export class RegisterResponseDto {
	message: string;
	code?: string;
	error?: string;
	user?: {
		id: string;
		username: string;
		email: string;
	};
}

export class VerifyEmailDto {
	@IsString()
	token: string;
}

export class VerifyEmailResponseDto {
	message: string;
	success: boolean;
}

export class ForgotPasswordDto {
	@IsEmail()
	email: string;
}

export class ForgotPasswordResponseDto {
	message: string;
	success: boolean;
}

export class ResetPasswordDto {
	@IsString()
	token: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	newPassword: string;
}

export class ResetPasswordResponseDto {
	message: string;
	success: boolean;
}

export class ResendVerificationDto {
	@IsEmail()
	email: string;
}

// OAuth DTOs
export class OAuthCallbackDto {
	@IsString()
	code: string;

	@IsString()
	@IsOptional()
	state?: string;
}

export class OAuthTokenDto {
	@IsString()
	token: string;

	@IsString()
	provider: string; // 'google', 'fortytwo'
}

export class OAuthResponseDto {
	access_token: string;
	user: {
		id: string;
		username: string;
		email: string;
		displayName?: string;
		avatarUrl?: string;
	}
}

export class ResendVerificationResponseDto {
	message: string;
	success: boolean;
}

export class LogoutResponseDto {
	message: string;
	success: boolean;
}
