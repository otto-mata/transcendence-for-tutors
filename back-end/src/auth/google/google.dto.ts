import { IsString, IsOptional, IsEmail, IsUrl } from 'class-validator';

/**
 * DTO représentant les données d'un utilisateur Google retournées par l'API Google
 * Les champs peuvent être undefined car le payload Google ne les garantit pas
 */
export class GoogleUserDto {
	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	firstName?: string;

	@IsString()
	@IsOptional()
	lastName?: string;

	@IsUrl()
	@IsOptional()
	picture?: string;

	@IsString()
	@IsOptional()
	accessToken?: string;

	@IsString()
	@IsOptional()
	id?: string;
}

export class GoogleTokenDto {
	@IsString()
	token: string;
}

export class GoogleAuthResponseDto {
	access_token: string;
	user?: {
		id: string;
		username: string;
		email: string;
		displayName?: string;
		avatarUrl?: string;
	};
}

export class GoogleTokenPayloadDto {
	@IsEmail()
	email?: string;

	@IsString()
	@IsOptional()
	given_name?: string;

	@IsString()
	@IsOptional()
	family_name?: string;

	@IsUrl()
	@IsOptional()
	picture?: string;

	@IsString()
	@IsOptional()
	sub?: string; // Google user ID
}

export class GoogleProfileDto {
	name: {
		givenName: string;
		familyName: string;
	};

	emails: Array<{
		value: string;
		verified?: boolean;
	}>;

	photos: Array<{
		value: string;
	}>;
}
