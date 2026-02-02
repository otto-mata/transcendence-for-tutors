import { Injectable } from '@nestjs/common';
import { Follow } from '$prisma';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
	constructor(private readonly followRepository: FollowRepository) {}

	async getFollowers(
		userId: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		return this.followRepository.findFollowers(userId, skip, take);
	}

	async getFollowing(
		userId: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		return this.followRepository.findFollowing(userId, skip, take);
	}

	async isFollowing(
		followerId: string,
		followingId: string,
	): Promise<boolean> {
		return this.followRepository.isFollowing(followerId, followingId);
	}

	async follow(followerId: string, followingId: string): Promise<Follow> {
		return this.followRepository.follow(followerId, followingId);
	}

	async unfollow(followerId: string, followingId: string): Promise<void> {
		return this.followRepository.unfollow(followerId, followingId);
	}

	async getRelationshipStatus(
		userId: string,
		targetUserId: string,
	): Promise<any> {
		return this.followRepository.getRelationshipStatus(
			userId,
			targetUserId,
		);
	}

	async removeFollower(userId: string, followerId: string): Promise<void> {
		return this.followRepository.removeFollower(userId, followerId);
	}

	async getPendingRequests(
		userId: string,
		skip: number,
		take: number,
	): Promise<any[]> {
		return this.followRepository.findPendingRequests(userId, skip, take);
	}

	async acceptFollowRequest(userId: string, followerId: string): Promise<void> {
		return this.followRepository.acceptFollowRequest(userId, followerId);
	}

	async rejectFollowRequest(userId: string, followerId: string): Promise<void> {
		return this.followRepository.rejectFollowRequest(userId, followerId);
	}

	async getPendingRequestCount(userId: string): Promise<number> {
		return this.followRepository.getPendingRequestCount(userId);
	}
}
