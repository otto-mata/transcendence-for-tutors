"use client";

import React, { useEffect, useState } from 'react';

export default function PostsPanel() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      setPosts(data);
    })();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Delete post?')) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    if (res.ok) setPosts(p => p.filter(x => x.id !== id));
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Posts</h3>
      <div className="space-y-2">
        {posts.map(p => (
          <div key={p.id} className="p-2 bg-white dark:bg-gray-800 rounded flex items-center justify-between">
            <div>{p.body}</div>
            <div><button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm">Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
