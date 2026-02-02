"use client";
import { useEffect, useRef, useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { CharginPage } from "../CharginPage";
import { ErrorPage } from "../ErrorPage";

export interface User {
  id: string;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const socketRef = useRef<WebSocket>(null);

  useEffect(() => {

    console.log("this is loading: ", loading);
    // querry chats and put it in user[]
    if (loading == true ) return ;
      socketRef.current?.send(JSON.stringify({
            type : "watch",
            id : "babeu"
          }));
          

  }, [loading])

  useEffect(() =>{
    setLoading(true);
    try {
    socketRef.current = new WebSocket("http://localhost:8090");

    socketRef.current.onopen = () => {
      console.log("connected");
      const tosend  = JSON.stringify({
                type : "auth",
                token : localStorage.getItem("access_token")
      })
      console.log("thisis to send :", tosend);
      socketRef.current?.send(tosend);
    }
    
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (loading == true){
        if (data.type == "auth_err") throw new Error('no');
          setLoading(false);
        }
      }
          
    socketRef.current.close = () => {
      console.log("closed");
    }
  } catch (e : any) {
    setError(e.message);
  }

    return () => {
      socketRef.current?.close();
};
  }, [])
  if(loading)
    return <CharginPage/>;

  if (error)
    return <ErrorPage error="Socket connection refused" message="Can't access messages"/>

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
          <ChatWindow user={selectedUser} onBack={() => setSelectedUser(null)} socketRef={socketRef.current || null} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}