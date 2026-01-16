"use client";

import Image from 'next/image';
import { MapPin, Link as LinkIcon, Calendar, MoreHorizontal, Settings, Share2, Bell, BellOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TransClient } from '../../../client/TransClient';
import { UserDto } from '../../../client/User.dto';

export default function ProfilePage({ params }: { params: { username: string } }) {
	const [user, setUser] = useState<UserDto | null>(null);

	useEffect(() => {
		TransClient.instance.getUserByUsername(params.username)
			.then(setUser)
			.catch(console.error);
	}, [params.username]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Cover Photo */}
			<div className="relative h-64 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
				{ user.coverImageUrl ? <Image src={user.coverImageUrl} alt="Cover photo" layout="fill" objectFit="cover" /> : <div className="absolute inset-0 bg-black opacity-10" /> }
			</div>

			{/* Profile Header */}
			<div className="max-w-5xl mx-auto px-4">
				<div className="relative">
					{/* Profile Picture */}
					<div className="absolute -top-20 left-0">
						<div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-white shadow-xl">
							<Image src={user.avatarUrl} alt={user.username} width={160} height={160} className="rounded-full" />
						</div>
					</div>

					{/* Action Buttons */}
					<div className="pt-6 pb-4 flex justify-end gap-3">
						<button className="p-2. 5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
							<Share2 className="w-5 h-5 text-gray-700" />
						</button>
						<button className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
							<MoreHorizontal className="w-5 h-5 text-gray-700" />
						</button>
						<button className="px-6 py-2.5 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transition-all">
							Follow
						</button>
						<button className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow">
							Message
						</button>
					</div>
				</div>

				{/* Profile Info */}
				<div className="mt-4 mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-1">{user.displayName}</h1>
					<p className="text-gray-500 mb-3">@{user.username}</p>

					<p className="text-gray-700 mb-4 max-w-2xl">
						{user.bio}
					</p>

					<div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
						{ user.locationName && <div className="flex items-center gap-1. 5">
							<MapPin className="w-4 h-4" />
							<span>{user.locationName}</span>
						</div> }
						{ user.website && <div className="flex items-center gap-1.5">
							<LinkIcon className="w-4 h-4" />
							<a href={user.website} className="text-blue-500 hover:underline">
								{user.website}
							</a>
						</div> }
						<div className="flex items-center gap-1.5">
							<Calendar className="w-4 h-4" />
							<span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
						</div>
					</div>

					{/* Stats */}
					<div className="flex gap-6 text-sm">
						<button className="hover:underline">
							<span className="font-bold text-gray-900">{user.postCount}</span>
							<span className="text-gray-600 ml-1">Posts</span>
						</button>
						<button className="hover: underline">
							<span className="font-bold text-gray-900">{user.followerCount}</span>
							<span className="text-gray-600 ml-1">Followers</span>
						</button>
						<button className="hover:underline">
							<span className="font-bold text-gray-900">{user.followingCount}</span>
							<span className="text-gray-600 ml-1">Following</span>
						</button>
					</div>
				</div>

				{/* Tabs */}
				<div className="border-b border-gray-200 mb-6">
					<div className="flex gap-8">
						{tabs.map((tab, index) => (
							<button
								key={index}
								className={`pb-4 font-medium transition-colors relative ${index === 0
									? 'text-blue-500'
									: 'text-gray-600 hover:text-gray-900'
									}`}
							>
								{tab}
								{index === 0 && (
									<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
								)}
							</button>
						))}
					</div>
				</div>

				{/* Posts Grid */}
				<div className="pb-12">
					{/* Grid Layout Toggle */}
					<div className="flex justify-end mb-4">
						<div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
							<button className="p-2 bg-blue-500 text-white rounded-md">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
								</svg>
							</button>
							<button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z" />
								</svg>
							</button>
						</div>
					</div>

					{/* Masonry Grid */}
					<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
						{user.posts.map((post, index) => (
							<div
								key={index}
								className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
							>
								<div className="relative overflow-hidden">
									<div
										className={`w-full bg-gradient-to-br from-gray-400 to-slate-500`}
										style={{ height: '200px' }}
									>
										<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />

										{/* Hover overlay with stats */}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
											<div className="flex gap-6 text-white font-semibold">
												<span className="flex items-center gap-2">
													❤️ {post.likeCount}
												</span>
												<span className="flex items-center gap-2">
													💬 {post.commentCount}
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="p-4">
									<p className="text-gray-700 text-sm mb-2">{post.content}</p>
									<p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
								</div>
							</div>
						))}
					</div>

					{/* Load More */}
					<div className="mt-8 text-center">
						<button className="px-8 py-3 bg-white text-gray-700 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
							Load More Posts
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const tabs = ['Posts', 'Media', 'Likes', 'Collections'];

