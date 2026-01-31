"use client"
import { MansonPostGridAll} from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function printit(){
	console.log("Button clicked");
}

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

const MockPosts = [
	{
		author: 'Alex Chen',
		username: 'AlexChen',
		time: '2h ago',
		description: 'Minimalist workspace setup for maximum productivity 🚀 Minimalist workspace setup for maximum productivity 🚀 Minimalist workspace setup for maximum productivity 🚀 Minimalist workspace  maximum productivity 🚀 Minimalist workspace setup for maximum productivity 🚀 Minimalist ',
		gradient: null,
		height: '200px',
		likes: '2. 4K',
		comments: '89',
	},
	{
		author: 'Sarah Kim',
		username: 'SarahKim',
		time: '4h ago',
		description: 'Golden hour at the beach never disappoints ✨',
		gradient: 'from-orange-400 to-pink-400',
		height: '20px',
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
