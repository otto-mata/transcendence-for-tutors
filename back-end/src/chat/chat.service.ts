import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CurrentUserType } from '@/decorators/current-user.decorator';
import { MessageDelegate } from 'prisma/generated/models';

@Injectable()
export class ChatService {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	async createMessage(sender: CurrentUserType, sending: string, _message: string): Promise<void> {
		const recipient = await this.prisma.user.findUnique({
			where: { username: sending },
		});
		if (!recipient) {
			throw new NotFoundException('User not found');
		}
		console.log(recipient);
		const existingChat = await this.prisma.chat.findFirst({
			where: {
				AND: [
					{ users: { some: { id: sender.id } } },
					{ users: { some: { id: recipient.id } } },
				],
			},
		});

		const chat =
			existingChat ??
			(await this.prisma.chat.create({
				data: {
					users: {
						connect: [{ id: sender.id }, { id: recipient.id }],
					},
				},
			}));

		return this.prisma.message.create({
			data: {
				message: _message,
				chatId: chat.id,
				senderId: sender.id,
			},
		});
	}

	async getMessages(sender: CurrentUserType, sending: string, x: number, y: number): Promise<MessageDelegate> {
		const recipient = await this.prisma.user.findUnique({
			where: { username: sending },
		});
		if (!recipient) {
			throw new NotFoundException('User not found');
		}

		const chat = await this.prisma.chat.findFirst({
			where: {
				AND: [
					{ users: { some: { id: sender.id } } },
					{ users: { some: { id: recipient.id } } },
				],
			},
		});
		if (!chat) throw new NotFoundException('Chat not found');

		const messages = await this.prisma.message.findMany({
			where: { chatId: chat.id },
			orderBy: { createdAt: 'desc' },
			skip: x,
			take: y,
			include: {
				sender: { select: { id: true, username: true, avatarUrl: true } },
			},
		});
		return (messages);
	}
}
