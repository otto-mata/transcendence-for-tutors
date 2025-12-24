'use client';

import { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Repeat2, AtSign, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
	const [activeTab, setActiveTab] = useState('all');

	const tabs = [
		{ id: 'all', label: 'All' },
		{ id: 'mentions', label: 'Mentions' },
		{ id: 'likes', label: 'Likes' },
		{ id: 'follows', label: 'Follows' },
	];

	return (
		<div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
					<div className="px-6 py-4">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Notifications</h1>
					</div>

					{/* Tabs */}
					<div className="flex border-b border-gray-200 dark:border-gray-700">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-1 px-4 py-3 font-medium transition-colors relative ${
									activeTab === tab.id
										? 'text-blue-500'
										: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
								}`}
							>
								{tab.label}
								{activeTab === tab.id && (
									<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
								)}
							</button>
						))}
					</div>
				</div>

				{/* Notifications List */}
				<div className="divide-y divide-gray-200 dark:divide-gray-700">
					{notifications.map((notification, index) => (
						<NotificationItem key={index} notification={notification} />
					))}
				</div>
			</div>
		</div>
	);
}

function NotificationItem({ notification }: { notification: Notification }) {
	const getIcon = () => {
		switch (notification.type) {
			case 'like':
				return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
			case 'comment':
				return <MessageCircle className="w-5 h-5 text-blue-500" />;
			case 'follow':
				return <UserPlus className="w-5 h-5 text-green-500" />;
			case 'repost':
				return <Repeat2 className="w-5 h-5 text-purple-500" />;
			case 'mention':
				return <AtSign className="w-5 h-5 text-orange-500" />;
			case 'achievement':
				return <Trophy className="w-5 h-5 text-yellow-500" />;
			case 'trending':
				return <TrendingUp className="w-5 h-5 text-pink-500" />;
			default:
				return <Heart className="w-5 h-5 text-gray-500" />;
		}
	};

	return (
		<div
			className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
				!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
			}`}
		>
			<div className="flex gap-4">
				{/* Icon */}
				<div className="shrink-0 mt-1">{getIcon()}</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start gap-3">
						{/* Avatar */}
						<Link href={`/profile/${notification.username}`}>
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
						</Link>

						{/* Text */}
						<div className="flex-1 min-w-0">
							<p className="text-sm text-gray-900 dark:text-gray-100">
								<Link
									href={`/profile/${notification.username}`}
									className="font-semibold hover:underline"
								>
									{notification.author}
								</Link>{' '}
								<span className="text-gray-700 dark:text-gray-300">{notification.action}</span>
							</p>
							{notification.preview && (
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
									{notification.preview}
								</p>
							)}
							<p className="text-xs text-gray-500 mt-1">{notification.time}</p>
						</div>

						{/* Unread Indicator */}
						{!notification.read && (
							<div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// Types
type NotificationType = 'like' | 'comment' | 'follow' | 'repost' | 'mention' | 'achievement' | 'trending';

interface Notification {
	type: NotificationType;
	author: string;
	username: string;
	action: string;
	preview?: string;
	time: string;
	read: boolean;
}

// Sample data
const notifications: Notification[] = [
	{
		type: 'like',
		author: 'Alex Chen',
		username: 'alexchen',
		action: 'liked your post',
		preview: 'Minimalist workspace setup for maximum productivity 🚀',
		time: '2m ago',
		read: false,
	},
	{
		type: 'comment',
		author: 'Sarah Kim',
		username: 'sarahkim',
		action: 'commented on your post',
		preview: "Love this! Where did you get that desk lamp?",
		time: '15m ago',
		read: false,
	},
	{
		type: 'follow',
		author: 'Mike Johnson',
		username: 'mikejohnson',
		action: 'started following you',
		time: '1h ago',
		read: false,
	},
	{
		type: 'mention',
		author: 'Emma Davis',
		username: 'emmadavis',
		action: 'mentioned you in a comment',
		preview: '@otto-mata you should check this out!',
		time: '2h ago',
		read: true,
	},
	{
		type: 'like',
		author: 'James Wilson',
		username: 'jameswilson',
		action: 'liked your post',
		preview: 'Coffee and code. Best combination! ☕',
		time: '3h ago',
		read: true,
	},
	{
		type: 'repost',
		author: 'Olivia Brown',
		username: 'oliviabrown',
		action: 'reposted your post',
		preview: 'Golden hour at the beach never disappoints ✨',
		time: '5h ago',
		read: true,
	},
	{
		type: 'achievement',
		author: 'ft_transcendence',
		username: 'system',
		action: 'You earned a new badge!',
		preview: '🏆 100 Posts Milestone - Keep creating amazing content!',
		time: '1d ago',
		read: true,
	},
	{
		type: 'trending',
		author: 'ft_transcendence',
		username: 'system',
		action: 'Your post is trending!',
		preview: 'Your post about workspace design is gaining traction',
		time: '1d ago',
		read: true,
	},
	{
		type: 'follow',
		author: 'Lucas Garcia',
		username: 'lucasgarcia',
		action: 'started following you',
		time: '2d ago',
		read: true,
	},
	{
		type: 'like',
		author: 'Sophia Lee',
		username: 'sophialee',
		action: 'liked your post',
		preview: 'Experimental typography studies',
		time: '2d ago',
		read: true,
	},
	{
		type: 'comment',
		author: 'Noah Martinez',
		username: 'noahmartinez',
		action: 'commented on your post',
		preview: 'This is inspiring! How long did it take?',
		time: '3d ago',
		read: true,
	},
];
