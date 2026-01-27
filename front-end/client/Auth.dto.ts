export interface RegisterDto {
	username: string;
	email: string;
	password: string;
	displayName?: string;
}

export interface LoginDto {
	username: string;
	password: string;
}

// Google oauth
export interface GoogleTokenDto {
	token: string;
}

export interface GoogleAuthResponseDto {
	access_token: string;
	user?: {
		id: string;
		username: string;
		email: string;
		displayName?: string;
		avatarUrl?: string;
	};
}

// 42 oauth
export interface FortyTwoVerifyTokenDto {
	token: string;
}

export interface FortyTwoVerifyResponseDto {
	success: boolean;
	payload?: any;
	error?: string;
	message?: string;
}

export interface FortyTwoAuthResponseDto {
	access_token: string;
	user?: {
		id: string;
		username: string;
		email: string;
		displayName?: string;
		avatarUrl?: string;
	};
}
