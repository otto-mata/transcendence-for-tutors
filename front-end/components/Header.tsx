import { Menu, Search } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search content, app settings..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>
    </div>
  );
};
