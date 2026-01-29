export interface UserResponseDto {
  id: number;
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

export interface ChangePasswordDto {
  currentPassword: string;    // required
  newPassword: string;        // 8-100 chars, required
}

export interface ChangeEmailDto{
  newEmail: string;           // valid email, required
  password: string;           // required
}

export interface ChangePreferencesDto {
  theme?: string;             // "light" | "dark", optional
  language?: string;          // language code, optional
  emailNotifications?: boolean; // optional
  pushNotifications?: boolean;  // optional
}

