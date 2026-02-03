export interface ChatUserDto{
		id : string;
		username : string;
		avatarUrl? : string;
	}

export interface ChatDto{
	id : string,
	users : ChatUserDto[],
	messages : [
		{
			id : string;
			message : string;
			createdAt : Date;
			senderID : string;
		}
	];
	unread ? : boolean;

}