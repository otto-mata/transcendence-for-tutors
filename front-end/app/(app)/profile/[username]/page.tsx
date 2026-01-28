import ProfilePageClient from '@/components/ProfilePageClient';

interface ProfilePageProps {
	params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	// This is viewing another user's profile
	const { username } = await params;
	return <ProfilePageClient username={username} isOwnProfile={false} />;
}
