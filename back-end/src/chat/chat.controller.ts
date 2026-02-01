import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, type CurrentUserType } from '@/decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { FormatMessage, NumberQuery } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
	constructor(private readonly chatService: ChatService,
	) { }
	//Default route will return x persons and their last messages
	@Get()
	async getMessages(
		@CurrentUser() user: CurrentUserType,
		@Query() query: NumberQuery
	): Promise<String> {
		try {
			return (JSON.stringify(await this.chatService.getUserChatList(user, query.skip, query.take)));
		} catch (e) { }
		return (JSON.stringify({error: "An error occured"}));
	}
	//Will save a new message to the chat between current user and the param user
	@Post('/:username')
	async createMessageByUname(
		@CurrentUser() user: CurrentUserType,
		@Param('username') username: string,
		@Body() content: FormatMessage,
	): Promise<String> {
		try {
			await this.chatService.createMessage(user, username, content.message);
			return (JSON.stringify({ message: `Ok !` }));
		} catch (e) {}
		return (JSON.stringify({ error: "An error occured" }));
	}
	//Will get x last messages
	@Get('/:username')
	async getLastMessages(
		@CurrentUser() user: CurrentUserType,
		@Param('username') username: string,
		@Query() query: NumberQuery
	): Promise<String> {
		try {
			return (JSON.stringify(await this.chatService.getMessages(user, username, query.skip, query.take)));
		} catch (e) { }
		return (JSON.stringify({error: "An error occured"}));
	}
}
