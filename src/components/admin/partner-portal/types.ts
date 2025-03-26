
export type PartnerTier = 'Registered' | 'Certified' | 'Premier' | 'White-Label';

export type DealStatus = 'Protected' | 'Expired' | 'Converted' | 'Disputed';
export type QuoteStatus = 'Pending' | 'Won' | 'Lost';
export type SLATier = 'Basic' | 'Standard' | 'Premium' | 'Enterprise';
export type ClientStatus = 'Active' | 'Pending' | 'Inactive';
export type CertificationStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface PartnerInfo {
  id: string;
  name: string;
  tier: PartnerTier;
  channelManager: {
    name: string;
    email: string;
    phone: string;
  };
  metrics: {
    totalClients: number;
    monthlyRecurringRevenue: number;
    commissionPaidYTD: number;
    nextTierThreshold: number;
    currentTierProgress: number;
  };
}

export interface Deal {
  id: string;
  businessName: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  estimatedSize: number;
  requestedProducts: string[];
  notes: string;
  registrationDate: string;
  expirationDate: string;
  status: DealStatus;
}

export interface Quote {
  id: string;
  clientName: string;
  createdDate: string;
  products: {
    hardware: string[];
    supportTier: string;
    storage: number;
    vaultID: number;
    ai: boolean;
    tenantLicenses: number;
  };
  pricing: {
    msrp: number;
    suggestedPrice: number;
    margin: number;
    discount: number;
  };
  status: QuoteStatus;
}

export interface ClientTenant {
  id: string;
  name: string;
  status: ClientStatus;
  userCount: number;
  lastLogin: string;
  slaTier: SLATier;
  lastTicket: {
    id: string;
    summary: string;
    status: string;
  };
}

export interface SupportTicket {
  id: string;
  clientName: string;
  subject: string;
  createdDate: string;
  status: string;
  priority: string;
  lastUpdate: string;
  isEscalated: boolean;
}

export interface PartnerResource {
  id: string;
  title: string;
  type: 'Collateral' | 'Product Sheet' | 'Video' | 'Case Study';
  description: string;
  fileUrl: string;
  dateAdded: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  status: CertificationStatus;
  progress: number;
  badgeUrl?: string;
  linkedInUrl?: string;
  expirationDate?: string;
}

export interface Commission {
  id: string;
  period: string;
  clientName: string;
  productType: string;
  revenue: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'Pending' | 'Paid';
  paymentDate?: string;
}
