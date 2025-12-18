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

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Sarah Anderson",
    avatar: "bg-purple-500",
    status: "online",
    lastMessage: "Hey! Are we still on for the game?",
    lastMessageTime: "2m",
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Mike Johnson",
    avatar: "bg-blue-500",
    status: "offline",
    lastMessage: "Good game yesterday!",
    lastMessageTime: "1h",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "bg-pink-500",
    status: "away",
    lastMessage: "Can you check my PR?",
    lastMessageTime: "3h",
  },
];

export function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<User | null>(MOCK_USERS[0]);

  return (
    <div className="flex h-full">
      <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-gray-200 dark:border-gray-700`}>
        <ChatList
          users={MOCK_USERS}
          selectedUserId={selectedUser?.id}
          onSelectUser={setSelectedUser}
        />
      </div>
      <div className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-gray-50 dark:bg-gray-900/50`}>
        {selectedUser ? (
          <ChatWindow user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
