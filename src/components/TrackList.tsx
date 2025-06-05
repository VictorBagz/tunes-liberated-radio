
import { Play, Pause, MoreHorizontal, Heart, Clock } from "lucide-react";
import { useMusic, Track } from "@/contexts/MusicContext";

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
  showAlbum?: boolean;
}

export function TrackList({ tracks, showHeader = true, showAlbum = true }: TrackListProps) {
  const { currentTrack, isPlaying, playTrack, playPause } = useMusic();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      playPause();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="space-y-1">
      {showHeader && (
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm border-b border-gray-800">
          <div className="col-span-1">#</div>
          <div className="col-span-6">TITLE</div>
          {showAlbum && <div className="col-span-3">ALBUM</div>}
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      )}
      
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const isCurrentlyPlaying = isCurrentTrack && isPlaying;
        
        return (
          <div
            key={track.id}
            className="grid grid-cols-12 gap-4 px-4 py-2 rounded hover:bg-gray-800/50 group cursor-pointer"
            onClick={() => handleTrackClick(track)}
          >
            <div className="col-span-1 flex items-center">
              {isCurrentlyPlaying ? (
                <Pause className="w-4 h-4 text-green-500" />
              ) : isCurrentTrack ? (
                <Play className="w-4 h-4 text-green-500" />
              ) : (
                <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
              )}
              <Play className="w-4 h-4 text-white hidden group-hover:block" />
            </div>
            
            <div className="col-span-6 flex items-center gap-3">
              <img
                src={track.image}
                alt={track.title}
                className="w-10 h-10 rounded"
              />
              <div>
                <div className={`font-medium ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
                  {track.title}
                </div>
                <div className="text-gray-400 text-sm">{track.artist}</div>
              </div>
            </div>
            
            {showAlbum && (
              <div className="col-span-3 flex items-center text-gray-400 text-sm">
                {track.album}
              </div>
            )}
            
            <div className="col-span-1 flex items-center">
              <button className="opacity-0 group-hover:opacity-100 hover:text-white text-gray-400">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            
            <div className="col-span-1 flex items-center justify-between">
              <span className="text-gray-400 text-sm">{formatDuration(track.duration)}</span>
              <button className="opacity-0 group-hover:opacity-100 hover:text-white text-gray-400">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
