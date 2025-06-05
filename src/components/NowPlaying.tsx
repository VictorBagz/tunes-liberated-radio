
import { Heart, Shuffle, SkipBack, Play, SkipForward, Repeat, Mic2, ListMusic, Volume2 } from "lucide-react";
import { useState } from "react";

export function NowPlaying() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(70);

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center gap-4 w-1/4">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
            alt="Now Playing"
            className="w-14 h-14 rounded"
          />
          <div>
            <h4 className="text-white text-sm font-medium">Blinding Lights</h4>
            <p className="text-gray-400 text-xs">The Weeknd</p>
          </div>
          <button className="text-gray-400 hover:text-green-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center gap-4 mb-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Play className="w-4 h-4 text-black fill-current ml-0.5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-400">1:23</span>
            <div className="flex-1 bg-gray-600 rounded-full h-1">
              <div
                className="bg-white rounded-full h-1 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400">3:20</span>
          </div>
        </div>

        {/* Volume and Options */}
        <div className="flex items-center gap-4 w-1/4 justify-end">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Mic2 className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ListMusic className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <div className="w-20 bg-gray-600 rounded-full h-1">
              <div
                className="bg-white rounded-full h-1"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
