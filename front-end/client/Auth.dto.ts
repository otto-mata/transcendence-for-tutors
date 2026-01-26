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
