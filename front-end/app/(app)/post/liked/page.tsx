"use client"
import { MansonPostGrid, PostList } from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/Post.dto';
import { Backend } from "@/client/TransClient";


export default function LikePosts() {
  const router = useRouter();
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});;
  const [charging, setCharging] = useState(true);


  useEffect(() => {
    const run = async() => {
      if (!await isLogged()){
        router.push('/auth/login');
        setError('You must be logged in to view this page.')
        return;
      }
      const res = await client.posts.liked().get();
      if (!res.ok) throw res.error;
      const data = JSON.parse(res?.value);
      console.log("test", data);
      setPosts({data : data});
      setCharging(false);
    
    }
    run();
  }, [charging]);
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Feed */}
      <div className="space-y-6">
        <MansonPostGrid posts={posts} charging={charging}/>
      </div>
    </div>
  );
}
