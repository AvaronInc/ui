
export interface Zone {
  id: string;
  name: string;
  description: string;
  status: 'healthy' | 'warning' | 'degraded' | 'maintenance';
  createdAt: string;
  updatedAt: string;
  serviceCount: number;
  resourceUsage: {
    cpu: number;
    memory: number;
    storage: number;
    network: number;
  };
  complianceStatus: {
    pci: boolean;
    hipaa: boolean;
    gdpr: boolean;
    sox: boolean;
  };
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  vaultIDSettings?: {
    requireVaultID: boolean;
    enforceBiometricMFA: boolean;
    revalidationPeriod: number; // in days
    lastConfigUpdate: string;
  };
}

export interface ZoneUser {
  id: string;
  fullName: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Engineer' | 'User' | 'Auditor';
  lastLogin: string;
  mfaStatus: 'enabled' | 'disabled' | 'enforced';
  biometricEnrolled: boolean;
  certificateIssued: string | null;
  certificateExpiry: string | null;
  status: 'active' | 'suspended' | 'pending';
}

export interface ZoneAuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress: string;
}
