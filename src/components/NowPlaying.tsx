
import { Heart, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Mic2, ListMusic, Volume2 } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";

export function NowPlaying() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    isRepeating,
    playPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat
  } = useMusic();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = (clickX / width) * 100;
    setVolume(Math.max(0, Math.min(100, newVolume)));
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center gap-4 w-1/4">
          <img
            src={currentTrack.image}
            alt={currentTrack.title}
            className="w-14 h-14 rounded"
          />
          <div>
            <h4 className="text-white text-sm font-medium">{currentTrack.title}</h4>
            <p className="text-gray-400 text-xs">{currentTrack.artist}</p>
          </div>
          <button className="text-gray-400 hover:text-green-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={toggleShuffle}
              className={`transition-colors ${isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={previousTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={playPause}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black" />
              ) : (
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              )}
            </button>
            <button 
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleRepeat}
              className={`transition-colors ${isRepeating !== 'none' ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="bg-white rounded-full h-1 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
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
            <div 
              className="w-20 bg-gray-600 rounded-full h-1 cursor-pointer"
              onClick={handleVolumeChange}
            >
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
