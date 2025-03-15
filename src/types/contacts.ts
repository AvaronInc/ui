
export type ContactCategory = 
  | 'isp' 
  | 'tech-support' 
  | 'sales' 
  | 'emergency' 
  | 'internal';

export type ServiceType = 
  | 'Fiber' 
  | 'Copper' 
  | 'Wireless' 
  | 'Starlink' 
  | 'Cable' 
  | 'Satellite' 
  | 'Other';

export type PreferredCommunication = 
  | 'Email' 
  | 'Phone' 
  | 'Slack' 
  | 'Teams' 
  | 'SMS' 
  | 'Portal';

export type PreferredOrderChannel = 
  | 'Email' 
  | 'Phone' 
  | 'Portal' 
  | 'Sales Rep';

export type WarrantyStatus = 
  | 'Active' 
  | 'Expired' 
  | 'Expiring Soon';

export interface BaseContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  category: ContactCategory;
  isFavorite: boolean;
  lastAccessed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISPContact extends BaseContact {
  category: 'isp';
  primaryContactPerson?: string;
  supportPhone?: string;
  emergencyPhone?: string;
  businessHours?: string;
  slaAgreementLink?: string;
  serviceType: ServiceType;
  circuitId?: string;
  status?: 'Up' | 'Down' | 'Degraded';
  latency?: number;
  bandwidth?: number;
  contractExpirationDate?: Date;
}

export interface TechSupportContact extends BaseContact {
  category: 'tech-support';
  vendor: string;
  supportEmail?: string;
  supportPhone?: string;
  ticketPortalLink?: string;
  warrantyExpirationDate?: Date;
  serialNumbers?: string[];
  modelDetails?: string;
  warrantyStatus?: WarrantyStatus;
}

export interface SalesContact extends BaseContact {
  category: 'sales';
  company: string;
  representativeName?: string;
  preferredOrderChannels: PreferredOrderChannel[];
  currentContracts?: string[];
  contractRenewalDate?: Date;
}

export interface EmergencyContact extends BaseContact {
  category: 'emergency';
  escalationLevel: number;
  department?: string;
  responsibleArea: string; // e.g., "Network", "Cybersecurity", "Infrastructure"
  availableHours?: string;
}

export interface InternalContact extends BaseContact {
  category: 'internal';
  role: string;
  department: string;
  preferredCommunication: PreferredCommunication;
  directReportTo?: string;
}

export type Contact = 
  | ISPContact 
  | TechSupportContact 
  | SalesContact 
  | EmergencyContact 
  | InternalContact;

export interface ContactsFilter {
  search?: string;
  categories?: ContactCategory[];
  favorites?: boolean;
  warrantyStatus?: WarrantyStatus[];
  departments?: string[];
  serviceTypes?: ServiceType[];
}

// Mock data structure for warranty statistics
export interface WarrantyStatistics {
  active: number;
  expired: number;
  expiringSoon: number;
}

// Custom exception for contact validation issues
export class ContactValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactValidationError';
  }
}
