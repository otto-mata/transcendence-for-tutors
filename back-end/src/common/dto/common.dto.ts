import {
	IsOptional,
	IsString,
	IsInt,
	Min,
	IsBoolean,
	IsNumber,
} from 'class-validator';

export class PaginationDto {
	@IsInt()
	@Min(1)
	@IsOptional()
	page?: number = 1;

	@IsInt()
	@Min(1)
	@IsOptional()
	limit?: number = 20;
}

export class PaginatedResponseDto<T> {
	data: T[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class ApiResponseDto<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
	timestamp: Date;
}

export class IdParamDto {
	@IsString()
	id: string;
}

export class UsernameParamDto {
	@IsString()
	username: string;
}

export class MessageResponseDto {
	message: string;
	statusCode?: number;
}

export class SuccessResponseDto<T = any> {
	success: boolean;
	message?: string;
	data?: T;
	statusCode?: number;
	timestamp?: Date;
}

export class ErrorResponseDto {
	error: string;
	message: string;
	statusCode: number;
	timestamp?: Date;
}

export class CountResponseDto {
	count: number;
}

export class IdResponseDto {
	id: string;
}

export class ListCountDto {
	total: number;
	count: number;
}
