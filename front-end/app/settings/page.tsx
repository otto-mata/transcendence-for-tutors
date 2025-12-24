'use client';

import { useState } from 'react';
import {
	User,
	Bell,
	Eye,
	Palette,
	Globe,
	Shield,
	CreditCard,
	HelpCircle,
	ChevronRight,
	Moon,
	Sun,
	Monitor,
} from 'lucide-react';

export default function SettingsPage() {
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [darkMode, setDarkMode] = useState('system');
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);
	const [profilePrivacy, setProfilePrivacy] = useState('public');
	const [twoFactorAuth, setTwoFactorAuth] = useState(false);

	const settingsSections = [
		{ id: 'account', icon: <User className="w-5 h-5" />, title: 'Account', description: 'Manage your account details' },
		{ id: 'privacy', icon: <Eye className="w-5 h-5" />, title: 'Privacy & Safety', description: 'Control who can see your content' },
		{ id: 'notifications', icon: <Bell className="w-5 h-5" />, title: 'Notifications', description: 'Manage notification preferences' },
		{ id: 'appearance', icon: <Palette className="w-5 h-5" />, title: 'Appearance', description: 'Customize your experience' },
		{ id: 'security', icon: <Shield className="w-5 h-5" />, title: 'Security', description: 'Password and authentication' },
		{ id: 'language', icon: <Globe className="w-5 h-5" />, title: 'Language & Region', description: 'Select your language' },
		{ id: 'billing', icon: <CreditCard className="w-5 h-5" />, title: 'Billing', description: 'Manage subscriptions' },
		{ id: 'help', icon: <HelpCircle className="w-5 h-5" />, title: 'Help & Support', description: 'Get help when you need it' },
	];

	return (
		<div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-4xl mx-auto py-8 px-4">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Settings</h1>
					<p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
				</div>

				{/* Settings Sections */}
				<div className="space-y-4">
					{settingsSections.map((section) => (
						<div key={section.id}>
							<button
								onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
								className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
							>
								<div className="flex items-center gap-4">
									<div className="text-blue-500">{section.icon}</div>
									<div className="flex-1 text-left">
										<h3 className="font-semibold text-gray-900 dark:text-gray-50">{section.title}</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
									</div>
									<ChevronRight
										className={`w-5 h-5 text-gray-400 transition-transform ${
											activeSection === section.id ? 'rotate-90' : ''
										}`}
									/>
								</div>
							</button>

							{/* Expanded Content */}
							{activeSection === section.id && (
								<div className="mt-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
									{section.id === 'account' && <AccountSettings />}
									{section.id === 'privacy' && <PrivacySettings profilePrivacy={profilePrivacy} setProfilePrivacy={setProfilePrivacy} />}
									{section.id === 'notifications' && (
										<NotificationSettings
											emailNotifications={emailNotifications}
											setEmailNotifications={setEmailNotifications}
											pushNotifications={pushNotifications}
											setPushNotifications={setPushNotifications}
										/>
									)}
									{section.id === 'appearance' && <AppearanceSettings darkMode={darkMode} setDarkMode={setDarkMode} />}
									{section.id === 'security' && <SecuritySettings twoFactorAuth={twoFactorAuth} setTwoFactorAuth={setTwoFactorAuth} />}
									{section.id === 'language' && <LanguageSettings />}
									{section.id === 'billing' && <BillingSettings />}
									{section.id === 'help' && <HelpSettings />}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// Account Settings Component
function AccountSettings() {
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
				<input
					type="text"
					defaultValue="@otto-mata"
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
				<input
					type="email"
					defaultValue="sarah@example.com"
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
				<textarea
					defaultValue="Digital creator & designer 🎨 | Coffee enthusiast ☕"
					rows={3}
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			<button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
				Save Changes
			</button>
		</div>
	);
}

// Privacy Settings Component
function PrivacySettings({ profilePrivacy, setProfilePrivacy }: { profilePrivacy: string; setProfilePrivacy: (value: string) => void }) {
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Visibility</label>
				<select
					value={profilePrivacy}
					onChange={(e) => setProfilePrivacy(e.target.value)}
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				>
					<option value="public">Public</option>
					<option value="followers">Followers Only</option>
					<option value="private">Private</option>
				</select>
			</div>
			<div className="flex items-center justify-between py-2">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">Allow tags</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Let others tag you in posts</p>
				</div>
				<ToggleSwitch defaultChecked />
			</div>
			<div className="flex items-center justify-between py-2">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">Show activity status</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Let others see when you&apos;re active</p>
				</div>
				<ToggleSwitch defaultChecked />
			</div>
		</div>
	);
}

// Notification Settings Component
function NotificationSettings({
	emailNotifications,
	setEmailNotifications,
	pushNotifications,
	setPushNotifications,
}: {
	emailNotifications: boolean;
	setEmailNotifications: (value: boolean) => void;
	pushNotifications: boolean;
	setPushNotifications: (value: boolean) => void;
}) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between py-2">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">Email Notifications</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
				</div>
				<ToggleSwitch checked={emailNotifications} onChange={setEmailNotifications} />
			</div>
			<div className="flex items-center justify-between py-2">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">Push Notifications</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications on your device</p>
				</div>
				<ToggleSwitch checked={pushNotifications} onChange={setPushNotifications} />
			</div>
			<div className="flex items-center justify-between py-2">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">New followers</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Get notified when someone follows you</p>
				</div>
				<ToggleSwitch defaultChecked />
			</div>
			<div className="flex items-center justify-between py-2">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">Likes and comments</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Get notified about interactions on your posts</p>
				</div>
				<ToggleSwitch defaultChecked />
			</div>
		</div>
	);
}

// Appearance Settings Component
function AppearanceSettings({ darkMode, setDarkMode }: { darkMode: string; setDarkMode: (value: string) => void }) {
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
				<div className="grid grid-cols-3 gap-3">
					<button
						onClick={() => setDarkMode('light')}
						className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
							darkMode === 'light'
								? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
								: 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
						}`}
					>
						<Sun className="w-6 h-6 text-yellow-500" />
						<span className="text-sm font-medium text-gray-900 dark:text-gray-50">Light</span>
					</button>
					<button
						onClick={() => setDarkMode('dark')}
						className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
							darkMode === 'dark'
								? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
								: 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
						}`}
					>
						<Moon className="w-6 h-6 text-blue-500" />
						<span className="text-sm font-medium text-gray-900 dark:text-gray-50">Dark</span>
					</button>
					<button
						onClick={() => setDarkMode('system')}
						className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
							darkMode === 'system'
								? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
								: 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
						}`}
					>
						<Monitor className="w-6 h-6 text-gray-500" />
						<span className="text-sm font-medium text-gray-900 dark:text-gray-50">System</span>
					</button>
				</div>
			</div>
		</div>
	);
}

// Security Settings Component
function SecuritySettings({ twoFactorAuth, setTwoFactorAuth }: { twoFactorAuth: boolean; setTwoFactorAuth: (value: boolean) => void }) {
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
				<input
					type="password"
					placeholder="Enter current password"
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
				<input
					type="password"
					placeholder="Enter new password"
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
				<input
					type="password"
					placeholder="Confirm new password"
					className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			<div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
				<div>
					<h4 className="font-medium text-gray-900 dark:text-gray-50">Two-Factor Authentication</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
				</div>
				<ToggleSwitch checked={twoFactorAuth} onChange={setTwoFactorAuth} />
			</div>
			<button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
				Update Password
			</button>
		</div>
	);
}

// Language Settings Component
function LanguageSettings() {
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Language</label>
				<select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="fr">Français</option>
					<option value="de">Deutsch</option>
					<option value="pt">Português</option>
				</select>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Zone</label>
				<select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
					<option value="pst">Pacific Time (PT)</option>
					<option value="mst">Mountain Time (MT)</option>
					<option value="cst">Central Time (CT)</option>
					<option value="est">Eastern Time (ET)</option>
					<option value="utc">UTC</option>
				</select>
			</div>
		</div>
	);
}

// Billing Settings Component
function BillingSettings() {
	return (
		<div className="space-y-4">
			<div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-6 text-white">
				<h3 className="text-xl font-bold mb-2">Free Plan</h3>
				<p className="text-sm opacity-90 mb-4">You&apos;re currently on the free plan</p>
				<button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
					Upgrade to Premium
				</button>
			</div>
			<div className="pt-4">
				<h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">Payment Method</h4>
				<p className="text-sm text-gray-600 dark:text-gray-400">No payment method added</p>
				<button className="mt-3 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
					Add Payment Method
				</button>
			</div>
		</div>
	);
}

// Help Settings Component
function HelpSettings() {
	return (
		<div className="space-y-4">
			<button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
				<h4 className="font-medium text-gray-900 dark:text-gray-50">Help Center</h4>
				<p className="text-sm text-gray-600 dark:text-gray-400">Browse articles and guides</p>
			</button>
			<button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
				<h4 className="font-medium text-gray-900 dark:text-gray-50">Contact Support</h4>
				<p className="text-sm text-gray-600 dark:text-gray-400">Get help from our team</p>
			</button>
			<button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
				<h4 className="font-medium text-gray-900 dark:text-gray-50">Report a Problem</h4>
				<p className="text-sm text-gray-600 dark:text-gray-400">Let us know if something isn&apos;t working</p>
			</button>
			<button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
				<h4 className="font-medium text-gray-900 dark:text-gray-50">Terms & Privacy</h4>
				<p className="text-sm text-gray-600 dark:text-gray-400">Review our policies</p>
			</button>
		</div>
	);
}

// Toggle Switch Component
function ToggleSwitch({
	checked,
	defaultChecked,
	onChange,
}: {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (value: boolean) => void;
}) {
	const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
	
	// Use controlled value if provided, otherwise use internal state
	const isChecked = checked !== undefined ? checked : internalChecked;

	const handleToggle = () => {
		const newValue = !isChecked;
		if (checked === undefined) {
			setInternalChecked(newValue);
		}
		onChange?.(newValue);
	};

	return (
		<button
			onClick={handleToggle}
			className={`relative w-12 h-6 rounded-full transition-colors ${
				isChecked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
			}`}
		>
			<div
				className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
					isChecked ? 'translate-x-6' : 'translate-x-0'
				}`}
			/>
		</button>
	);
}
