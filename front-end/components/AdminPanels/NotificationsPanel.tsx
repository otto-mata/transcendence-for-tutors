"use client";

import React, { useEffect, useState } from 'react';

export default function NotificationsPanel() {
  const [notifs, setNotifs] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/notifications');
      const data = await res.json();
      setNotifs(data);
    })();
  }, []);

  return (
    <div>
      <h3 className="font-semibold mb-2">Notifications</h3>
      <div className="space-y-2">
        {notifs.map(n => (
          <div key={n.id} className="p-2 bg-white dark:bg-gray-800 rounded">
            <div className="font-medium">{n.title}</div>
            <div className="text-sm text-gray-500">{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
