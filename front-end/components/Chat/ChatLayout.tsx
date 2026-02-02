"use client";

import { useState, useEffect } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { Backend } from "@/client/TransClient";

export interface User {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  status: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface ChatLayoutProps {
  initialUserId?: string;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "sarah_anderson",
    displayName: "Sarah Anderson",
    avatarUrl: undefined,
    status: "online",
    lastMessage: "Hey! Are we still on for the game?",
    lastMessageTime: "2m",
    unreadCount: 2,
  },
  {
    id: "2",
    username: "mike_johnson",
    displayName: "Mike Johnson",
    avatarUrl: undefined,
    status: "offline",
    lastMessage: "Good game yesterday!",
    lastMessageTime: "1h",
  },
  {
    id: "3",
    username: "emily_davis",
    displayName: "Emily Davis",
    avatarUrl: undefined,
    status: "away",
    lastMessage: "Can you check my PR?",
    lastMessageTime: "3h",
  },
];

export function ChatLayout({ initialUserId }: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user from API if initialUserId is provided
  useEffect(() => {
    const fetchInitialUser = async () => {
      if (!initialUserId) {
        setSelectedUser(MOCK_USERS[0]);
        return;
      }

      // Check if user already exists in the list
      const existingUser = users.find(u => u.id === initialUserId);
      if (existingUser) {
        setSelectedUser(existingUser);
        return;
      }

      setIsLoading(true);
      try {
        const client = Backend.getInstance();
        const result = await client.users.$({ id: initialUserId }).get();
        if (result.ok && result.value) {
          const userData = result.value;
          const newUser: User = {
            id: String(userData.id),
            username: userData.username,
            displayName: userData.displayName || undefined,
            avatarUrl: userData.avatarUrl || undefined,
            status: "online",
            lastMessage: undefined,
            lastMessageTime: undefined,
            unreadCount: 0,
          };
          setUsers(prev => {
            // Add to list if not already there
            if (!prev.find(u => u.id === newUser.id)) {
              return [newUser, ...prev];
            }
            return prev;
          });
          setSelectedUser(newUser);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setSelectedUser(MOCK_USERS[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialUser();
  }, [initialUserId]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-gray-200 dark:border-gray-700`}>
        <ChatList
          users={users}
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
