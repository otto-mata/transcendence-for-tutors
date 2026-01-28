import { IsString, IsOptional, IsNumber, IsEmail, IsUrl } from 'class-validator';

export class FortyTwoUserDto {
	@IsNumber()
	id: number;

	@IsEmail()
	email: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	login: string;

	@IsUrl()
	@IsOptional()
	picture?: string;

	@IsString()
	provider: string;
}

export class FortyTwoVerifyTokenDto {
	@IsString()
	access_token: string;
}

export class FortyTwoVerifyResponseDto {
	success: boolean;
	payload?: any;
	error?: string;
	message?: string;
}

export class FortyTwoAuthResponseDto {
	access_token: string;
	user?: {
		id: string;
		username: string;
		email: string;
		displayName?: string;
		avatarUrl?: string;
	};
}

export class FortyTwoApiProfileDto {
	@IsNumber()
	id: number;

	@IsEmail()
	email: string;

	@IsString()
	login: string;

	@IsString()
	first_name: string;

	@IsString()
	last_name: string;

	@IsOptional()
	image?: {
		link?: string;
		versions?: {
			small?: string;
			medium?: string;
			large?: string;
		};
	};
}
