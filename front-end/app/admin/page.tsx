
'use client';

import React, { useState } from 'react';
import { WithSidebar } from '@/components/ContentWithSidebar';
import UsersPanel from '@/components/AdminPanels/UsersPanel';
import PostsPanel from '@/components/AdminPanels/PostsPanel';
import ReportsPanel from '@/components/AdminPanels/ReportsPanel';
import NotificationsPanel from '@/components/AdminPanels/NotificationsPanel';

export default function AdminPage() {
	const [panel, setPanel] = useState<string | null>(null);
	return (
		<WithSidebar>
			<div className="max-w-4xl mx-auto py-8 px-4">
				<header className="mb-6">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<p className="text-sm text-gray-600">Overview and quick actions for administrators</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card title="Users" subtitle="Manage users, roles and activity">
						<button onClick={() => setPanel('users')} className="mt-3 px-3 py-2 bg-blue-500 text-white rounded">View users</button>
					</Card>

					<Card title="Posts" subtitle="Review or remove problematic posts">
						<button onClick={() => setPanel('posts')} className="mt-3 px-3 py-2 bg-blue-500 text-white rounded">View posts</button>
					</Card>

					<Card title="Reports" subtitle="See user reports and handle them">
						<button onClick={() => setPanel('reports')} className="mt-3 px-3 py-2 bg-blue-500 text-white rounded">View reports</button>
					</Card>

					<Card title="Notifications" subtitle="Broadcast system notifications">
						<button onClick={() => setPanel('notifications')} className="mt-3 px-3 py-2 bg-blue-500 text-white rounded">Send notification</button>
					</Card>
				</div>

				{panel === 'users' && (
					<div className="mt-6">
						<UsersPanel />
					</div>
				)}
				{panel === 'posts' && (
					<div className="mt-6">
						<PostsPanel />
					</div>
				)}
				{panel === 'reports' && (
					<div className="mt-6">
						<ReportsPanel />
					</div>
				)}
				{panel === 'notifications' && (
					<div className="mt-6">
						<NotificationsPanel />
					</div>
				)}

				<section className="mt-8">
					<h2 className="text-lg font-semibold mb-3">Recent activity</h2>
					<div className="space-y-3">
						<div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">No recent activity</div>
					</div>
				</section>
			</div>
		</WithSidebar>
	);
}

function Card({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
	return (
		<div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-semibold text-lg">{title}</p>
					<p className="text-sm text-gray-500">{subtitle}</p>
				</div>
			</div>
			{children}
		</div>
	);
}
