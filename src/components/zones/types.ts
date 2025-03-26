
export type ZoneStatus = 'healthy' | 'warning' | 'degraded';

export type ServiceType = 
  | 'sdwan' 
  | 'identity' 
  | 'vault' 
  | 'ai' 
  | 'rmm' 
  | 'mixtral';

export type IsolationLevel = 
  | 'normal'
  | 'high'
  | 'airgapped';

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
}
