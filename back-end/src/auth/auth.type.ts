export interface AuthUserRegistration {
	username: string;
	password: string;
	email: string;
	displayName: string;
	role?: 'user' | 'moderator' | 'admin';
}
