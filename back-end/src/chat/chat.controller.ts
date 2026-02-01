import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, type CurrentUserType } from '@/decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { FormatMessage } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
	constructor(private readonly chatService: ChatService,
	) { }
	//Default route will return the last 5 persons and their last messages
	@Get()
	async getMessages(
		@CurrentUser() user: CurrentUserType,
	): Promise<String> {
		console.log(user);
		return (JSON.stringify({ message: "WIP" }));
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
	): Promise<String> {
		return (JSON.stringify(await this.chatService.getMessages(user, username, 0, 5)));
	}
}
