"use client"
import { ArrowLeft, MoreVertical, Phone, Video, Send, Paperclip, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatDto, ChatUserDto, ChatWindowProps, Message  } from "@/client/message.dto";
import { Backend } from "@/client/TransClient";
import { UserResponseDto } from "@/client/profile.dto";
import { isLogged } from "@/client/common.mock";
import { getMediaUrl } from "@/client/utils";

export function ChatWindow({ chat, onBack, showBackAlways, socketRef, setLastMessage }: ChatWindowProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages ] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [charging, setCharging] = useState(true);
  const [skip, setSkip ] = useState(0);
  const [error, setError] = useState('');
  const [chatUser, setChatUser ] = useState<ChatUserDto | null>();
  const client = Backend.getInstance();
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [change, setChange] = useState(false);
  const [doScroll, setDoScroll] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserResponseDto>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  var idToad = 1;

  function loadOlderMessages() {
    if (charging) return;
    if (messages.length < skip) return;
    setCharging(true);
    setSkip(skip + 10);
    setChange(!change);
  };

    useEffect(() => {
      if (!doScroll || !messages[0]) return;
      messagesEndRef.current?.scrollIntoView();
      setDoScroll(false);
}, [messages]);

  const handleScroll = async () => {
    if (!containerRef.current) return;
    if (containerRef.current.scrollTop === 0) {
      const oldScrollHeight = containerRef.current.scrollHeight;
      loadOlderMessages(); // fetch older messages
      const newScrollHeight = containerRef.current.scrollHeight;
      // Maintain scroll position after prepending doesn't wok because of async shenanegans
      containerRef.current.scrollTop = newScrollHeight - oldScrollHeight;
    }
  };

  useEffect(() => {
    setSkip(0);
    setCharging(true);
    setMessages([]);
    idToad = 1;
    setChange(!change);
  }, [chat])

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
        fetchCurrentUser();
      }, []);

      useEffect(() => {
	  const run = async() => {
      if (!await isLogged()){
                  setError('You must be logged in to view this page.');
                  return;
                }
      if (!chat  )return;
    setChatUser(chat.users[0]);
		const res = await client.chat.byUsername({limit : 10, page : skip}, chat.users[0].username);
		if (!res.ok){
			setError(res.error.message);
			return;
		}

		const data = JSON.parse(res?.value);
    if (data.error){
			return;
		}
		setMessages(prev => [...data, ...messages]);
    setCharging(false);
		// observer.observe(sentinelRef);
	  
	  }
	  run();
	}, [change]);
  

  if (socketRef != null) {
    socketRef.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == "rec_message"){
        setSkip(prev => prev + 1);
      const toad = {
        id : (messages.length + idToad).toString(),
        message : data.message,
        senderId : data.from,
        createdAt : new Date()
      }
      setLastMessage(toad);
      if (toad.senderId != currentUser?.id && toad.senderId != chatUser?.id) return;
      idToad += 1;
      setMessages([...messages, toad]);
      setDoScroll(true);
    }
    }
  }

  async function sendInputMessage(){
    if (!chatUser || !currentUser || !inputMessage)
        return;
    const toSend = {
      type : "message",
      id : chat.users[0].id ,
      message : inputMessage
    };
    socketRef?.send(JSON.stringify(toSend));
    const data = {
      message : inputMessage,
      senderId : currentUser.id,
      createdAt : new Date()
    }
    // setMessages([...messages, data]);
    client.chat.post(chatUser?.username, inputMessage);
    setInputMessage('');

  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 break-all">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className={`${showBackAlways ? 'flex' : 'md:hidden'} p-2 hover:bg-gray-100 rounded-full`}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            {chatUser?.avatarUrl ? (
              <img
                src={getMediaUrl(chatUser?.avatarUrl)}
                alt={chatUser?.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {(chatUser?.username || "?").charAt(0).toUpperCase()}
              </div>
            )}
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${chatUser?.username === "online"
                  ? "bg-green-500"
                  : chatUser?.username === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            />
          </div>
          <div>
            <h3 className="font-bold">{chatUser?.username}</h3>
            <p className="text-xs text-gray-500">
              {chatUser?.username === "online" ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={containerRef}
           onScroll={handleScroll}
           className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div key={message.id} className={`flex justify-${message.senderId == currentUser?.id ? "end" :  "start"}`}>
          <div className={ message.senderId == currentUser?.id  ? "bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]" : "bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]"}>
            <p>{message.message}</p>
            <span className={`text-xs ${message.senderId == currentUser?.id ? "text-gray-300" : "text-gray-400"} mt-1 block`}>{`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes()} `}</span>
          </div>
        </div>
          ))}
        <div ref={messagesEndRef}></div>
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