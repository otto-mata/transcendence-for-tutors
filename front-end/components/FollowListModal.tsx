'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Loader2, UserMinus, UserPlus, UserCheck, Check, XCircle } from 'lucide-react';
import { Backend } from '@/client/TransClient';
import { getMediaUrl } from '@/client/utils';
import { FollowerDto, FollowingDto, FollowUserDto, RelationshipStatusDto } from '@/client/follow.dto';
import Link from 'next/link';

type ModalType = 'followers' | 'following' | 'requests';

interface FollowListModalProps {
	isOpen: boolean;
	onClose: () => void;
	username: string;
	userId: string;
	type: ModalType;
	isOwnProfile: boolean;
	onFollowerRemoved?: () => void;
	onRequestHandled?: () => void;
	currentUserId?: string;
}

interface FollowItemProps {
	user: FollowUserDto;
	isOwnProfile: boolean;
	type: ModalType;
	onRemove?: (userId: string) => void;
	onAccept?: (userId: string) => void;
	onReject?: (userId: string) => void;
	isRemoving?: boolean;
	isAccepting?: boolean;
	isRejecting?: boolean;
	currentUserId?: string;
}

function FollowItem({ user, isOwnProfile, type, onRemove, onAccept, onReject, isRemoving, isAccepting, isRejecting, currentUserId }: FollowItemProps) {
	const [isFollowing, setIsFollowing] = useState(false);
	const [isLoadingFollow, setIsLoadingFollow] = useState(false);
	const [relationshipChecked, setRelationshipChecked] = useState(false);
	
	// Check if this user is the current user (can't follow yourself)
	const isSelf = currentUserId === user.id;

	useEffect(() => {
		// Don't check relationship for self or requests
		if (isSelf || type === 'requests') {
			setRelationshipChecked(true);
			return;
		}
		
		// Check if we follow this user
		const checkRelationship = async () => {
			try {
				const client = Backend.getInstance();
				const result = await client.users.$({ id: user.id }).relationship();
				if (!result.ok) throw result.error;
				const value = result.value as RelationshipStatusDto;
				const data = typeof value === 'string' 
					? JSON.parse(value) as RelationshipStatusDto
					: value;
				setIsFollowing(data.isFollowing);
			} catch (err) {
				console.error('Failed to check relationship:', err);
			} finally {
				setRelationshipChecked(true);
			}
		};
		checkRelationship();
	}, [user.id, isSelf, type]);

	const handleFollowToggle = async () => {
		setIsLoadingFollow(true);
		try {
			const client = Backend.getInstance();
			if (isFollowing) {
				const result = await client.users.$({ id: user.id }).unfollow();
				if (result.ok) {
					setIsFollowing(false);
				}
			} else {
				const result = await client.users.$({ id: user.id }).follow();
				if (result.ok) {
					setIsFollowing(true);
				}
			}
		} catch (err) {
			console.error('Failed to toggle follow:', err);
		} finally {
			setIsLoadingFollow(false);
		}
	};

	return (
		<div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
			<Link href={`/profile/${user.username}`} className="flex items-center gap-3 flex-1 min-w-0">
				<div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
					{user.avatarUrl ? (
						<img
							src={getMediaUrl(user.avatarUrl)}
							alt={user.displayName || user.username}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-400" />
					)}
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-1">
						<span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
							{user.displayName || user.username}
						</span>
						{user.isVerified && (
							<svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
								<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
							</svg>
						)}
					</div>
					<span className="text-sm text-gray-500 truncate block">@{user.username}</span>
					{user.bio && (
						<p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-0.5">
							{user.bio}
						</p>
					)}
				</div>
			</Link>

			<div className="flex items-center gap-2 ml-3 shrink-0">
				{/* Accept/Reject buttons for follow requests */}
				{type === 'requests' && onAccept && onReject && (
					<>
						<button
							onClick={() => onAccept(user.id)}
							disabled={isAccepting || isRejecting}
							className="px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1"
							title="Accept request"
						>
							{isAccepting ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<>
									<Check className="w-4 h-4" />
									<span className="hidden sm:inline">Accept</span>
								</>
							)}
						</button>
						<button
							onClick={() => onReject(user.id)}
							disabled={isAccepting || isRejecting}
							className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors flex items-center gap-1"
							title="Reject request"
						>
							{isRejecting ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<>
									<XCircle className="w-4 h-4" />
									<span className="hidden sm:inline">Reject</span>
								</>
							)}
						</button>
					</>
				)}

				{/* Follow/Unfollow button - don't show for self or requests */}
				{type !== 'requests' && relationshipChecked && !isSelf && (
					<button
						onClick={handleFollowToggle}
						disabled={isLoadingFollow}
						className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
							isFollowing
								? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400'
								: 'bg-blue-500 text-white hover:bg-blue-600'
						}`}
					>
						{isLoadingFollow ? (
							<Loader2 className="w-4 h-4 animate-spin" />
						) : isFollowing ? (
							<>
								<UserCheck className="w-4 h-4" />
								<span className="hidden sm:inline">Following</span>
							</>
						) : (
							<>
								<UserPlus className="w-4 h-4" />
								<span className="hidden sm:inline">Follow</span>
							</>
						)}
					</button>
				)}
				
				{/* Show "You" badge for self */}
				{isSelf && (
					<span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm rounded-full">
						You
					</span>
				)}

				{/* Remove follower button (only for own profile's followers list) */}
				{isOwnProfile && type === 'followers' && onRemove && (
					<button
						onClick={() => onRemove(user.id)}
						disabled={isRemoving}
						className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
						title="Remove follower"
					>
						{isRemoving ? (
							<Loader2 className="w-5 h-5 animate-spin" />
						) : (
							<UserMinus className="w-5 h-5" />
						)}
					</button>
				)}
			</div>
		</div>
	);
}

export default function FollowListModal({
	isOpen,
	onClose,
	username,
	userId,
	type,
	isOwnProfile,
	onFollowerRemoved,
	onRequestHandled,
	currentUserId,
}: FollowListModalProps) {
	const [items, setItems] = useState<(FollowerDto | FollowingDto)[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [removingId, setRemovingId] = useState<string | null>(null);
	const [acceptingId, setAcceptingId] = useState<string | null>(null);
	const [rejectingId, setRejectingId] = useState<string | null>(null);

	const fetchData = useCallback(async (pageNum: number = 1) => {
		setIsLoading(true);
		try {
			const client = Backend.getInstance();
			let result;
			
			if (type === 'requests') {
				// Fetch pending follow requests
				result = await client.me.followRequests.get(pageNum, 20);
			} else if (isOwnProfile) {
				// Use /users/me/followers or /users/me/following
				if (type === 'followers') {
					result = await client.me.followers.get(pageNum, 20);
				} else {
					result = await client.me.following.get(pageNum, 20);
				}
			} else {
				// Use /users/:username/followers or /users/:username/following
				if (type === 'followers') {
					result = await client.users.$({ username }).followers(pageNum, 20);
				} else {
					result = await client.users.$({ username }).following(pageNum, 20);
				}
			}

			if (result.ok) {
				const value = result.value as FollowerDto[] | FollowingDto[] | { data: (FollowerDto | FollowingDto)[] };
				const data = typeof value === 'string' 
					? JSON.parse(value) 
					: value;
				
				
				const newItems = Array.isArray(data) ? data : (data.data || []);
				
				if (pageNum === 1) {
					setItems(newItems);
				} else {
					setItems(prev => [...prev, ...newItems]);
				}
				
				setHasMore(newItems.length === 20);
			} else {
				console.error('Result not ok:', result);
			}
		} catch (err) {
			console.error(`Failed to fetch ${type}:`, err);
		} finally {
			setIsLoading(false);
		}
	}, [username, type, isOwnProfile]);

	useEffect(() => {
		if (isOpen) {
			setPage(1);
			setItems([]);
			fetchData(1);
		}
	}, [isOpen, fetchData]);

	const handleRemoveFollower = async (followerId: string) => {
		setRemovingId(followerId);
		try {
			const client = Backend.getInstance();
			const result = await client.me.followers.remove(followerId);
			if (result.ok) {
				setItems(prev => prev.filter(item => {
					const user = 'follower' in item ? item.follower : item.following;
					return user.id !== followerId;
				}));
				onFollowerRemoved?.();
			}
		} catch (err) {
			console.error('Failed to remove follower:', err);
		} finally {
			setRemovingId(null);
		}
	};

	const handleAcceptRequest = async (followerId: string) => {
		setAcceptingId(followerId);
		try {
			const client = Backend.getInstance();
			const result = await client.me.followRequests.accept(followerId);
			if (result.ok) {
				setItems(prev => prev.filter(item => {
					const user = 'follower' in item ? item.follower : item.following;
					return user.id !== followerId;
				}));
				onRequestHandled?.();
			}
		} catch (err) {
			console.error('Failed to accept request:', err);
		} finally {
			setAcceptingId(null);
		}
	};

	const handleRejectRequest = async (followerId: string) => {
		setRejectingId(followerId);
		try {
			const client = Backend.getInstance();
			const result = await client.me.followRequests.reject(followerId);
			if (result.ok) {
				setItems(prev => prev.filter(item => {
					const user = 'follower' in item ? item.follower : item.following;
					return user.id !== followerId;
				}));
				onRequestHandled?.();
			}
		} catch (err) {
			console.error('Failed to reject request:', err);
		} finally {
			setRejectingId(null);
		}
	};

	const loadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchData(nextPage);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div 
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			
			{/* Modal */}
			<div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col mx-4">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
						{type === 'followers' ? 'Followers' : type === 'following' ? 'Following' : 'Follow Requests'}
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
					>
						<X className="w-5 h-5 text-gray-500" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto">
					{isLoading && items.length === 0 ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="w-8 h-8 animate-spin text-blue-500" />
						</div>
					) : items.length === 0 ? (
						<div className="text-center py-12 text-gray-500">
							{type === 'followers' 
								? "No followers yet" 
								: type === 'following'
								? "Not following anyone yet"
								: "No pending requests"}
						</div>
					) : (
						<>
							{items.map((item) => {
								// Handle both follower and following items
								let user: FollowUserDto | undefined;
								
								if (type === 'followers' || type === 'requests') {
									// For followers list and requests, the user who follows is in 'follower'
									user = (item as any).follower;
								} else {
									// For following list, the user being followed is in 'following'
									user = (item as any).following;
								}
								
								// Skip if no user data found
								if (!user || !user.id) {
									console.warn('Missing user data in item:', item);
									return null;
								}
								
								return (
									<FollowItem
										key={item.id}
										user={user}
										isOwnProfile={isOwnProfile}
										type={type}
										onRemove={handleRemoveFollower}
										onAccept={handleAcceptRequest}
										onReject={handleRejectRequest}
										isRemoving={removingId === user.id}
										isAccepting={acceptingId === user.id}
										isRejecting={rejectingId === user.id}
										currentUserId={currentUserId}
									/>
								);
							})}
							
							{hasMore && (
								<div className="p-4 text-center">
									<button
										onClick={loadMore}
										disabled={isLoading}
										className="px-6 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full font-medium transition-colors"
									>
										{isLoading ? (
											<Loader2 className="w-5 h-5 animate-spin inline" />
										) : (
											'Load more'
										)}
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
