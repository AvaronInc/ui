
export type NetworkHealthStatus = 'good' | 'warning' | 'critical';

export interface NetworkStats {
  devices: number;
  endpoints: number;
  segments: number;
  healthStatus: NetworkHealthStatus;
  primaryDataCenter?: string;
  secondaryDataCenter?: string;
}

export type DeviceType = 'firewall' | 'switch' | 'router' | 'vpn' | 'server' | 'endpoint' | 'iot';
export type SecurityZone = 'dmz' | 'internal' | 'public' | 'private';
export type ServerType = 'application' | 'database' | 'file' | 'web' | 'auth' | 'other';

export interface NetworkDevice {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  zone: SecurityZone;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
}

export interface NetworkFlow {
  id: string;
  source: string;
  target: string;
  protocol: string;
  port: number;
  bandwidth: string;
  latency: number;
}

export interface SecurityIssue {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedDevices: string[];
  recommendation: string;
  openPorts?: number[];
  firewallRule?: string;
}

export interface ApplicationService {
  id: string;
  name: string;
  type: 'web' | 'api' | 'database' | 'service' | 'cloud';
  status: 'active' | 'inactive' | 'warning';
  url?: string;
  sslDetails?: {
    issuer: string;
    validUntil: string;
    status: 'valid' | 'expiring' | 'expired';
  };
  dependencies: string[];
  cloudProvider?: 'aws' | 'azure' | 'gcp' | 'other' | null;
}

export interface ComplianceReport {
  id: string;
  name: string;
  standard: 'gdpr' | 'hipaa' | 'soc2' | 'pci' | 'custom';
  createdAt: string;
  status: 'compliant' | 'non-compliant' | 'partially-compliant';
  score: number;
  issues: {
    id: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    remediation: string;
  }[];
}

export type DocumentExportFormat = 'pdf' | 'json' | 'markdown' | 'html';

export interface CustomDocSection {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  updatedBy: string;
}
