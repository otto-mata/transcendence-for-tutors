"use client"
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/Post.dto';
import { Bookmark, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Backend } from '@/client/TransClient';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { UserResponseDto } from '@/client/profile.dto';
import { getMediaUrl } from '@/client/utils';
import { CharginPage } from './CharginPage';
import { ErrorPage } from './ErrorPage';
import { useUser } from '@/client/UserContext';

function buttonApearance(alreadyDone?: boolean){
	if (alreadyDone) return ("w-1/3 flex justify-center bg-blue-600 hover:bg-gray-900 transition-colors");
	return ("w-1/3 flex justify-center hover:bg-blue-600 transition-colors");
}



export const OnePost = (params : {post : PostResponseDto, charging : boolean, onDelete?: (postId: string) => void}) => {
	const router = useRouter();
	const client = Backend.getInstance();
	const { user: currentUser } = useUser();
	const [postAuthor, setPostAuthor] = useState<{username : string, displayName : string, avatarUrl? : string}>({username : "charging...", displayName : "charging..."});
	const [Liked, setLiked] = useState(params.post.liked);
	const [Bookmarked, setBookmarked] = useState(params.post.bookmarked);
	const [isDeleting, setIsDeleting] = useState(false);
	const createdAt = new Date(params.post.createdAt).toDateString();
	const postImage = getMediaUrl(params.post.mediaUrl) || null;
	const isOwner = currentUser?.id === params.post.authorId;
	
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

  async function deletePost(e: React.MouseEvent<HTMLButtonElement>) {
	e.preventDefault();
	e.stopPropagation();
	
	if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) return;
	
	setIsDeleting(true);
	try {
		const res = await client.posts.$(params.post.id).delete();
		if (res.ok) {
			if (params.onDelete) {
				params.onDelete(params.post.id);
			} else {
				router.refresh();
			}
		}
	} catch (error) {
		console.error('Erreur lors de la suppression:', error);
	} finally {
		setIsDeleting(false);
	}
  }

  function profileRef(e : React.MouseEvent<HTMLElement>){
	e.preventDefault();
  	e.stopPropagation();
	router.push('/profile/' + postAuthor.username);
  }
  	useEffect(() => {
		const run = async () => {
			if (params.charging)
				return ;
			const res = await client.users.$({id :  params.post.authorId}).get();
			if (!res.value) throw res.error;
			const data = JSON.parse(res?.value);
			setPostAuthor(data);
			setBookmarked(await params.post.bookmarked);
			setLiked(await params.post.liked);
		}
		
		run();
  }, [params.post.id])

   return (<div 			key={params.post.id}
							className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group mt-1 p-4"
						>
							<Link href={`/post/${params.post.id}`}>
							{postImage && (
							<div 
								className="relative fill rounded-xl overflow-hidden cursor-pointer group mb-3"
								onClick={() => {}}
							>
								<img 
									src={postImage} 
									alt="" 
									className="w-full h-full object-cover"
									onError={(e) => { e.currentTarget.style.display = 'none'; }}
								/>
								<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								</div>
							</div>
							)}
								<div className="flex items-center gap-3 mb-3">
									<button onClick={(e) => profileRef(e)} className="shrink-0">
										{postAuthor.avatarUrl ? (
											<img 
												src={getMediaUrl(postAuthor.avatarUrl)} 
												alt={postAuthor.displayName || postAuthor.username}
												className="w-10 h-10 rounded-full object-cover"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
										)}
									</button>
									<div className="flex-1">
										<button onClick={(e) => profileRef(e)}>
											<h4 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
												{postAuthor.displayName}
											</h4>
										</button>
										<p className="text-xs text-gray-500">{createdAt}</p>
									</div>
									{isOwner && (
										<button 
											onClick={deletePost}
											disabled={isDeleting}
											className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
											title="Supprimer le post"
										>
											<Trash2 className={`w-4 h-4 ${isDeleting ? 'animate-pulse' : ''}`} />
										</button>
									)}
								</div>
							</Link>
								<p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{params.post.content}</p>
								<div className="flex items-center justify-between text-gray-500">
									<div className="flex gap-4 text-sm">
										<button onClick={() => LikePost(params.post)} className={ Liked ? ' text-red-500 hover:text-gray-700 dar:hover:text-gray-300 transition-colors cursor-pointer' : 'hover:text-red-500 transition-colors cursor-pointer' }>
											❤️ {params.post.likeCount}
										</button>
										<Link  href={`/post/${params.post.id}`} className="hover:text-blue-500 transition-colors cursor-pointer">
											💬 {params.post.replyCount}
										</Link>
									</div>
									<button onClick={() => SavePost(params.post)} className={ Bookmarked ? "text-blue-500 hover:text-gray-600 dark:text-blue-500 dark:hover:text-gray-600" : "text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"}>
										<Bookmark />
									</button>
								</div>
						</div>
					

  );
}


export const PostList = (params: {posts : PostResponseDto[], onPostDelete?: (postId: string) => void}) => {
	const [localPosts, setLocalPosts] = useState(params.posts);

	useEffect(() => {
		setLocalPosts(params.posts);
	}, [params.posts]);

	const handleDelete = (postId: string) => {
		setLocalPosts(prev => prev.filter(p => p.id !== postId));
		if (params.onPostDelete) params.onPostDelete(postId);
	};

	if (localPosts)
	return (<div className="flex flex-col bg">
		{localPosts.map(post => <OnePost key={post.id} post={post} charging={false} onDelete={handleDelete}/>)}
		</div >
	);
};

export const MansonPostGrid = (params: {posts : PostResponseDto[], onPostDelete?: (postId: string) => void}) => {
	const [localPosts, setLocalPosts] = useState(params.posts);

	useEffect(() => {
		setLocalPosts(params.posts);
	}, [params.posts]);

	const handleDelete = (postId: string) => {
		setLocalPosts(prev => prev.filter(p => p.id !== postId));
		if (params.onPostDelete) params.onPostDelete(postId);
	};

  	if (localPosts)
	return (
	<div className='w-full p-4'>
			<div className="sticky top-0 z-10 bg-white dark:bg-gray-900">
				{/* Masonry Grid */}
				<div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
					{localPosts.map((post, index) => (
						<OnePost key={index} post={post} charging={false} onDelete={handleDelete}/>
					))}
				</div>
			</div>
		</div>
	);
};


export const MansonPostGridAll = () => {
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PostResponseDto[]>([]);
  const [charging, setCharging] = useState(true);
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(false);
  const [error, setError] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null)
  
	useEffect(() => {
	  const target = sentinelRef.current;
	  if (!target) return;
  
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  if (charging) return;
			  if (posts.length < page * 10) return;
			  setCharging(true);
			  setPage(page + 1);
			  setChange(!change);
			  }
		  });
		},
		{
		  threshold: 0.1, // 10% visible
		}
	  );
  
	  observer.observe(target);
  
	  return () => {
		observer.unobserve(target);
		observer.disconnect();
	  };
	}, [posts]);

    useEffect(() => {
	  const run = async() => {
		const res = await client.posts.get().all({limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}

		const data = JSON.parse(res?.value);

		setPosts([...posts, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
	
		if (charging) {
			<CharginPage/>
		}
	
		if (error || !posts) {
			return (<ErrorPage
							error={error || 'Post query failed'}
							message={"The profile you're looking for doesn't exist or has been removed."}
							/>);
		}
	
	

  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts}/>
	  </div>
	  <div ref={sentinelRef}>{posts.length > page * 10 ? "Loading Posts..." : ''}</div>
	</div>
  );
}

export const MansonPostGridByUsername = (params : {username : string}) => {
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PostResponseDto[]>([]);
  const [charging, setCharging] = useState(true);
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(false);
  const [error, setError] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null)
  
	useEffect(() => {
	  const target = sentinelRef.current;
	  if (!target) return;
  
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  if (charging) return;
			  if (posts.length < page * 10) return;
			  setCharging(true);
			  setPage(page + 1);
			  setChange(!change);
			  }
		  });
		},
		{
		  threshold: 0.1, // 10% visible
		}
	  );
  
	  observer.observe(target);
  
	  return () => {
		observer.unobserve(target);
		observer.disconnect();
	  };
	}, [posts]);

    useEffect(() => {
	  const run = async() => {
		const res = await client.posts.get().byName(params.username , {limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}

		const data = JSON.parse(res?.value);

		setPosts([...posts, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
	
		if (charging) {
			<CharginPage/>
		}
	
		if (error || !posts) {
			return (<ErrorPage
							error={error || 'Post query failed'}
							message={"The profile you're looking for doesn't exist or has been removed."}
							/>);
		}
	
	

  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts}/>
	  </div>
	  <div ref={sentinelRef}>{posts.length > page * 10 ? "Loading Posts..." : ''}</div>
	</div>
  );
}

export const MansonPostGridSaved = (params : {username? : string}) => {
 const client = Backend.getInstance();
  const [posts, setPosts] = useState<PostResponseDto[]>([]);
  const [charging, setCharging] = useState(true);
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(false);
  const [error, setError] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null)
  
	useEffect(() => {
	  const target = sentinelRef.current;
	  if (!target) return;
  
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  if (charging) return;
			  if (posts.length < page * 10) return;
			  setCharging(true);
			  setPage(page + 1);
			  setChange(!change);
			  }
		  });
		},
		{
		  threshold: 0.1, // 10% visible
		}
	  );
  
	  observer.observe(target);
  
	  return () => {
		observer.unobserve(target);
		observer.disconnect();
	  };
	}, [posts]);

    useEffect(() => {
	  const run = async() => {
		const res = params.username ?  await client.posts.saved().byName(params.username, {limit : 10, page : page}) : await client.posts.saved().get({limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}

		const data = JSON.parse(res?.value);

		setPosts([...posts, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
	
		if (charging) {
			<CharginPage/>
		}
	
		if (error || !posts) {
			return (<ErrorPage
							error={error || 'Post query failed'}
							message={"The profile you're looking for doesn't exist or has been removed."}
							/>);
		}
	
	

  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts}/>
	  </div>
	  <div ref={sentinelRef}>{posts.length > page * 10 ? "Loading Posts..." : ''}</div>
	</div>
  );
}

export const MansonPostGridLiked = (params : {username? : string}) => {
const router = useRouter();
 const client = Backend.getInstance();
  const [posts, setPosts] = useState<PostResponseDto[]>([]);
  const [charging, setCharging] = useState(true);
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(false);
  const [error, setError] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
	  const target = sentinelRef.current;
	  if (!target) return;
  
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  if (charging) return;
			  if (posts.length < page * 10) return;
			  setCharging(true);
			  setPage(page + 1);
			  setChange(!change);
			  }
		  });
		},
		{
		  threshold: 0.1, // 10% visible
		}
	  );
  
	  observer.observe(target);
  
	  return () => {
		observer.unobserve(target);
		observer.disconnect();
	  };
	}, [posts]);

    useEffect(() => {
	  const run = async() => {
		const res = params.username ?  await client.posts.liked().byName(params.username, {limit : 10, page : page}) : await client.posts.liked().get({limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}

		const data = JSON.parse(res?.value);
		setPosts([...posts, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
	
		if (charging) {
			<CharginPage/>
		}
	
		if (error || !posts) {
			return (<ErrorPage
							error={error || 'Post query failed'}
							message={"The profile you're looking for doesn't exist or has been removed."}
							/>);
		}
	
	

  return (
	<div className="max-w-2xl mx-auto py-8 px-4">
	  {/* Feed */}
	  <div className="space-y-6">
		<MansonPostGrid posts={posts}/>
	  </div>
	  <div ref={sentinelRef}>{posts.length > page * 10 ? "Loading Posts..." : ''}</div>
	</div>
  );
}