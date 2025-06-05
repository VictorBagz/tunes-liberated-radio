
import { Heart, MapPin, Star, Wifi, Car, Dumbbell, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useHostel } from "@/contexts/HostelContext";

interface HostelCardProps {
  hostel: {
    id: string;
    name: string;
    price: number;
    distance: number;
    rating: number;
    reviewCount: number;
    images: string[];
    amenities: string[];
    availability: 'available' | 'limited' | 'full';
  };
  compact?: boolean;
}

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Parking': Car,
  'Gym': Dumbbell,
  'Security': Shield,
};

export function HostelCard({ hostel, compact = false }: HostelCardProps) {
  const { savedHostels, toggleSaveHostel } = useHostel();
  const isSaved = savedHostels.includes(hostel.id);

  const availabilityColor = {
    available: 'text-green-600 bg-green-50',
    limited: 'text-yellow-600 bg-yellow-50',
    full: 'text-red-600 bg-red-50'
  };

  const availabilityText = {
    available: 'Available',
    limited: 'Limited',
    full: 'Full'
  };

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl overflow-hidden hover-lift",
      compact && "flex gap-3 p-3"
    )}>
      <div className={cn(
        "relative",
        compact ? "w-24 h-24 flex-shrink-0" : "h-48"
      )}>
        <img
          src={hostel.images[0]}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveHostel(hostel.id);
          }}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full transition-all touch-target",
            isSaved 
              ? "bg-red-500 text-white" 
              : "bg-white/80 hover:bg-white text-gray-600"
          )}
        >
          <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
        </button>
        <div className={cn(
          "absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium",
          availabilityColor[hostel.availability]
        )}>
          {availabilityText[hostel.availability]}
        </div>
      </div>

      <div className={cn("p-4", compact && "p-0 flex-1")}>
        <Link to={`/hostel/${hostel.id}`} className="block">
          <h3 className={cn(
            "font-semibold text-foreground hover:text-primary transition-colors",
            compact ? "text-sm mb-1" : "text-lg mb-2"
          )}>
            {hostel.name}
          </h3>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span className="text-sm font-medium">{hostel.rating}</span>
              <span className="text-xs text-muted-foreground">({hostel.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{hostel.distance}km from campus</span>
            </div>
          </div>

          {!compact && (
            <div className="flex gap-2 mb-3">
              {hostel.amenities.slice(0, 3).map((amenity) => {
                const Icon = amenityIcons[amenity];
                return (
                  <div key={amenity} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                    {Icon && <Icon className="w-3 h-3" />}
                    <span>{amenity}</span>
                  </div>
                );
              })}
              {hostel.amenities.length > 3 && (
                <div className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                  +{hostel.amenities.length - 3} more
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">${hostel.price}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            {compact && hostel.amenities.length > 0 && (
              <div className="flex gap-1">
                {hostel.amenities.slice(0, 2).map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return Icon ? (
                    <Icon key={amenity} className="w-3 h-3 text-muted-foreground" />
                  ) : null;
                })}
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
