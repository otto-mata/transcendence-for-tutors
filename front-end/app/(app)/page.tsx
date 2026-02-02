"use client"
import { PostList } from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/Post.dto';
import { Backend } from "@/client/TransClient";
import { getMediaUrl } from "@/client/utils";
import { CreatePost } from "@/components/createPost";
import { ErrorPage } from "@/components/ErrorPage";
import { CharginPage } from "@/components/CharginPage";

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
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostResponseDto[]>([]);
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
       if (!await isLogged()){
          setError('You must be logged in to view this page.');
          router.push("/auth/login");
          return;
      }
      const res = await client.posts.get().feed({limit : 10, page : page});
      
      if (!res.ok) setError(res.error.message);
      const data = JSON.parse(res?.value);
      setPosts([...posts, ...data]);
      setCharging(false);
    }
    run();
  }, [change]);
  

  if (charging)
    return (<CharginPage/>)
  if (error || !posts)
    return (<ErrorPage error={error || 'User not found'} message="You cannot access this page."/>);
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Create Post Input */}
      <CreatePost goto={true}/>
      {/* Feed */}
      <div className="space-y-6">
        <PostList posts={posts}/>
      </div>
      <div ref={sentinelRef}>{posts.length > page * 10 ? "Loading Posts..." : ''}</div>
    </div>
  );
}
