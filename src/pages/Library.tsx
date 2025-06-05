
import { useState } from 'react';
import { Grid3X3, List, Search } from 'lucide-react';
import { PlaylistCard } from '@/components/PlaylistCard';
import { AlbumCard } from '@/components/AlbumCard';
import { ArtistCard } from '@/components/ArtistCard';

export default function Library() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const libraryItems = [
    {
      type: 'playlist',
      id: '1',
      title: 'Liked Songs',
      description: '42 songs',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    },
    {
      type: 'playlist',
      id: '2',
      title: 'My Playlist #1',
      description: 'Created by you • 15 songs',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    },
    {
      type: 'album',
      id: '3',
      title: 'After Hours',
      artist: 'The Weeknd',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    },
    {
      type: 'artist',
      id: '4',
      name: 'The Weeknd',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      followers: '50M followers',
    },
  ];

  const filters = [
    { id: 'all', label: 'Recently Added' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
  ];

  const filteredItems = libraryItems.filter(item => {
    if (activeFilter !== 'all' && !item.type.includes(activeFilter.slice(0, -1))) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.artist && item.artist.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Your Library</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in Your Library"
          className="w-full max-w-sm bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      <div className="flex gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === filter.id
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}>
        {filteredItems.map((item) => {
          if (item.type === 'playlist') {
            return (
              <PlaylistCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            );
          } else if (item.type === 'album') {
            return (
              <AlbumCard
                key={item.id}
                title={item.title}
                artist={item.artist}
                image={item.image}
              />
            );
          } else if (item.type === 'artist') {
            return (
              <ArtistCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                followers={item.followers}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
