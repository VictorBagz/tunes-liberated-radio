
import { ChevronLeft, ChevronRight, Search, Bell, User } from "lucide-react";

export function TopBar() {
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <div className="relative ml-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="bg-white rounded-full pl-10 pr-4 py-2 w-96 text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white/60 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
