//create verification for teh paramters given. For exemple
//age must be positive, email must be a working email
//verify If there ain't alreadyt something doing it
//still can be used to do some "CreateUserVerif" for exemple
//rajouter une verification que le user existe pas deja ? Est ce que la protectrion est deja faite au niveau de prisma ? mhhh
//
import {
  IsEmail,
  IsInt,
  Min,
  Max,
  Length
} from 'class-validator';

export class LoginUserDto {
  @Length(4, 20)
  username: string;

  @Length(8, 30)
  passwordHash: string;
}

export class CreateUserDto {
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsEmail()
  email: string;

  @Length(8, 30)
  passwordHash: string;


  @Length(4, 20)
  username: string;

  @Length(4, 25)
  displayName: string;
}



