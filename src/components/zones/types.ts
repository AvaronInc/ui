
export type ZoneStatus = 'healthy' | 'warning' | 'degraded';

export type ServiceType = 
  | 'sdwan' 
  | 'identity' 
  | 'vault' 
  | 'ai' 
  | 'rmm' 
  | 'mixtral'
  | 'nestvault';

export type IsolationLevel = 
  | 'normal'
  | 'high'
  | 'airgapped';

export type StorageTier = 'hot' | 'cold' | 'archived';

export type StorageStatus = 'normal' | 'near-limit' | 'warning' | 'unavailable';

export interface Zone {
  id: string;
  name: string;
  description: string;
  status: ZoneStatus;
  services: ServiceType[];
  adminScopes: string[];
  resourceUsage: {
    cpu: number;
    ram: number;
    storage: number;
  };
  vaultIdRequired: boolean;
  created: string;
  modified: string;
  isolationLevel: IsolationLevel;
  complianceTags: string[];
  storageConfig?: {
    enabled: boolean;
    provisioned: number; // in TB
    used: number; // in TB
    tier: StorageTier;
    status: StorageStatus;
    erasureCoding: boolean;
    publicBucketsAllowed: boolean;
    customRetention: boolean;
  };
}

export interface ZoneSummary {
  totalZones: number;
  highTrustZones: number;
  zonesWithAlerts: number;
  aiTraffic: {
    zoneName: string;
    trafficPercentage: number;
  }[];
  mixtralSummary: string;
  storageStats?: {
    totalProvisioned: number; // in TB
    totalUsed: number; // in TB
    mostUsedZone: string;
    lowStorageAlerts: number;
  };
}
