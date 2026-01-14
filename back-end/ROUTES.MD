## 🔐 Authentication & Users

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` 🔐👤 - Logout user
- `POST /api/auth/refresh` 🔐👤 - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/resend-verification` - Resend verification email

### User Profile
- `GET /api/users/: username` - Get user profile by username
- `GET /api/users/:id` - Get user profile by ID
- `GET /api/users/me` 🔐👤 - Get current user profile
- `PATCH /api/users/me` 🔐👤 - Update current user profile
- `DELETE /api/users/me` 🔐👤 - Delete current user account
- `PATCH /api/users/me/avatar` 🔐👤 - Upload/update avatar
- `PATCH /api/users/me/cover` 🔐👤 - Upload/update cover image
- `PATCH /api/users/me/password` 🔐👤 - Change password
- `PATCH /api/users/me/email` 🔐👤 - Change email
- `GET /api/users/me/preferences` 🔐👤 - Get user preferences
- `PATCH /api/users/me/preferences` 🔐👤 - Update user preferences

### User Discovery
- `GET /api/users` - Search/list users (with filters)
- `GET /api/users/suggested` 🔐 - Get suggested users to follow
- `GET /api/users/verified` - Get verified users
- `GET /api/users/: username/exists` - Check if username exists

## 🔐 Posts

### Post CRUD
- `GET /api/posts` - Get posts feed (public posts)
- `GET /api/posts/: id` - Get single post by ID
- `POST /api/posts` 🔐 - Create new post
- `PATCH /api/posts/:id` 🔐👤 - Update post (own posts only)
- `DELETE /api/posts/:id` 🔐👤 - Delete post (own posts only)

### Post Feeds
- `GET /api/posts/feed` 🔐👤 - Get personalized feed (following + recommended)
- `GET /api/posts/timeline` 🔐👤 - Get timeline (only following)
- `GET /api/posts/trending` - Get trending posts
- `GET /api/posts/latest` - Get latest posts
- `GET /api/users/:username/posts` - Get user's posts
- `GET /api/users/:username/posts/media` - Get user's posts with media
- `GET /api/users/:username/likes` - Get posts liked by user
- `GET /api/users/me/posts` 🔐👤 - Get current user's posts

### Post Interactions
- `POST /api/posts/:id/like` 🔐 - Like a post
- `DELETE /api/posts/:id/like` 🔐 - Unlike a post
- `GET /api/posts/:id/likes` - Get users who liked post
- `POST /api/posts/:id/bookmark` 🔐👤 - Bookmark a post
- `DELETE /api/posts/:id/bookmark` 🔐👤 - Remove bookmark
- `GET /api/users/me/bookmarks` 🔐👤 - Get bookmarked posts
- `POST /api/posts/:id/share` 🔐 - Share/repost a post
- `DELETE /api/posts/:id/share` 🔐 - Delete repost
- `GET /api/posts/:id/shares` - Get reposts of a post
- `POST /api/posts/:id/view` - Record post view (can be anonymous)

### Post Replies
- `GET /api/posts/:id/replies` - Get replies to a post
- `POST /api/posts/:id/reply` 🔐 - Reply to a post
- `GET /api/posts/:id/thread` - Get full conversation thread

### Hashtags & Search
- `GET /api/posts/hashtag/:tag` - Get posts by hashtag
- `GET /api/hashtags/trending` - Get trending hashtags
- `GET /api/posts/search` - Search posts by content

## 🔐 Comments

### Comment CRUD
- `GET /api/posts/:postId/comments` - Get comments for a post
- `GET /api/comments/:id` - Get single comment
- `POST /api/posts/:postId/comments` 🔐 - Create comment on post
- `PATCH /api/comments/:id` 🔐👤 - Update comment (own comments only)
- `DELETE /api/comments/:id` 🔐👤 - Delete comment (own comments only)

### Comment Interactions
- `POST /api/comments/:id/like` 🔐 - Like a comment
- `DELETE /api/comments/:id/like` 🔐 - Unlike a comment
- `GET /api/comments/:id/likes` - Get users who liked comment

### Nested Comments
- `GET /api/comments/:id/replies` - Get replies to a comment
- `POST /api/comments/:id/reply` 🔐 - Reply to a comment

## 🔐 Social Relationships

### Following
- `GET /api/users/:username/followers` - Get user's followers
- `GET /api/users/:username/following` - Get users that user follows
- `GET /api/users/me/followers` 🔐👤 - Get current user's followers
- `GET /api/users/me/following` 🔐👤 - Get who current user follows
- `POST /api/users/:id/follow` 🔐 - Follow a user
- `DELETE /api/users/:id/follow` 🔐 - Unfollow a user
- `GET /api/users/:id/relationship` 🔐👤 - Get relationship status with user

## 🔐 Blocking & Muting

### Blocking
- `GET /api/users/me/blocked` 🔐👤 - Get blocked users
- `POST /api/users/: id/block` 🔐👤 - Block a user
- `DELETE /api/users/:id/block` 🔐👤 - Unblock a user

### Muting
- `GET /api/users/me/muted` 🔐👤 - Get muted users
- `POST /api/users/:id/mute` 🔐👤 - Mute a user
- `DELETE /api/users/:id/mute` 🔐👤 - Unmute a user

## 🔐 Notifications

- `GET /api/notifications` 🔐👤 - Get user notifications
- `GET /api/notifications/unread` 🔐👤 - Get unread notifications count
- `PATCH /api/notifications/:id/read` 🔐👤 - Mark notification as read
- `PATCH /api/notifications/read-all` 🔐👤 - Mark all notifications as read
- `DELETE /api/notifications/:id` 🔐👤 - Delete notification
- `DELETE /api/notifications` 🔐👤 - Clear all notifications

## 🔐 Reports & Moderation

### Reporting
- `POST /api/reports/users/:id` 🔐 - Report a user
- `POST /api/reports/posts/:id` 🔐 - Report a post
- `POST /api/reports/comments/:id` 🔐 - Report a comment
- `GET /api/reports/me` 🔐👤 - Get current user's submitted reports

### Moderation (Admin only)
- `GET /api/admin/reports` 🔐👤 - Get all reports
- `GET /api/admin/reports/:id` 🔐👤 - Get report details
- `PATCH /api/admin/reports/:id` 🔐👤 - Update report status
- `POST /api/admin/users/:id/suspend` 🔐👤 - Suspend user
- `POST /api/admin/users/:id/unsuspend` 🔐👤 - Unsuspend user
- `POST /api/admin/users/:id/verify` 🔐👤 - Verify user
- `DELETE /api/admin/posts/:id` 🔐👤 - Delete post (as admin)
- `DELETE /api/admin/comments/:id` 🔐👤 - Delete comment (as admin)

## 🔐 Analytics (Optional)

- `GET /api/users/me/analytics` 🔐👤 - Get user analytics (views, engagement)
- `GET /api/posts/: id/analytics` 🔐👤 - Get post analytics (own posts)
- `GET /api/users/me/insights` 🔐👤 - Get detailed insights

## 🔐 Media Upload

- `POST /api/media/upload` 🔐 - Upload media file
- `DELETE /api/media/: id` 🔐👤 - Delete media file (own media only)
- `GET /api/media/:id` - Get media file

## Additional Utility Endpoints

- `GET /api/health` - Health check
- `GET /api/version` - API version info
- `GET /api/stats` - Public platform statistics

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
