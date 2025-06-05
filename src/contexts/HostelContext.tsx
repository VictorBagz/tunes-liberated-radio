
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Hostel {
  id: string;
  name: string;
  universityId: string;
  price: number;
  distance: number; // km from campus
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
  availability: 'available' | 'limited' | 'full';
}

interface HostelContextType {
  hostels: Hostel[];
  savedHostels: string[];
  toggleSaveHostel: (hostelId: string) => void;
  getHostelById: (id: string) => Hostel | undefined;
  searchHostels: (query: string, universityId?: string) => Hostel[];
  filterHostels: (filters: HostelFilters) => Hostel[];
  isLoading: boolean;
}

interface HostelFilters {
  universityId?: string;
  maxPrice?: number;
  minRating?: number;
  maxDistance?: number;
  amenities?: string[];
}

const HostelContext = createContext<HostelContextType | undefined>(undefined);

const mockHostels: Hostel[] = [
  {
    id: '1',
    name: 'Campus View Residence',
    universityId: '1',
    price: 1200,
    distance: 0.5,
    rating: 4.5,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    ],
    description: 'Modern student housing with excellent amenities and close campus proximity.',
    amenities: ['WiFi', 'Laundry', 'Furnished', 'Security', 'Gym', 'Study Room'],
    coordinates: { lat: 42.3750, lng: -71.1190 },
    contact: {
      phone: '+1-617-555-0123',
      email: 'info@campusview.com',
      manager: 'Sarah Johnson'
    },
    availability: 'available'
  },
  {
    id: '2',
    name: 'Student Haven',
    universityId: '1',
    price: 950,
    distance: 1.2,
    rating: 4.2,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=400&h=300&fit=crop'
    ],
    description: 'Affordable housing option with basic amenities and good transportation links.',
    amenities: ['WiFi', 'Laundry', 'Security', 'Parking'],
    coordinates: { lat: 42.3690, lng: -71.1230 },
    contact: {
      phone: '+1-617-555-0456',
      email: 'contact@studenthaven.com',
      manager: 'Mike Chen'
    },
    availability: 'limited'
  },
  {
    id: '3',
    name: 'Tech Tower Suites',
    universityId: '2',
    price: 1800,
    distance: 0.3,
    rating: 4.8,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    description: 'Premium student accommodation with luxury amenities and modern facilities.',
    amenities: ['WiFi', 'Laundry', 'Furnished', 'Security', 'Gym', 'Study Room', 'Pool', 'Concierge'],
    coordinates: { lat: 37.4280, lng: -122.1710 },
    contact: {
      phone: '+1-650-555-0789',
      email: 'info@techtowersuites.com',
      manager: 'Jessica Martinez'
    },
    availability: 'available'
  },
  {
    id: '4',
    name: 'MIT Student Lodge',
    universityId: '3',
    price: 1400,
    distance: 0.8,
    rating: 4.3,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop'
    ],
    description: 'Student-focused housing with collaborative spaces and tech-friendly environment.',
    amenities: ['WiFi', 'Furnished', 'Security', 'Study Room', 'Maker Space', 'Coffee Bar'],
    coordinates: { lat: 42.3590, lng: -71.0950 },
    contact: {
      phone: '+1-617-555-0321',
      email: 'hello@mitstudentlodge.com',
      manager: 'David Park'
    },
    availability: 'available'
  }
];

export function HostelProvider({ children }: { children: React.ReactNode }) {
  const [hostels] = useState<Hostel[]>(mockHostels);
  const [savedHostels, setSavedHostels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('saved_hostels');
    if (saved) {
      setSavedHostels(JSON.parse(saved));
    }
  }, []);

  const toggleSaveHostel = (hostelId: string) => {
    const newSaved = savedHostels.includes(hostelId)
      ? savedHostels.filter(id => id !== hostelId)
      : [...savedHostels, hostelId];
    
    setSavedHostels(newSaved);
    localStorage.setItem('saved_hostels', JSON.stringify(newSaved));
  };

  const getHostelById = (id: string) => {
    return hostels.find(hostel => hostel.id === id);
  };

  const searchHostels = (query: string, universityId?: string) => {
    let filtered = hostels;
    
    if (universityId) {
      filtered = filtered.filter(hostel => hostel.universityId === universityId);
    }

    if (!query.trim()) return filtered;

    return filtered.filter(hostel =>
      hostel.name.toLowerCase().includes(query.toLowerCase()) ||
      hostel.description.toLowerCase().includes(query.toLowerCase()) ||
      hostel.amenities.some(amenity => 
        amenity.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filterHostels = (filters: HostelFilters) => {
    return hostels.filter(hostel => {
      if (filters.universityId && hostel.universityId !== filters.universityId) return false;
      if (filters.maxPrice && hostel.price > filters.maxPrice) return false;
      if (filters.minRating && hostel.rating < filters.minRating) return false;
      if (filters.maxDistance && hostel.distance > filters.maxDistance) return false;
      if (filters.amenities?.length) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          hostel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    });
  };

  return (
    <HostelContext.Provider value={{
      hostels,
      savedHostels,
      toggleSaveHostel,
      getHostelById,
      searchHostels,
      filterHostels,
      isLoading
    }}>
      {children}
    </HostelContext.Provider>
  );
}

export function useHostel() {
  const context = useContext(HostelContext);
  if (context === undefined) {
    throw new Error('useHostel must be used within a HostelProvider');
  }
  return context;
}
