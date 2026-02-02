"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatLayout } from "@/components/Chat/ChatLayout";

function MessagesContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || undefined;

  return (
    <div className="flex-1 h-[calc(100vh-2rem)] m-4 bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <ChatLayout initialUserId={userId} />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 h-[calc(100vh-2rem)] m-4 bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}
