
import { 
  Contact, 
  ISPContact, 
  TechSupportContact, 
  SalesContact, 
  EmergencyContact, 
  InternalContact,
  ContactCategory
} from '@/types/contacts';

// Generate random date in the last 2 years
const randomDate = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 2);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate random future date within next 3 years
const randomFutureDate = () => {
  const start = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 3);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate mock ISP contacts
export const mockIspContacts: ISPContact[] = [
  {
    id: '1',
    name: 'Fiber Connect Inc',
    email: 'support@fiberconnect.com',
    phone: '555-123-4567',
    category: 'isp',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    primaryContactPerson: 'Jane Smith',
    supportPhone: '888-123-4567',
    emergencyPhone: '888-911-4567',
    businessHours: 'Mon-Fri 8am-8pm EST',
    slaAgreementLink: 'https://support.fiberconnect.com/sla',
    serviceType: 'Fiber',
    circuitId: 'FC-123456',
    status: 'Up',
    latency: 12,
    bandwidth: 1000,
    contractExpirationDate: randomFutureDate()
  },
  {
    id: '2',
    name: 'Broadband Solutions',
    email: 'enterprise@bbsolutions.net',
    phone: '555-765-4321',
    category: 'isp',
    isFavorite: false,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    primaryContactPerson: 'Robert Chen',
    supportPhone: '888-765-4321',
    emergencyPhone: '888-765-9999',
    businessHours: '24/7',
    slaAgreementLink: 'https://enterprise.bbsolutions.net/agreement',
    serviceType: 'Copper',
    circuitId: 'BB-987654',
    status: 'Up',
    latency: 25,
    bandwidth: 500,
    contractExpirationDate: randomFutureDate()
  },
  {
    id: '3',
    name: 'Starlink Business',
    email: 'business@starlink.com',
    phone: '555-333-2222',
    category: 'isp',
    isFavorite: true,
    lastAccessed: new Date(),
    createdAt: randomDate(),
    updatedAt: new Date(),
    primaryContactPerson: 'Elon Support',
    supportPhone: '888-333-2222',
    emergencyPhone: '888-333-9999',
    businessHours: '24/7',
    slaAgreementLink: 'https://business.starlink.com/sla',
    serviceType: 'Starlink',
    circuitId: 'SL-789012',
    status: 'Up',
    latency: 45,
    bandwidth: 350,
    contractExpirationDate: randomFutureDate()
  },
];

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

// Combine all contacts
export const mockContacts: Contact[] = [
  ...mockIspContacts,
  ...mockTechSupportContacts,
  ...mockSalesContacts,
  ...mockEmergencyContacts,
  ...mockInternalContacts,
];

// Mock stats for warranty
export const mockWarrantyStatistics = {
  active: 156,
  expired: 43,
  expiringSoon: 28
};

// Helper function to filter contacts
export const filterContacts = (contacts: Contact[], filters: any): Contact[] => {
  return contacts.filter(contact => {
    // Filter by search query
    if (filters.search && !contact.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(contact.category)) {
      return false;
    }
    
    // Filter by favorites
    if (filters.favorites && !contact.isFavorite) {
      return false;
    }
    
    // Filter by warranty status (for tech-support contacts)
    if (filters.warrantyStatus && filters.warrantyStatus.length > 0 && contact.category === 'tech-support') {
      const techContact = contact as TechSupportContact;
      if (!techContact.warrantyStatus || !filters.warrantyStatus.includes(techContact.warrantyStatus)) {
        return false;
      }
    }
    
    // Filter by department (for internal contacts)
    if (filters.departments && filters.departments.length > 0) {
      if (contact.category === 'internal') {
        const internalContact = contact as InternalContact;
        if (!filters.departments.includes(internalContact.department)) {
          return false;
        }
      } else if (contact.category === 'emergency') {
        const emergencyContact = contact as EmergencyContact;
        if (emergencyContact.department && !filters.departments.includes(emergencyContact.department)) {
          return false;
        }
      } else {
        return false;
      }
    }
    
    // Filter by service type (for ISP contacts)
    if (filters.serviceTypes && filters.serviceTypes.length > 0 && contact.category === 'isp') {
      const ispContact = contact as ISPContact;
      if (!filters.serviceTypes.includes(ispContact.serviceType)) {
        return false;
      }
    }
    
    return true;
  });
};

// Get recent contacts (last 5 accessed)
export const getRecentContacts = (contacts: Contact[]): Contact[] => {
  return [...contacts]
    .filter(contact => contact.lastAccessed)
    .sort((a, b) => {
      if (!a.lastAccessed || !b.lastAccessed) return 0;
      return b.lastAccessed.getTime() - a.lastAccessed.getTime();
    })
    .slice(0, 5);
};

// Get favorite contacts
export const getFavoriteContacts = (contacts: Contact[]): Contact[] => {
  return contacts.filter(contact => contact.isFavorite);
};

// Get contacts by category
export const getContactsByCategory = (contacts: Contact[], category: ContactCategory): Contact[] => {
  return contacts.filter(contact => contact.category === category);
};
