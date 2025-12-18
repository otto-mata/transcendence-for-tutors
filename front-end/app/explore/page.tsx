import { Search, TrendingUp, Hash, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ExplorePage() {
	return (
		<div className='w-full p-4'>
			<div className="sticky top-0 z-10 bg-white dark:bg-gray-900">
				<div className="max-w-xs sm:max-w-lg md:max-w-full mx-auto px-4 py-4">
					<div className="relative">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search content, app settings..."
							className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
						/>
					</div>
				</div>
			</div>

			<div className="max-w-xs sm:max-w-lg md:max-w-full mx-auto py-6">
				{/* Trending Section */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
						<TrendingUp className="w-6 h-6 text-blue-500" />
						Trending Now
					</h2>
					<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
						{trendingTopics.map((topic, index) => (
							<div
								key={index}
								className="shrink-0 bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
							>
								<div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
									<Hash className="w-4 h-4" />
									<span>Trending</span>
								</div>
								<h3 className="font-semibold text-gray-900">{topic.name}</h3>
								<p className="text-sm text-gray-500">{topic.posts} posts</p>
							</div>
						))}
					</div>
				</div>

				{/* Categories */}
				<div className="mb-6">
					<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
						{categories.map((category, index) => (
							<button
								key={index}
								className={`shrink-0 px-6 py-2 rounded-full font-medium transition-all ${index === 0
									? 'bg-blue-500 text-white shadow-md'
									: 'bg-white text-gray-700 hover:bg-gray-100'
									} `}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Masonry Grid */}
				<div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
					{posts.map((post, index) => (
						<div
							key={index}
							className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
						>
							{post.gradient && <div className="relative overflow-hidden">
								<div
									className={`w-full bg-linear-to-br ${post.gradient} `}
									style={{ height: post.height }}
								>
									{/* Overlay on hover */}
									<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
								</div>
							</div>}
							<div className="p-4">
								<div className="flex items-center gap-3 mb-3">
									<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
									<div>
										<Link href={`profile/${post.username} `}>
											<h4 className="font-semibold text-sm text-gray-900">
												{post.author}
											</h4>
										</Link>
										<p className="text-xs text-gray-500">{post.time}</p>
									</div>
								</div>
								<p className="text-gray-700 text-sm mb-3">{post.description}</p>
								<div className="flex items-center justify-between text-gray-500">
									<div className="flex gap-4 text-sm">
										<span className="hover:text-red-500 transition-colors cursor-pointer">
											❤️ {post.likes}
										</span>
										<span className="hover:text-blue-500 transition-colors cursor-pointer">
											💬 {post.comments}
										</span>
									</div>
									<button className="text-gray-400 hover:text-gray-600">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3. 5L5 21V5z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// Sample data
const trendingTopics = [
	{ name: 'TechTrends', posts: '12. 5K' },
	{ name: 'DesignInspo', posts: '8.2K' },
	{ name: 'Photography', posts: '15.1K' },
	{ name: 'Travel2024', posts: '6.8K' },
];

const categories = [
	'All',
	'Popular',
	'Design',
	'Photography',
	'Art',
	'Technology',
	'Fashion',
	'Food',
];

const posts = [
	{
		author: 'Alex Chen',
		username: 'AlexChen',
		time: '2h ago',
		description: 'Minimalist workspace setup for maximum productivity 🚀',
		gradient: null,
		height: '280px',
		likes: '2. 4K',
		comments: '89',
	},
	{
		author: 'Sarah Kim',
		username: 'SarahKim',
		time: '4h ago',
		description: 'Golden hour at the beach never disappoints ✨',
		gradient: 'from-orange-400 to-pink-400',
		height: '320px',
		likes: '3.1K',
		comments: '124',
	},
	{
		author: 'Mike Johnson',
		username: 'MikeJohnson',
		time: '6h ago',
		description: 'New UI design concept for mobile banking app',
		gradient: 'from-purple-400 to-indigo-500',
		height: '240px',
		likes: '1.8K',
		comments: '56',
	},
	{
		author: 'Emma Davis',
		username: 'EmmaDavis',
		time: '8h ago',
		description: 'Coffee and code.  Best combination!  ☕',
		gradient: 'from-amber-400 to-orange-500',
		height: '300px',
		likes: '2.9K',
		comments: '102',
	},
	{
		author: 'James Wilson',
		username: 'JamesWilson',
		time: '10h ago',
		description: 'Abstract architecture photography from downtown',
		gradient: null,
		height: '360px',
		likes: '4.2K',
		comments: '167',
	},
	{
		author: 'Olivia Brown',
		username: 'OliviaBrown',
		time: '12h ago',
		description: 'Nature-inspired color palette for your next project 🎨',
		gradient: 'from-green-400 to-teal-400',
		height: '260px',
		likes: '1.6K',
		comments: '43',
	},
	{
		author: 'Lucas Garcia',
		username: 'LucasGarcia',
		time: '14h ago',
		description: 'Street art brings color to urban spaces',
		gradient: 'from-red-400 to-pink-500',
		height: '340px',
		likes: '3.7K',
		comments: '145',
	},
	{
		author: 'Sophia Lee',
		username: 'SophiaLee',
		time: '16h ago',
		description: 'Experimental typography studies',
		gradient: 'from-violet-400 to-purple-500',
		height: '220px',
		likes: '2.1K',
		comments: '78',
	},
	{
		author: 'Noah Martinez',
		username: 'NoahMartinez',
		time: '18h ago',
		description: 'Mountain peaks above the clouds ⛰️',
		gradient: 'from-sky-400 to-blue-500',
		height: '380px',
		likes: '5.3K',
		comments: '201',
	},
];
