
import { Contact } from '@/types/contacts';
import { mockIspContacts } from './ispContacts';
import { mockTechSupportContacts } from './techSupportContacts';
import { mockSalesContacts } from './salesContacts';
import { mockEmergencyContacts } from './emergencyContacts';
import { mockInternalContacts } from './internalContacts';
import { mockWarrantyStatistics } from './warrantyStats';
import { 
  filterContacts,
  getRecentContacts,
  getFavoriteContacts,
  getContactsByCategory
} from './contactUtils';

// Combine all contacts
export const mockContacts: Contact[] = [
  ...mockIspContacts,
  ...mockTechSupportContacts,
  ...mockSalesContacts,
  ...mockEmergencyContacts,
  ...mockInternalContacts,
];

// Export everything
export {
  mockIspContacts,
  mockTechSupportContacts,
  mockSalesContacts,
  mockEmergencyContacts,
  mockInternalContacts,
  mockWarrantyStatistics,
  filterContacts,
  getRecentContacts,
  getFavoriteContacts,
  getContactsByCategory
};
