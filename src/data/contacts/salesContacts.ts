
import { SalesContact } from '@/types/contacts';
import { randomDate, randomFutureDate } from './contactUtils';

// Generate mock Sales contacts
export const mockSalesContacts: SalesContact[] = [
  {
    id: '7',
    name: 'John Miller',
    email: 'john.miller@coretech.com',
    phone: '555-111-2222',
    category: 'sales',
    isFavorite: false,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    company: 'CoreTech Solutions',
    representativeName: 'John Miller',
    preferredOrderChannels: ['Email', 'Portal'],
    currentContracts: ['Enterprise License 2023-24', 'Support Contract #CT-789'],
    contractRenewalDate: randomFutureDate()
  },
  {
    id: '8',
    name: 'Sarah Johnson',
    email: 'sarah.j@networkgear.com',
    phone: '555-333-4444',
    category: 'sales',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    company: 'NetworkGear Inc',
    representativeName: 'Sarah Johnson',
    preferredOrderChannels: ['Email', 'Phone'],
    currentContracts: ['Network Equipment Lease #NE-456'],
    contractRenewalDate: randomFutureDate()
  },
];
