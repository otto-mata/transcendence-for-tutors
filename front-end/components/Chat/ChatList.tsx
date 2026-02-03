import { ChatDto } from "@/client/message.dto";
import { UserResponseDto } from "@/client/profile.dto";
import { getMediaUrl } from "@/client/utils";

interface ChatListProps {
  users: ChatDto[];
  selectedUserId?: string;
  onSelectedChat: (user: ChatDto) => void;
  hideTitle?: boolean;
}

export function ChatList({ users,  selectedUserId, onSelectedChat, hideTitle }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {!hideTitle && <h2 className="text-xl font-bold mb-4">Messages</h2>}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div> */}
      <div className="flex-1 overflow-y-auto">
        {users.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectedChat(chat)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedUserId === chat.users[0].id ? "bg-blue-50 dark:bg-gray-700/50" : ""
              }`}
          >
            <div className="relative">
              {chat.users[0].avatarUrl ? (
                <img
                  src={getMediaUrl(chat.users[0].avatarUrl)}
                  alt={chat.users[0].username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {( chat.users[0].username || "?").charAt(0).toUpperCase()}
                </div>
              )}
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${"online" === "online"
                    ? "bg-green-500"
                    :  "away" === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold truncate">{chat.users[0].username}</span>
                <span className="text-xs text-gray-500">{`${new Date(chat.messages[0].createdAt).getHours()}:${new Date(chat.messages[0].createdAt).getMinutes()} `} </span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.messages[0].message}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
