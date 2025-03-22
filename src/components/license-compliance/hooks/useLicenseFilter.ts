
import { useMemo } from 'react';
import { LicenseData } from '../types';

interface UseLicenseFilterProps {
  licenses: LicenseData[];
  searchTerm: string;
  licenseTypeFilter: string[];
  usedInFilter: string[];
}

/**
 * Custom hook for filtering license data based on search term and filters
 */
export const useLicenseFilter = ({
  licenses,
  searchTerm,
  licenseTypeFilter,
  usedInFilter
}: UseLicenseFilterProps) => {
  const filteredLicenses = useMemo(() => {
    return licenses.filter(license => {
      // Filter by search term (case insensitive)
      const matchesSearch = 
        !searchTerm || 
        license.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.version.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by license type
      const matchesLicenseType = 
        licenseTypeFilter.length === 0 || 
        licenseTypeFilter.includes(license.licenseType);
      
      // Filter by used in locations
      const matchesUsedIn = 
        usedInFilter.length === 0 || 
        license.usedIn.some(location => usedInFilter.includes(location));
      
      return matchesSearch && matchesLicenseType && matchesUsedIn;
    });
  }, [licenses, searchTerm, licenseTypeFilter, usedInFilter]);

  return {
    filteredLicenses,
    totalCount: licenses.length,
    filteredCount: filteredLicenses.length
  };
};
