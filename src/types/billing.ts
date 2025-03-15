
export type SubscriptionPlan = 'SMB' | 'Enterprise' | 'Government';

export type PaymentMethodType = 'credit_card' | 'ach' | 'wire_transfer' | 'crypto';

export type PaymentMethod = {
  id: string;
  type: PaymentMethodType;
  isDefault: boolean;
  details: {
    last4?: string;
    expMonth?: number;
    expYear?: number;
    brand?: string;
    accountType?: string;
  };
  createdAt: string;
};

export type Contract = {
  id: string;
  deviceType: string;
  serialNumber: string;
  location: string;
  startDate: string;
  endDate: string;
  monthlyCost: number;
  term: 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual' | 'Custom';
  status: 'active' | 'expiring' | 'expired';
};

export type Invoice = {
  id: string;
  date: string;
  dueDate?: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue' | 'processing';
  items: string;
  paymentMethod?: string;
  pdfUrl?: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  date: string;
  status: 'open' | 'closed' | 'resolved' | 'pending';
  lastUpdate: string;
  messages?: Array<{
    sender: string;
    content: string;
    timestamp: string;
  }>;
};

export type BillingSettings = {
  billingCycle: 'monthly' | 'quarterly' | 'annually';
  autoPay: boolean;
  defaultPaymentMethodId: string | null;
  enableNotifications: boolean;
  enableCryptoPayments: boolean;
};
