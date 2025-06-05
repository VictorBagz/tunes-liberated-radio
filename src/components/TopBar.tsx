
import { ChevronLeft, ChevronRight, Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const canGoBack = window.history.length > 1;

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          disabled={!canGoBack}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white/60 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <form onSubmit={handleSearch} className="relative ml-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="bg-white rounded-full pl-10 pr-4 py-2 w-96 text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white/60 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600 transition-colors overflow-hidden"
          >
            {user?.image ? (
              <img src={user.image} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-white font-semibold border-b border-gray-700">
                {user?.displayName}
              </div>
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
