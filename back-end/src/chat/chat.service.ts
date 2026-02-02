import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CurrentUserType } from '@/decorators/current-user.decorator';
import { ChatDelegate, MessageDelegate } from 'prisma/generated/models';
import { Chat, Message } from '$prisma';

@Injectable()
export class ChatService {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	async createMessage(sender: CurrentUserType, sending: string, _message: string) {
		const recipient = await this.prisma.user.findUnique({
			where: { username: sending },
		});
		if (!recipient) {
			throw new NotFoundException('User not found');
		}
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

		return await this.prisma.message.create({
			data: {
				message: _message,
				chatId: chat.id,
				senderId: sender.id,
			},
		});
	}

	async getMessages(sender: CurrentUserType, sending: string, x: number, y: number): Promise<Message[]> {
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
		return (messages.reverse());
	}

	async getUserChatList(sender: CurrentUserType, x: number, y: number) : Promise<Chat[]> {
		const chats = await this.prisma.chat.findMany({
			where: {
				users: {
					some: { id: sender.id },
				},
			},
			skip: x,
			take: y,
			include: {
				users: {where : {
					id : {not : sender.id }
				}},
				messages: {
					take: 1,
					orderBy: { createdAt: 'desc' },
					select: {
						id: true,
						message: true,
						createdAt: true,
						senderId: true,
					},
				},
			},
		});
		return (chats);
	}

	async getUserChatList(sender: CurrentUserType, x: number, y: number) : Promise<Chat[]> {
		const chats = await this.prisma.chat.findMany({
			where: {
				users: {
					some: { id: sender.id },
				},
			},
			skip: x,
			take: y,
			include: {
				users: {
					select: {
						id: true,
						username: true,
						avatarUrl: true,
					},
				},
				messages: {
					take: 1,
					orderBy: { createdAt: 'desc' },
					select: {
						id: true,
						message: true,
						createdAt: true,
						senderId: true,
					},
				},
			},
		});
		return (chats);
	}
}
