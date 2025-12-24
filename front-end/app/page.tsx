import { PostList } from "@/components/PostList";
import { Image, Smile, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Create Post Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
          <div className="flex-1">
            <input
              type="text"
              placeholder="What's happening?"
              className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-4 text-blue-500">
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        <PostList id={1} isSelf={false} />
      </div>
    </div>
  );
}
