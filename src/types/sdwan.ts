
export interface ConnectionType {
  id: string;
  type: 'fiber' | 'copper' | 'starlink' | 'none';
  status: 'active' | 'degraded' | 'down';
  uptime: number; // in seconds
  bandwidth: {
    download: number; // in Mbps
    upload: number; // in Mbps
  };
}

export interface NESTNode {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  primaryConnection: ConnectionType;
  failoverConnection1?: ConnectionType;
  failoverConnection2?: ConnectionType;
  ipAddress: string;
  networkStatus: 'active' | 'degraded' | 'down';
  metrics: {
    latency: number; // in ms
    packetLoss: number; // percentage
    jitter: number; // in ms
    activeConnections: number;
  };
}

export interface MeshConfiguration {
  enabled: boolean;
  participatingNodes: string[]; // NEST IDs
  latencyBasedRouting: boolean;
  dynamicPathSelection: boolean;
  encryptionKeyManagement: 'auto' | 'manual';
  lastKeyRotation?: Date;
}

export interface FailoverPolicy {
  nestId: string;
  thresholds: {
    latency: number; // ms
    packetLoss: number; // percentage
    jitter: number; // ms
    outageTime: number; // seconds
  };
  loadBalancing: boolean;
  enableStarlinkBackup: boolean;
}

export interface TrafficRule {
  id: string;
  name: string;
  sourceIp?: string;
  destinationIp?: string;
  protocol?: 'tcp' | 'udp' | 'icmp' | 'any';
  port?: number;
  portRange?: {
    start: number;
    end: number;
  };
  bandwidthLimit?: number; // in Mbps
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'disabled';
}

export interface BGPConfiguration {
  enabled: boolean;
  asNumber: string;
  peers: {
    id: string;
    name: string;
    ipAddress: string;
    asNumber: string;
    status: 'connected' | 'idle' | 'down';
  }[];
  routeFiltering: 'allow-all' | 'deny-private' | 'prefix-list' | 'custom';
  pathSelection: 'shortest-path' | 'preferred-route' | 'lowest-med' | 'highest-weight';
}

export interface CloudIntegration {
  provider: 'aws' | 'azure' | 'gcp';
  connected: boolean;
  accountId?: string;
  region?: string;
  cidrRange?: string;
  status?: 'active' | 'configuring' | 'error';
}

export interface SDWANEvent {
  id: string;
  timestamp: string;
  eventType: 'failover' | 'security' | 'bgp' | 'performance' | 'system';
  nestId: string;
  status: 'info' | 'warning' | 'alert';
  message: string;
}

export interface BackupConfiguration {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'manual';
  retention: 7 | 30 | 90 | 365; // days
  location: 'local' | 's3' | 'azure' | 'gcp';
  backups: {
    id: string;
    name: string;
    timestamp: string;
    size: number; // in bytes
  }[];
}

// AI-Powered Intelligent Failover types
export interface AIFailoverConfiguration {
  confidenceLevel: number; // 0-100
  minimumConfidenceRequired: number; // 50-100
  thresholdForRecommendations: 'low' | 'medium' | 'high';
  requireAdminApproval: boolean;
  networkConditions: {
    latencyThreshold: number; // ms
    packetLossThreshold: number; // percentage
    jitterThreshold: number; // ms
    connectionDownThreshold: {
      count: number;
      timeWindow: number; // minutes
    };
    detectBGPIssues: boolean;
    ddosResponseEnabled: boolean;
  };
  adaptiveLearning: {
    enabled: boolean;
    allowRealTimeTrafficAdjustment: boolean;
  };
  failoverPriority: 'cost' | 'performance' | 'stability';
  simulationModeEnabled: boolean;
  logging: {
    enabled: boolean;
    sendAlerts: boolean;
  };
  customRules: {
    id: string;
    sourceIp: string;
    destination: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

// Policy Routing types
export interface PolicyRoute {
  id: string;
  name: string;
  sourceIp: string;
  destinationIp: string;
  protocol: 'tcp' | 'udp' | 'icmp' | 'any';
  portRangeStart: number;
  portRangeEnd: number;
  nextHopIp: string;
  interface: string;
  matchType: '5-tuple' | 'l4' | 'l3' | 'dscp';
  priority: number; // 1-100, lower is higher priority
  trafficHandled: number; // in MB
  packetCount: number;
  status: 'active' | 'inactive';
}
