
import { Home, Search, Library, Plus, Heart, Music } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const playlists = [
    { id: '1', name: "Liked Songs", href: "/library/liked" },
    { id: '2', name: "My Playlist #1", href: "/playlist/1" },
    { id: '3', name: "Discover Weekly", href: "/playlist/2" },
    { id: '4', name: "Release Radar", href: "/playlist/3" },
    { id: '5', name: "Chill Mix", href: "/playlist/4" },
    { id: '6', name: "Rock Classics", href: "/playlist/5" },
    { id: '7', name: "Electronic Vibes", href: "/playlist/6" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn("w-64 bg-black text-white p-6 h-full flex flex-col", className)}>
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Music className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold">Spotify</span>
        </Link>
        
        <nav className="space-y-4">
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-4 transition-colors font-medium",
              isActive("/") ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <Home className="w-6 h-6" />
            <span>Home</span>
          </Link>
          <Link 
            to="/search" 
            className={cn(
              "flex items-center gap-4 transition-colors font-medium",
              isActive("/search") ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <Search className="w-6 h-6" />
            <span>Search</span>
          </Link>
          <Link 
            to="/library" 
            className={cn(
              "flex items-center gap-4 transition-colors font-medium",
              isActive("/library") ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <Library className="w-6 h-6" />
            <span>Your Library</span>
          </Link>
        </nav>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Plus className="w-6 h-6" />
            <span>Create Playlist</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/library/liked" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Heart className="w-6 h-6 fill-current text-green-500" />
            <span>Liked Songs</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={playlist.href}
              className="block text-gray-400 hover:text-white transition-colors text-sm py-1"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
