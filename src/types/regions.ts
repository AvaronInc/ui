
export type RegionStatus = 'active' | 'degraded' | 'down' | 'provisioning';
export type ZoneStatus = 'active' | 'degraded' | 'down' | 'maintenance' | 'provisioning';
export type ConnectionType = 'fiber' | 'wireless' | 'satellite' | 'vpn';
export type DirectionPolicy = 'east-west' | 'north-south' | 'bidirectional';

export interface Region {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    country: string;
  };
  status: RegionStatus;
  zones: string[]; // IDs of zones
  provisionDate: string;
  specs: {
    cores: number;
    memory: number; // in GB
    storage: number; // in GB
    bandwidth: number; // in Mbps
  };
  metrics: {
    cpuUtilization: number; // percentage
    memoryUtilization: number; // percentage
    networkUtilization: number; // percentage
    availability: number; // percentage uptime
  };
}

export interface Zone {
  id: string;
  name: string;
  regionId: string;
  status: ZoneStatus;
  purpose: string;
  provisionDate: string;
  specs: {
    cores: number;
    memory: number; // in GB
    storage: number; // in GB
  };
  metrics: {
    cpuUtilization: number;
    memoryUtilization: number;
    diskUtilization: number;
    activeServices: number;
  };
}

export interface RegionConnection {
  id: string;
  sourceRegionId: string;
  targetRegionId: string;
  type: ConnectionType;
  status: 'active' | 'degraded' | 'down';
  bandwidth: number; // in Mbps
  latency: number; // in ms
  packetLoss: number; // percentage
  encryptionEnabled: boolean;
  lastUpdated: string;
}

export interface NetworkPolicy {
  id: string;
  name: string;
  description: string;
  sourceRegionId: string;
  targetRegionId: string;
  direction: DirectionPolicy;
  priority: number;
  rules: {
    protocol: 'any' | 'tcp' | 'udp' | 'icmp';
    sourcePort?: number | string; // string for port ranges like "1024-2048"
    destinationPort?: number | string;
    action: 'allow' | 'deny' | 'log';
  }[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// For the automation builder
export type TriggerType = 'log_entry' | 'connectivity_issue' | 'packet_loss' | 'storage_issue' | 'cpu_threshold' | 'memory_threshold' | 'service_down' | 'scheduled';
export type ActionType = 'alert' | 'restart_service' | 'run_script' | 'scale_resources' | 'switch_region' | 'enable_failover' | 'update_policy';
export type OutcomeType = 'email' | 'sms' | 'push_notification' | 'webhook' | 'ticket' | 'log_event';

export interface AutomationNode {
  id: string;
  type: 'trigger' | 'action' | 'outcome';
  subType: TriggerType | ActionType | OutcomeType;
  position: { x: number; y: number };
  data: Record<string, any>; // Properties specific to the node type
}

export interface AutomationEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  animated?: boolean;
  label?: string;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
  edges: AutomationEdge[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
