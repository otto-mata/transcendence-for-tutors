"use client"

import { MansonPostGridLiked } from "@/components/PostList";

export default function LikePosts() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Feed */}
      <div className="space-y-6">
        <MansonPostGridLiked key="Likegrid"/>
      </div>
    </div>
  );
}
