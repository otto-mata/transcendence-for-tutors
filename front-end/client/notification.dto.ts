export class UnreadCountDto {
    unreadCount : number;
}

export class NotificationResponseDto {
  id: number;
  type: string;
  message: string;
  read: boolean;
  relatedUser?: UserResponseDto;
  relatedPost?: PostResponseDto;
  createdAt: Date;
}