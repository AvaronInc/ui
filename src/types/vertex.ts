
export interface VertexLocation {
  id: string;
  name: string;
  status: 'online' | 'degraded' | 'offline';
  lastCheckIn: string;
  hardwareModel: string;
  temperature: number;
  uptime: string;
  hasLiveStream: boolean;
  latitude: number;
  longitude: number;
  region: string;
  hardwareInventory: {
    cpu: string;
    ram: string;
    storage: string;
    networkAdapters: string[];
  };
  environmentalData: {
    humidity: number;
    powerUsage: number;
    coolingStatus: 'normal' | 'warning' | 'critical';
  };
  resourceUsage: {
    cpuLoad: number;
    storageUsed: number;
    networkTraffic: number;
  };
  lastRestart: string;
  lastMaintenance: {
    date: string;
    technician: string;
    notes: string;
  };
  securityAlerts: SecurityAlert[];
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  acknowledged: boolean;
}

export interface VertexFilters {
  search: string;
  status: ('online' | 'degraded' | 'offline')[];
  hardwareType: string[];
  region: string[];
}
