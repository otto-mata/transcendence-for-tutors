## 🔐 Authentication & Users

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` 🔐👤 - Logout user
- `POST /auth/refresh` 🔐👤 - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/verify-email` - Verify email address
- `POST /auth/resend-verification` - Resend verification email

### User Profile
- `GET /users/: username` - Get user profile by username
- `GET /users/:id` - Get user profile by ID
- `GET /users/me` 🔐👤 - Get current user profile
- `PATCH /users/me` 🔐👤 - Update current user profile
- `DELETE /users/me` 🔐👤 - Delete current user account
- `PATCH /users/me/avatar` 🔐👤 - Upload/update avatar
- `PATCH /users/me/cover` 🔐👤 - Upload/update cover image
- `PATCH /users/me/password` 🔐👤 - Change password
- `PATCH /users/me/email` 🔐👤 - Change email
- `GET /users/me/preferences` 🔐👤 - Get user preferences
- `PATCH /users/me/preferences` 🔐👤 - Update user preferences

### User Discovery
- `GET /users` - Search/list users (with filters)
- `GET /users/suggested` 🔐 - Get suggested users to follow
- `GET /users/verified` - Get verified users
- `GET /users/: username/exists` - Check if username exists

## 🔐 Posts

### Post CRUD
- `GET /posts` - Get posts feed (public posts)
- `GET /posts/: id` - Get single post by ID
- `POST /posts` 🔐 - Create new post
- `PATCH /posts/:id` 🔐👤 - Update post (own posts only)
- `DELETE /posts/:id` 🔐👤 - Delete post (own posts only)

### Post Feeds
- `GET /posts/feed` 🔐👤 - Get personalized feed (following + recommended)
- `GET /posts/timeline` 🔐👤 - Get timeline (only following)
- `GET /posts/trending` - Get trending posts
- `GET /posts/latest` - Get latest posts
- `GET /users/:username/posts` - Get user's posts
- `GET /users/:username/posts/media` - Get user's posts with media
- `GET /users/:username/likes` - Get posts liked by user
- `GET /users/me/posts` 🔐👤 - Get current user's posts

### Post Interactions
- `POST /posts/:id/like` 🔐 - Like a post
- `DELETE /posts/:id/like` 🔐 - Unlike a post
- `GET /posts/:id/likes` - Get users who liked post
- `POST /posts/:id/bookmark` 🔐👤 - Bookmark a post
- `DELETE /posts/:id/bookmark` 🔐👤 - Remove bookmark
- `GET /users/me/bookmarks` 🔐👤 - Get bookmarked posts
- `POST /posts/:id/share` 🔐 - Share/repost a post
- `DELETE /posts/:id/share` 🔐 - Delete repost
- `GET /posts/:id/shares` - Get reposts of a post
- `POST /posts/:id/view` - Record post view (can be anonymous)

### Post Replies
- `GET /posts/:id/replies` - Get replies to a post
- `POST /posts/:id/reply` 🔐 - Reply to a post
- `GET /posts/:id/thread` - Get full conversation thread

### Hashtags & Search
- `GET /posts/hashtag/:tag` - Get posts by hashtag
- `GET /hashtags/trending` - Get trending hashtags
- `GET /posts/search` - Search posts by content

## 🔐 Comments

### Comment CRUD
- `GET /posts/:postId/comments` - Get comments for a post
- `GET /comments/:id` - Get single comment
- `POST /posts/:postId/comments` 🔐 - Create comment on post
- `PATCH /comments/:id` 🔐👤 - Update comment (own comments only)
- `DELETE /comments/:id` 🔐👤 - Delete comment (own comments only)

### Comment Interactions
- `POST /comments/:id/like` 🔐 - Like a comment
- `DELETE /comments/:id/like` 🔐 - Unlike a comment
- `GET /comments/:id/likes` - Get users who liked comment

### Nested Comments
- `GET /comments/:id/replies` - Get replies to a comment
- `POST /comments/:id/reply` 🔐 - Reply to a comment

## 🔐 Social Relationships

### Following
- `GET /users/:username/followers` - Get user's followers
- `GET /users/:username/following` - Get users that user follows
- `GET /users/me/followers` 🔐👤 - Get current user's followers
- `GET /users/me/following` 🔐👤 - Get who current user follows
- `POST /users/:id/follow` 🔐 - Follow a user
- `DELETE /users/:id/follow` 🔐 - Unfollow a user
- `GET /users/:id/relationship` 🔐👤 - Get relationship status with user

## 🔐 Blocking & Muting

### Blocking
- `GET /users/me/blocked` 🔐👤 - Get blocked users
- `POST /users/: id/block` 🔐👤 - Block a user
- `DELETE /users/:id/block` 🔐👤 - Unblock a user

### Muting
- `GET /users/me/muted` 🔐👤 - Get muted users
- `POST /users/:id/mute` 🔐👤 - Mute a user
- `DELETE /users/:id/mute` 🔐👤 - Unmute a user

## 🔐 Notifications

- `GET /notifications` 🔐👤 - Get user notifications
- `GET /notifications/unread` 🔐👤 - Get unread notifications count
- `PATCH /notifications/:id/read` 🔐👤 - Mark notification as read
- `PATCH /notifications/read-all` 🔐👤 - Mark all notifications as read
- `DELETE /notifications/:id` 🔐👤 - Delete notification
- `DELETE /notifications` 🔐👤 - Clear all notifications

## 🔐 Reports & Moderation

### Reporting
- `POST /reports/users/:id` 🔐 - Report a user
- `POST /reports/posts/:id` 🔐 - Report a post
- `POST /reports/comments/:id` 🔐 - Report a comment
- `GET /reports/me` 🔐👤 - Get current user's submitted reports

### Moderation (Admin only)
- `GET /admin/reports` 🔐👤 - Get all reports
- `GET /admin/reports/:id` 🔐👤 - Get report details
- `PATCH /admin/reports/:id` 🔐👤 - Update report status
- `POST /admin/users/:id/suspend` 🔐👤 - Suspend user
- `POST /admin/users/:id/unsuspend` 🔐👤 - Unsuspend user
- `POST /admin/users/:id/verify` 🔐👤 - Verify user
- `DELETE /admin/posts/:id` 🔐👤 - Delete post (as admin)
- `DELETE /admin/comments/:id` 🔐👤 - Delete comment (as admin)

## 🔐 Analytics (Optional)

- `GET /users/me/analytics` 🔐👤 - Get user analytics (views, engagement)
- `GET /posts/: id/analytics` 🔐👤 - Get post analytics (own posts)
- `GET /users/me/insights` 🔐👤 - Get detailed insights

## 🔐 Media Upload

- `POST /media/upload` 🔐 - Upload media file
- `DELETE /media/: id` 🔐👤 - Delete media file (own media only)
- `GET /media/:id` - Get media file

## Additional Utility Endpoints

- `GET /health` - Health check
- `GET /version` - API version info
- `GET /stats` - Public platform statistics

## Legend

- No emoji = Public endpoint (no authentication required)
- 🔐 = Requires authentication (any logged-in user)
- 🔐👤 = Requires authentication + ownership/specific user context (only the resource owner or current user can access)

## Recommended Query Parameters

Most list endpoints should support:
- `?page=1&limit=20` - Pagination
- `?sort=createdAt&order=desc` - Sorting
- `?filter[visibility]=public` - Filtering
- `?search=query` - Search
- `?include=author,comments` - Include related data
