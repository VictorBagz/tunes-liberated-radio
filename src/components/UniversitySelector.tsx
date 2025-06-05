
import { useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useUniversity } from "@/contexts/UniversityContext";

export function UniversitySelector() {
  const { universities, selectedUniversity, selectUniversity, searchUniversities } = useUniversity();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUniversities = searchQuery 
    ? searchUniversities(searchQuery)
    : universities;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white border border-border rounded-lg hover:border-primary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div className="text-left">
            {selectedUniversity ? (
              <>
                <div className="font-medium">{selectedUniversity.name}</div>
                <div className="text-sm text-muted-foreground">{selectedUniversity.location}</div>
              </>
            ) : (
              <div className="text-muted-foreground">Select your university</div>
            )}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search universities..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredUniversities.map((university) => (
              <button
                key={university.id}
                onClick={() => {
                  selectUniversity(university);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
              >
                <img
                  src={university.image}
                  alt={university.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="font-medium">{university.name}</div>
                  <div className="text-sm text-muted-foreground">{university.location}</div>
                  <div className="text-xs text-primary">{university.hostelCount} hostels available</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
