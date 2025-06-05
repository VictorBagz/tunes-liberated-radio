
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal, Heart, Shuffle } from 'lucide-react';
import { TrackList } from '@/components/TrackList';
import { AlbumCard } from '@/components/AlbumCard';
import { ArtistCard } from '@/components/ArtistCard';
import { useMusic, Track } from '@/contexts/MusicContext';

export default function Artist() {
  const { id } = useParams();
  const { setQueue, playTrack } = useMusic();

  // Mock artist data
  const artist = {
    id: id || '1',
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&h=800&fit=crop&crop=face',
    followers: '50,123,456',
    monthlyListeners: '45,678,123',
    isFollowing: false,
    topTracks: [
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
        title: 'Save Your Tears',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 215,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      },
    ] as Track[],
    albums: [
      {
        id: '1',
        title: 'After Hours',
        artist: 'The Weeknd',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      },
      {
        id: '2',
        title: 'Dawn FM',
        artist: 'The Weeknd',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      },
    ],
    relatedArtists: [
      {
        id: '2',
        name: 'Dua Lipa',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b407?w=300&h=300&fit=crop&crop=face',
        followers: '30M followers',
      },
      {
        id: '3',
        name: 'Harry Styles',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
        followers: '40M followers',
      },
    ],
  };

  const handlePlayAll = () => {
    if (artist.topTracks.length > 0) {
      setQueue(artist.topTracks);
      playTrack(artist.topTracks[0]);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-800 to-gray-900 p-8">
        <div className="flex items-end gap-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-48 h-48 rounded-full shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-white text-sm font-medium mb-2">ARTIST</p>
            <h1 className="text-white text-6xl font-bold mb-4">{artist.name}</h1>
            <p className="text-white text-lg">{artist.monthlyListeners} monthly listeners</p>
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
          <button className="px-6 py-2 border border-gray-400 text-white rounded-full hover:border-white transition-colors">
            Following
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>

        {/* Popular Tracks */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-bold mb-6">Popular</h2>
          <TrackList tracks={artist.topTracks.slice(0, 5)} showHeader={false} showAlbum={false} />
        </section>

        {/* Albums */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-bold mb-6">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artist.albums.map((album) => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </div>
        </section>

        {/* Related Artists */}
        <section>
          <h2 className="text-white text-2xl font-bold mb-6">Fans also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artist.relatedArtists.map((relatedArtist) => (
              <ArtistCard key={relatedArtist.id} {...relatedArtist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
