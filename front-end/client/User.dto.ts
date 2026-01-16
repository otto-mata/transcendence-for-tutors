
import { PostDto } from "./Post.dto";

export interface UserDto {
  id: string;
  username: string;
  displayName: string;
  email: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl?: string;
	website?: string;
	isVerified: boolean;
	isPrivate: boolean;
	isActive: boolean;
	isSuspended: boolean;
	role: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	createdAt: Date;
  posts: PostDto[];
}
