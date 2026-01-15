# API DTO Documentation

This document provides a complete repository of all API endpoints with their input and output Data Transfer Objects (DTOs).

## Table of Contents

1. [Auth Endpoints](#auth-endpoints)
2. [User Endpoints](#user-endpoints)
3. [Post Endpoints](#post-endpoints)
4. [Comment Endpoints](#comment-endpoints)
5. [Follow Endpoints](#follow-endpoints)
6. [Report Endpoints](#report-endpoints)
7. [Media Endpoints](#media-endpoints)
8. [Notification Endpoints](#notification-endpoints)

---

## Auth Endpoints

### Register User
- **Route:** `POST /auth/register`
- **Input DTO:** `CreateUserDto`
  ```typescript
  {
    username: string;           // 3-50 chars, required
    email: string;              // valid email, required
    password: string;           // 8-100 chars, required
    displayName?: string;       // 0-100 chars, optional
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    message: string;
    code?: string;
    error?: string;
  }
  ```

### Login User
- **Route:** `POST /auth/login`
- **Input DTO:** `LoginDto`
  ```typescript
  {
    username: string;           // 3-50 chars, required
    password: string;           // 8-100 chars, required
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    access_token: string;
    refresh_token?: string;
    user?: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  }
  ```

### Refresh Token
- **Route:** `POST /auth/refresh`
- **Input DTO:** `RefreshTokenDto`
  ```typescript
  {
    token: string;              // JWT refresh token, required
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    access_token: string;
    refresh_token?: string;
  }
  ```

### Verify Email
- **Route:** `POST /auth/verify-email`
- **Input DTO:** `VerifyEmailDto`
  ```typescript
  {
    token: string;              // Email verification token, required
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    message: string;            // "Email verified successfully"
  }
  ```

### Resend Verification Email
- **Route:** `POST /auth/resend-verification`
- **Input DTO:** `ResendVerificationDto`
  ```typescript
  {
    email: string;              // valid email, required
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    message: string;            // "Verification email sent"
  }
  ```

### Forgot Password
- **Route:** `POST /auth/forgot-password`
- **Input DTO:** `ForgotPasswordDto`
  ```typescript
  {
    email: string;              // valid email, required
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    message: string;            // "Password reset email sent"
  }
  ```

### Reset Password
- **Route:** `POST /auth/reset-password`
- **Input DTO:** `ResetPasswordDto`
  ```typescript
  {
    token: string;              // Password reset token, required
    newPassword: string;        // 8-100 chars, required
  }
  ```
- **Output DTO:** `AuthResponseDto`
  ```typescript
  {
    message: string;            // "Password reset successfully"
  }
  ```

---

## User Endpoints

### Get All Users
- **Route:** `GET /users`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
    search?: string;            // optional
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<UserResponseDto>`
  ```typescript
  {
    data: UserResponseDto[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }
  ```

### Get Suggested Users
- **Route:** `GET /users/suggested`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<UserResponseDto>`

### Get User by Username
- **Route:** `GET /users/:username`
- **Input DTO:** None
- **Output DTO:** `UserResponseDto`
  ```typescript
  {
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
  ```

### Get Current User Profile
- **Route:** `GET /users/me`
- **Input DTO:** None
- **Output DTO:** `UserResponseDto`

### Update Current User Profile
- **Route:** `PATCH /users/me`
- **Input DTO:** `UpdateUserDto`
  ```typescript
  {
    displayName?: string;       // 0-100 chars, optional
    bio?: string;               // 0-500 chars, optional
    avatar?: string;            // URL format, optional
    coverImage?: string;        // URL format, optional
  }
  ```
- **Output DTO:** `UserResponseDto`

### Upload User Avatar
- **Route:** `PATCH /users/me/avatar`
- **Input:** Multipart form-data with `file` field
- **Output DTO:** `UserResponseDto`

### Upload User Cover Image
- **Route:** `PATCH /users/me/cover`
- **Input:** Multipart form-data with `file` field
- **Output DTO:** `UserResponseDto`

### Change Password
- **Route:** `PATCH /users/me/password`
- **Input DTO:** `ChangePasswordDto`
  ```typescript
  {
    currentPassword: string;    // required
    newPassword: string;        // 8-100 chars, required
  }
  ```
- **Output DTO:** `ApiResponseDto<{ message: string }>`
  ```typescript
  {
    message: string;            // "Password changed successfully"
  }
  ```

### Change Email
- **Route:** `PATCH /users/me/email`
- **Input DTO:** `ChangeEmailDto`
  ```typescript
  {
    newEmail: string;           // valid email, required
    password: string;           // required
  }
  ```
- **Output DTO:** `UserResponseDto`

### Update User Preferences
- **Route:** `PATCH /users/me/preferences`
- **Input DTO:** `UpdatePreferencesDto`
  ```typescript
  {
    theme?: string;             // "light" | "dark", optional
    language?: string;          // language code, optional
    emailNotifications?: boolean; // optional
    pushNotifications?: boolean;  // optional
  }
  ```
- **Output DTO:** `UserResponseDto`

### Get User Followers
- **Route:** `GET /users/:username/followers`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<UserResponseDto>`

### Get User Following
- **Route:** `GET /users/:username/following`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<UserResponseDto>`

### Get User Bookmarks
- **Route:** `GET /users/me/bookmarks`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`

### Block User
- **Route:** `POST /users/:id/block`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`
  ```typescript
  {
    message: string;            // "User blocked"
  }
  ```

### Unblock User
- **Route:** `DELETE /users/:id/block`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Mute User
- **Route:** `POST /users/:id/mute`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`
  ```typescript
  {
    message: string;            // "User muted"
  }
  ```

### Unmute User
- **Route:** `DELETE /users/:id/mute`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Get User Analytics (Admin)
- **Route:** `GET /users/admin/analytics`
- **Query Parameters:**
  ```typescript
  {
    userId?: string;
    startDate?: string;         // ISO date format
    endDate?: string;           // ISO date format
  }
  ```
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<AnalyticsDto>`

### Delete User (Admin)
- **Route:** `DELETE /users/:id`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

---

## Post Endpoints

### Get All Posts
- **Route:** `GET /posts`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`
  ```typescript
  {
    data: PostResponseDto[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }
  ```

### Get User Feed
- **Route:** `GET /posts/feed`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`

### Get Trending Posts
- **Route:** `GET /posts/trending`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`

### Get Latest Posts
- **Route:** `GET /posts/latest`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`

### Get Posts by Hashtag
- **Route:** `GET /posts/hashtag/:tag`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`

### Get Post by ID
- **Route:** `GET /posts/:id`
- **Input DTO:** None
- **Output DTO:** `PostResponseDto`
  ```typescript
  {
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
  ```

### Get Post Thread
- **Route:** `GET /posts/:id/thread`
- **Input DTO:** None
- **Output DTO:** `PostResponseDto`

### Create Post
- **Route:** `POST /posts`
- **Input DTO:** `CreatePostDto`
  ```typescript
  {
    content: string;            // 1-280 chars, required
    media?: string[];           // optional URLs
    isReply?: boolean;          // optional
    isRepost?: boolean;         // optional
  }
  ```
- **Output DTO:** `PostResponseDto`

### Like Post
- **Route:** `POST /posts/:id/like`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`
  ```typescript
  {
    message: string;            // "Post liked"
  }
  ```

### Unlike Post
- **Route:** `DELETE /posts/:id/like`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Get Post Likes
- **Route:** `GET /posts/:id/likes`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<UserResponseDto[]>`

### Bookmark Post
- **Route:** `POST /posts/:id/bookmark`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`
  ```typescript
  {
    message: string;            // "Post bookmarked"
  }
  ```

### Remove Bookmark
- **Route:** `DELETE /posts/:id/bookmark`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Share/Repost
- **Route:** `POST /posts/:id/share`
- **Input DTO:** None
- **Output DTO:** `PostResponseDto`

### Delete Share/Repost
- **Route:** `DELETE /posts/:id/share`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Get Shares/Reposts
- **Route:** `GET /posts/:id/shares`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<PostResponseDto[]>`

### Record View
- **Route:** `POST /posts/:id/view`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Get Post Replies
- **Route:** `GET /posts/:id/replies`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<PostResponseDto>`

### Reply to Post
- **Route:** `POST /posts/:id/reply`
- **Input DTO:** `CreatePostDto`
- **Output DTO:** `PostResponseDto`

### Update Post
- **Route:** `PATCH /posts/:id`
- **Input DTO:** `UpdatePostDto`
  ```typescript
  {
    content?: string;           // 1-280 chars, optional
    media?: string[];           // optional URLs
  }
  ```
- **Output DTO:** `PostResponseDto`

### Delete Post
- **Route:** `DELETE /posts/:id`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<PostResponseDto>`

---

## Comment Endpoints

### Get Comments for Post
- **Route:** `GET /posts/:postId/comments`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<CommentResponseDto>`
  ```typescript
  {
    data: CommentResponseDto[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }
  ```

### Get Comment by ID
- **Route:** `GET /posts/:postId/comments/:id`
- **Input DTO:** None
- **Output DTO:** `CommentResponseDto`
  ```typescript
  {
    id: string;
    content: string;
    author: UserResponseDto;
    post: PostResponseDto;
    likes: number;
    replies: number;
    liked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  ```

### Create Comment
- **Route:** `POST /posts/:postId/comments`
- **Input DTO:** `CreateCommentDto`
  ```typescript
  {
    content: string;            // 1-500 chars, required
  }
  ```
- **Output DTO:** `CommentResponseDto`

### Reply to Comment
- **Route:** `POST /posts/:postId/comments/:id/reply`
- **Input DTO:** `CreateCommentDto`
- **Output DTO:** `CommentResponseDto`

### Update Comment
- **Route:** `PATCH /posts/:postId/comments/:id`
- **Input DTO:** `UpdateCommentDto`
  ```typescript
  {
    content?: string;           // 1-500 chars, optional
  }
  ```
- **Output DTO:** `CommentResponseDto`

### Delete Comment
- **Route:** `DELETE /posts/:postId/comments/:id`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Like Comment
- **Route:** `POST /posts/:postId/comments/:id/like`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Unlike Comment
- **Route:** `DELETE /posts/:postId/comments/:id/like`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

---

## Follow Endpoints

### Get User Followers
- **Route:** `GET /users/:username/followers`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<UserResponseDto>`

### Get User Following
- **Route:** `GET /users/:username/following`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<UserResponseDto>`

### Check Relationship Status
- **Route:** `GET /users/:username/relationship`
- **Input DTO:** None
- **Output DTO:** `RelationshipStatusDto`
  ```typescript
  {
    isFollowing: boolean;
    isFollowedBy: boolean;
    isBlocked: boolean;
    isMuted: boolean;
  }
  ```

### Follow User
- **Route:** `POST /users/:id/follow`
- **Input DTO:** None
- **Output DTO:** `FollowResponseDto`
  ```typescript
  {
    message: string;            // "User followed"
  }
  ```

### Unfollow User
- **Route:** `DELETE /users/:id/follow`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

---

## Report Endpoints

### Get My Reports
- **Route:** `GET /reports/me`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<ReportResponseDto>`

### Get All Reports (Admin)
- **Route:** `GET /reports/admin/reports`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
    status?: string;            // optional filter
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<ReportResponseDto>`
  ```typescript
  {
    data: ReportResponseDto[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }
  ```

### Get Report by ID (Admin)
- **Route:** `GET /reports/admin/:id`
- **Input DTO:** None
- **Output DTO:** `ReportResponseDto`
  ```typescript
  {
    id: string;
    reason: string;
    description?: string;
    status: "pending" | "reviewed" | "resolved";
    reporter: UserResponseDto;
    user?: UserResponseDto;
    post?: PostResponseDto;
    comment?: CommentResponseDto;
    createdAt: Date;
    updatedAt: Date;
  }
  ```

### Report User
- **Route:** `POST /reports/users/:id`
- **Input DTO:** `CreateReportDto`
  ```typescript
  {
    reason: string;             // required
    description?: string;       // optional
  }
  ```
- **Output DTO:** `ReportResponseDto`

### Report Post
- **Route:** `POST /reports/posts/:id`
- **Input DTO:** `CreateReportDto`
- **Output DTO:** `ReportResponseDto`

### Report Comment
- **Route:** `POST /reports/comments/:id`
- **Input DTO:** `CreateReportDto`
- **Output DTO:** `ReportResponseDto`

### Update Report Status (Admin)
- **Route:** `PATCH /reports/admin/:id/status`
- **Input DTO:** `UpdateReportStatusDto`
  ```typescript
  {
    status: "pending" | "reviewed" | "resolved"; // required
    adminNotes?: string;        // optional
  }
  ```
- **Output DTO:** `ReportResponseDto`

### Suspend User (Admin)
- **Route:** `POST /reports/admin/users/:id/suspend`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Unsuspend User (Admin)
- **Route:** `POST /reports/admin/users/:id/unsuspend`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Verify User (Admin)
- **Route:** `POST /reports/admin/users/:id/verify`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Delete Content (Admin)
- **Route:** `DELETE /reports/admin/content/:id`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

---

## Media Endpoints

### Upload Media
- **Route:** `POST /media/upload`
- **Input:** Multipart form-data with `file` field
- **Output DTO:** `MediaUploadResponseDto`
  ```typescript
  {
    id: string;
    url: string;
    mediaType: string;
    size: number;
    uploadedAt: Date;
  }
  ```

### Get Media by ID
- **Route:** `GET /media/:id`
- **Input DTO:** None
- **Output DTO:** `MediaUrlDto`
  ```typescript
  {
    id: string;
    url: string;
    mediaType: string;
  }
  ```

### Delete Media
- **Route:** `DELETE /media/:id`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

---

## Notification Endpoints

### Get Notifications
- **Route:** `GET /notifications`
- **Query Parameters:**
  ```typescript
  {
    page?: number;              // default: 1
    limit?: number;             // default: 20
  }
  ```
- **Input DTO:** None
- **Output DTO:** `PaginatedResponseDto<NotificationResponseDto>`
  ```typescript
  {
    data: NotificationResponseDto[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }
  ```

### Get Unread Count
- **Route:** `GET /notifications/unread`
- **Input DTO:** None
- **Output DTO:** `UnreadCountDto`
  ```typescript
  {
    unreadCount: number;
  }
  ```

### Mark Notification as Read
- **Route:** `PATCH /notifications/:id/read`
- **Input DTO:** None
- **Output DTO:** `NotificationResponseDto`
  ```typescript
  {
    id: number;
    type: string;
    message: string;
    read: boolean;
    relatedUser?: UserResponseDto;
    relatedPost?: PostResponseDto;
    createdAt: Date;
  }
  ```

### Mark All as Read
- **Route:** `PATCH /notifications/read-all`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Delete Notification
- **Route:** `DELETE /notifications/:id`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

### Delete All Notifications
- **Route:** `DELETE /notifications`
- **Input DTO:** None
- **Output DTO:** `ApiResponseDto<{ message: string }>`

---

## Common DTOs

### PaginationDto
```typescript
{
  page: number;                 // current page
  limit: number;                // items per page
}
```

### PaginatedResponseDto<T>
```typescript
{
  data: T[];                    // array of items
  page: number;                 // current page
  limit: number;                // items per page
  total: number;                // total items count
  hasMore: boolean;             // whether more items exist
}
```

### ApiResponseDto<T>
```typescript
{
  message?: string;
  data?: T;
  error?: string;
  statusCode?: number;
}
```

### IdParamDto
```typescript
{
  id: string;                   // resource ID
}
```

### UsernameParamDto
```typescript
{
  username: string;             // user username
}
```

---

## Authentication

All endpoints except those in the **Auth Endpoints** section require authentication.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

The JWT token is obtained from the login endpoint and should be included in all subsequent requests.

---

## Error Responses

All endpoints may return error responses in the following format:

```typescript
{
  error: string;
  message: string;
  statusCode: number;
}
```

### Common HTTP Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Authentication required or failed
- **403 Forbidden** - Access denied
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource already exists or conflict detected
- **500 Internal Server Error** - Server error

