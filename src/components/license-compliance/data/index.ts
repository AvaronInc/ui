
import { licenseItems } from './licenseItems';
import { licenseItemsMore } from './licenseItemsMore';
import { licenseItemsAI } from './licenseItemsAI';
import { licenseSummary } from './licenseSummary';
import { licenseBreakdown } from './licenseBreakdown';
import { LicenseData } from '../types';

// Combine all license items into a single array
export const mockLicenseData: LicenseData[] = [
  ...licenseItems,
  ...licenseItemsMore,
  ...licenseItemsAI
];

// Export other license data
export { licenseSummary, licenseBreakdown };
