import { Search, TrendingUp, Hash, MapPin, Save, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function ExplorePage() {
	return (
		<div className='w-full p-4'>
			<div className="sticky top-0 z-10 bg-white dark:bg-gray-900">
				<div className="max-w-xs sm:max-w-lg md:max-w-full mx-auto px-4 py-4">
					<div className="relative">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200 w-5 h-5" />
						<input
							type="text"
							placeholder="Search content, app settings..."
							className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
						/>
					</div>
				</div>
			</div>

			<div className="max-w-xs sm:max-w-lg md:max-w-full mx-auto py-6">


				{/* Masonry Grid */}
				<div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
					
				</div>
			</div>
		</div>
	);
}