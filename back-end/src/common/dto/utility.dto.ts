import {
	IsOptional,
	IsString,
	IsNumber,
	IsBoolean,
	IsArray,
} from 'class-validator';

export class BatchOperationDto<T> {
	ids: string[];
	operation: string;
	data?: T;
}

export class BatchResponseDto<T> {
	successful: T[];
	failed: {
		id: string;
		error: string;
	}[];
	successCount: number;
	failureCount: number;
}

export class PaginationParamsDto {
	@IsOptional()
	@IsNumber()
	page?: number;

	@IsOptional()
	@IsNumber()
	limit?: number;

	@IsOptional()
	@IsString()
	sort?: string;

	@IsOptional()
	@IsString()
	order?: 'asc' | 'desc';
}

export class FilterParamsDto {
	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsString()
	status?: string;

	@IsOptional()
	@IsArray()
	tags?: string[];

	@IsOptional()
	@IsString()
	startDate?: string;

	@IsOptional()
	@IsString()
	endDate?: string;
}

export class SortParamsDto {
	@IsOptional()
	@IsString()
	field?: string;

	@IsOptional()
	@IsString()
	order?: 'asc' | 'desc';
}

export class BulkCreateDto<T> {
	items: T[];
	skipOnError?: boolean;
}

export class BulkUpdateDto<T> {
	updates: {
		id: string;
		data: T;
	}[];
	skipOnError?: boolean;
}

export class BulkDeleteDto {
	ids: string[];
	hardDelete?: boolean;
}

export class ExportFormatDto {
	format: 'json' | 'csv' | 'xml';
	includeMetadata?: boolean;
	dateFormat?: string;
}

export class ExportResponseDto {
	data: any;
	format: string;
	exportedAt: Date;
	recordCount: number;
	filename?: string;
}

export class ImportFormatDto {
	format: 'json' | 'csv' | 'xml';
	validateOnly?: boolean;
	skipDuplicates?: boolean;
}

export class ImportResponseDto {
	imported: number;
	skipped: number;
	errors: {
		row?: number;
		error: string;
	}[];
	warnings?: string[];
	importedAt: Date;
}

export class StatusCheckDto {
	service: string;
	status: 'healthy' | 'degraded' | 'down';
	responseTime?: number;
	lastChecked: Date;
}

export class HealthCheckResponseDto {
	overall: 'healthy' | 'degraded' | 'down';
	services: StatusCheckDto[];
	timestamp: Date;
	uptime?: number;
}

export class CacheControlDto {
	@IsString()
	cacheKey: string;

	@IsOptional()
	@IsString()
	action?: 'clear' | 'refresh' | 'invalidate';

	@IsOptional()
	@IsNumber()
	ttl?: number;
}

export class CursorPaginationDto {
	@IsOptional()
	@IsString()
	cursor?: string;

	@IsOptional()
	@IsNumber()
	limit?: number;
}

export class CursorPageDto<T> {
	data: T[];
	nextCursor?: string;
	prevCursor?: string;
	hasMore: boolean;
	count: number;
}

export class WebhookEventDto {
	id: string;
	event: string;
	timestamp: Date;
	data: any;
	retryCount?: number;
}

export class WebhookPayloadDto {
	signature: string;
	payload: WebhookEventDto;
}

export class RateLimitInfoDto {
	limit: number;
	remaining: number;
	reset: Date;
	retryAfter?: number;
}
