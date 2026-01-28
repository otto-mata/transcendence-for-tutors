'use client';

import { X, Camera, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { Backend } from '@/client/TransClient';
import { getMediaUrl } from '@/client/utils';
import { UserProfileResponse, UpdateUserDto } from '@/client/Users.dto';

interface EditProfileModalProps {
	onClose: () => void;
	user: UserProfileResponse;
	onUpdate: (user: UserProfileResponse) => void;
}

export default function EditProfileModal({ onClose, user, onUpdate }: EditProfileModalProps) {
	const [formData, setFormData] = useState({
		displayName: user.displayName || '',
		bio: user.bio || '',
		website: user.website || '',
		isPrivate: user.isPrivate || false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(getMediaUrl(user.avatarUrl) || null);
	const [coverPreview, setCoverPreview] = useState<string | null>(getMediaUrl(user.coverImageUrl) || null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [coverFile, setCoverFile] = useState<File | null>(null);
	
	const avatarInputRef = useRef<HTMLInputElement>(null);
	const coverInputRef = useRef<HTMLInputElement>(null);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setCoverFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setCoverPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const backend = Backend.getInstance();
			let updatedUser = user;

			// Update avatar if changed
			if (avatarFile) {
				const avatarResult = await backend.api.me.updateAvatar(avatarFile);
				if (!avatarResult.ok) {
					throw new Error('Failed to update avatar');
				}
				updatedUser = avatarResult.value as UserProfileResponse;
			}

			// Update cover if changed
			if (coverFile) {
				const coverResult = await backend.api.me.updateCover(coverFile);
				if (!coverResult.ok) {
					throw new Error('Failed to update cover image');
				}
				updatedUser = coverResult.value as UserProfileResponse;
			}

			// Update profile data
			const updateData: UpdateUserDto = {
				displayName: formData.displayName || undefined,
				bio: formData.bio || undefined,
				website: formData.website || undefined,
				isPrivate: formData.isPrivate,
			};

			const result = await backend.api.me.patch(updateData);
			if (!result.ok) {
				throw new Error('Failed to update profile');
			}

			updatedUser = result.value as UserProfileResponse;
			onUpdate(updatedUser);
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Edit Profile</h2>
					<button
						onClick={onClose}
						disabled={isLoading}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
					>
						<X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
					</div>
				)}

				{/* Form */}
				<div className="p-6 space-y-6">
					{/* Cover Photo */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Cover Photo
						</label>
						<div 
							className="relative h-32 rounded-xl overflow-hidden cursor-pointer"
							onClick={() => coverInputRef.current?.click()}
						>
							{coverPreview ? (
								<img 
									src={coverPreview} 
									alt="Cover" 
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
							)}
							<div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-white font-medium">
								<Camera className="w-6 h-6 mr-2" />
								Change Cover Photo
							</div>
							<input
								ref={coverInputRef}
								type="file"
								accept="image/*"
								onChange={handleCoverChange}
								className="hidden"
							/>
						</div>
					</div>

					{/* Profile Picture */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Profile Picture
						</label>
						<div className="flex items-center gap-4">
							<div 
								className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group"
								onClick={() => avatarInputRef.current?.click()}
							>
								{avatarPreview ? (
									<img 
										src={avatarPreview} 
										alt="Avatar" 
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-400" />
								)}
								<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<Camera className="w-6 h-6 text-white" />
								</div>
							</div>
							<button 
								type="button"
								onClick={() => avatarInputRef.current?.click()}
								className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							>
								Change Photo
							</button>
							<input
								ref={avatarInputRef}
								type="file"
								accept="image/*"
								onChange={handleAvatarChange}
								className="hidden"
							/>
						</div>
					</div>

					{/* Display Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Display Name
						</label>
						<input
							type="text"
							value={formData.displayName}
							onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
							placeholder="Your display name"
							className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all text-gray-900 dark:text-gray-100"
						/>
					</div>

					{/* Bio */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Bio
						</label>
						<textarea
							value={formData.bio}
							onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
							rows={4}
							maxLength={160}
							placeholder="Tell us about yourself"
							className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all resize-none text-gray-900 dark:text-gray-100"
						/>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							{formData.bio.length}/160 characters
						</p>
					</div>

					{/* Website */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Website
						</label>
						<input
							type="url"
							value={formData.website}
							onChange={(e) => setFormData({ ...formData, website: e.target.value })}
							placeholder="https://yourwebsite.com"
							className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all text-gray-900 dark:text-gray-100"
						/>
					</div>

					{/* Private Account Toggle */}
					<div className="flex items-center justify-between">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Private Account
							</label>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Only approved followers can see your posts
							</p>
						</div>
						<button
							type="button"
							onClick={() => setFormData({ ...formData, isPrivate: !formData.isPrivate })}
							className={`relative w-12 h-6 rounded-full transition-colors ${
								formData.isPrivate ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
							}`}
						>
							<div
								className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
									formData.isPrivate ? 'translate-x-6' : 'translate-x-0'
								}`}
							/>
						</button>
					</div>
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
					<button
						onClick={onClose}
						disabled={isLoading}
						className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
					>
						Cancel
					</button>
					<button 
						onClick={handleSubmit}
						disabled={isLoading}
						className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
					>
						{isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
						{isLoading ? 'Saving...' : 'Save Changes'}
					</button>
				</div>
			</div>
		</div>
	);
}
