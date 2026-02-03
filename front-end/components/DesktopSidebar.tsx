"use client";

import { useUser } from '@/client/UserContext';
import { getMediaUrl } from '@/client/utils';
import {
	Home,
	Compass,
	MessageCircle,
	User,
	Bookmark,
	Heart,
	LogOut,
	PlusCircle,
	FileText,
	Shield
} from 'lucide-react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

export default function DesktopSidebar() {
	const pathname = usePathname();
	const { user, isLoading } = useUser();

	function LogoutFunction(){
		localStorage.setItem('access_token', " ");
		redirect("/auth/login");
	}

	function isActive(href: string) {
		if (!pathname) return false;
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
	return (
		<aside className="sticky left-0 top-0 h-screen w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 p-6 flex flex-col">
			{/* Logo */}
			<div className="mb-8">
				<h1 className="text-xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent uppercase">
					ft_transcendence
				</h1>
			</div>

			{/* Navigation */}
			<nav className="flex-1 space-y-2">
				<SidebarLink href="/" icon={<Home />} label="Home" active={isActive('/')} />
				<SidebarLink href="/explore" icon={<Compass />} label="Explore" active={isActive('/explore')} />
				<SidebarLink href="/messages" icon={<MessageCircle />} label="Messages" active={isActive('/messages')} />
				<SidebarLink href="/profile" icon={<User />} label="Profile" active={isActive('/profile')} />
				<SidebarLink href="/post/saved" icon={<Bookmark />} label="Bookmarks" active={isActive('/post/saved')} />
				<SidebarLink href="/post/liked" icon={<Heart />} label="Likes" active={isActive('/post/liked')} />
				
				{/* Divider */}
				<div className="my-4 border-t border-gray-200 dark:border-gray-700" />
				
				<SidebarLink href="/legal/terms" icon={<FileText />} label="Terms of Service" active={isActive('/legal/terms')} />
				<SidebarLink href="/legal/privacy" icon={<Shield />} label="Privacy Policy" active={isActive('/legal/privacy')} />
			</nav>

			{/* Create Post Button */}
			<button onClick={() => {redirect("/post/create")}} className="w-full mb-4 py-3 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
				<PlusCircle className="w-5 h-5" />
				Create Post
			</button>

			{/* Profile */}
			<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
				<Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
					{user?.avatarUrl ? (
						<img 
							src={getMediaUrl(user.avatarUrl)} 
							alt={user.displayName || user.username}
							className="w-10 h-10 rounded-full object-cover"
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
					)}
					<div className="flex-1 min-w-0">
						<p className="font-semibold text-sm text-gray-900 dark:text-gray-50 truncate">{user?.displayName || (isLoading ? 'charging' : user?.username || 'User')}</p>
						<p className="text-xs text-gray-500 truncate">@{user?.username || 'charging'}</p>
					</div>
					<LogOut onClick={LogoutFunction} className="w-4 h-4 text-gray-400 dark:text-gray-600" />
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
				? 'bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-blue-500'
				: 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700  dark:hover:text-gray-400'
				}`}
		>
			<div className={`${active ? 'text-blue-500' : 'text-gray-600 group-hover:text-blue-500'} transition-colors`}>
				{icon}
			</div>
			<span className="font-medium flex-1">{label}</span>
			{badge && (
				<span className="px-2 py-0.5 bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
					{badge > 99 ? '99+' : badge}
				</span>
			)}
		</Link>
	);
}
