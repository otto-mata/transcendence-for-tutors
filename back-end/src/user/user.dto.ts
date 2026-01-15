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

	@IsString()
	@IsOptional()
	website?: string;

	@IsBoolean()
	@IsOptional()
	isPrivate?: boolean;

	@IsUrl()
	@IsOptional()
	avatarUrl?: string;

	@IsUrl()
	@IsOptional()
	coverImageUrl?: string;

	@IsString()
	@IsOptional()
	locationName?: string;

	@IsString()
	@IsOptional()
	twitterUrl?: string;

	@IsString()
	@IsOptional()
	instagramUrl?: string;

	@IsString()
	@IsOptional()
	linkedinUrl?: string;

	@IsString()
	@IsOptional()
	githubUrl?: string;
}

export class UpdatePreferencesDto {
	@IsString()
	@IsOptional()
	theme?: string; // 'light' | 'dark' | 'auto'

	@IsString()
	@IsOptional()
	language?: string; // 'en' | 'fr' | 'es' | etc.

	@IsBoolean()
	@IsOptional()
	emailNotifications?: boolean;

	@IsBoolean()
	@IsOptional()
	pushNotifications?: boolean;
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
	website?: string;
	isVerified: boolean;
	isPrivate: boolean;
	isActive: boolean;
	isSuspended: boolean;
	role: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	createdAt: Date;
}
