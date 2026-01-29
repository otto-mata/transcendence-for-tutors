'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Settings, Share2, Camera, MoreHorizontal, Loader2 } from 'lucide-react';
import { Backend } from '@/client/TransClient';
import { getMediaUrl } from '@/client/utils';
import { UserProfileResponse } from '@/client/Users.dto';
import EditProfileModal from './EditProfileModal';
import { MansonPostGridByUsername, MansonPostGridLiked, MansonPostGridSaved } from './PostList';

interface ProfilePageClientProps {
	username: string;
	isOwnProfile: boolean;
	initialUser?: UserProfileResponse;
}

const tabs = ['Posts', 'Media', 'Likes', 'Collections'];

export default function ProfilePageClient({ username, isOwnProfile, initialUser }: ProfilePageClientProps) {
	const [user, setUser] = useState<UserProfileResponse | null>(initialUser || null);
	const [isLoading, setIsLoading] = useState(!initialUser);
	const [error, setError] = useState<string | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [isUploadingCover, setIsUploadingCover] = useState(false);
	const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	
	const coverInputRef = useRef<HTMLInputElement>(null);
	const avatarInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!initialUser) {
			fetchUserProfile();
		}
	}, [username, initialUser]);

	const fetchUserProfile = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const client = Backend.getInstance();
			if (isOwnProfile) {
				const result = await client.me.get();
				if (!result.ok)
					throw new Error('Failed to fetch profile');
				const data = typeof result.value === 'string' 
					? JSON.parse(result.value) as UserProfileResponse 
					: result.value as UserProfileResponse;
				setUser(data);
			} else {
				const result = await client.users.$({username}).get();
				if (!result.ok)
					throw new Error('Failed to fetch profile');
				const data = typeof result.value === 'string' 
					? JSON.parse(result.value) as UserProfileResponse 
					: result.value as UserProfileResponse;
				setUser(data);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	}, [isOwnProfile, username]);

	const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploadingCover(true);
		try {
			const client = Backend.getInstance();
			const result = await client.me.updateCover(file);
			if (result.ok) {
				const updatedUser = typeof result.value === 'string' 
					? JSON.parse(result.value) as UserProfileResponse 
					: result.value as UserProfileResponse;
				setUser(updatedUser);
			}
		} catch (err) {
			console.error('Failed to upload cover:', err);
		} finally {
			setIsUploadingCover(false);
		}
	};

	const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploadingAvatar(true);
		try {
			const client = Backend.getInstance();
			const result = await client.me.updateAvatar(file);
			if (result.ok) {
				const updatedUser = typeof result.value === 'string' 
					? JSON.parse(result.value) as UserProfileResponse 
					: result.value as UserProfileResponse;
				setUser(updatedUser);
			}
		} catch (err) {
			console.error('Failed to upload avatar:', err);
		} finally {
			setIsUploadingAvatar(false);
		}
	};

	const handleUserUpdate = useCallback(async (updatedUser: UserProfileResponse) => {
		console.log('handleUserUpdate called with:', updatedUser);
		setUser(updatedUser);
		setRefreshKey(prev => prev + 1);
		
		try {
			const client = Backend.getInstance();
			const result = await client.me.get();
			if (result.ok) {
				const freshData = typeof result.value === 'string' 
					? JSON.parse(result.value) as UserProfileResponse 
					: result.value as UserProfileResponse;
				setUser(freshData);
			}
		} catch (err) {
			console.error('Failed to re-fetch profile after update:', err);
		}
	}, []);

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric',
		});
	};

	const formatCount = (count: number | undefined | null) => {
		if (count == null) return '0';
		if (count >= 1000000) {
			return (count / 1000000).toFixed(1) + 'M';
		} else if (count >= 1000) {
			return (count / 1000).toFixed(1) + 'K';
		}
		return count.toString();
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-blue-500" />
			</div>
		);
	}

	if (error || !user) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
						{error || 'User not found'}
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						The profile you're looking for doesn't exist or has been removed.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
			{/* Cover Photo */}
			<div className="relative h-64 group">
				{user.coverImageUrl ? (
					<img
						key={`cover-${refreshKey}-${user.coverImageUrl}`}
						src={getMediaUrl(user.coverImageUrl)}
						alt="Cover"
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
				)}
				<div className="absolute inset-0 bg-black opacity-10" />

				{/* Edit Cover Button - Only show for own profile */}
				{isOwnProfile && (
					<>
						<button 
							onClick={() => coverInputRef.current?.click()}
							disabled={isUploadingCover}
							className="absolute top-4 right-4 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
						>
							{isUploadingCover ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<Camera className="w-4 h-4" />
							)}
							{isUploadingCover ? 'Uploading...' : 'Edit Cover'}
						</button>
						<input
							ref={coverInputRef}
							type="file"
							accept="image/*"
							onChange={handleCoverUpload}
							className="hidden"
						/>
					</>
				)}
			</div>

			{/* Profile Header */}
			<div className="mx-auto px-4 sm:px-8 lg:px-32">
				<div className="relative">
					{/* Profile Picture */}
					<div className="absolute -top-20 left-0 group/avatar">
						<div className="relative w-40 h-40 rounded-full border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden">
							{user.avatarUrl ? (
								<img
									key={`avatar-${refreshKey}-${user.avatarUrl}`}
									src={getMediaUrl(user.avatarUrl)}
									alt={user.displayName || user.username}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-400" />
							)}
							{isUploadingAvatar && (
								<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
									<Loader2 className="w-6 h-6 animate-spin text-white" />
								</div>
							)}
						</div>
						{isOwnProfile && (
							<>
								<button 
									onClick={() => avatarInputRef.current?.click()}
									disabled={isUploadingAvatar}
									className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50"
								>
									<Camera className="w-5 h-5" />
								</button>
								<input
									ref={avatarInputRef}
									type="file"
									accept="image/*"
									onChange={handleAvatarUpload}
									className="hidden"
								/>
							</>
						)}
					</div>

					{/* Action Buttons */}
					<div className="pt-6 pb-4 flex justify-end gap-3">
						<button className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow">
							<Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
						</button>
						
						{isOwnProfile ? (
							<button 
								onClick={() => setShowEditModal(true)}
								className="px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
							>
								<Settings className="w-4 h-4" />
								Edit Profile
							</button>
						) : (
							<>
								<button className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow">
									<MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
								</button>
								<button className="px-6 py-2.5 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transition-all">
									Follow
								</button>
								<button className="px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow">
									Message
								</button>
							</>
						)}
					</div>
				</div>

				{/* Profile Info */}
				<div className="mt-4 mb-6">
					<div className="flex items-center gap-2 mb-1">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
							{user.displayName || user.username}
						</h1>
						{user.isVerified && (
							<svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
								<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
							</svg>
						)}
					</div>
					<p className="text-gray-500 mb-3">@{user.username}</p>

					{user.bio && (
						<p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">
							{user.bio}
						</p>
					)}

					<div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
						{user.website && (
							<div className="flex items-center gap-1.5">
								<LinkIcon className="w-4 h-4" />
								<a 
									href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									{user.website.replace(/^https?:\/\//, '')}
								</a>
							</div>
						)}
						<div className="flex items-center gap-1.5">
							<Calendar className="w-4 h-4" />
							<span>Joined {formatDate(user.createdAt)}</span>
						</div>
					</div>

					{/* Stats */}
					<div className="flex gap-6 text-sm">
						<button className="hover:underline">
							<span className="font-bold text-gray-900 dark:text-gray-100">
								{formatCount(user.postCount)}
							</span>
							<span className="text-gray-600 dark:text-gray-400 ml-1">Posts</span>
						</button>
						<button className="hover:underline">
							<span className="font-bold text-gray-900 dark:text-gray-100">
								{formatCount(user.followerCount)}
							</span>
							<span className="text-gray-600 dark:text-gray-400 ml-1">Followers</span>
						</button>
						<button className="hover:underline">
							<span className="font-bold text-gray-900 dark:text-gray-100">
								{formatCount(user.followingCount)}
							</span>
							<span className="text-gray-600 dark:text-gray-400 ml-1">Following</span>
						</button>
					</div>
				</div>

				{/* Tabs */}
				<div className="border-b border-gray-200 dark:border-gray-700 mb-6">
					<div className="flex gap-8">
						{tabs.map((tab, index) => (
							<button
								key={index}
								onClick={() => setActiveTab(index)}
								className={`pb-4 font-medium transition-colors relative ${
									index === activeTab
										? 'text-blue-500'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
								}`}
							>
								{(index !== 3 || isOwnProfile) && tab}
								{index === activeTab && (
									<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
								)}
							</button>
						))}
					</div>
				</div>

				{/* Content Area - Posts Grid placeholder */}
				<div className="pb-12">
					<div className="text-center py-12 text-gray-500 dark:text-gray-400">
						{activeTab === 0 && <MansonPostGridByUsername username={user.username}/>}
						{activeTab === 1 && 'Media posts will appear here'}
						{activeTab === 2 && <MansonPostGridLiked { ...(isOwnProfile &&  {username})}/>}
						{isOwnProfile &&  activeTab === 3 && <MansonPostGridSaved { ...(isOwnProfile &&  {username})}/>}
					</div>
				</div>
			</div>

			{/* Edit Profile Modal */}
			{showEditModal && user && (
				<EditProfileModal
					onClose={() => setShowEditModal(false)}
					user={user}
					onUpdate={handleUserUpdate}
				/>
			)}
		</div>
	);
}
