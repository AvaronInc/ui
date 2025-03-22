
import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockLicenseData } from '../data';

interface LicenseFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  licenseTypeFilter: string[];
  setLicenseTypeFilter: (types: string[]) => void;
  usedInFilter: string[];
  setUsedInFilter: (locations: string[]) => void;
}

export const LicenseFilters: React.FC<LicenseFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  licenseTypeFilter,
  setLicenseTypeFilter,
  usedInFilter,
  setUsedInFilter,
}) => {
  const uniqueLicenseTypes = useMemo(() => {
    const types = new Set<string>();
    mockLicenseData.forEach(license => {
      types.add(license.licenseType);
    });
    return Array.from(types);
  }, []);

  const uniqueUsedInLocations = useMemo(() => {
    const locations = new Set<string>();
    mockLicenseData.forEach(license => {
      license.usedIn.forEach(location => {
        locations.add(location);
      });
    });
    return Array.from(locations);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>License Type</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {uniqueLicenseTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type}
              checked={licenseTypeFilter.includes(type)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setLicenseTypeFilter([...licenseTypeFilter, type]);
                } else {
                  setLicenseTypeFilter(licenseTypeFilter.filter(t => t !== type));
                }
              }}
            >
              {type}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Used In</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {uniqueUsedInLocations.map((location) => (
            <DropdownMenuCheckboxItem
              key={location}
              checked={usedInFilter.includes(location)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setUsedInFilter([...usedInFilter, location]);
                } else {
                  setUsedInFilter(usedInFilter.filter(l => l !== location));
                }
              }}
            >
              {location}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
