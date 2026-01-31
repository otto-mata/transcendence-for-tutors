import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Follow } from '$prisma';

@Injectable()
export class FollowRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findFollowers(
		userIdOrUsername: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		console.log('findFollowers called with:', userIdOrUsername);
		
		// First, try to find the user by username or by id
		const user = await this.prisma.user.findFirst({
			where: {
				OR: [
					{ id: userIdOrUsername },
					{ username: userIdOrUsername },
				],
			},
		});

		console.log('Found user:', user?.id, user?.username);

		if (!user) return [];

		const followers = await this.prisma.follow.findMany({
			where: { 
				followingId: user.id,
				status: 'accepted',
			},
			skip,
			take,
			include: { follower: true },
			orderBy: { createdAt: 'desc' },
		});
		return followers;
	}

	async findFollowing(
		userIdOrUsername: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		console.log('findFollowing called with:', userIdOrUsername);
		
		// First, try to find the user by username or by id
		const user = await this.prisma.user.findFirst({
			where: {
				OR: [
					{ id: userIdOrUsername },
					{ username: userIdOrUsername },
				],
			},
		});

		console.log('Found user:', user?.id, user?.username);

		if (!user) return [];

		const following = await this.prisma.follow.findMany({
			where: { 
				followerId: user.id,
				status: 'accepted',
			},
			skip,
			take,
			include: { following: true },
			orderBy: { createdAt: 'desc' },
		});

		console.log('Found following:', following.length);
		return following;
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
				status: 'accepted',
			},
		});
		return !!follow;
	}

	async getFollowStatus(
		followerId: string,
		followingId: string,
	): Promise<string | null> {
		const follow = await this.prisma.follow.findUnique({
			where: {
				followerId_followingId: {
					followerId,
					followingId,
				},
			},
		});
		return follow?.status || null;
	}

	async follow(followerId: string, followingId: string): Promise<Follow> {
		// Check if target user is private
		const targetUser = await this.prisma.user.findUnique({
			where: { id: followingId },
		});

		const status = targetUser?.isPrivate ? 'pending' : 'accepted';

		const follow = await this.prisma.follow.create({
			data: {
				followerId,
				followingId,
				status,
			},
			include: { follower: true, following: true },
		});

		// Only update counts if accepted
		if (status === 'accepted') {
			await this.prisma.user.update({
				where: { id: followerId },
				data: { followingCount: { increment: 1 } },
			});

			await this.prisma.user.update({
				where: { id: followingId },
				data: { followerCount: { increment: 1 } },
			});
		}

		return follow;
	}

	async unfollow(followerId: string, followingId: string): Promise<void> {
		// Get the follow to check status
		const follow = await this.prisma.follow.findUnique({
			where: {
				followerId_followingId: {
					followerId,
					followingId,
				},
			},
		});

		if (!follow) return;

		await this.prisma.follow.delete({
			where: {
				followerId_followingId: {
					followerId,
					followingId,
				},
			},
		});

		// Only update counts if it was accepted
		if (follow.status === 'accepted') {
			await this.prisma.user.update({
				where: { id: followerId },
				data: { followingCount: { decrement: 1 } },
			});

			await this.prisma.user.update({
				where: { id: followingId },
				data: { followerCount: { decrement: 1 } },
			});
		}
	}

	async getRelationshipStatus(
		userId: string,
		targetUserId: string,
	): Promise<any> {
		const followStatus = await this.getFollowStatus(userId, targetUserId);
		const followedByStatus = await this.getFollowStatus(targetUserId, userId);

		return {
			isFollowing: followStatus === 'accepted',
			isPending: followStatus === 'pending',
			isFollowedBy: followedByStatus === 'accepted',
		};
	}

	async removeFollower(userId: string, followerId: string): Promise<void> {
		// Remove the follower from the user's followers
		const follow = await this.prisma.follow.findUnique({
			where: {
				followerId_followingId: {
					followerId: followerId,
					followingId: userId,
				},
			},
		});

		if (!follow) return;

		await this.prisma.follow.delete({
			where: {
				followerId_followingId: {
					followerId: followerId,
					followingId: userId,
				},
			},
		});

		// Only update counts if it was accepted
		if (follow.status === 'accepted') {
			await this.prisma.user.update({
				where: { id: followerId },
				data: { followingCount: { decrement: 1 } },
			});

			await this.prisma.user.update({
				where: { id: userId },
				data: { followerCount: { decrement: 1 } },
			});
		}
	}

	async findPendingRequests(
		userId: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		return this.prisma.follow.findMany({
			where: {
				followingId: userId,
				status: 'pending',
			},
			skip,
			take,
			include: { follower: true },
			orderBy: { createdAt: 'desc' },
		});
	}

	async acceptFollowRequest(userId: string, followerId: string): Promise<void> {
		await this.prisma.follow.update({
			where: {
				followerId_followingId: {
					followerId,
					followingId: userId,
				},
			},
			data: { status: 'accepted' },
		});

		// Update counts
		await this.prisma.user.update({
			where: { id: followerId },
			data: { followingCount: { increment: 1 } },
		});

		await this.prisma.user.update({
			where: { id: userId },
			data: { followerCount: { increment: 1 } },
		});
	}

	async rejectFollowRequest(userId: string, followerId: string): Promise<void> {
		await this.prisma.follow.delete({
			where: {
				followerId_followingId: {
					followerId,
					followingId: userId,
				},
			},
		});
	}

	async getPendingRequestCount(userId: string): Promise<number> {
		return this.prisma.follow.count({
			where: {
				followingId: userId,
				status: 'pending',
			},
		});
	}
}
