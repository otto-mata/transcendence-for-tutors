import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { CurrentUser, type CurrentUserType } from '@/decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { FormatMessage, NumberQuery } from './chat.dto';
import { ChatService } from './chat.service';
import type { Response } from 'express';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
	constructor(private readonly chatService: ChatService,
	) { }
	//Default route will return x persons and their last messages
	@Get()
	async getMessages(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<String> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 10;
			const skip = (pageNum - 1) * limitNum;
			const chats = await this.chatService.getUserChatList(user, skip, limitNum)
			return (JSON.stringify(chats));
		} 
		catch (e) {
			if (res) res.status(HttpStatus.NOT_FOUND);
			return (JSON.stringify({error: "An error occured"}));
		}
	}
	//Will save a new message to the chat between current user and the param user
	@Post('/:username')
	async createMessageByUname(
		@CurrentUser() user: CurrentUserType,
		@Param('username') username: string,
		@Body() content: FormatMessage,
		@Res({ passthrough: true }) res?: Response,
	): Promise<String> {
		try {
			if (!content) return (JSON.stringify({error : "empty string"}));
			await this.chatService.createMessage(user, username, content.message);
			return (JSON.stringify({ message: `Ok !` }));
		} catch (e) {
			return (JSON.stringify({error: "An error occured"}));
		}
	}
	//Will get x last messages
	@Get('/:username')
	async getLastMessages(
		@CurrentUser() user: CurrentUserType,
		@Param('username') username: string,
		@Query('skip') skip?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<String> {
		try {
			const toSkip = skip ? parseInt(skip) : 0;
			const limitNum = limit ? parseInt(limit) : 10;
			const chat = await this.chatService.getMessages(user, username, toSkip, limitNum);
			return (JSON.stringify(chat));
		} catch (e) {
			return (JSON.stringify({error: "cannot AccessChat", message : "no such chat"}));
		}
	}
}
