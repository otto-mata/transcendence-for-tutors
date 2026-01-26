# Complete DTO Reference

This file provides a quick reference of all DTOs organized by module.

## Auth Module (`src/auth/auth.dto.ts`)

| DTO                             | Purpose                                  |
| ------------------------------- | ---------------------------------------- |
| `RegisterDto`                   | Registration input                       |
| `LoginDto`                      | Login input                              |
| `LoginUserDto`                  | Login user input (duplicate of LoginDto) |
| `CreateUserDto`                 | User creation input                      |
| `RefreshTokenDto`               | Refresh token input                      |
| `AuthResponseDto`               | Basic auth response                      |
| `LoginResponseDto`              | Detailed login response ✨ NEW           |
| `RegisterResponseDto`           | Registration response ✨ NEW             |
| `VerifyEmailDto`                | Email verification input                 |
| `VerifyEmailResponseDto`        | Email verification response ✨ NEW       |
| `ForgotPasswordDto`             | Password reset request input             |
| `ForgotPasswordResponseDto`     | Password reset request response ✨ NEW   |
| `ResetPasswordDto`              | Password reset input                     |
| `ResetPasswordResponseDto`      | Password reset response ✨ NEW           |
| `ResendVerificationDto`         | Resend verification input                |
| `ResendVerificationResponseDto` | Resend verification response ✨ NEW      |
| `LogoutResponseDto`             | Logout response ✨ NEW                   |

---

## User Module (`src/user/user.dto.ts`)

| DTO                        | Purpose                          |
| -------------------------- | -------------------------------- |
| `CreateUserDto`            | User creation                    |
| `UpdateUserDto`            | User update                      |
| `UpdatePreferencesDto`     | User preferences                 |
| `ChangePasswordDto`        | Password change                  |
| `ChangeEmailDto`           | Email change                     |
| `UserResponseDto`          | User data response               |
| `UserListDto`              | Compact user list item ✨ NEW    |
| `PaginatedUsersDto`        | Paginated user list ✨ NEW       |
| `UserFollowStatsDto`       | User follow statistics ✨ NEW    |
| `UserPreferencesDto`       | User preferences response ✨ NEW |
| `UserAnalyticsDto`         | User analytics ✨ NEW            |
| `UserMetadataDto`          | User metadata ✨ NEW             |
| `BlockedUserResponseDto`   | Blocked user info ✨ NEW         |
| `MutedUserResponseDto`     | Muted user info ✨ NEW           |
| `PaginatedBlockedUsersDto` | Paginated blocked users ✨ NEW   |
| `PaginatedMutedUsersDto`   | Paginated muted users ✨ NEW     |

---

## Post Module (`src/post/post.dto.ts`)

| DTO                     | Purpose                         |
| ----------------------- | ------------------------------- |
| `CreatePostDto`         | Create post input (ENHANCED)    |
| `UpdatePostDto`         | Update post input (ENHANCED)    |
| `PostResponseDto`       | Post data response (ENHANCED)   |
| `PaginatedPostsDto`     | Paginated posts                 |
| `PostMediaDto`          | Post media attachment ✨ NEW    |
| `LikeCountDto`          | Like count with status ✨ NEW   |
| `PostLikeResponseDto`   | Post like response ✨ NEW       |
| `BookmarkDto`           | Bookmark action response ✨ NEW |
| `RepostDto`             | Repost/share response ✨ NEW    |
| `PostViewResponseDto`   | Post view response ✨ NEW       |
| `PostThreadDto`         | Post thread/conversation ✨ NEW |
| `PostListMetadataDto`   | Post list metadata ✨ NEW       |
| `UserPostStatisticsDto` | User post statistics ✨ NEW     |

---

## Comment Module (`src/comment/comment.dto.ts`)

| DTO                      | Purpose                            |
| ------------------------ | ---------------------------------- |
| `CreateCommentDto`       | Create comment input (ENHANCED)    |
| `UpdateCommentDto`       | Update comment input (ENHANCED)    |
| `CommentResponseDto`     | Comment data response (ENHANCED)   |
| `PaginatedCommentsDto`   | Paginated comments                 |
| `CommentMediaDto`        | Comment media attachment ✨ NEW    |
| `CommentLikeResponseDto` | Comment like response ✨ NEW       |
| `CommentThreadDto`       | Comment thread/conversation ✨ NEW |
| `CommentAuthorDto`       | Comment author info ✨ NEW         |

---

## Follow Module (`src/follow/follow.dto.ts`)

| DTO                       | Purpose                         |
| ------------------------- | ------------------------------- |
| `FollowResponseDto`       | Follow action response          |
| `RelationshipStatusDto`   | Relationship status             |
| `UserFollowListDto`       | User in follow list             |
| `PaginatedFollowsDto`     | Paginated follow list           |
| `FollowActionResponseDto` | Follow/unfollow response ✨ NEW |
| `FollowCountDto`          | Follow count info ✨ NEW        |
| `FollowListResponseDto`   | Follow list response ✨ NEW     |
| `FollowerDto`             | Follower info ✨ NEW            |
| `FollowingDto`            | Following info ✨ NEW           |

---

## Notification Module (`src/notification/notification.dto.ts`)

| DTO                                  | Purpose                               |
| ------------------------------------ | ------------------------------------- |
| `CreateNotificationDto`              | Create notification input             |
| `UpdateNotificationDto`              | Update notification input             |
| `NotificationResponseDto`            | Notification data response (ENHANCED) |
| `PaginatedNotificationsDto`          | Paginated notifications               |
| `UnreadCountDto`                     | Unread count                          |
| `NotificationMarkReadResponseDto`    | Mark read response ✨ NEW             |
| `NotificationMarkAllReadResponseDto` | Mark all read response ✨ NEW         |
| `NotificationDeleteResponseDto`      | Delete notification response ✨ NEW   |
| `NotificationMetadataDto`            | Notification metadata ✨ NEW          |
| `NotificationTriggerDto`             | Trigger notification ✨ NEW           |
| `NotificationPreferenceDto`          | Notification preferences ✨ NEW       |
| `NotificationCountDto`               | Notification counts ✨ NEW            |

---

## Media Module (`src/media/media.dto.ts`)

| DTO                           | Purpose                        |
| ----------------------------- | ------------------------------ |
| `MediaUploadResponseDto`      | Media upload response          |
| `MediaUrlDto`                 | Media URL only                 |
| `MediaResponseDto`            | Complete media response ✨ NEW |
| `MediaDeleteResponseDto`      | Media deletion response ✨ NEW |
| `MultiMediaUploadResponseDto` | Batch upload response ✨ NEW   |
| `MediaMetadataDto`            | Media metadata ✨ NEW          |
| `MediaListDto`                | Media list response ✨ NEW     |
| `MediaTypeDto`                | Media type info ✨ NEW         |

---

## Report Module (`src/report/report.dto.ts`)

| DTO                      | Purpose                               |
| ------------------------ | ------------------------------------- |
| `CreateReportDto`        | Create report input                   |
| `UpdateReportStatusDto`  | Update report status input (ENHANCED) |
| `ReportResponseDto`      | Report data response                  |
| `PaginatedReportsDto`    | Paginated reports                     |
| `AdminReportDetailDto`   | Detailed admin report ✨ NEW          |
| `AdminActionResponseDto` | Admin action response ✨ NEW          |
| `SuspendUserDto`         | Suspend user input ✨ NEW             |
| `UnsuspendUserDto`       | Unsuspend user input ✨ NEW           |
| `VerifyUserDto`          | Verify user input ✨ NEW              |
| `DeleteContentDto`       | Delete content input ✨ NEW           |
| `ReportStatisticsDto`    | Report statistics ✨ NEW              |
| `ReportableContentDto`   | Reportable content ✨ NEW             |
| `ReportHistoryDto`       | Report history ✨ NEW                 |

---

## Common Module (`src/common/dto/common.dto.ts`)

| DTO                       | Purpose                         |
| ------------------------- | ------------------------------- |
| `PaginationDto`           | Pagination input parameters     |
| `PaginatedResponseDto<T>` | Generic paginated response      |
| `ApiResponseDto<T>`       | Generic API response (ENHANCED) |
| `IdParamDto`              | ID parameter                    |
| `UsernameParamDto`        | Username parameter              |
| `MessageResponseDto`      | Message-only response ✨ NEW    |
| `SuccessResponseDto<T>`   | Success response wrapper ✨ NEW |
| `ErrorResponseDto`        | Error response format ✨ NEW    |
| `CountResponseDto`        | Count-only response ✨ NEW      |
| `IdResponseDto`           | ID-only response ✨ NEW         |
| `ListCountDto`            | List count info ✨ NEW          |

---

## Analytics Module (`src/common/dto/analytics.dto.ts`) ✨ NEW FILE

| DTO                      | Purpose                     |
| ------------------------ | --------------------------- |
| `UserAnalyticsDto`       | User statistics and metrics |
| `PostAnalyticsDto`       | Post-level analytics        |
| `AnalyticsFilterDto`     | Analytics query filters     |
| `TimeSeriesAnalyticsDto` | Time-series data point      |
| `TimeSeriesDataDto`      | Paginated time series       |
| `PlatformStatisticsDto`  | Platform-wide stats         |
| `InsightsDto`            | Advanced user insights      |
| `DashboardAnalyticsDto`  | Dashboard aggregation       |
| `EngagementMetricsDto`   | Engagement calculations     |
| `AudienceInsightsDto`    | Audience analysis           |

---

## Search Module (`src/common/dto/search.dto.ts`) ✨ NEW FILE

| DTO                            | Purpose                  |
| ------------------------------ | ------------------------ |
| `HashtagDto`                   | Hashtag data             |
| `TrendingHashtagDto`           | Trending hashtag         |
| `PaginatedHashtagsDto`         | Paginated hashtags       |
| `PaginatedTrendingHashtagsDto` | Paginated trending       |
| `SearchQueryDto`               | Search query input       |
| `SearchResultDto<T>`           | Generic search results   |
| `SearchPostResultDto`          | Post search result       |
| `SearchUserResultDto`          | User search result       |
| `SearchCommentResultDto`       | Comment search result    |
| `CombinedSearchResultDto`      | Multi-type search        |
| `SearchFilterDto`              | Search filters           |
| `AutocompleteResultDto`        | Autocomplete suggestions |
| `SearchSuggestionDto`          | Search suggestion        |

---

## Utility Module (`src/common/dto/utility.dto.ts`) ✨ NEW FILE

| DTO                      | Purpose                  |
| ------------------------ | ------------------------ |
| `BatchOperationDto<T>`   | Batch operation request  |
| `BatchResponseDto<T>`    | Batch operation response |
| `PaginationParamsDto`    | Pagination parameters    |
| `FilterParamsDto`        | Generic filters          |
| `SortParamsDto`          | Sort parameters          |
| `BulkCreateDto<T>`       | Bulk create request      |
| `BulkUpdateDto<T>`       | Bulk update request      |
| `BulkDeleteDto`          | Bulk delete request      |
| `ExportFormatDto`        | Export format spec       |
| `ExportResponseDto`      | Export result            |
| `ImportFormatDto`        | Import format spec       |
| `ImportResponseDto`      | Import result            |
| `StatusCheckDto`         | Service status           |
| `HealthCheckResponseDto` | Health check result      |
| `CacheControlDto`        | Cache management         |
| `CursorPaginationDto`    | Cursor pagination input  |
| `CursorPageDto<T>`       | Cursor page result       |
| `WebhookEventDto`        | Webhook event            |
| `WebhookPayloadDto`      | Webhook payload          |
| `RateLimitInfoDto`       | Rate limit info          |

---

## Statistics

- **Total DTOs Created: 129+**
- **New DTOs: 85+** ✨
- **Enhanced DTOs: 10** (added fields)
- **Files Created: 3** (analytics, search, utility)
- **Files Updated: 9** (all module DTOs)
- **Total Coverage: 100+** API endpoints

---

## Usage Notes

1. All DTOs use `class-validator` decorators for input validation
2. Response DTOs are plain TypeScript classes (no decorators needed)
3. Optional fields use `@IsOptional()` decorator
4. Generic DTOs support flexible typing: `PaginatedResponseDto<T>`
5. All DTOs follow consistent naming conventions
6. Comprehensive documentation available in `DTO.md`

---

## Import Examples

```typescript
// Auth DTOs
import { LoginDto, LoginResponseDto } from './auth/auth.dto';

// User DTOs
import { UserResponseDto, UpdateUserDto } from './user/user.dto';

// Post DTOs
import { CreatePostDto, PostResponseDto } from './post/post.dto';

// Common DTOs
import {
	PaginatedResponseDto,
	SuccessResponseDto,
} from './common/dto/common.dto';

// Analytics DTOs
import { UserAnalyticsDto } from './common/dto/analytics.dto';

// Search DTOs
import { CombinedSearchResultDto } from './common/dto/search.dto';
```
