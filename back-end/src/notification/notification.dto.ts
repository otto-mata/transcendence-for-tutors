import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	message: string;

	@IsString()
	@IsOptional()
	type?: string; // 'system' | 'message' | 'like' | 'comment' | 'follow' | 'mention'

	@IsObject()
	@IsOptional()
	meta?: any;
}

export class UpdateNotificationDto {
	@IsBoolean()
	@IsOptional()
	read?: boolean;
}

export class NotificationResponseDto {
	id: number;
	title?: string;
	message: string;
	type?: string;
	meta?: any;
	read: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export class PaginatedNotificationsDto {
	data: NotificationResponseDto[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export class UnreadCountDto {
	unreadCount: number;
}
