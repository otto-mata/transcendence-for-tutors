"use client"
import { MansonPostGridSaved} from "@/components/PostList";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function savedPosts() {
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
      {/* Feed */}
      <div className="space-y-6">
        <MansonPostGridSaved/>
      </div>
    </div>
  );
}
