
export interface Company {
  id: string;
  name: string;
  domain: string;
  logo_url?: string;
}

export interface CompanySystem {
  id: string;
  company_id: string;
  name: string;
  description: string;
  system_url: string;
  status: string;
}

// Dummy data for companies
export const dummyCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    domain: 'acme.com',
    logo_url: undefined
  },
  {
    id: '2',
    name: 'TechSolutions Inc.',
    domain: 'techsolutions.io',
    logo_url: undefined
  },
  {
    id: '3',
    name: 'GlobalEnterprises',
    domain: 'globalenterprises.org',
    logo_url: undefined
  }
];

// Dummy data for systems
export const dummySystems: CompanySystem[] = [
  {
    id: '1',
    company_id: '1',
    name: 'Acme Billing System',
    description: 'Enterprise billing and invoicing platform',
    system_url: 'https://billing.acme.com',
    status: 'active'
  },
  {
    id: '2',
    company_id: '1',
    name: 'Acme CRM',
    description: 'Customer relationship management system',
    system_url: 'https://crm.acme.com',
    status: 'maintenance'
  },
  {
    id: '3',
    company_id: '2',
    name: 'TechSolutions ERP',
    description: 'Enterprise resource planning system',
    system_url: 'https://erp.techsolutions.io',
    status: 'active'
  },
  {
    id: '4',
    company_id: '2',
    name: 'TechSolutions Support Portal',
    description: 'Customer support ticketing and knowledge base',
    system_url: 'https://support.techsolutions.io',
    status: 'active'
  },
  {
    id: '5',
    company_id: '3',
    name: 'GlobalEnterprises HR System',
    description: 'Human resources management platform',
    system_url: 'https://hr.globalenterprises.org',
    status: 'degraded'
  }
];
