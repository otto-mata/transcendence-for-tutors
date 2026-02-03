'use client';

import { useState } from 'react';
import {
	Menu,
	X,
	Home,
	Compass,
	MessageCircle,
	User,
	Bookmark,
	Heart,
	LogOut,
	FileText,
	Shield
} from 'lucide-react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useUser } from '@/client/UserContext';
import { getMediaUrl } from '@/client/utils';
import FollowListModal from './FollowListModal';

export default function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [showFollowModal, setShowFollowModal] = useState<'followers' | 'following' | null>(null);
	const pathname = usePathname();
	const { user, isLoading, refreshUser } = useUser();

	function LogoutFunction(){
		localStorage.setItem('access_token', " ");
		redirect("/auth/login");
	}

	function isActive(href: string) {
		if (!pathname) return false;
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}

	const toggleMenu = () => setIsOpen(!isOpen);
	const closeMenu = () => setIsOpen(false);

	const formatCount = (count: number | undefined | null) => {
		if (count == null) return '0';
		if (count >= 1000000) {
			return (count / 1000000).toFixed(1) + 'M';
		} else if (count >= 1000) {
			return (count / 1000).toFixed(1) + 'K';
		}
		return count.toString();
	};

	return (
		<>
			{/* Burger Menu Button - Fixed to top */}
			<button
				onClick={toggleMenu}
				className="fixed top-4 left-4 z-50 p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all lg:hidden"
				aria-label="Toggle menu"
			>
				{isOpen ? (
					<X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
				) : (
					<Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
				)}
			</button>

			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
					onClick={closeMenu}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
			>
				{/* Profile Section */}
				<div className="p-6 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
					<div className="flex items-center gap-4 mb-4">
						{user?.avatarUrl ? (
												<img 
													src={getMediaUrl(user.avatarUrl)} 
													alt={user.displayName || user.username}
													className="w-10 h-10 rounded-full object-cover"
												/>
											) : (
												<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
											)}
						<div className="flex-1">
							<h3 className="text-white font-bold text-lg">{user?.displayName || user?.username || 'User'}</h3>
							<p className="text-white/80 text-sm">@{user?.username || 'loading'}</p>
						</div>
					</div>

					<div className="flex gap-4 text-white text-sm">
						<Link href="/profile" onClick={closeMenu}>
							<span className="font-bold">{formatCount(user?.postCount)}</span>
							<span className="ml-1 opacity-80">Posts</span>
						</Link>
						<button onClick={() => setShowFollowModal('followers')} className="hover:underline">
							<span className="font-bold">{formatCount(user?.followerCount)}</span>
							<span className="ml-1 opacity-80">Followers</span>
						</button>
						<button onClick={() => setShowFollowModal('following')} className="hover:underline">
							<span className="font-bold">{formatCount(user?.followingCount)}</span>
							<span className="ml-1 opacity-80">Following</span>
						</button>
					</div>
				</div>

				{/* Navigation Links */}
				<nav className="flex-1 overflow-y-auto py-4">
					<div className="space-y-1 px-3">
						<NavLink href="/" icon={<Home className="w-5 h-5" />} label="Home" onClick={closeMenu} active={isActive('/')} />
						<NavLink
							href="/explore"
							icon={<Compass className="w-5 h-5" />}
							label="Explore"
							onClick={closeMenu}
							active={isActive('/explore')}
						/>
						<NavLink
							href="/messages"
							icon={<MessageCircle className="w-5 h-5" />}
							label="Messages"
							onClick={closeMenu}
							active={isActive('/messages')}
						/>
						<NavLink
							href="/profile"
							icon={<User className="w-5 h-5" />}
							label="Profile"
							onClick={closeMenu}
							active={isActive('/profile')}
						/>
					</div>

					{/* Divider */}
					<div className="my-4 border-t border-gray-200 dark:border-gray-700 " />

					<div className="space-y-1 px-3">
						<NavLink href="/post/saved" icon={<Bookmark className="w-5 h-5" />} label="Bookmarks" onClick={closeMenu} active={isActive('/post/saved')} />
						<NavLink href="/post/liked" icon={<Heart className="w-5 h-5" />} label="Likes" onClick={closeMenu} active={isActive('/post/liked')} />
					</div>

					{/* Divider */}
					<div className="my-4 border-t border-gray-200 dark:border-gray-700 " />

					<div className="space-y-1 px-3">
						<NavLink href="/legal/terms" icon={<FileText className="w-5 h-5" />} label="Terms of Service" onClick={closeMenu} active={isActive('/legal/terms')} />
						<NavLink href="/legal/privacy" icon={<Shield className="w-5 h-5" />} label="Privacy Policy" onClick={closeMenu} active={isActive('/legal/privacy')} />
					</div>
				</nav>

				{/* Logout Button */}
				<div className="p-4 border-t border-gray-200 dark:bg-gray-700 ">
					<button onClick={LogoutFunction} className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
						<LogOut className="w-5 h-5" />
						<span>Logout</span>
					</button>
				</div>
			</div>

			{/* Follow List Modal */}
			{showFollowModal && user && (
				<FollowListModal
					isOpen={!!showFollowModal}
					onClose={() => setShowFollowModal(null)}
					username={user.username}
					userId={user.id}
					type={showFollowModal}
					isOwnProfile={true}
					currentUserId={user.id}
					onFollowerRemoved={refreshUser}
				/>
			)}
		</>
	);
}

// NavLink Component
function NavLink({
	href,
	icon,
	label,
	badge,
	onClick,
	active
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
	badge?: number;
	onClick?: () => void;
	active?: boolean;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors group relative ${active ? 'bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-blue-500' : 'text-gray-700 hover:bg-gray-100'}`}
		>
			<div className={`${active ? 'text-blue-500' : 'text-gray-600 group-hover:text-blue-500'} transition-colors`}>
				{icon}
			</div>
			<span className="font-medium flex-1">{label}</span>
			{badge && (
				<span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
					{badge > 99 ? '99+' : badge}
				</span>
			)}
		</Link>
	);
}
