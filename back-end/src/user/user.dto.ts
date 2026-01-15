import { IsEmail, IsInt, Min, Max, Length } from 'class-validator';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  verified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaginateResponseDto<ResponseType> {
  data: ResponseType[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export class ChangePasswordDto {
  currentPassword: string;

  @Length(8, 30)
  newPassword: string;
}

export class ChangeEmailDto {
  password: string;

  @IsEmail()
  newEmail: string;
}

export class UpdatePreferencesDto {
  theme?: "light" | "dark";             // "light" | "dark", optional
  language?: string;          // language code, optional
  emailNotifications?: boolean; // optional
  pushNotifications?: boolean;  // optional
}

