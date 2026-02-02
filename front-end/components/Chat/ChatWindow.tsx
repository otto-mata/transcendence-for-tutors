"use client"
import { ArrowLeft, MoreVertical, Phone, Video, Send, Paperclip, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatDto  } from "@/client/message.dto";
import { Backend } from "@/client/TransClient";
import { UserResponseDto } from "@/client/profile.dto";
import { isLogged } from "@/client/common.mock";

interface ChatWindowProps {
  chat : ChatDto;
  onBack: () => void;
  showBackAlways?: boolean;
  socketRef : WebSocket | null;
}

export interface Message {
  id : string,
  message : string,
  createdAt : Date,
  senderId : string  
}

const MOCK_MESSAGES: Message[] = [
  {
    id : "1",
    message : "J'adore les pates",
    senderId : "2",
    createdAt : new Date()
  },
  {
    id : "2",
    message : "Pitain mais la meme de mon cote",
    senderId : "1",
    createdAt : new Date()
  },
  {
    id : "3",
    message : "La coincidence de fou malade !! :DDDDD",
    senderId : "2",
    createdAt : new Date()
  },
  {
    id : "4",
    message : "La coincidence de fou malade !! :DDDDD, La coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDD",
    senderId : "1",
    createdAt : new Date()
  },
]

export function ChatWindow({ chat, onBack, showBackAlways, socketRef }: ChatWindowProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages ] = useState<Message[]>(MOCK_MESSAGES);
    const [loading, setLoading] = useState(true);
    const [charging, setCharging] = useState(true);
    const [page, setPage ] = useState(1);
    const [error, setError] = useState('');
    const client = Backend.getInstance();
    const sentinelRef = useRef<HTMLDivElement>(null)
    const [change, setChange] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserResponseDto>();


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
              setCurrentUser(data.id);
            }
          } catch (err) {
            console.error('Failed to fetch current user:', err);
          }
        };
        fetchCurrentUser();
      }, []);


    useEffect(() => {
	  const target = sentinelRef.current;
	  if (!target) return;
  
	  const observer = new IntersectionObserver(
		(entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  if (charging) return;
			  if (messages.length < page * 10) return;
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
	}, [messages]);

    useEffect(() => {
	  const run = async() => {
		const res = await client.chat.get({limit : 10, page : page});
		if (!res.ok){
			setError(res.error.message);
			return;
		}

		const data = JSON.parse(res?.value);

		setMessages([...messages, ...data]);
		setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
  

  if (socketRef != null) {
    socketRef.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const toad = {
        id : (messages.length + 1).toString(),
        message : data.message,
        senderId : data.from,
        createdAt : new Date()
      }
      if (data.type == "rec_message") setMessages([...messages, toad]);
    }
  }

  async function sendInputMessage(){
    if (!currentUser) return;
    socketRef?.send(JSON.stringify({
      "type" : "message",
      "message" : inputMessage
    }));
    const data = {
      id : (messages.length + 1).toString(),
      message : inputMessage,
      senderId : currentUser.id,
      createdAt : new Date()
    }
    setMessages([...messages, data]);
    setInputMessage('');

  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className={`${showBackAlways ? 'flex' : 'md:hidden'} p-2 hover:bg-gray-100 rounded-full`}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <div className={`w-10 h-10 rounded-full ${chat.user[0].avatarUrl}`} />
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${chat.user[0].username === "online"
                  ? "bg-green-500"
                  : chat.user[0].username === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            />
          </div>
          <div>
            <h3 className="font-bold">{chat.user[0].username}</h3>
            <p className="text-xs text-gray-500">
              {chat.user[0].username === "online" ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div key={message.id} className={`flex justify-${message.senderId == currentUser?.id ? "end" :  "start"}`}>
          <div className={ message.senderId == currentUser?.id  ? "bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]" : "bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]"}>
            <p>{message.message}</p>
            <span className={`text-xs ${message.senderId == currentUser?.id ? "text-gray-300" : "text-gray-400"} mt-1 block`}>{`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} `}</span>
          </div>
        </div>
          ))}
        {/* Mock Messages */}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full pl-4 pr-10 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={sendInputMessage} className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
