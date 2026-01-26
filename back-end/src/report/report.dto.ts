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

	@IsString()
	@IsOptional()
	adminNotes?: string;
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

export class AdminReportDetailDto {
	id: string;
	reporterId: string;
	reporter?: {
		id: string;
		username: string;
		email: string;
	};
	reason: string;
	description?: string;
	status: string;
	userId?: string;
	postId?: string;
	commentId?: string;
	reportedUser?: {
		id: string;
		username: string;
		email: string;
		isSuspended: boolean;
	};
	reportedPost?: {
		id: string;
		content: string;
		authorId: string;
	};
	reportedComment?: {
		id: string;
		content: string;
		authorId: string;
	};
	adminNotes?: string;
	resolvedBy?: string;
	createdAt: Date;
	updatedAt: Date;
	resolvedAt?: Date;
}

export class AdminActionResponseDto {
	message: string;
	success: boolean;
	actionType: string; // 'suspend' | 'unsuspend' | 'verify' | 'delete' | 'resolve_report'
	targetId: string;
	actionTimestamp: Date;
}

export class SuspendUserDto {
	userId: string;
	reason?: string;
	durationInDays?: number;
}

export class UnsuspendUserDto {
	userId: string;
	reason?: string;
}

export class VerifyUserDto {
	userId: string;
}

export class DeleteContentDto {
	contentId: string;
	contentType: string; // 'post' | 'comment'
	reason?: string;
}

export class ReportStatisticsDto {
	totalReports: number;
	pendingReports: number;
	reviewedReports: number;
	resolvedReports: number;
	dismissedReports: number;
	topReasons: {
		reason: string;
		count: number;
	}[];
}

export class ReportableContentDto {
	id: string;
	type: string; // 'user' | 'post' | 'comment'
	createdAt: Date;
	author?: {
		id: string;
		username: string;
	};
}

export class ReportHistoryDto {
	id: string;
	reportedUserId: string;
	reportCount: number;
	reasons: string[];
	lastReportedAt: Date;
	status: string;
}
