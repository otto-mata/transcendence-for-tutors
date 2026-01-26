/*
  Warnings:

  - You are about to drop the column `editedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `isEdited` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `isFlagged` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `isReported` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `editedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `hashtags` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isEdited` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isFlagged` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isReported` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isRepost` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `locationLatitude` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `locationLongitude` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `mentions` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `originalPostId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `shareCount` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `emailNotifications` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagramUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isFlagged` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isReported` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isSuspended` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locationLatitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locationLongitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pushNotifications` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockedId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockerId_fkey";

-- DropForeignKey
ALTER TABLE "Mute" DROP CONSTRAINT "Mute_mutedId_fkey";

-- DropForeignKey
ALTER TABLE "Mute" DROP CONSTRAINT "Mute_muterId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_originalPostId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_postId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_postId_fkey";

-- DropIndex
DROP INDEX "Post_originalPostId_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "editedAt",
DROP COLUMN "isDeleted",
DROP COLUMN "isEdited",
DROP COLUMN "isFlagged",
DROP COLUMN "isReported";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "editedAt",
DROP COLUMN "hashtags",
DROP COLUMN "isDeleted",
DROP COLUMN "isEdited",
DROP COLUMN "isFlagged",
DROP COLUMN "isReported",
DROP COLUMN "isRepost",
DROP COLUMN "locationLatitude",
DROP COLUMN "locationLongitude",
DROP COLUMN "locationName",
DROP COLUMN "mentions",
DROP COLUMN "originalPostId",
DROP COLUMN "shareCount",
DROP COLUMN "viewCount";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailNotifications",
DROP COLUMN "githubUrl",
DROP COLUMN "instagramUrl",
DROP COLUMN "isFlagged",
DROP COLUMN "isReported",
DROP COLUMN "isSuspended",
DROP COLUMN "isVerified",
DROP COLUMN "linkedinUrl",
DROP COLUMN "locationLatitude",
DROP COLUMN "locationLongitude",
DROP COLUMN "locationName",
DROP COLUMN "pushNotifications",
DROP COLUMN "role",
DROP COLUMN "twitterUrl";

-- DropTable
DROP TABLE "Block";

-- DropTable
DROP TABLE "Mute";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "View";
