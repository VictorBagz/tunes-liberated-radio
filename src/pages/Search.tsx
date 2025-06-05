
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlbumCard } from '@/components/AlbumCard';
import { PlaylistCard } from '@/components/PlaylistCard';
import { ArtistCard } from '@/components/ArtistCard';
import { TrackList } from '@/components/TrackList';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (query) {
      // Simulate search API call
      setTimeout(() => {
        setResults({
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
          ],
          artists: [
            {
              id: '1',
              name: 'The Weeknd',
              image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
              followers: '50M followers'
            },
          ],
          albums: [
            {
              id: '1',
              title: 'After Hours',
              artist: 'The Weeknd',
              image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            },
          ],
          playlists: [
            {
              id: '1',
              title: 'This Is The Weeknd',
              description: 'The essential tracks from The Weeknd',
              image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            },
          ]
        });
      }, 500);
    } else {
      setResults(null);
    }
  }, [query]);

  const browseCategories = [
    { id: '1', title: 'Pop', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', color: 'bg-pink-500' },
    { id: '2', title: 'Hip-Hop', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', color: 'bg-purple-500' },
    { id: '3', title: 'Rock', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', color: 'bg-red-500' },
    { id: '4', title: 'Jazz', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', color: 'bg-blue-500' },
    { id: '5', title: 'Electronic', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', color: 'bg-green-500' },
    { id: '6', title: 'Classical', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', color: 'bg-yellow-500' },
  ];

  if (!query) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Browse all</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {browseCategories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} rounded-lg p-4 aspect-square relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            >
              <h3 className="text-white font-bold text-lg">{category.title}</h3>
              <img
                src={category.image}
                alt={category.title}
                className="absolute bottom-0 right-0 w-16 h-16 object-cover transform rotate-12 translate-x-2 translate-y-2"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="p-6">
        <div className="text-white">Searching for "{query}"...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-white">Search results for "{query}"</h1>
      
      {results.tracks && results.tracks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
          <TrackList tracks={results.tracks} />
        </section>
      )}

      {results.artists && results.artists.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.artists.map((artist: any) => (
              <ArtistCard key={artist.id} {...artist} />
            ))}
          </div>
        </section>
      )}

      {results.albums && results.albums.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.albums.map((album: any) => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </div>
        </section>
      )}

      {results.playlists && results.playlists.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.playlists.map((playlist: any) => (
              <PlaylistCard key={playlist.id} {...playlist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
