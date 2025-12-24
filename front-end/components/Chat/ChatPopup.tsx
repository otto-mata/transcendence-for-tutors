"use client";

import { useState } from "react";
import { MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { User } from "./ChatLayout";
import { usePathname } from "next/navigation";

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

export default function ChatPopup() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	if (pathname === "/messages") return null;

	if (!isOpen) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all z-50 hidden lg:flex items-center gap-2"
			>
				<MessageSquare className="w-6 h-6" />
				<span className="font-semibold">Chat</span>
				<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
					2
				</span>
			</button>
		);
	}

	return (
		<div
			className={`fixed bottom-0 right-6 w-80 bg-white dark:bg-gray-800 shadow-2xl rounded-t-xl border border-gray-200 dark:border-gray-700 transition-all z-50 hidden lg:block ${isMinimized ? "h-14" : "h-[500px]"
				}`}
		>
			{/* Header */}
			<div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-blue-600 text-white rounded-t-xl cursor-pointer"
				onClick={() => isMinimized && setIsMinimized(false)}>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
					<span className="font-bold">
						{selectedUser ? selectedUser.name : "Messages"}
					</span>
				</div>
				<div className="flex items-center gap-1">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsMinimized(!isMinimized);
						}}
						className="p-1 hover:bg-blue-700 rounded transition-colors"
					>
						{isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsOpen(false);
							setSelectedUser(null);
						}}
						className="p-1 hover:bg-blue-700 rounded transition-colors"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Content */}
			{!isMinimized && (
				<div className="h-[calc(500px-56px)] overflow-hidden">
					{selectedUser && typeof (selectedUser) ? (
						<ChatWindow
							user={selectedUser}
							onBack={() => setSelectedUser(null)}
							showBackAlways={true}
						/>
					) : (
						<ChatList
							users={MOCK_USERS}
							selectedUserId={selectedUser?.id}
							onSelectUser={setSelectedUser}
							hideTitle={true}
						/>
					)}
				</div>
			)}
		</div>
	);
}
