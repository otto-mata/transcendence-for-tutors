import { Search } from "lucide-react";
import { User } from "./ChatLayout";

interface ChatListProps {
  users: User[];
  selectedUserId?: number;
  onSelectUser: (user: User) => void;
  hideTitle?: boolean;
}

export function ChatList({ users, selectedUserId, onSelectUser, hideTitle }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {!hideTitle && <h2 className="text-xl font-bold mb-4">Messages</h2>}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedUserId === user.id ? "bg-blue-50 dark:bg-gray-700/50" : ""
              }`}
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-full ${user.avatar}`} />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${user.status === "online"
                    ? "bg-green-500"
                    : user.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold truncate">{user.name}</span>
                <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
            </div>
            {user.unreadCount && (
              <div className="w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {user.unreadCount}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
