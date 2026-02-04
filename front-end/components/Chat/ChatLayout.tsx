"use client";
import { useEffect, useRef, useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { CharginPage } from "../CharginPage";
import { ErrorPage } from "../ErrorPage";
import { Backend } from "@/client/TransClient";
import { ChatDto, ChatUserDto, Message } from '@/client/message.dto';
import { isLogged } from "@/client/common.mock";
import { UserResponseDto } from "@/client/profile.dto";

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
  const [lastMessage, setLastMessage ] = useState<Message | null>(null);
  const [currentUser, setCurrentUser] = useState<UserResponseDto >();

  // Fetch user from API if initialUserId is provided
  const fetchInitialUser = async () => {
      if (!initialUserId) { return; }

      // Check if user already exists in the list
      const existingUser = chats.find(u => u.id === initialUserId);
      console.log("not here");
      if (existingUser) {
        console.log("not here");
        setSelectedChat(existingUser);
        return;
      }

      setIsLoading(true);
      try {
        const client = Backend.getInstance();
        const result = await client.users.$({ id: initialUserId }).get();
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
              message : "",
              senderId : userData.id,
              createdAt : new Date(),
            }],
            unread : true,
          };
          console.log("ca vas donc la ? ");
          setChats([newUser, ...chats]);
          setSelectedChat(newUser);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

useEffect(() => {
  if (!lastMessage || !currentUser) return;

  if (!chats[0]){
    console.log("AAAAAAAAAAAAAAAAH")
    initialUserId = lastMessage.senderId;
     fetchInitialUser();
  }

  setChats(prevChats =>
    prevChats.map(chat => {
      // message envoyé par moi
      if (
        selectedChat &&
        chat.id === selectedChat.id &&
        lastMessage.senderId === currentUser.id
      ) {
        return {
          ...chat,
          messages: [lastMessage, ...chat.messages.slice(1)],
        };
      }

      // message reçu
      if (chat.users[0].id === lastMessage.senderId) {
        return {
          ...chat,
          messages: [lastMessage, ...chat.messages.slice(1)],
        };
      }
      if (lastMessage.senderId === currentUser.id) return chat;
      initialUserId = lastMessage.senderId;
      fetchInitialUser();
      return chat;
    })
  );
}, [lastMessage]);


  
  useEffect(() => {

    // querry chats and put it in user[]
    if (loading == true ) return ;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current?.send(JSON.stringify({
            type : "watch",
            id : "babeu"
          }));
    }
          

  }, [loading])

  useEffect(() =>{
    setLoading(true);
    socketRef.current = new WebSocket("http://localhost:8090");

    socketRef.current.onopen = () => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) return;
      console.log("connected");
      socketRef.current?.send(JSON.stringify({
                type : "auth",
                token : localStorage.getItem("access_token")
      })
      );
    }
    
    
    socketRef.current.onmessage = (event) => {
      console.log("bah alors ????");
      const data = JSON.parse(event.data);
       if (loading == true){
        if (data.type == "auth_err") setError('no');
          setLoading(false);
        }
        if (data.type == "rec_message"){
          console.log("en plus c'est un message");
          const toad = {
            id : "2",
            message : data.message,
            senderId : data.from,
            createdAt : new Date()
          }
          setLastMessage(toad);
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
      const fetchCurrentUser = async () => {
        try {
          if (!await isLogged()){
                setError('You must be logged in to view this page.');
                return;
              }
          const client = Backend.getInstance();
          const result = await client.me.get();
          if (result.ok) {
            const data = typeof result.value === 'string' 
              ? JSON.parse(result.value) 
              : result.value;
            setCurrentUser(data);
          }
        } catch (err) {
          console.error('Failed to fetch current user:', err);
        }
      };
     
	  const run = async() => {
		const res = await client.chat.get({limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}
		const data = JSON.parse(res?.value);
    setChats([...chats, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
    fetchCurrentUser().then(run).then(fetchInitialUser);
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
          <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} socketRef={socketRef.current || null} setLastMessage={setLastMessage} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}