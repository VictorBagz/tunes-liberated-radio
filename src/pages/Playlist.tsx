
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal, Heart, Download, Share } from 'lucide-react';
import { TrackList } from '@/components/TrackList';
import { useMusic, Track } from '@/contexts/MusicContext';

export default function Playlist() {
  const { id } = useParams();
  const { setQueue, playTrack } = useMusic();

  // Mock playlist data
  const playlist = {
    id: id || '1',
    title: 'My Playlist #1',
    description: 'Your favorite songs in one place',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    owner: 'You',
    followers: 0,
    isPublic: false,
    totalDuration: 3840, // seconds
    tracks: [
      {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 200,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      {
        id: '2',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        album: 'Fine Line',
        duration: 174,
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      },
      {
        id: '3',
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        duration: 203,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      },
    ] as Track[]
  };

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks);
      playTrack(playlist.tracks[0]);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    }
    return `${mins} min`;
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-800 to-gray-900 p-8">
        <div className="flex items-end gap-6">
          <img
            src={playlist.image}
            alt={playlist.title}
            className="w-48 h-48 rounded shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-white text-sm font-medium mb-2">PLAYLIST</p>
            <h1 className="text-white text-6xl font-bold mb-4">{playlist.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{playlist.description}</p>
            <div className="flex items-center gap-1 text-white text-sm">
              <span className="font-semibold">{playlist.owner}</span>
              <span>•</span>
              <span>{playlist.tracks.length} songs,</span>
              <span className="text-gray-300">{formatDuration(playlist.totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-8">
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={handlePlayAll}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 text-black fill-current ml-1" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart className="w-8 h-8" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Download className="w-8 h-8" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>

        {/* Track List */}
        <TrackList tracks={playlist.tracks} />
      </div>
    </div>
  );
}
