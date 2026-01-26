"use client"
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/post.dto';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { TransClient } from '@/client/TransClient';

function printit(){
	console.log("Button clicked");
}


interface MockPostData {
	userId: number;
	id: number;
	body: string;
};

function CommentPost(){
	//fetch POST asslike
	console.log("yep ! It clicked");
}

function BookmarkPost(){
	//fetch POST asslike
	console.log("yep ! It clicked");
}

function buttonApearance(alreadyDone?: boolean){
	if (alreadyDone) return ("w-1/3 flex justify-center bg-blue-600 hover:bg-gray-900 transition-colors");
	return ("w-1/3 flex justify-center hover:bg-blue-600 transition-colors");
}


export const PostList = ({posts}: {posts : PaginatedResponseDto<PostResponseDto>}) => {
  const client = TransClient.get_instance();

  function LikePost(postId : number, likeState : boolean){
	  client.likePost(postId, likeState);
  }

	//const posts = await axios.get<MockPostData[]>(`https://jsonplaceholder.typicode.com/posts`, { params: { userId: id } })
	if (!posts)
		return (<div>Error</div>);
	if (posts)
	return (<div className="flex flex-col bg">
		{posts.data?.map((post, index) => (
						<div
							key={index}
							className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
						>
							{/* {post.gradient && <div className="relative overflow-hidden">
								<div
									className={`w-full bg-linear-to-br ${post.gradient} `}
									style={{ height: post.height }}
								> }
									{*//* Overlay on hover *//*}
									{ <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
								</div>
							</div>} */}
							<div className="p-4">
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
										<button onClick={() => LikePost(post.id, post.liked)} className={ post.liked ? ' text-red-500 hover:text-gray-700 dar:hover:text-gray-300 transition-colors cursor-pointer' : 'hover:text-red-500 transition-colors cursor-pointer' }>
											❤️ {post.likes}
										</button>
										<button onClick={printit} className="hover:text-blue-500 transition-colors cursor-pointer">
											💬 {post.replies}
										</button>
									</div>
									<button className={ post.bookmarked ? "text-blue-500 hover:text-gray-600 dark:text-blue-500 dark:hover:text-gray-400" : "text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"}>
										<Bookmark />
									</button>
								</div>
							</div>
						</div>
					))}
		{/*posts?.data?.map(post => {
			return <div key={post.id} className="m-2 shadow rounded-md bg-gray-100 pt-1 dark:bg-gray-800">
				<div className="flex justify-end px-4">
					<span className="text-xs">$</span>
				</div>
				<div className="px-4 mb-2 xl:my-6">{post.content}</div>
				<div className="w-full border-t border-t-gray-200 dark:border-t-gray-900 p-2 flex text-xs">
					<button onClick={CommentPost} className="w-1/3 flex justify-center hover:bg-blue-600 transition-colors">{post.replies} Comments</button>
					<span className="w-0 border-l border-gray-200 dark:border-l-gray-900" ></span>
					<button onClick={LikePost} className={buttonApearance(post.liked)}>{post.likes} Likes</button>
					<span className="w-0 border-r border-gray-200 dark:border-r-gray-900"></span>
					<button onClick={RepostPost} className={buttonApearance(post.bookmarked)}>{post.shares} Reposts</button>
				</div>
			</div>
		})
		*/}
	</div >
	);
};



const MockPosts = [
	{
		author: 'Alex Chen',
		username: 'AlexChen',
		time: '2h ago',
		description: 'Minimalist workspace setup for maximum productivity 🚀',
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
