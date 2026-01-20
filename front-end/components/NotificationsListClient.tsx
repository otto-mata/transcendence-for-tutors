"use client";

import React, { useState } from "react";

type Notification = {
  id: number;
  title?: string;
  message: string;
  type?: string;
  meta?: Record<string, unknown> | null;
  read: boolean;
  createdAt: string;
};

export default function NotificationsListClient({
  initialNotifs,
}: {
  initialNotifs: Notification[];
}) {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);
  const [updating, setUpdating] = useState<Record<number, boolean>>({});

  async function markRead(id: number) {
    const idx = notifs.findIndex((n) => n.id === id);
    if (idx === -1) return;
    if (notifs[idx].read) return;
    if (updating[id]) return;

    // Optimistic update
    const newNotifs = [...notifs];
    newNotifs[idx] = { ...newNotifs[idx], read: true };
    setNotifs(newNotifs);
    setUpdating((s) => ({ ...s, [id]: true }));

    try {
      await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
    } catch (e) {
      console.error("Failed to mark notification read", e);
      // revert optimistic update on failure
      const revert = [...notifs];
      revert[idx] = { ...revert[idx], read: false };
      setNotifs(revert);
    } finally {
      setUpdating((s) => {
        const copy = { ...s };
        delete copy[id];
        return copy;
      });
    }
  }

  return (
    <ul className="space-y-3">
      {notifs.map((n) => (
        <li
          key={n.id}
          onMouseEnter={() => markRead(n.id)}
          className={`relative p-4 rounded-lg border ${n.read ? "bg-white text-gray-600" : "bg-blue-50 border-blue-100"} `}
        >
          {!n.read && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 ring-2 ring-white" />
          )}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{n.title ?? "Notification"}</p>
              <p className="text-sm text-gray-700 mt-1">{n.message}</p>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(n.createdAt).toLocaleString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
