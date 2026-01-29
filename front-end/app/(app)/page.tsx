"use client"
import { PostList } from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/post.dto';
import { Backend } from "@/client/TransClient";
import { CreatePost } from "@/components/createPost";



export default function Home() {
  const router = useRouter();
  const client = Backend.getInstance();
  const [change, setChange] = useState(false);
  const [charging, setCharging] = useState(true);
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});;

  
  useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
       if (!logged){
          router.push("/auth/login");
          return;
      }
      const res = await client.posts.get().all();
      if (!res.ok) throw res.error;
      const data = JSON.parse(res?.value);
      setPosts({data : data});
      setCharging(false);
    
    }
    run();
  }, [change]);
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
