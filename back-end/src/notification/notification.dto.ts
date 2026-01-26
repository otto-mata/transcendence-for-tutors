import {
	IsString,
	IsOptional,
	IsObject,
	IsBoolean,
	IsNumber,
} from 'class-validator';

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
	relatedUserId?: string;
	relatedPostId?: string;
	relatedCommentId?: string;
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

export class NotificationMarkReadResponseDto {
	message: string;
	success: boolean;
	notification?: NotificationResponseDto;
}

export class NotificationMarkAllReadResponseDto {
	message: string;
	success: boolean;
	markedCount: number;
}

export class NotificationDeleteResponseDto {
	message: string;
	success: boolean;
}

export class NotificationMetadataDto {
	type: string;
	relatedEntityId?: string;
	relatedEntityType?: string; // 'post' | 'comment' | 'user'
	actionType: string;
}

export class NotificationTriggerDto {
	userId: string;
	type: string; // notification type
	message: string;
	relatedUserId?: string;
	relatedPostId?: string;
	relatedCommentId?: string;
	meta?: any;
}

export class NotificationPreferenceDto {
	likeNotifications: boolean;
	commentNotifications: boolean;
	followNotifications: boolean;
	mentionNotifications: boolean;
	messageNotifications: boolean;
}

export class NotificationCountDto {
	total: number;
	unread: number;
}
