
export type ContainerStatus = 'running' | 'stopped' | 'restarting' | 'paused' | 'exited';

export type Container = {
  id: string;
  name: string;
  image: string;
  status: ContainerStatus;
  uptime: string;
  cpu: number;
  memory: number;
  ports: string;
};

export type ContainerLog = {
  id: string;
  container: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
};

export type ContainerEvent = {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  containerName: string;
};

export type ContainerStats = {
  runningContainers: number;
  totalContainers: number;
  cpuUsage: number;
  memoryUsage: number;
  networkUsage: number;
  systemHealth: 'Healthy' | 'Warning' | 'Critical';
  activeAlerts: number;
  resourceUsage: Array<{
    name: string;
    cpu: number;
    memory: number;
    network: number;
  }>;
};

export type SecurityScan = {
  overallScore: number;
  lastScanTime: string;
  criticalVulnerabilities: number;
  highVulnerabilities: number;
  mediumVulnerabilities: number;
  lowVulnerabilities: number;
  cisDockerScore: number;
  pciDssScore: number;
  hipaaScore: number;
};

export type AutoHealingEvent = {
  id: string;
  containerName: string;
  timestamp: string;
  description: string;
  status: 'success' | 'in-progress' | 'failed';
};

export type AutoHealing = {
  recoveredIncidents: number;
  events: AutoHealingEvent[];
};

export type AIOptimization = {
  resourcesSaved: number;
  uptimePercentage: number;
  meanTimeToRecovery: number;
  recommendations: Array<{
    id: string;
    container: string;
    currentResource: string;
    recommendedResource: string;
    potentialSavings: string;
  }>;
};

export type ContainerImage = {
  id: string;
  name: string;
  tag: string;
  size: string;
  registry: string;
  created: string;
  vulnerabilities: number;
};

export type Registry = {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  imageCount: number;
  lastSync: string;
};
