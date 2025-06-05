
import { AlbumCard } from "./AlbumCard";

export function MainContent() {
  const featuredPlaylists = [
    {
      title: "Today's Top Hits",
      artist: "Various Artists",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      description: "The most played songs right now"
    },
    {
      title: "RapCaviar",
      artist: "Hip-Hop Central",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      description: "New music from Lil Baby, Juice WRLD and more"
    },
    {
      title: "All Out 2010s",
      artist: "Various Artists", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      description: "The biggest songs of the 2010s"
    },
    {
      title: "Rock Classics",
      artist: "Classic Rock",
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
      description: "Rock legends & epic songs"
    },
    {
      title: "Chill Hits",
      artist: "Chill Music",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      description: "Kick back to the best new and recent chill hits"
    },
    {
      title: "Viva Latino",
      artist: "Latin Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      description: "Today's top Latin hits"
    }
  ];

  const recentlyPlayed = [
    {
      title: "Liked Songs",
      artist: "730 songs",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
    },
    {
      title: "Discover Weekly",
      artist: "Your weekly mixtape",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop"
    },
    {
      title: "Release Radar",
      artist: "Catch all the latest music",
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop"
    },
    {
      title: "Daily Mix 1",
      artist: "The Weeknd, Dua Lipa and more",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
    },
    {
      title: "Daily Mix 2", 
      artist: "Post Malone, Juice WRLD and more",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      title: "Daily Mix 3",
      artist: "Ed Sheeran, Shawn Mendes and more", 
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
    }
  ];

  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? "Good morning" : timeOfDay < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-6">{greeting}</h1>
        
        {/* Recently Played Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {recentlyPlayed.map((item) => (
            <div
              key={item.title}
              className="flex items-center bg-gray-800/50 hover:bg-gray-700/50 rounded transition-colors cursor-pointer group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-l"
              />
              <div className="flex-1 p-4">
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Made for you</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredPlaylists.map((playlist) => (
              <AlbumCard key={playlist.title} {...playlist} />
            ))}
          </div>
        </section>

        {/* Recently Played Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Recently played</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredPlaylists.slice(0, 4).map((playlist) => (
              <AlbumCard key={`recent-${playlist.title}`} {...playlist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
