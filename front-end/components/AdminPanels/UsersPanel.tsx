"use client";

import React, { useEffect, useState } from 'react';

export default function UsersPanel() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    })();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete user?')) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (res.ok) setUsers(u => u.filter(x => x.id !== id));
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Users</h3>
      <div className="space-y-2">
        {users.map(u => (
          <div key={u.id} className="p-2 bg-white dark:bg-gray-800 rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{u.username} <span className="text-xs text-gray-500">{u.email}</span></div>
              <div className="text-xs text-gray-400">Role: {u.role}</div>
            </div>
            <div>
              <button onClick={() => handleDelete(u.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
