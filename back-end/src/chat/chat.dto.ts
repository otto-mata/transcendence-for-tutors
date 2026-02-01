import {
	IsString,
	IsEmail,
	MinLength,
	MaxLength,
	IsOptional,
} from 'class-validator';

export class FormatMessage {
	@IsString()
	message: string;
}