import { Type } from 'class-transformer';
import {
	IsString,
	IsOptional,
	IsInt,
	Min,
	Max,
} from 'class-validator';

export class FormatMessage {
	@IsString()
	message: string;
}

export class NumberQuery {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	page: number = 0;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	limit: number = 5;
}