"use client"
import { Image, Smile, Calendar } from "lucide-react";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Backend } from "@/client/TransClient";
import { CreatePost } from "@/components/createPost";

interface CurrentUser {
  username: string;
  displayName?: string;
  avatarUrl?: string;
}

export default function Home() {
  const router = useRouter();
  
  

  useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
       if (!logged){
          router.push('/auth/login');
          return;
      }
      // Fetch current user info
      const userRes = await client.me.get();
      if (userRes.ok && userRes.value) {
        const userData = typeof userRes.value === 'string' 
          ? JSON.parse(userRes.value) 
          : userRes.value;
        setCurrentUser(userData);
      }
    }
    run();
  }, []);
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Create Post Input */}
      <CreatePost goto={true}/>
    </div>
  );
}
