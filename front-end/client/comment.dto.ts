export class CommentResponseDto {
  id: number;
  content: string;
  author: UserResponseDto;
  post: PostResponseDto;
  likes: number;
  replies: number;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

