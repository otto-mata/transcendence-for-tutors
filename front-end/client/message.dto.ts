export interface ChatUserDto{
		id : string;
		username : string;
		avatarUrl? : string;
    isOnline ? : boolean;
	}

export interface ChatDto{
	id : string,
	users : ChatUserDto[],
	messages : Message[];
	unread ? : boolean;

}


export interface ChatWindowProps {
  chat : ChatDto;
  onBack: () => void;
  showBackAlways?: boolean;
  socketRef : WebSocket | null;
  lastMessage :  Message | null;
}

export interface Message {
  id : string;
  message : string;
  createdAt : Date;
  senderId : string;  
}
