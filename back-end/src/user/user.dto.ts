import {
	IsBoolean,
	IsEmail,
	IsOptional,
	IsString,
	IsUrl,
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	passwordHash: string;

	@IsString()
	@IsOptional()
	displayName?: string;

	@IsString()
	@IsOptional()
	bio?: string;
}

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	displayName?: string;

	@IsString()
	@IsOptional()
	bio?: string;

	@IsBoolean()
	@IsOptional()
	isPrivate?: boolean;

	@IsUrl()
	@IsOptional()
	avatarUrl?: string;

	@IsUrl()
	@IsOptional()
	coverImageUrl?: string;
}

export class UpdatePreferencesDto {
	@IsString()
	@IsOptional()
	theme?: string; // 'light' | 'dark' | 'auto'

	@IsString()
	@IsOptional()
	language?: string; // 'en' | 'fr' | 'es' | etc.
}

export class ChangePasswordDto {
	@IsString()
	currentPassword: string;

	@IsString()
	newPassword: string;
}

export class ChangeEmailDto {
	@IsEmail()
	newEmail: string;

	@IsString()
	password: string;
}

export class UserResponseDto {
	id: string;
	username: string;
	email: string;
	displayName?: string;
	bio?: string;
	avatarUrl?: string;
	coverImageUrl?: string;
	isVerified: boolean;
	isPrivate: boolean;
	isActive: boolean;
	followerCount: number;
	followingCount: number;
	postCount: number;
	createdAt: Date;
}
