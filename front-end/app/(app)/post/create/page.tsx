"use client"
import { Image, Smile, Calendar } from "lucide-react";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Backend } from "@/client/TransClient";
import { CreatePost } from "@/components/createPost";



export default function Home() {
  const router = useRouter();
  
  

  useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
       if (!logged){
          router.push('/auth/login');
          return;
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
