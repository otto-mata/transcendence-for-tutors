//create verification for teh paramters given. For exemple
//age must be positive, email must be a working email
//verify If there ain't alreadyt something doing it
//still can be used to do some "CreateUserVerif" for exemple
//rajouter une verification que le user existe pas deja ? Est ce que la protectrion est deja faite au niveau de prisma ? mhhh
//
import { IsEmail, IsInt, Min, Max, Length } from 'class-validator';

export class LoginUserDto {
  @Length(3, 50)
  login: string;

  @Length(8, 100)
  password: string;
}

export class CreateUserDto {
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsEmail()
  email: string;

  @Length(8, 100)
  password: string;

  @Length(3, 20)
  login: string;

  @Length(4, 25)
  display_name: string;
}

export class ResetPasswordDto {
	@Length(8, 100)
	newPassword: string;

	access_token:string;
}

export class AuthResponseDto {
  message: string;
  code?: string;
  error?: string;
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
