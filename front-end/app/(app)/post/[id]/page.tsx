"use client"
import { CommentResponseDto } from "@/client/Comment.dto";
import { PaginatedResponseDto } from "@/client/common.dto";
import { isLogged } from "@/client/common.mock";
import { PostResponseDto } from "@/client/Post.dto";
import { Backend } from "@/client/TransClient";
import { CommentList } from "@/components/CommentList";
import { OnePost } from "@/components/PostList";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function PostPage({ params }: { params: { id : string } }) {
	const client = Backend.getInstance();
	const router = useRouter();
	const { id } = useParams<{ id : string }>();
	const [CommentInput, setCommentInput] = useState('');
	const [change, setChange] = useState(false);
	const [error, setError] = useState('');
	const [charging, setCharging] = useState(true);
	const [comments, setComments] = useState<PaginatedResponseDto<CommentResponseDto>>({data : []});
	const [post, setPost] = useState<PostResponseDto>({
	  id: "charging",
	  content: "charging",
	  authorId: "charging",
	  likeCount: 0,
	  replyCount: 0,
	  shares: 0,
	  views: 0,
	  liked: true,
	  bookmarked: true,
	  createdAt: new Date(),
	  updatedAt: new Date(),
	});

	async function commentIt(post : PostResponseDto){
		console.log(CommentInput);
		await client.posts.$(post.id).comments.post(CommentInput);
		setCommentInput('');
		setChange(!change);
	}


	useEffect(() => {
		const run = async() => {
		  const logged = await isLogged();
		   if (!logged)
			  router.push('/auth/login');
		  
		  // Fetch current user for comment avatar
		  const userRes = await client.me.get();
		  if (userRes.ok && userRes.value) {
			const userData = typeof userRes.value === 'string' 
			  ? JSON.parse(userRes.value) 
			  : userRes.value;
			setCurrentUser(userData);
		  }
		  
		  const res = await client.posts.$(id).get();
		  if (!res.ok){
			console.log("cavapala");
			setError(res.error?.message);
			return;
		  }
		  const data = JSON.parse(res?.value);
		  if (data)
			setPost(data);
		  setCharging(false);
	}
		run();
	  }, [change]);

	  useEffect(()=> {
		const run = async() => {
			const res = await client.posts.$(id).comments.get();
			if (!res.ok) throw res.error;
			const data = JSON.parse(res?.value);
			setComments({data : data});
		}
		run();
	  }, [change])

	if (error || !post) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
						{error || 'User not found'}
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						The Post you're looking for doesn't exist or has been removed.
					</p>
				</div>
			</div>
		);
	}

	if (charging) {
			return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
						Charging.....
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						we are loading your post info
					</p>
				</div>
			</div>
		);
	}
	

	return (
	<div className="max-w-2xl mx-auto p-4">
		<OnePost post={post} charging={charging}/>
		{/* Comment something */}
		<div className="px-4">
		<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mt-4 mb-1">
			<div className="flex gap-4">
			{currentUser?.avatarUrl ? (
				<img 
					src={getMediaUrl(currentUser.avatarUrl)} 
					alt={currentUser.displayName || currentUser.username}
					className="w-10 h-10 rounded-full object-cover shrink-0"
				/>
			) : (
				<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
			)}
			<div className="flex-1">
				<input
				value={CommentInput}
				onChange={e => setCommentInput(e.target.value)}
				type="text"
				placeholder="What do you think ?"
				className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-gray-500 dark:placeholder-gray-400"
				/>
				<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
				<div className="flex gap-4 text-blue-500">
				</div>
				<button onClick={() => commentIt(post)} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">
					Post
				</button>
				</div>
			</div>
			</div>
			{/* comment list */}
		</div>
		<div className="space-y-6 px-4">
			<CommentList comments={comments} />
		</div>
		</div>
	</div>
	)
}