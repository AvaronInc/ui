
import React from 'react';
import { NestLocation } from '@/types/nest';
import { Skeleton } from '@/components/ui/skeleton';
import { useNest } from './NestContext';
import { Badge } from '@/components/ui/badge';

interface NestMapProps {
  locations: NestLocation[];
  selectedLocation: NestLocation | null;
  onSelectLocation: (id: string) => void;
  isLoading: boolean;
}

const NestMap: React.FC<NestMapProps> = ({ 
  locations, 
  selectedLocation, 
  onSelectLocation,
  isLoading 
}) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  
  // Function to get status color
  const getStatusColor = (status: 'online' | 'degraded' | 'offline') => {
    switch (status) {
      case 'online': return '#10b981'; // green
      case 'degraded': return '#f59e0b'; // amber
      case 'offline': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  // Calculate map boundaries based on locations
  const calculateMapBounds = () => {
    if (locations.length === 0) return null;
    
    // Find min/max lat/lng
    let minLat = locations[0].latitude;
    let maxLat = locations[0].latitude;
    let minLng = locations[0].longitude;
    let maxLng = locations[0].longitude;
    
    locations.forEach(loc => {
      minLat = Math.min(minLat, loc.latitude);
      maxLat = Math.max(maxLat, loc.latitude);
      minLng = Math.min(minLng, loc.longitude);
      maxLng = Math.max(maxLng, loc.longitude);
    });
    
    // Add padding
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;
    
    return {
      south: minLat - latPadding,
      north: maxLat + latPadding,
      west: minLng - lngPadding,
      east: maxLng + lngPadding
    };
  };

  if (isLoading) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  // This is a placeholder for an actual map implementation
  // In a real implementation, you would use a library like Mapbox, Google Maps, or Leaflet
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden" ref={mapContainer}>
      <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Map View</p>
          <p className="text-sm text-muted-foreground">Note: In a production environment, this would be integrated with a mapping service like Mapbox or Google Maps.</p>
        </div>
      </div>
      
      {/* Simulated map markers */}
      <div className="absolute inset-0 pointer-events-none">
        {locations.map((location) => (
          <div 
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer
                       ${selectedLocation?.id === location.id ? 'z-10' : 'z-0'}`}
            style={{ 
              left: `${((location.longitude + 180) / 360) * 100}%`, 
              top: `${(1 - ((location.latitude + 90) / 180)) * 100}%` 
            }}
            onClick={() => onSelectLocation(location.id)}
          >
            <div 
              className={`h-4 w-4 rounded-full border-2 border-white shadow-md transition-all duration-300
                         ${selectedLocation?.id === location.id ? 'h-6 w-6' : ''}`}
              style={{ backgroundColor: getStatusColor(location.status) }}
            ></div>
            <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/90 
                           px-2 py-0.5 text-xs rounded shadow-sm transition-opacity duration-300
                           ${selectedLocation?.id === location.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              {location.name}
              <Badge variant={location.status === 'online' ? 'default' : location.status === 'degraded' ? 'warning' : 'destructive'}
                     className="ml-1 text-[10px] px-1 py-0">
                {location.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestMap;
