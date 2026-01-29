"use client"
import { Image, Smile, Calendar, Cross } from "lucide-react";
import { isLogged } from '@client/common.mock';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Backend } from "@/client/TransClient";
import { getMediaUrl } from "@/client/utils";

interface CurrentUser {
  username: string;
  displayName?: string;
  avatarUrl?: string;
}

export const CreatePost = (params : {goto : boolean, setChange? : (arg : boolean) => void}) => {
       const router = useRouter();
    const client = Backend.getInstance();
    const [postFile, setPostFile] = useState<File | null>(null);
    const [postPreview, setPostPreview] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  
  

    const [PostInput, setPostInput] = useState('');
    const postInputRef = useRef<HTMLInputElement>(null);


    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPostFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPostPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

    useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
       if (!logged){
          router.push('/auth/login');
          return;
      }
            // Fetch current user
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

    async function PostIt(goto : boolean, setChange? : (arg : boolean) => void){
        if (setChange)
            setChange(false);
        const res = await client.posts.post({content : PostInput, ...(postFile && {file : postFile})});
        setPostInput('');
        if (!res.ok) throw res.error;
        const data = JSON.parse(res.value);
        console.log("data : ", data.id);
        if (goto)
            router.push('/post/' + data.id);
        if (setChange)
            setChange(true);
        setPostFile(null);
        setPostPreview(null);
      }
    

    return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div 
								className="relative fill rounded-xl overflow-hidden cursor-pointer group mb-4"
								onClick={() => {setPostPreview(null), setPostFile(null)}}
							>
								{postPreview ? (
									<img 
										src={postPreview} 
										alt="Post" 
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-400" />
								)}
								<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<Cross className="w-6 h-6 text-white" />
								</div>
							</div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
          {currentUser?.avatarUrl ? (
            <img 
              src={getMediaUrl(currentUser.avatarUrl)} 
              alt={currentUser.displayName || currentUser.username}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400 shrink-0" />
          )}
          <div className="flex-1">
            <input
              value={PostInput}
              onChange={e => setPostInput(e.target.value)}
              type="text"
              placeholder="What's happening?"
              className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-4 text-blue-500">
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Image type="button"
								onClick={() => postInputRef.current?.click()} className="w-5 h-5" />
                <input
								ref={postInputRef}
								type="file"
								accept="image/*"
								onChange={handlePostChange}
								className="hidden"
							/>
                </button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button  className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <button onClick={() => PostIt(params.goto, params.setChange )  } className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>)
}