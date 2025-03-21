export type DeviceStatus = 'healthy' | 'needs_update' | 'insecure';
export type PatchStatus = 'up_to_date' | 'needs_patch' | 'security_issue';
export type Role = 'admin' | 'user' | 'manager';

export interface VPNSession {
  id: string;
  userId: string;
  userName: string;
  deviceName: string;
  ipAddress: string;
  connectionTime: string;
  connectionDuration: string;
  location: string;
  // Optional fields for connection statistics
  throughput?: {
    download?: number;
    upload?: number;
    latency?: number;
    receivedData?: string;
    sentData?: string;
    packetLoss?: string;
  };
}

export interface EndpointDevice {
  id: string;
  name: string;
  assignedUser: string;
  os: string;
  version: string;
  status: PatchStatus;
  lastPatchDate: string;
  department: string;
  role: Role;
  location: string;
}

export interface Software {
  name: string;
  version: string;
  installDate: string;
  publisher: string;
  updateAvailable: boolean;
}

export interface EndpointDetails {
  id: string;
  software: Software[];
  securityPatchStatus: string;
  updatesAvailable: boolean;
  lastScan: string;
  complianceStatus: string;
}

export interface WorkforceStats {
  totalActiveUsers: number;
  connectedVPNSessions: number;
  endpointsByStatus: {
    healthy: number;
    needsUpdate: number;
    insecure: number;
  };
}

export interface WorkforceFilter {
  searchQuery?: string;
  department?: string[];
  role?: Role[];
  location?: string[];
  status?: PatchStatus[];
}
