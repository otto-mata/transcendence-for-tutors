import Image from 'next/image';
import { MapPin, Link as LinkIcon, Calendar, Settings, Share2, Camera } from 'lucide-react';

export default function MyProfilePage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Cover Photo */}
			<div className="relative h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group">
				<div className="absolute inset-0 bg-black opacity-10" />

				{/* Edit Cover Button */}
				<button className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full font-medium shadow-md hover:bg-white transition-all flex items-center gap-2">
					<Camera className="w-4 h-4" />
					Edit Cover
				</button>
			</div>

			{/* Profile Header */}
			<div className="max-w-5xl mx-auto px-4">
				<div className="relative">
					{/* Profile Picture */}
					<div className="absolute -top-20 left-0 group/avatar">
						<div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-white shadow-xl" />
						<button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
							<Camera className="w-5 h-5" />
						</button>
					</div>

					{/* Action Buttons */}
					<div className="pt-6 pb-4 flex justify-end gap-3">
						<button className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
							<Share2 className="w-5 h-5 text-gray-700" />
						</button>
						<button className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium shadow-md hover: shadow-lg transition-shadow flex items-center gap-2">
							<Settings className="w-4 h-4" />
							Edit Profile
						</button>
					</div>
				</div>

				{/* Profile Info */}
				<div className="mt-4 mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-1">Sarah Anderson</h1>
					<p className="text-gray-500 mb-3">@otto-mata</p>

					<p className="text-gray-700 mb-4 max-w-2xl">
						Digital creator & designer 🎨 | Coffee enthusiast ☕ | Sharing my journey through pixels and code
					</p>

					<div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
						<div className="flex items-center gap-1.5">
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
						<button className="hover:underline">
							<span className="font-bold text-gray-900">45.2K</span>
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
						{['Posts', 'Media', 'Likes', 'Collections', 'Drafts'].map((tab, index) => (
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

				{/* Content sections continue same as above... */}
			</div>
		</div>
	);
}
