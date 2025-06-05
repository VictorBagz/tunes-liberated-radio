
import { AlbumCard } from "@/components/AlbumCard";
import { PlaylistCard } from "@/components/PlaylistCard";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const recentlyPlayed = [
    {
      id: '1',
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      id: '2',
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      id: '3',
      title: "Levitating",
      artist: "Dua Lipa",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
  ];

  const madeForYou = [
    {
      id: '1',
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      id: '2',
      title: "Release Radar",
      description: "Catch all the latest music from artists you follow",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      id: '3',
      title: "Daily Mix 1",
      description: "The Weeknd, Dua Lipa, Taylor Swift and more",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
  ];

  const popularAlbums = [
    {
      id: '1',
      title: "After Hours",
      artist: "The Weeknd",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      id: '2',
      title: "Fine Line",
      artist: "Harry Styles",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      id: '3',
      title: "Future Nostalgia",
      artist: "Dua Lipa",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.displayName}
        </h1>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Recently played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((item) => (
            <AlbumCard
              key={item.id}
              title={item.title}
              artist={item.artist}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Made for you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {madeForYou.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.title}
              description={playlist.description}
              image={playlist.image}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Popular albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artist={album.artist}
              image={album.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
