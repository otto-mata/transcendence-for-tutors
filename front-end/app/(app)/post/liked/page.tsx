"use client"
import { PostList } from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/post.dto';
import { Backend } from "@/client/TransClient";


export default function LikePosts() {
  const router = useRouter();
  const client = Backend.getInstance();
  const [posts, setPosts] = useState<PaginatedResponseDto<PostResponseDto>>({data : []});;

  useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
       if (!logged){
          router.push('/auth/login');
          return;
      }
      const res = await client.posts.liked();
      if (!res.ok) throw res.error;
      const data = JSON.parse(res?.value);
      console.log("test", data);
      setPosts({data : data});
    
    }
    run();
  }, []);
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Feed */}
      <div className="space-y-6">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
