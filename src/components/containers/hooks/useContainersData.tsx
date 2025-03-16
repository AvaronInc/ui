import { useState, useEffect } from 'react';
import { Container, ContainerLog, ContainerEvent, ContainerStats, SecurityScan, AutoHealing, AIOptimization, ContainerImage, Registry } from '@/types/containers';

// Sample data for demo purposes
const sampleContainers: Container[] = [
  {
    id: '1',
    name: 'api-server',
    image: 'cybernest/api-server:latest',
    status: 'running',
    uptime: '10d 4h',
    cpu: 12,
    memory: 512,
    ports: '8080:80'
  },
  {
    id: '2',
    name: 'web-frontend',
    image: 'cybernest/web:latest',
    status: 'running',
    uptime: '5d 7h',
    cpu: 8,
    memory: 256,
    ports: '3000:3000'
  },
  {
    id: '3',
    name: 'database',
    image: 'postgres:12',
    status: 'running',
    uptime: '15d 2h',
    cpu: 20,
    memory: 1024,
    ports: '5432:5432'
  },
  {
    id: '4',
    name: 'redis-cache',
    image: 'redis:6',
    status: 'running',
    uptime: '15d 2h',
    cpu: 5,
    memory: 128,
    ports: '6379:6379'
  },
  {
    id: '5',
    name: 'elasticsearch',
    image: 'elastic/elasticsearch:7.10.0',
    status: 'stopped',
    uptime: '0',
    cpu: 0,
    memory: 0,
    ports: '9200:9200'
  }
];

const sampleLogs: ContainerLog[] = [
  {
    id: '1',
    container: 'api-server',
    timestamp: '2023-07-18 14:30:22',
    level: 'info',
    message: 'Server started on port 8080'
  },
  {
    id: '2',
    container: 'api-server',
    timestamp: '2023-07-18 14:32:15',
    level: 'warning',
    message: 'High memory usage detected (85%)'
  },
  {
    id: '3',
    container: 'database',
    timestamp: '2023-07-18 14:35:08',
    level: 'error',
    message: 'Failed to execute query: timeout after 30s'
  },
  {
    id: '4',
    container: 'web-frontend',
    timestamp: '2023-07-18 14:36:12',
    level: 'info',
    message: 'User authentication successful: user_id=1234'
  },
  {
    id: '5',
    container: 'redis-cache',
    timestamp: '2023-07-18 14:38:45',
    level: 'info',
    message: 'Cache hit ratio: 78.5%'
  },
  {
    id: '6',
    container: 'api-server',
    timestamp: '2023-07-18 14:40:01',
    level: 'debug',
    message: 'Processing request: GET /api/users?limit=100'
  },
  {
    id: '7',
    container: 'database',
    timestamp: '2023-07-18 14:42:33',
    level: 'warning',
    message: 'Slow query detected: execution time 2.5s'
  }
];

const sampleEvents: ContainerEvent[] = [
  {
    id: '1',
    type: 'error',
    title: 'Container Crashed',
    description: 'Database container crashed due to memory limits',
    timestamp: '10 minutes ago',
    containerName: 'postgres-db'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Resource Warning',
    description: 'API server approaching CPU limits (85% usage)',
    timestamp: '25 minutes ago',
    containerName: 'api-server'
  },
  {
    id: '3',
    type: 'info',
    title: 'Container Started',
    description: 'Cache service container started successfully',
    timestamp: '45 minutes ago',
    containerName: 'redis-cache'
  }
];

const sampleStats: ContainerStats = {
  runningContainers: 4,
  totalContainers: 5,
  cpuUsage: 45,
  memoryUsage: 62,
  networkUsage: 15.7,
  systemHealth: 'Healthy',
  activeAlerts: 2,
  resourceUsage: [
    { name: 'Mon', cpu: 45, memory: 52, network: 18 },
    { name: 'Tue', cpu: 52, memory: 58, network: 17 },
    { name: 'Wed', cpu: 48, memory: 57, network: 19 },
    { name: 'Thu', cpu: 62, memory: 59, network: 21 },
    { name: 'Fri', cpu: 78, memory: 65, network: 24 },
    { name: 'Sat', cpu: 35, memory: 50, network: 12 },
    { name: 'Sun', cpu: 30, memory: 48, network: 10 },
  ]
};

const sampleSecurityScans: SecurityScan = {
  overallScore: 82,
  lastScanTime: '2023-07-18 09:30:00',
  criticalVulnerabilities: 0,
  highVulnerabilities: 2,
  mediumVulnerabilities: 7,
  lowVulnerabilities: 12,
  cisDockerScore: 89,
  pciDssScore: 76,
  hipaaScore: 84
};

const sampleAutoHealingEvents: AutoHealing = {
  recoveredIncidents: 14,
  events: [
    {
      id: '1',
      containerName: 'api-server',
      timestamp: '2 hours ago',
      description: 'Container restarted after resource exhaustion',
      status: 'success'
    },
    {
      id: '2',
      containerName: 'database',
      timestamp: '5 hours ago',
      description: 'Memory limits automatically increased by 20%',
      status: 'success'
    },
    {
      id: '3',
      containerName: 'web-frontend',
      timestamp: '1 day ago',
      description: 'Container moved to different node after host issues',
      status: 'success'
    },
    {
      id: '4',
      containerName: 'queue-service',
      timestamp: 'Just now',
      description: 'Attempting container recovery after crash',
      status: 'in-progress'
    }
  ]
};

const sampleAIOptimizations: AIOptimization = {
  resourcesSaved: 28,
  uptimePercentage: 99.8,
  meanTimeToRecovery: 45,
  recommendations: [
    {
      id: '1',
      container: 'api-server',
      currentResource: 'CPU: 2 cores',
      recommendedResource: 'CPU: 1 core',
      potentialSavings: '50% CPU reduction'
    },
    {
      id: '2',
      container: 'database',
      currentResource: 'Memory: 4GB',
      recommendedResource: 'Memory: 2GB',
      potentialSavings: '50% memory reduction'
    }
  ]
};

const sampleImages: ContainerImage[] = [
  {
    id: '1',
    name: 'cybernest/api-server',
    tag: 'latest',
    size: '120MB',
    registry: 'Docker Hub',
    created: '2 days ago',
    vulnerabilities: 0
  },
  {
    id: '2',
    name: 'cybernest/web-frontend',
    tag: 'latest',
    size: '85MB',
    registry: 'Docker Hub',
    created: '3 days ago',
    vulnerabilities: 2
  },
  {
    id: '3',
    name: 'postgres',
    tag: '12',
    size: '314MB',
    registry: 'Docker Hub',
    created: '1 week ago',
    vulnerabilities: 0
  },
  {
    id: '4',
    name: 'redis',
    tag: '6',
    size: '105MB',
    registry: 'Docker Hub',
    created: '2 weeks ago',
    vulnerabilities: 1
  },
  {
    id: '5',
    name: 'cybernest/monitoring',
    tag: 'v1.2',
    size: '92MB',
    registry: 'Private Registry',
    created: '4 days ago',
    vulnerabilities: 0
  }
];

const sampleRegistries: Registry[] = [
  {
    id: '1',
    name: 'Docker Hub',
    url: 'https://hub.docker.com',
    status: 'connected',
    imageCount: 42,
    lastSync: '2 hours ago'
  },
  {
    id: '2',
    name: 'Private Registry',
    url: 'https://registry.cybernest.internal',
    status: 'connected',
    imageCount: 18,
    lastSync: '1 day ago'
  },
  {
    id: '3',
    name: 'AWS ECR',
    url: 'https://aws-account.dkr.ecr.us-west-2.amazonaws.com',
    status: 'error',
    imageCount: 12,
    lastSync: '3 days ago'
  }
];

export const useContainersData = () => {
  const [containers, setContainers] = useState<Container[]>(sampleContainers);
  const [logs, setLogs] = useState<ContainerLog[]>(sampleLogs);
  const [events, setEvents] = useState<ContainerEvent[]>(sampleEvents);
  const [stats, setStats] = useState<ContainerStats>(sampleStats);
  const [securityScans, setSecurityScans] = useState<SecurityScan>(sampleSecurityScans);
  const [autoHealingEvents, setAutoHealingEvents] = useState<AutoHealing>(sampleAutoHealingEvents);
  const [aiOptimizations, setAiOptimizations] = useState<AIOptimization>(sampleAIOptimizations);
  const [images, setImages] = useState<ContainerImage[]>(sampleImages);
  const [registries, setRegistries] = useState<Registry[]>(sampleRegistries);
  
  // This would typically involve API calls to fetch real data
  // But for demo purposes we're using the sample data
  
  return {
    containers,
    logs,
    events,
    stats,
    securityScans,
    autoHealingEvents,
    aiOptimizations,
    images,
    registries
  };
};
