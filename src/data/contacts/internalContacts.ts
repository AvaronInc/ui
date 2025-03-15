
import { InternalContact } from '@/types/contacts';
import { randomDate } from './contactUtils';

// Generate mock Internal Team contacts
export const mockInternalContacts: InternalContact[] = [
  {
    id: '12',
    name: 'Michael Torres',
    email: 'michael.torres@company.com',
    phone: '555-100-1001',
    category: 'internal',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    role: 'Network Admin',
    department: 'IT',
    preferredCommunication: 'Slack',
    directReportTo: 'Jennifer Wu'
  },
  {
    id: '13',
    name: 'Jennifer Wu',
    email: 'jennifer.wu@company.com',
    phone: '555-100-1002',
    category: 'internal',
    isFavorite: false,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    role: 'IT Director',
    department: 'IT',
    preferredCommunication: 'Email',
  },
  {
    id: '14',
    name: 'David Singh',
    email: 'david.singh@company.com',
    phone: '555-100-1003',
    category: 'internal',
    isFavorite: false,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    role: 'Security Engineer',
    department: 'Security',
    preferredCommunication: 'Teams',
    directReportTo: 'Jennifer Wu'
  },
  {
    id: '15',
    name: 'Lisa Chen',
    email: 'lisa.chen@company.com',
    phone: '555-100-1004',
    category: 'internal',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    role: 'Cloud Architect',
    department: 'Cloud',
    preferredCommunication: 'Slack',
    directReportTo: 'Jennifer Wu'
  },
];
