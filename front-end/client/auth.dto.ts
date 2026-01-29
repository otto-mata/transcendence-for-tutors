
export class RegisterDto {
  login         : string;
  password      : string;
  email         : string;
  display_name  : string;
  age           : numbe;
}

export class LoginResponseDto {
  access_token: string;
  refresh_token?: string;
  code?: string;
  error?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export class AuthResponseDto {
  access_token: string;
  refresh_token?: string;
}

export class LoginDto {
  login : string;
  password : string;
}

export LoginResponseDto as RefreshResponse;


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

// Verify email
export interface VerifyEmailDto {
	token: string;
}

export interface VerifyEmailResponseDto {
	message: string;
}

// 42 oauth
export interface FortyTwoVerifyTokenDto {
	access_token: string;
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
