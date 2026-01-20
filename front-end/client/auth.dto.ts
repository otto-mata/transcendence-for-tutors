
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
