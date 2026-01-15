// import {  } from 'class-validator';
import { UserResponseDto } from '@/user/user.dto';

export class PostResponseDto {
  id: string;
  content: string;
  author: UserResponseDto;
  likes: number;
  replies: number;
  shares: number;
  views: number;
  liked: boolean;
  bookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}