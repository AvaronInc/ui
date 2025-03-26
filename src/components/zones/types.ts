
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
    ram?: number; // Adding ram as an optional property for backward compatibility
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
  
  // Adding additional properties needed by protected files
  created?: string; // For backward compatibility with components using 'created'
  modified?: string; // For backward compatibility with components using 'modified'
  isolationLevel?: string; // Required by several components
  vaultIdRequired?: boolean; // Required by ZoneHeader and ZonesOverview
  adminScopes?: string[]; // Required by ZoneAdmins and other components
  services?: any[]; // Required by ZoneServices and other components
  complianceTags?: string[]; // Used in ComplianceSecurity
  storageConfig?: {
    tier: string;
    size: number;
    maxSize: number;
    encryption: boolean;
    replication: boolean;
    backupEnabled: boolean;
    backupFrequency: string;
    status: string;
    complianceFeatures: string[];
    // Additional properties needed by ZoneNestvault component
    enabled?: boolean;
    used?: number;
    provisioned?: number;
    erasureCoding?: boolean;
    publicBucketsAllowed?: boolean;
    customRetention?: boolean;
  }; // Required by ZoneNestvault
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

// Additional interfaces needed by components
export interface ServiceType {
  id: string;
  name: string;
  icon: string;
}

export interface StorageStatus {
  id: string;
  name: string;
  color: string;
}

export interface StorageTier {
  id: string;
  name: string;
  description: string;
  features: string[];
}

// Extended interface for Zone Summary needed by ZoneInsights component
export interface ZoneSummary {
  totalZones: number;
  healthyZones: number;
  warningZones: number;
  degradedZones: number;
  storageUsage: number;
  securityScore: number;
  complianceScore: number;
  recentEvents: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
  }>;
  // Additional properties needed by ZoneInsights component
  highTrustZones?: number;
  zonesWithAlerts?: number;
  storageStats?: {
    totalUsed: number;
    totalProvisioned: number;
    mostUsedZone: string;
    lowStorageAlerts: number;
  };
  aiTraffic?: Array<{
    zoneName: string;
    trafficPercentage: number;
  }>;
  mixtralSummary?: string;
}
