import { ChatLayout } from "@/components/Chat/ChatLayout";

export default function MessagesPage() {
  return (
    <div className="flex-1 h-[calc(100vh-2rem)] m-4 bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <ChatLayout />
    </div>
  );
}
