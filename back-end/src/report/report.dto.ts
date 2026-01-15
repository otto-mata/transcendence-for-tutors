import { IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
	@IsString()
	reason: string;

	@IsString()
	@IsOptional()
	description?: string;
}

export class UpdateReportStatusDto {
	@IsString()
	status: string; // 'pending' | 'reviewed' | 'resolved' | 'dismissed'
}

export class ReportResponseDto {
	id: string;
	reporterId: string;
	reason: string;
	description?: string;
	status: string;
	userId?: string;
	postId?: string;
	commentId?: string;
	createdAt: Date;
	updatedAt: Date;
}

export class PaginatedReportsDto {
	data: ReportResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
