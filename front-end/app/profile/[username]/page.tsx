import Image from 'next/image';
import { MapPin, Link as LinkIcon, Calendar, MoreHorizontal, Settings, Share2, Bell, BellOff } from 'lucide-react';

export default function ProfilePage({ params }: { params: { username: string } }) {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Cover Photo */}
			<div className="relative h-64 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
				<div className="absolute inset-0 bg-black opacity-10" />
			</div>

			{/* Profile Header */}
			<div className="max-w-5xl mx-auto px-4">
				<div className="relative">
					{/* Profile Picture */}
					<div className="absolute -top-20 left-0">
						<div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-white shadow-xl" />
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
					<h1 className="text-3xl font-bold text-gray-900 mb-1">Sarah Anderson</h1>
					<p className="text-gray-500 mb-3">@{params.username}</p>

					<p className="text-gray-700 mb-4 max-w-2xl">
						Digital creator & designer 🎨 | Coffee enthusiast ☕ | Sharing my journey through pixels and code
					</p>

					<div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
						<div className="flex items-center gap-1. 5">
							<MapPin className="w-4 h-4" />
							<span>San Francisco, CA</span>
						</div>
						<div className="flex items-center gap-1.5">
							<LinkIcon className="w-4 h-4" />
							<a href="#" className="text-blue-500 hover:underline">
								sarahdesigns.com
							</a>
						</div>
						<div className="flex items-center gap-1.5">
							<Calendar className="w-4 h-4" />
							<span>Joined March 2022</span>
						</div>
					</div>

					{/* Stats */}
					<div className="flex gap-6 text-sm">
						<button className="hover:underline">
							<span className="font-bold text-gray-900">1,234</span>
							<span className="text-gray-600 ml-1">Posts</span>
						</button>
						<button className="hover: underline">
							<span className="font-bold text-gray-900">45. 2K</span>
							<span className="text-gray-600 ml-1">Followers</span>
						</button>
						<button className="hover:underline">
							<span className="font-bold text-gray-900">892</span>
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
						{userPosts.map((post, index) => (
							<div
								key={index}
								className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
							>
								<div className="relative overflow-hidden">
									<div
										className={`w-full bg-gradient-to-br ${post.gradient}`}
										style={{ height: post.height }}
									>
										<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />

										{/* Hover overlay with stats */}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
											<div className="flex gap-6 text-white font-semibold">
												<span className="flex items-center gap-2">
													❤️ {post.likes}
												</span>
												<span className="flex items-center gap-2">
													💬 {post.comments}
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="p-4">
									<p className="text-gray-700 text-sm mb-2">{post.description}</p>
									<p className="text-xs text-gray-500">{post.time}</p>
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

const userPosts = [
	{
		description: 'Minimalist workspace setup for maximum productivity 🚀',
		gradient: 'from-blue-400 to-cyan-300',
		height: '280px',
		likes: '2.4K',
		comments: '89',
		time: '2 days ago',
	},
	{
		description: 'New UI design concept for mobile banking app',
		gradient: 'from-purple-400 to-indigo-500',
		height: '320px',
		likes: '3.1K',
		comments: '124',
		time: '4 days ago',
	},
	{
		description: 'Golden hour photography experiments ✨',
		gradient: 'from-orange-400 to-pink-400',
		height: '240px',
		likes: '1.8K',
		comments: '56',
		time: '1 week ago',
	},
	{
		description: 'Coffee and code.  Best combination!  ☕',
		gradient: 'from-amber-400 to-orange-500',
		height: '300px',
		likes: '2.9K',
		comments: '102',
		time: '1 week ago',
	},
	{
		description: 'Abstract architecture photography series',
		gradient: 'from-gray-400 to-slate-500',
		height: '360px',
		likes: '4.2K',
		comments: '167',
		time: '2 weeks ago',
	},
	{
		description: 'Nature-inspired color palette 🎨',
		gradient: 'from-green-400 to-teal-400',
		height: '260px',
		likes: '1.6K',
		comments: '43',
		time: '2 weeks ago',
	},
	{
		description: 'Typography studies and experiments',
		gradient: 'from-red-400 to-pink-500',
		height: '340px',
		likes: '3.7K',
		comments: '145',
		time: '3 weeks ago',
	},
	{
		description: 'Monochrome mood board collection',
		gradient: 'from-violet-400 to-purple-500',
		height: '220px',
		likes: '2.1K',
		comments: '78',
		time: '3 weeks ago',
	},
	{
		description: 'Sunset gradient inspiration ⛰️',
		gradient: 'from-sky-400 to-blue-500',
		height: '380px',
		likes: '5.3K',
		comments: '201',
		time: '1 month ago',
	},
	{
		description: 'Urban exploration photography',
		gradient: 'from-indigo-400 to-cyan-400',
		height: '290px',
		likes: '2.7K',
		comments: '93',
		time: '1 month ago',
	},
	{
		description: 'Product design mockups',
		gradient: 'from-pink-400 to-rose-500',
		height: '310px',
		likes: '3.4K',
		comments: '156',
		time: '1 month ago',
	},
	{
		description: 'Minimalist brand identity concepts',
		gradient: 'from-emerald-400 to-green-500',
		height: '270px',
		likes: '1.9K',
		comments: '67',
		time: '2 months ago',
	},
];
