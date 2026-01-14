import { Notification, Prisma } from '$prisma';
import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Body,
	Param,
	Query,
	HttpStatus,
	Res,
	UseGuards,
	NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import type { CurrentUserType } from '@/decorators/current-user.decorator';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
	constructor(private readonly prisma: PrismaService) { }

	@Get()
	async getNotifications(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const notifications = await this.prisma.notification.findMany({
				skip,
				take: limitNum,
				orderBy: { createdAt: 'desc' },
			});
			return JSON.stringify(notifications);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving notifications', error });
		}
	}

	@Get('unread')
	async getUnreadCount(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const count = await this.prisma.notification.count({
				where: { read: false },
			});
			return JSON.stringify({ unreadCount: count });
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error retrieving unread count', error });
		}
	}

	@Patch(':id/read')
	async markAsRead(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const nid = Number(id);
			const notification = await this.prisma.notification.update({
				where: { id: nid },
				data: { read: true },
			});
			return JSON.stringify(notification);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Notification not found', error });
		}
	}

	@Patch('read-all')
	async markAllAsRead(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.prisma.notification.updateMany({
				where: { read: false },
				data: { read: true },
			});
			return JSON.stringify({ message: 'All notifications marked as read' });
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error marking notifications as read', error });
		}
	}

	@Delete(':id')
	async deleteNotification(
		@Param('id') id: string,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const nid = Number(id);
			await this.prisma.notification.delete({
				where: { id: nid },
			});
			return JSON.stringify({ message: 'Notification deleted' });
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Notification not found', error });
		}
	}

	@Delete()
	async clearAllNotifications(
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			await this.prisma.notification.deleteMany({});
			return JSON.stringify({ message: 'All notifications cleared' });
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({ message: 'Error clearing notifications', error });
		}
	}

	// Helper endpoint for testing
	@Post('seed')
	async seedDefaults() {
		const samples = [
			{
				title: 'Welcome',
				message: 'Thanks for joining Transcendence!',
				type: 'system',
				meta: Prisma.JsonNull,
				read: false,
			},
			{
				title: 'New message',
				message: 'You have a new message from Alice.',
				type: 'message',
				meta: { from: 'alice', threadId: 42 },
				read: false,
			},
			{
				title: 'Reminder',
				message: "Don't forget to complete your profile.",
				type: 'reminder',
				meta: Prisma.JsonNull,
				read: true,
			},
		];

		const created: any[] = [];
		for (const s of samples) {
			const c = await this.prisma.notification.create({ data: s });
			created.push(c);
		}
		return created;
	}
}
