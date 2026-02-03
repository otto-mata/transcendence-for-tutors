"use client";
import { useEffect, useRef, useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { CharginPage } from "../CharginPage";
import { ErrorPage } from "../ErrorPage";
import { Backend } from "@/client/TransClient";
import { ChatDto, ChatUserDto } from '@/client/message.dto';

const MOCK_USERS: ChatDto[] = [
  {
    id : "1",
    users : [{
      id: "1",
    username: "Sarah Anderson",
      }],
      messages : [{
        id : "1",
        message : "hi dude",
        createdAt : new Date(),
        senderID : "1",
      }],
  }
  ,
  {
    id : "2",
    users : [{
      id: "2",
    username: "Mike Horn",
      }],
      messages : [{
        id : "2",
        message : "hop on !",
        createdAt : new Date(),
        senderID : "2",
      }],
      unread : true,
  },
  {
    id : "3",
    users : [{
      id: "3",
    username: "Felis Andre",
      }],
      messages : [{
        id : "3",
        message : "Wsh mon khey",
        createdAt : new Date(),
        senderID : "3",
      }],
  }
];

export function ChatLayout({ initialUserId }: {initialUserId? : string}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [charging, setCharging] = useState(true);
  const [page, setPage ] = useState(1);
  const [error, setError] = useState('');
  const [chats, setChats] = useState<ChatDto[]>([]);
  const socketRef = useRef<WebSocket>(null);
  const client = Backend.getInstance();
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [change, setChange] = useState(false);


  // Fetch user from API if initialUserId is provided
  useEffect(() => {
    const fetchInitialUser = async () => {
      if (!initialUserId) { return; }

      // Check if user already exists in the list
      const existingUser = chats.find(u => u.id === initialUserId);
      if (existingUser) {
        setSelectedChat(existingUser);
        return;
      }

      setIsLoading(true);
      try {
        const client = Backend.getInstance();
        const result = await client.users.$({ id: initialUserId }).get();
        console.log("result ?? : ", result, result.ok, result.value);
        if (result.ok && result.value) {
          const userData = JSON.parse(result.value);
          const newUser: ChatDto = {
            id: String(userData.id),
            users : [{
              id: userData.id,
              username: userData.username,
              avatarUrl: userData.avatarUrl || undefined,
            }],
            // status: "online",
            messages : [{
              id : "1",
              message : "yes yes verry much",
              senderID : userData.id,
              createdAt : new Date(),
            }],
            unread : true,
          };
          setChats([newUser, ...chats]);
          setSelectedChat(newUser);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialUser();
    console.log("this is chats", chats);
  }, [initialUserId]);

  useEffect(() => {

    // querry chats and put it in user[]
    if (loading == true ) return ;
      socketRef.current?.send(JSON.stringify({
            type : "watch",
            id : "babeu"
          }));
          

  }, [loading])

  useEffect(() =>{
    setLoading(true);
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
        if (data.type == "auth_err") setError('no');
          setLoading(false);
        }
      }
          
    socketRef.current.close = () => {
      console.log("closed");
    }
  
    return () => {
      socketRef.current?.close();
};
  }, [])

  useEffect(() => {
	  const target = sentinelRef.current;
	  if (!target) return;
  
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  if (charging) return;
			  if (chats.length < page * 10) return;
			  setCharging(true);
			  setPage(page + 1);
			  setChange(!change);
			  }
		  });
		},
		{
		  threshold: 0.1, // 10% visible
		}
	  );
  
	  observer.observe(target);
  
	  return () => {
		observer.unobserve(target);
		observer.disconnect();
	  };
	}, [chats]);

    useEffect(() => {
	  const run = async() => {
		const res = await client.chat.get({limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}
		const data = JSON.parse(res?.value);
    console.log("this is data :",  data);

		setChats([...chats, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
  
  if(loading)
    return <CharginPage/>;

  if (error)
    return <ErrorPage error="Socket connection refused" message="Can't access messages"/>

  return (
    <div className="flex h-full">
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-gray-200 dark:border-gray-700`}>
        <ChatList
          users={chats}
          selectedUserId={selectedChat?.users[0].id}
          onSelectedChat={setSelectedChat}
        />
      </div>
      <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-gray-50 dark:bg-gray-900/50`}>
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} socketRef={socketRef.current || null} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}