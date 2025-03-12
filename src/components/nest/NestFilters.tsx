
import React from 'react';
import { NestLocation, NestFilters as NestFilterTypes } from '@/types/nest';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface NestFiltersProps {
  filters: NestFilterTypes;
  setFilters: React.Dispatch<React.SetStateAction<NestFilterTypes>>;
  nestLocations: NestLocation[];
}

const NestFilters: React.FC<NestFiltersProps> = ({ filters, setFilters, nestLocations }) => {
  // Extract unique hardware models and regions for filtering
  const hardwareModels = React.useMemo(() => {
    return Array.from(new Set(nestLocations.map(loc => loc.hardwareModel)));
  }, [nestLocations]);
  
  const regions = React.useMemo(() => {
    return Array.from(new Set(nestLocations.map(loc => loc.region)));
  }, [nestLocations]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  // Handle status filter toggle
  const toggleStatusFilter = (status: 'online' | 'degraded' | 'offline') => {
    setFilters(prev => {
      if (prev.status.includes(status)) {
        return { ...prev, status: prev.status.filter(s => s !== status) };
      } else {
        return { ...prev, status: [...prev.status, status] };
      }
    });
  };

  // Handle hardware type filter toggle
  const toggleHardwareFilter = (hardware: string) => {
    setFilters(prev => {
      if (prev.hardwareType.includes(hardware)) {
        return { ...prev, hardwareType: prev.hardwareType.filter(h => h !== hardware) };
      } else {
        return { ...prev, hardwareType: [...prev.hardwareType, hardware] };
      }
    });
  };

  // Handle region filter toggle
  const toggleRegionFilter = (region: string) => {
    setFilters(prev => {
      if (prev.region.includes(region)) {
        return { ...prev, region: prev.region.filter(r => r !== region) };
      } else {
        return { ...prev, region: [...prev.region, region] };
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      status: ['online', 'degraded', 'offline'],
      hardwareType: [],
      region: []
    });
  };

  const hasActiveFilters = filters.search !== '' || 
                          filters.status.length < 3 || 
                          filters.hardwareType.length > 0 ||
                          filters.region.length > 0;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by location name or region..."
          className="pl-8"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Status:</p>
          <div className="flex flex-wrap gap-1">
            <Badge 
              variant={filters.status.includes('online') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleStatusFilter('online')}
            >
              Online
            </Badge>
            <Badge 
              variant={filters.status.includes('degraded') ? 'warning' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleStatusFilter('degraded')}
            >
              Degraded
            </Badge>
            <Badge 
              variant={filters.status.includes('offline') ? 'destructive' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleStatusFilter('offline')}
            >
              Offline
            </Badge>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Hardware Type:</p>
          <div className="flex flex-wrap gap-1">
            {hardwareModels.map(model => (
              <Badge 
                key={model}
                variant={filters.hardwareType.includes(model) ? 'secondary' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleHardwareFilter(model)}
              >
                {model}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Region:</p>
          <div className="flex flex-wrap gap-1">
            {regions.map(region => (
              <Badge 
                key={region}
                variant={filters.region.includes(region) ? 'secondary' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleRegionFilter(region)}
              >
                {region}
              </Badge>
            ))}
          </div>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto self-end"
            onClick={resetFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default NestFilters;
