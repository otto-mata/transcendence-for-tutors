import { PostResponseDto } from "./Post.dto";
import { UserResponseDto } from "./profile.dto";

export interface UnreadCountDto {
    unreadCount : number;
}

export interface NotificationResponseDto {
  id: number;
  type: string;
  message: string;
  read: boolean;
  relatedUser?: UserResponseDto;
  relatedPost?: PostResponseDto;
  createdAt: Date;
}