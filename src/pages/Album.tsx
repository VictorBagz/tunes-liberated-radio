
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal, Heart, Clock } from 'lucide-react';
import { TrackList } from '@/components/TrackList';
import { useMusic, Track } from '@/contexts/MusicContext';

export default function Album() {
  const { id } = useParams();
  const { setQueue, playTrack } = useMusic();

  // Mock album data
  const album = {
    id: id || '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop',
    releaseDate: '2020',
    totalTracks: 14,
    duration: 3360, // seconds
    genre: 'Pop',
    tracks: [
      {
        id: '1',
        title: 'Alone Again',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 265,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      {
        id: '2',
        title: 'Too Late',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 240,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      },
      {
        id: '3',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 200,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      },
    ] as Track[]
  };

  const handlePlayAll = () => {
    if (album.tracks.length > 0) {
      setQueue(album.tracks);
      playTrack(album.tracks[0]);
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
      <div className="bg-gradient-to-b from-red-800 to-gray-900 p-8">
        <div className="flex items-end gap-6">
          <img
            src={album.image}
            alt={album.title}
            className="w-48 h-48 rounded shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-white text-sm font-medium mb-2">ALBUM</p>
            <h1 className="text-white text-6xl font-bold mb-4">{album.title}</h1>
            <div className="flex items-center gap-1 text-white text-lg">
              <span className="font-semibold">{album.artist}</span>
              <span>•</span>
              <span>{album.releaseDate}</span>
              <span>•</span>
              <span>{album.totalTracks} songs,</span>
              <span className="text-gray-300">{formatDuration(album.duration)}</span>
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
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>

        {/* Track List */}
        <TrackList tracks={album.tracks} showAlbum={false} />
      </div>
    </div>
  );
}
