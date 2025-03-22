
import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockLicenseData } from '../data';
import { LicenseData } from '../types';
import { LicenseFilters } from './LicenseFilters';
import { LicenseTableRow } from './LicenseTableRow';
import { EmptyTableState } from './EmptyTableState';

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

  return (
    <div className="space-y-4">
      <LicenseFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        licenseTypeFilter={licenseTypeFilter}
        setLicenseTypeFilter={setLicenseTypeFilter}
        usedInFilter={usedInFilter}
        setUsedInFilter={setUsedInFilter}
      />
      
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
              <EmptyTableState />
            ) : (
              filteredLicenses.map((license) => (
                <LicenseTableRow 
                  key={license.id} 
                  license={license} 
                  onLicenseClick={onLicenseClick} 
                />
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
