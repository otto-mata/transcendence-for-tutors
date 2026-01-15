import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Follow } from '$prisma';

@Injectable()
export class FollowRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findFollowers(
		userId: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		return this.prisma.follow.findMany({
			where: { followingId: userId },
			skip,
			take,
			include: { follower: true },
			orderBy: { createdAt: 'desc' },
		});
	}

	async findFollowing(
		userId: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		return this.prisma.follow.findMany({
			where: { followerId: userId },
			skip,
			take,
			include: { following: true },
			orderBy: { createdAt: 'desc' },
		});
	}

	async isFollowing(
		followerId: string,
		followingId: string,
	): Promise<boolean> {
		const follow = await this.prisma.follow.findUnique({
			where: {
				followerId_followingId: {
					followerId,
					followingId,
				},
			},
		});
		return !!follow;
	}

	async follow(followerId: string, followingId: string): Promise<Follow> {
		const follow = await this.prisma.follow.create({
			data: {
				followerId,
				followingId,
			},
			include: { follower: true, following: true },
		});

		// Update follower/following counts
		await this.prisma.user.update({
			where: { id: followerId },
			data: { followingCount: { increment: 1 } },
		});

		await this.prisma.user.update({
			where: { id: followingId },
			data: { followerCount: { increment: 1 } },
		});

		return follow;
	}

	async unfollow(followerId: string, followingId: string): Promise<void> {
		await this.prisma.follow.delete({
			where: {
				followerId_followingId: {
					followerId,
					followingId,
				},
			},
		});

		// Update follower/following counts
		await this.prisma.user.update({
			where: { id: followerId },
			data: { followingCount: { decrement: 1 } },
		});

		await this.prisma.user.update({
			where: { id: followingId },
			data: { followerCount: { decrement: 1 } },
		});
	}

	async getRelationshipStatus(
		userId: string,
		targetUserId: string,
	): Promise<any> {
		const isFollowing = await this.isFollowing(userId, targetUserId);
		const isFollowedBy = await this.isFollowing(targetUserId, userId);
		const blocking = await this.prisma.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: userId,
					blockedId: targetUserId,
				},
			},
		});
		const blockedBy = await this.prisma.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: targetUserId,
					blockedId: userId,
				},
			},
		});
		const muting = await this.prisma.mute.findUnique({
			where: {
				muterId_mutedId: {
					muterId: userId,
					mutedId: targetUserId,
				},
			},
		});

		return {
			isFollowing,
			isFollowedBy,
			isBlocking: !!blocking,
			isBlockedBy: !!blockedBy,
			isMuting: !!muting,
		};
	}
}
