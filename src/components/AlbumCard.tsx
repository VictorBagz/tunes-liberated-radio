
import { Play } from "lucide-react";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
  description?: string;
}

export function AlbumCard({ title, artist, image, description }: AlbumCardProps) {
  return (
    <div className="group bg-gray-900/40 p-4 rounded-lg hover:bg-gray-800/60 transition-all duration-300 cursor-pointer relative">
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-lg">
          <Play className="w-5 h-5 text-black fill-current ml-1" />
        </button>
      </div>
      <h3 className="text-white font-semibold mb-1 truncate">{title}</h3>
      <p className="text-gray-400 text-sm truncate">
        {description || `By ${artist}`}
      </p>
    </div>
  );
}
