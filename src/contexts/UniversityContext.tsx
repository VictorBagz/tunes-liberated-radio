
import React, { createContext, useContext, useState, useEffect } from 'react';

interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  hostelCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface UniversityContextType {
  universities: University[];
  selectedUniversity: University | null;
  selectUniversity: (university: University) => void;
  searchUniversities: (query: string) => University[];
  isLoading: boolean;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    hostelCount: 25,
    coordinates: { lat: 42.3744, lng: -71.1169 }
  },
  {
    id: '2',
    name: 'Stanford University',
    location: 'Stanford, CA',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    hostelCount: 18,
    coordinates: { lat: 37.4275, lng: -122.1697 }
  },
  {
    id: '3',
    name: 'MIT',
    location: 'Cambridge, MA',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    hostelCount: 22,
    coordinates: { lat: 42.3601, lng: -71.0942 }
  },
  {
    id: '4',
    name: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    hostelCount: 30,
    coordinates: { lat: 37.8719, lng: -122.2585 }
  },
  {
    id: '5',
    name: 'Yale University',
    location: 'New Haven, CT',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    hostelCount: 16,
    coordinates: { lat: 41.3163, lng: -72.9223 }
  }
];

export function UniversityProvider({ children }: { children: React.ReactNode }) {
  const [universities] = useState<University[]>(mockUniversities);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('selected_university');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedUniversity(parsed);
    }
  }, []);

  const selectUniversity = (university: University) => {
    setSelectedUniversity(university);
    localStorage.setItem('selected_university', JSON.stringify(university));
  };

  const searchUniversities = (query: string) => {
    if (!query.trim()) return universities;
    
    return universities.filter(uni =>
      uni.name.toLowerCase().includes(query.toLowerCase()) ||
      uni.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <UniversityContext.Provider value={{
      universities,
      selectedUniversity,
      selectUniversity,
      searchUniversities,
      isLoading
    }}>
      {children}
    </UniversityContext.Provider>
  );
}

export function useUniversity() {
  const context = useContext(UniversityContext);
  if (context === undefined) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
}
