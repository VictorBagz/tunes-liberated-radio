
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Wifi, Car, Dumbbell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUniversity } from "@/contexts/UniversityContext";
import { useHostel } from "@/contexts/HostelContext";
import { HostelCard } from "@/components/HostelCard";
import { UniversitySelector } from "@/components/UniversitySelector";

export default function Home() {
  const { user } = useAuth();
  const { selectedUniversity } = useUniversity();
  const { hostels } = useHostel();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredHostels = hostels.slice(0, 3);
  const nearbyHostels = selectedUniversity 
    ? hostels.filter(h => h.universityId === selectedUniversity.id).slice(0, 4)
    : [];

  const quickFilters = [
    { icon: Wifi, label: "WiFi", value: "WiFi" },
    { icon: Car, label: "Parking", value: "Parking" },
    { icon: Dumbbell, label: "Gym", value: "Gym" },
  ];

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.displayName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-primary-foreground/80 mb-4">
          Find your perfect student accommodation
        </p>
        
        {!selectedUniversity && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm mb-3">First, select your university:</p>
            <UniversitySelector />
          </div>
        )}
      </div>

      {/* Quick Search */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Search</h2>
        <Link to="/search" className="block">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border hover:bg-muted transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Search hostels, areas, amenities...</span>
          </div>
        </Link>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickFilters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Link
                key={filter.value}
                to={`/search?amenity=${filter.value}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{filter.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Hostels */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Hostels</h2>
          <Link to="/search" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </div>

      {/* Near Your University */}
      {selectedUniversity && nearbyHostels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Near {selectedUniversity.name}</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {nearbyHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} compact />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{hostels.length}+</div>
          <div className="text-sm text-muted-foreground">Hostels</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">50+</div>
          <div className="text-sm text-muted-foreground">Universities</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">4.5</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Star className="w-3 h-3 fill-current text-yellow-500" />
            Rating
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">24/7</div>
          <div className="text-sm text-muted-foreground">Support</div>
        </div>
      </div>
    </div>
  );
}
