import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Search, Filter, Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { mockLicenseData } from './mockLicenseData';
import { LicenseData, RiskLevel } from './types';

interface LicenseTableProps {
  onLicenseClick: (license: LicenseData) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  licenseTypeFilter: string[];
  setLicenseTypeFilter: (types: string[]) => void;
  usedInFilter: string[];
  setUsedInFilter: (locations: string[]) => void;
}

const LicenseTable: React.FC<LicenseTableProps> = ({
  onLicenseClick,
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

  const filteredLicenses = useMemo(() => {
    return mockLicenseData.filter(license => {
      const matchesSearch = 
        !searchTerm || 
        license.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.version.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLicenseType = 
        licenseTypeFilter.length === 0 || 
        licenseTypeFilter.includes(license.licenseType);
      
      const matchesUsedIn = 
        usedInFilter.length === 0 || 
        license.usedIn.some(location => usedInFilter.includes(location));
      
      return matchesSearch && matchesLicenseType && matchesUsedIn;
    });
  }, [searchTerm, licenseTypeFilter, usedInFilter]);

  const getLicenseBadgeColor = (licenseType: string) => {
    switch (licenseType) {
      case 'Apache 2.0':
      case 'MIT':
      case 'BSD-2-Clause':
      case 'BSD-3-Clause':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'GPL':
      case 'LGPL':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'AGPL':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Proprietary':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Custom':
      case 'MPL':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRiskLevelIcon = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'Medium':
        return <ShieldAlert className="h-4 w-4 text-amber-500" />;
      case 'High':
        return <ShieldX className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component Name</TableHead>
              <TableHead>License Type</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Used In</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLicenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No licenses found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredLicenses.map((license) => (
                <TableRow 
                  key={license.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onLicenseClick(license)}
                >
                  <TableCell className="font-medium">{license.componentName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getLicenseBadgeColor(license.licenseType)}>
                      {license.licenseType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getRiskLevelIcon(license.riskLevel)}
                      <span className={`text-sm ${
                        license.riskLevel === 'Low' ? 'text-green-600 dark:text-green-400' :
                        license.riskLevel === 'Medium' ? 'text-amber-600 dark:text-amber-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {license.riskLevel}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{license.version}</TableCell>
                  <TableCell>
                    <a 
                      href={`https://${license.source}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {license.source}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {license.usedIn.map((location, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-xs text-muted-foreground mt-2">
        Showing {filteredLicenses.length} of {mockLicenseData.length} licenses
      </div>
    </div>
  );
};

export default LicenseTable;
