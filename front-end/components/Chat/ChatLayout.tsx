"use client";

import { useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";

export interface User {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export function ChatLayout() {
  const users: User[] = [];
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);

  return (
    <div className="flex h-full">
      <div
        className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-80 flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        <ChatList
          users={users}
          selectedUserId={selectedUser?.id}
          onSelectUser={setSelectedUser}
        />
      </div>
      <div
        className={`${!selectedUser ? "hidden md:flex" : "flex"} flex-1 flex-col bg-gray-50 dark:bg-gray-900/50`}
      >
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
