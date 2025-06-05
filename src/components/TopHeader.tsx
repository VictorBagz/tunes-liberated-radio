
import { Bell, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUniversity } from "@/contexts/UniversityContext";

export function TopHeader() {
  const { user, logout } = useAuth();
  const { selectedUniversity } = useUniversity();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">US</span>
          </div>
          <span className="text-xl font-bold text-primary">UniStay</span>
        </div>
      </div>

      {selectedUniversity && (
        <div className="hidden sm:block text-sm text-muted-foreground">
          📍 {selectedUniversity.name}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-muted rounded-full transition-colors touch-target">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors overflow-hidden touch-target"
          >
            {user?.image ? (
              <img src={user.image} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-primary" />
            )}
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50 animate-scale-in">
              <div className="px-4 py-2 text-sm font-semibold border-b border-border">
                {user?.displayName}
              </div>
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
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
