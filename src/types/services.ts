export type ServiceStatus = 'healthy' | 'warning' | 'critical' | 'offline' | 'deploying';

export interface ServiceResource {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
}

export type ServiceType = 
  | 'dns' 
  | 'api' 
  | 'web' 
  | 'load_balancer' 
  | 'database' 
  | 'custom';

export interface Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  status: ServiceStatus;
  resources: ServiceResource;
  uptime: string;
  version: string;
  lastUpdated: string;
  endpoints: string[];
  instances: number;
  securityStatus: 'secure' | 'vulnerable' | 'needs_attention';
  lastIncident?: {
    time: string;
    type: string;
    description: string;
    resolved: boolean;
  };
}

export interface ServiceAlert {
  id: string;
  serviceId: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  resolved: boolean;
}

export interface DeploymentConfig {
  name: string;
  description: string;
  type: ServiceType;
  version: string;
  instances: number;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  networking: {
    domain?: string;
    port: number;
    enableIPv6: boolean;
    enableSSL: boolean;
    sslCertType: 'auto' | 'custom';
  };
  scaling: {
    enabled: boolean;
    minInstances: number;
    maxInstances: number;
    cpuThreshold: number;
    memoryThreshold: number;
  };
  monitoring: {
    enableAIDetection: boolean;
    loggingLevel: 'minimal' | 'standard' | 'verbose';
    retentionDays: number;
  };
  storage: {
    persistentStorage: boolean;
    backupsEnabled: boolean;
    backupSchedule?: string;
  };
}

export interface ServiceTypeConfig {
  type: ServiceType;
  name: string;
  description: string;
  icon: string;
  technologies: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

// System Services Types
export type SystemServiceType = 'vpp' | 'container' | 'system';
export type SystemServiceStatus = 'running' | 'stopped' | 'error';
export type SystemServiceHealth = 'ok' | 'degraded' | 'critical';

export interface SystemService {
  id: string;
  uuid: string;
  name: string;
  type: SystemServiceType;
  description: string;
  status: SystemServiceStatus;
  cpuUsage: number;
  memoryUsage: number;
  lastRestart: string;
  health: SystemServiceHealth;
  uptime: string;
  assignedResources: {
    cpuCores: number;
    ram: number;
    networkInterfaces: string[];
  };
  diskIO?: {
    read: number;
    write: number;
  };
  networkIO: {
    received: number;
    transmitted: number;
  };
  dependencies: string[];
  containerImage?: string;
  logEntries: {
    timestamp: string;
    level: 'info' | 'warning' | 'error' | 'debug';
    message: string;
  }[];
}
