"use client"
import { PostList } from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/Post.dto';
import { Backend } from "@/client/TransClient";
import { getMediaUrl } from "@/client/utils";
import { CreatePost } from "@/components/createPost";

interface CurrentUser {
  username: string;
  displayName?: string;
  avatarUrl?: string;
}

export default function Home() {
  const router = useRouter();
  const client = Backend.getInstance();
  const [change, setChange] = useState(false);
  const [error, setError] = useState('');
  const [charging, setCharging] = useState(true);
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});;

  
  useEffect(() => {
    const run = async() => {
       if (!await isLogged()){
          setError('You must be logged in to view this page.');
          router.push("/auth/login");
          return;
      }
      const res = await client.posts.get().all();
      if (!res.ok) setError(res.error.message);
      const data = JSON.parse(res?.value);
      setPosts({data : data});
      setCharging(false);
    
    }
    run();
  }, [change]);
  if (error)
    if (error || !posts) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
						{error || 'User not found'}
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						You cannot access this page.
					</p>
				</div>
			</div>
		);
	}
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Create Post Input */}
      <CreatePost goto={false} setChange={setChange}/>
      {/* Feed */}
      <div className="space-y-6">
        <PostList posts={posts} charging={charging}/>
      </div>
    </div>
  );
}
