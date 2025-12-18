import { ArrowLeft, MoreVertical, Phone, Video, Send, Paperclip, Smile } from "lucide-react";
import { User } from "./ChatLayout";
import { useState } from "react";

interface ChatWindowProps {
  user: User;
  onBack: () => void;
}

export function ChatWindow({ user, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <div className={`w-10 h-10 rounded-full ${user.avatar}`} />
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${
                user.status === "online"
                  ? "bg-green-500"
                  : user.status === "away"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            />
          </div>
          <div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-xs text-gray-500">
              {user.status === "online" ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {/* Mock Messages */}
        <div className="flex justify-start">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
            <p>Hey! How are you doing?</p>
            <span className="text-xs text-gray-400 mt-1 block">10:00 AM</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
            <p>I'm doing great, thanks! Just working on the project.</p>
            <span className="text-xs text-blue-100 mt-1 block">10:02 AM</span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
            <p>That sounds awesome! We should play a game later.</p>
            <span className="text-xs text-gray-400 mt-1 block">10:05 AM</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full pl-4 pr-10 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-500">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
