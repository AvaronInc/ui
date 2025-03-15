
import { EmergencyContact } from '@/types/contacts';
import { randomDate } from './contactUtils';

// Generate mock Emergency contacts
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: '9',
    name: 'Network Emergency Response',
    email: 'emergency@netsupport.com',
    phone: '555-911-0000',
    category: 'emergency',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    escalationLevel: 1,
    department: 'Network Operations',
    responsibleArea: 'Network',
    availableHours: '24/7'
  },
  {
    id: '10',
    name: 'Security Incident Response',
    email: 'security-emergency@csirt.org',
    phone: '555-911-1111',
    category: 'emergency',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    escalationLevel: 1,
    department: 'Cybersecurity',
    responsibleArea: 'Cybersecurity',
    availableHours: '24/7'
  },
  {
    id: '11',
    name: 'Data Center Emergency',
    email: 'dc-emergency@datacenter.com',
    phone: '555-911-2222',
    category: 'emergency',
    isFavorite: false,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    escalationLevel: 2,
    department: 'Infrastructure',
    responsibleArea: 'Data Center',
    availableHours: '24/7'
  },
];
