
import React from 'react';
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
import { useLicenseFilter } from '../hooks/useLicenseFilter';

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
  const { filteredLicenses, totalCount, filteredCount } = useLicenseFilter({
    licenses: mockLicenseData,
    searchTerm,
    licenseTypeFilter,
    usedInFilter
  });

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
        Showing {filteredCount} of {totalCount} licenses
      </div>
    </div>
  );
};

export default LicenseTable;
