"use client";

import AdminDeleteButton from './AdminDeleteButton';

export default function Comment({ id, body }: { id: number; body: string }) {
  // moved delete logic to AdminDeleteButton to avoid passing event handlers across server boundary

  return (
    <div className="p-2 border rounded bg-white dark:bg-gray-800">
      <div className="text-sm">{body}</div>
      <div className="mt-2 text-right">
        <AdminDeleteButton type="comment" id={id} />
      </div>
    </div>
  );
}
