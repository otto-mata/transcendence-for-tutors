'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
	const [formData, setFormData] = useState({
		name: 'Sarah Anderson',
		username: 'otto-mata',
		bio: 'Digital creator & designer 🎨 | Coffee enthusiast ☕ | Sharing my journey through pixels and code',
		location: 'San Francisco, CA',
		website: 'sarahdesigns.com',
	});

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X className="w-5 h-5 text-gray-600" />
					</button>
				</div>

				{/* Form */}
				<div className="p-6 space-y-6">
					{/* Cover Photo */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Cover Photo
						</label>
						<div className="relative h-32 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden">
							<button className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-white font-medium">
								Change Cover Photo
							</button>
						</div>
					</div>

					{/* Profile Picture */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Profile Picture
						</label>
						<div className="flex items-center gap-4">
							<div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
							<button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
								Change Photo
							</button>
						</div>
					</div>

					{/* Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Name
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
						/>
					</div>

					{/* Username */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Username
						</label>
						<div className="flex items-center">
							<span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-600">
								@
							</span>
							<input
								type="text"
								value={formData.username}
								onChange={(e) => setFormData({ ...formData, username: e.target.value })}
								className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
							/>
						</div>
					</div>

					{/* Bio */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Bio
						</label>
						<textarea
							value={formData.bio}
							onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
							rows={4}
							maxLength={160}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
						/>
						<p className="text-sm text-gray-500 mt-1">
							{formData.bio.length}/160 characters
						</p>
					</div>

					{/* Location */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Location
						</label>
						<input
							type="text"
							value={formData.location}
							onChange={(e) => setFormData({ ...formData, location: e.target.value })}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
						/>
					</div>

					{/* Website */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Website
						</label>
						<input
							type="url"
							value={formData.website}
							onChange={(e) => setFormData({ ...formData, website: e.target.value })}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus: ring-2 focus:ring-blue-500 focus:bg-white transition-all"
						/>
					</div>
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
					>
						Cancel
					</button>
					<button className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-md">
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}
