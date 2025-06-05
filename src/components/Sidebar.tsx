
import { Home, Search, Library, Plus, Heart, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const playlists = [
    "Liked Songs",
    "My Playlist #1",
    "Discover Weekly",
    "Release Radar",
    "Chill Mix",
    "Rock Classics",
    "Electronic Vibes"
  ];

  return (
    <div className={cn("w-64 bg-black text-white p-6 h-full", className)}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-8">
          <Music className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold">Spotify Clone</span>
        </div>
        
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-4 text-white hover:text-green-500 transition-colors">
            <Home className="w-6 h-6" />
            <span className="font-medium">Home</span>
          </a>
          <a href="#" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors">
            <Search className="w-6 h-6" />
            <span className="font-medium">Search</span>
          </a>
          <a href="#" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors">
            <Library className="w-6 h-6" />
            <span className="font-medium">Your Library</span>
          </a>
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
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Heart className="w-6 h-6 fill-current text-green-500" />
            <span>Liked Songs</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4">
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <a
              key={playlist}
              href="#"
              className="block text-gray-400 hover:text-white transition-colors text-sm py-1"
            >
              {playlist}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
