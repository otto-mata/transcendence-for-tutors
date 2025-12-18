'use client';

import {
	Home,
	Compass,
	Bell,
	MessageCircle,
	User,
	Settings,
	Bookmark,
	Heart,
	TrendingUp,
	LogOut,
	PlusCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DesktopSidebar() {
	return (
		<aside className="sticky left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
			{/* Logo */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
					SocialApp
				</h1>
			</div>

			{/* Navigation */}
			<nav className="flex-1 space-y-2">
				<SidebarLink href="/" icon={<Home />} label="Home" active />
				<SidebarLink href="/explore" icon={<Compass />} label="Explore" />
				<SidebarLink href="/notifications" icon={<Bell />} label="Notifications" badge={12} />
				<SidebarLink href="/messages" icon={<MessageCircle />} label="Messages" badge={3} />
				<SidebarLink href="/profile" icon={<User />} label="Profile" />
				<SidebarLink href="/bookmarks" icon={<Bookmark />} label="Bookmarks" />
				<SidebarLink href="/likes" icon={<Heart />} label="Likes" />
				<SidebarLink href="/trending" icon={<TrendingUp />} label="Trending" />
				<SidebarLink href="/settings" icon={<Settings />} label="Settings" />
			</nav>

			{/* Create Post Button */}
			<button className="w-full mb-4 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
				<PlusCircle className="w-5 h-5" />
				Create Post
			</button>

			{/* Profile */}
			<div className="pt-4 border-t border-gray-200">
				<Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
					<div className="flex-1 min-w-0">
						<p className="font-semibold text-sm text-gray-900 truncate">Sarah Anderson</p>
						<p className="text-xs text-gray-500 truncate">@otto-mata</p>
					</div>
					<LogOut className="w-4 h-4 text-gray-400" />
				</Link>
			</div>
		</aside>
	);
}

function SidebarLink({
	href,
	icon,
	label,
	badge,
	active = false
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
	badge?: number;
	active?: boolean;
}) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${active
				? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-blue-500'
				: 'text-gray-700 hover:bg-gray-100'
				}`}
		>
			<div className={`${active ? 'text-blue-500' : 'text-gray-600 group-hover:text-blue-500'} transition-colors`}>
				{icon}
			</div>
			<span className="font-medium flex-1">{label}</span>
			{badge && (
				<span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
					{badge > 99 ? '99+' : badge}
				</span>
			)}
		</Link>
	);
}
