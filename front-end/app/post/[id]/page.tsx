"use client"
import { CommentResponseDto } from "@/client/comment.dto";
import { PaginatedResponseDto } from "@/client/common.dto";
import { isLogged } from "@/client/common.mock";
import { PostResponseDto } from "@/client/post.dto";
import { TransClient } from "@/client/TransClient";
import { CommentList } from "@/components/CommentList";
import { Bookmark} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function PostPage({ params }: { params: { id : string } }) {
	const client = TransClient.get_instance();
	const router = useRouter();
	const { id } = useParams<{ id : string }>();
	const [CommentInput, setCommentInput] = useState('');
	const [comments, setComments] = useState<PaginatedResponseDto<CommentResponseDto>>({data : []});
	const [post, setPost] = useState<PostResponseDto>({
	  id: 0,
	  content: "charging",
	  author: {
		id: 0,
		username: "charging",
		email: "charging",
		verified: false,
		role: "charging",
		createdAt: new Date(),
		updatedAt: new Date(),
	  },
	  likes: 0,
	  replies: 0,
	  shares: 0,
	  views: 0,
	  liked: false,
	  bookmarked: false,
	  createdAt: new Date(),
	  updatedAt: new Date(),
	});

	function LikePost(post : PostResponseDto){
		client.likePost(post.id, post.liked);
		router.refresh();
  	}

	function BookmarkPost(post : PostResponseDto){
		client.bookmarkPost(post.id, post.bookmarked);
		router.refresh();
  	}
	
	function commentIt(post : PostResponseDto){
		client.commentPost(post.id , CommentInput);
		setCommentInput('');
		router.refresh();
	}


	useEffect(() => {
		const run = async() => {
		  const logged = await isLogged();
		   if (!logged)
			  router.push('/auth/login');
		  const res = await client.getPost(+id);
		  const data = res?.getData();
		  if (data)
			setPost(data);
		  const comRes = await client.getComments({id :+id});
		  const comData = comRes?.getData();
		  if (comData)
			setComments(comData);
		  }
		run();
	  }, [router]);

	return (
	<div className="max-w-2xl mx-auto p-4">
		<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mt-8">
			<div className="flex items-center gap-3 mb-3">
				<Link href={`profile/${post.author.username} `} className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
				<div>
					<Link href={`profile/${post.author.username} `}>
						<h4 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
							{post.author.displayName}
						</h4>
					</Link>
					<p className="text-xs text-gray-500">{post.createdAt ? post.createdAt.getDate() : null}</p>
				</div>
			</div>
			<p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{post.content}</p>
			<div className="flex items-center justify-between text-gray-500">
				<div className="flex gap-4 text-sm">
					<button onClick={() => LikePost(post)} className={ post.liked ? ' text-red-500 hover:text-gray-700 dar:hover:text-gray-300 transition-colors cursor-pointer' : 'hover:text-red-500 transition-colors cursor-pointer' }>
						❤️ {post.likes}
					</button>
					<div className="transition-colors cursor-pointer">
						💬 {post.replies}
					</div>
				</div>
				<button onClick={() => BookmarkPost(post)} className={ post.bookmarked ? "text-blue-500 hover:text-gray-600 dark:text-blue-500 dark:hover:text-gray-400" : "text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"}>
					<Bookmark />
				</button>
			</div>
		</div>
		{/* Comment something */}
		<div className="px-4">
		<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mt-4 mb-1">
			<div className="flex gap-4">
			<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
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