"use client"
import { MansonPostGridAll} from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExplorePage() {
	const router = useRouter();
	const [error, setError] = useState('');

	useEffect(() => {
	const run = async() => {
		if (!await isLogged()){
			router.push('/auth/login');
			setError('You must be logged in to view this page.')
	}
	}
	run();
	}, [router]);

	return (
		<MansonPostGridAll/>
	);
}
