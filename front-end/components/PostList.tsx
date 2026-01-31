"use client"
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/Post.dto';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Backend } from '@/client/TransClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserResponseDto } from '@/client/profile.dto';
import { getMediaUrl } from '@/client/utils';

function printit(){
	console.log("Button clicked");
}

function buttonApearance(alreadyDone?: boolean){
	if (alreadyDone) return ("w-1/3 flex justify-center bg-blue-600 hover:bg-gray-900 transition-colors");
	return ("w-1/3 flex justify-center hover:bg-blue-600 transition-colors");
}



export const OnePost = (params : {post : PostResponseDto, charging : boolean}) => {
	const router = useRouter();
	const client = Backend.getInstance();
	const [user, setUser] = useState<{username : string, displayName : string, avatarUrl? : string}>({username : "charging...", displayName : "charging..."});
	const [Liked, setLiked] = useState(params.post.liked);
	const [Bookmarked, setBookmarked] = useState(params.post.bookmarked);
	const createdAt = new Date(params.post.createdAt).toDateString();
	const postImage = getMediaUrl(params.post.mediaUrl) || null;
	
	async function LikePost(post : PostResponseDto){
	if (!Liked){
		const res = await client.posts.$(post.id).like();
		if (!res.ok)
			return;
		setLiked(true);
		post.likeCount += 1;
		return ;
	}
	const res = await client.posts.$(post.id).unlike();
	if (!res.ok)
		return;
	setLiked(false);
	post.likeCount -= 1;
  }
  
  async function SavePost(post : PostResponseDto){
	if (!Bookmarked){
		const res = await client.posts.$(post.id).save();
		if (!res.ok)
			return;
		setBookmarked(true);
		return ;
	}
	const res = await client.posts.$(post.id).unsave();
	if (!res.ok)
		return;
	setBookmarked(false);
  }

  function CommentPost(id : string){
	router.push('/post/' + id);
  }
  	useEffect(() => {
		const run = async () => {
			if (params.charging)
				return ;
			const res = await client.users.$({id :  params.post.authorId}).get();
			if (!res.value) throw res.error;
			const data = JSON.parse(res?.value);
			setUser(data);
			setBookmarked(await params.post.bookmarked);
			setLiked(await params.post.liked);
		}
		
		run();
  }, [params.post.id])

   return (<div
							className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group mt-1"
						>
							<div 
								className="relative fill rounded-xl overflow-hidden cursor-pointer group"
								onClick={() => {}}
							>
								{postImage ? (
									<img 
										src={postImage} 
										alt="Post" 
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-400" />
								)}
								<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								</div>
							</div>
							<div className="p-4">
								<div className="flex items-center gap-3 mb-3">
									<Link href={`profile/${user.username} `} className="shrink-0">
										{user.avatarUrl ? (
											<img 
												src={getMediaUrl(user.avatarUrl)} 
												alt={user.displayName || user.username}
												className="w-10 h-10 rounded-full object-cover"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
										)}
									</Link>
									<div>
										<Link href={`profile/${user.username} `}>
											<h4 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
												{user.displayName}
											</h4>
										</Link>
										<p className="text-xs text-gray-500">{createdAt}</p>
									</div>
								</div>
								<p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{params.post.content}</p>
								<div className="flex items-center justify-between text-gray-500">
									<div className="flex gap-4 text-sm">
										<button onClick={() => LikePost(params.post)} className={ Liked ? ' text-red-500 hover:text-gray-700 dar:hover:text-gray-300 transition-colors cursor-pointer' : 'hover:text-red-500 transition-colors cursor-pointer' }>
											❤️ {params.post.likeCount}
										</button>
										<button onClick={() => CommentPost(params.post.id)} className="hover:text-blue-500 transition-colors cursor-pointer">
											💬 {params.post.replyCount}
										</button>
									</div>
									<button onClick={() => SavePost(params.post)} className={ Bookmarked ? "text-blue-500 hover:text-gray-600 dark:text-blue-500 dark:hover:text-gray-400" : "text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"}>
										<Bookmark />
									</button>
								</div>
							</div>
						</div>
					

  );
}


export const PostList = (params: {posts : PaginatedResponseDto<PostResponseDto>, charging : boolean}) => {
  if (!params.posts || params.charging)
		return (<div>Posts are charging...</div>);

	if (params.posts)
	return (<div className="flex flex-col bg">
		{params.posts.data.map(post => <OnePost key={post.id} post={post} charging={params.charging}/>)}
		</div >
	);
};

export const MansonPostGrid = (params: {posts : PaginatedResponseDto<PostResponseDto>, charging : boolean}) => {
  if (!params.posts || params.charging)
		return (<div>Posts are charging...</div>);

	if (params.posts)
	return (
	<div className='w-full p-4'>
			<div className="sticky top-0 z-10 bg-white dark:bg-gray-900">
				{/* Masonry Grid */}
				<div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
					{params.posts.data?.map((post, index) => (
						<OnePost key={index} post={post} charging={params.charging}/>
					))}
				</div>
			</div>
		</div>
	);
};


export const MansonPostGridAll = () => {
const router = useRouter();
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});
  const [charging, setCharging] = useState(true);

  useEffect(() => {
	const run = async() => {
	  const res = await client.posts.get().all();
	  if (!res.ok) throw res.error;
	  const data = JSON.parse(res?.value);
	  console.log("test", data);
	  setPosts(Array.isArray(data) ? {data: data} : data);
	  setCharging(false);
	
	}
	run();
  }, []);
  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts} charging={charging}/>
	  </div>
	</div>
  );
}

export const MansonPostGridByUsername = (params : {username : string}) => {
const router = useRouter();
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});
  const [charging, setCharging] = useState(true);

  useEffect(() => {
	const run = async() => {
	console.log("username dans MansonPostGridByUsername :", params.username);
	  const res = await client.posts.get().byName(params.username);
	  if (!res.ok) throw res.error;
	  const data = JSON.parse(res?.value);
	  console.log("test", data);
	  setPosts(Array.isArray(data) ? {data: data} : data);
	  setCharging(false);
	
	}
	run();
  }, []);
  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts} charging={charging}/>
	  </div>
	</div>
  );
}


export const MansonPostGridSaved = (params : {username? : string}) => {
const router = useRouter();
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});
  const [charging, setCharging] = useState(true);

  useEffect(() => {
		const run = async() => {
	  const res = params.username ?  await client.posts.saved().byName(params.username) : await client.posts.saved().get();
	  if (!res.ok) throw res.error;
	  const data = JSON.parse(res?.value);
	  console.log("test", data);
	  setPosts(Array.isArray(data) ? {data: data} : data);
	  setCharging(false);
	
	}
	run();
  }, []);
  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts} charging={charging}/>
	  </div>
	</div>
  );
}

export const MansonPostGridLiked = (params : {username? : string}) => {
const router = useRouter();
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});
  const [charging, setCharging] = useState(true);

  useEffect(() => {
		const run = async() => {
	  const res = params.username ?  await client.posts.liked().byName(params.username) : await client.posts.liked().get();
	  if (!res.ok) throw res.error;
	  const data = JSON.parse(res?.value);
	  console.log("test", data);
	  // If data is already a PaginatedResponseDto, use it directly; otherwise wrap it
	  setPosts(Array.isArray(data) ? {data: data} : data);
	  setCharging(false);
	
	}
	run();
  }, []);
  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts} charging={charging}/>
	  </div>
	</div>
  );
}