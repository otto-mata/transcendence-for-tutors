"use client";

import React from 'react';

export default function AdminDeleteButton({ type, id }: { type: 'post' | 'comment'; id: number }) {
  const isAdmin = typeof window !== 'undefined' && window.localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) return null;

  async function handleDelete() {
    if (!confirm(`Delete ${type}?`)) return;
    try {
      const res = await fetch(`/api/admin/${type}s/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      alert(`${type} deleted (fake)`);
    } catch (e) {
      console.error(e);
      alert('Failed to delete');
    }
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-600 hover:underline">
      Delete
    </button>
  );
}
