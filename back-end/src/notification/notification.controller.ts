import { Notification, Prisma } from '@gen/client';
import { Controller, Get, Post, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Controller('notification')
export class NotificationController {
	constructor(private readonly prisma: PrismaService) { }

	@Get()
	async getAll(): Promise<Notification[]> {
		return this.prisma.notification.findMany({ orderBy: { createdAt: 'desc' } });
	}

	@Post()
	async create(@Body() body: { title?: string; message: string; type?: string; meta?: any }): Promise<Notification> {
		const { title, message, type, meta } = body;
		const normalizedMeta = meta === null ? Prisma.JsonNull : meta;
		return this.prisma.notification.create({ data: { title, message, type, meta: normalizedMeta } });
	}

	// Helper endpoint to insert sample notification into the DB for testing.
	// Call with: POST /notification/seed
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

	@Patch(':id/read')
	async setRead(@Param('id') id: string, @Body() body: { read: boolean }): Promise<Notification> {
		const nid = Number(id);
		const existing = await this.prisma.notification.findUnique({ where: { id: nid } });
		if (!existing) throw new NotFoundException('Notification not found');
		return this.prisma.notification.update({ where: { id: nid }, data: { read: body.read } });
	}
}
