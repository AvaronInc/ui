
import { TechSupportContact } from '@/types/contacts';
import { randomDate, randomFutureDate } from './contactUtils';

// Generate mock Tech Support contacts
export const mockTechSupportContacts: TechSupportContact[] = [
  {
    id: '4',
    name: 'Cisco Support',
    email: 'support@cisco.com',
    phone: '555-444-3333',
    category: 'tech-support',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    vendor: 'Cisco',
    supportEmail: 'enterprise-support@cisco.com',
    supportPhone: '888-444-3333',
    ticketPortalLink: 'https://support.cisco.com/portal',
    warrantyExpirationDate: randomFutureDate(),
    serialNumbers: ['CSC123456', 'CSC789012'],
    modelDetails: 'Catalyst 9300 Series',
    warrantyStatus: 'Active'
  },
  {
    id: '5',
    name: 'Microsoft Enterprise Support',
    email: 'enterprise@microsoft.com',
    phone: '555-777-8888',
    category: 'tech-support',
    isFavorite: false,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    vendor: 'Microsoft',
    supportEmail: 'enterprise-support@microsoft.com',
    supportPhone: '888-777-8888',
    ticketPortalLink: 'https://support.microsoft.com/enterprise',
    warrantyExpirationDate: randomFutureDate(),
    serialNumbers: ['MS-ENT-12345'],
    modelDetails: 'Microsoft 365 E5',
    warrantyStatus: 'Active'
  },
  {
    id: '6',
    name: 'Dell Server Support',
    email: 'server-support@dell.com',
    phone: '555-222-1111',
    category: 'tech-support',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    vendor: 'Dell',
    supportEmail: 'enterprise-server@dell.com',
    supportPhone: '888-222-1111',
    ticketPortalLink: 'https://support.dell.com/servers',
    warrantyExpirationDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    serialNumbers: ['DLSRV-67890', 'DLSRV-12345'],
    modelDetails: 'PowerEdge R740',
    warrantyStatus: 'Expired'
  },
];
