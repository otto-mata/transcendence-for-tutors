import { ArrowLeft, MoreVertical, Phone, Video, Send, Paperclip, Smile } from "lucide-react";
import { User } from "./ChatLayout";
import { useState } from "react";
import { getMediaUrl } from "@/client/utils";

interface ChatWindowProps {
  user: User;
  onBack: () => void;
  showBackAlways?: boolean;
}

export interface Message {
  id : string,
  content : string,
  me : boolean,
  createdAt : Date
}

const MOCK_MESSAGES: Message[] = [
  {
    id : "1",
    content : "J'adore les pates",
    me : false,
    createdAt : new Date()
  },
  {
    id : "2",
    content : "Pitain mais la meme de mon cote",
    me : true,
    createdAt : new Date()
  },
  {
    id : "3",
    content : "La coincidence de fou malade !! :DDDDD",
    me : false,
    createdAt : new Date()
  },
  {
    id : "4",
    content : "La coincidence de fou malade !! :DDDDD, La coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDDLa coincidence de fou malade !! :DDDDD",
    me : false,
    createdAt : new Date()
  },
]

export function ChatWindow({ user, onBack, showBackAlways }: ChatWindowProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setmessages ] = useState(MOCK_MESSAGES);


  async function sendInputMessage(){
    console.log("inputMessage is : ", inputMessage);
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
            {user.avatarUrl ? (
              <img
                src={getMediaUrl(user.avatarUrl)}
                alt={user.displayName || user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {(user.displayName || user.username || "?").charAt(0).toUpperCase()}
              </div>
            )}
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${user.status === "online"
                  ? "bg-green-500"
                  : user.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            />
          </div>
          <div>
            <h3 className="font-bold">{user.displayName || user.username || "Unknown"}</h3>
            <p className="text-xs text-gray-500">
              {user.status === "online" ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div key={message.id} className={`flex justify-${message.me? "end" :  "start"}`}>
          <div className={ message.me? "bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]" : "bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]"}>
            <p>{message.content}</p>
            <span className={`text-xs ${message.me ? "text-gray-300" : "text-gray-400"} mt-1 block`}>{`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} `}</span>
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
