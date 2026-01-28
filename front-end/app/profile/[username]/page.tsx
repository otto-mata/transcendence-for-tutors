import ProfilePageClient from '@/components/ProfilePageClient';

interface ProfilePageProps {
	params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
	// This is viewing another user's profile
	return <ProfilePageClient username={params.username} isOwnProfile={false} />;
}
