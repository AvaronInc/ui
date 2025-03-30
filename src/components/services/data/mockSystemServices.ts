
import { SystemService } from '@/types/services';

// Helper function to generate random CPU and Memory usage values
const randomResourceUsage = () => Math.floor(Math.random() * 90) + 1;

// Helper function to generate random log entries
const generateLogEntries = (count: number) => {
  const levels = ['info', 'warning', 'error', 'debug'] as const;
  const entries = [];
  
  for (let i = 0; i < count; i++) {
    const time = new Date();
    time.setMinutes(time.getMinutes() - i);
    
    entries.push({
      timestamp: time.toISOString(),
      level: levels[Math.floor(Math.random() * levels.length)],
      message: `Service log entry ${i + 1}. ${Math.random().toString(36).substring(2, 15)}`
    });
  }
  
  return entries;
};

export const mockSystemServices: SystemService[] = [
  // VPP Services
  {
    id: 'vpp-1',
    uuid: 'f8c3de3d-1d47-4f5a-b898-3f0d1c23a1d9',
    name: 'VPP Firewall',
    type: 'vpp',
    description: 'Vector Packet Processing firewall service for SD-WAN',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    health: 'ok',
    uptime: '3d 2h 14m',
    assignedResources: {
      cpuCores: 2,
      ram: 4096, // MB
      networkInterfaces: ['eth0', 'eth1']
    },
    networkIO: {
      received: 12458, // KB/s
      transmitted: 9845 // KB/s
    },
    dependencies: ['vpp-route-policy', 'interface-manager'],
    logEntries: generateLogEntries(20)
  },
  {
    id: 'vpp-2',
    uuid: 'a7b1cd2e-3f4d-5e6f-7a8b-9c0d1e2f3a4b',
    name: 'VPP Route Policy Engine',
    type: 'vpp',
    description: 'Policy-based routing engine for SD-WAN traffic management',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    health: 'ok',
    uptime: '5d 4h 32m',
    assignedResources: {
      cpuCores: 2,
      ram: 2048, // MB
      networkInterfaces: ['eth0']
    },
    networkIO: {
      received: 8456, // KB/s
      transmitted: 6723 // KB/s
    },
    dependencies: ['interface-manager'],
    logEntries: generateLogEntries(15)
  },
  {
    id: 'vpp-3',
    uuid: 'b2c3d4e5-f6g7-8h9i-j0k1-l2m3n4o5p6q7',
    name: 'VPP Interface Manager',
    type: 'vpp',
    description: 'Network interface management for SD-WAN connectivity',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    health: 'ok',
    uptime: '7d 1h 45m',
    assignedResources: {
      cpuCores: 1,
      ram: 1024, // MB
      networkInterfaces: ['eth0', 'eth1', 'eth2']
    },
    networkIO: {
      received: 5678, // KB/s
      transmitted: 4321 // KB/s
    },
    dependencies: [],
    logEntries: generateLogEntries(10)
  },
  
  // Container Services
  {
    id: 'container-1',
    uuid: 'c1d2e3f4-5g6h-7i8j-9k0l-1m2n3o4p5q6r',
    name: 'Arkime Capture',
    type: 'container',
    description: 'Network packet capture and analysis service',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    health: 'ok',
    uptime: '1d 6h 12m',
    assignedResources: {
      cpuCores: 4,
      ram: 8192, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 15460, // KB/s
      write: 8932 // KB/s
    },
    networkIO: {
      received: 32145, // KB/s
      transmitted: 4567 // KB/s
    },
    dependencies: ['elasticsearch', 'minio-storage'],
    containerImage: 'alpine:arkime-capture:3.4.2',
    logEntries: generateLogEntries(25)
  },
  {
    id: 'container-2',
    uuid: 'd1e2f3g4-5h6i-7j8k-9l0m-1n2o3p4q5r6s',
    name: 'Arkime Viewer',
    type: 'container',
    description: 'Web interface for Arkime packet data visualization',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    health: 'ok',
    uptime: '1d 12h 5m',
    assignedResources: {
      cpuCores: 2,
      ram: 4096, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 845, // KB/s
      write: 124 // KB/s
    },
    networkIO: {
      received: 2345, // KB/s
      transmitted: 7890 // KB/s
    },
    dependencies: ['arkime-capture', 'elasticsearch'],
    containerImage: 'alpine:arkime-viewer:3.4.2',
    logEntries: generateLogEntries(18)
  },
  {
    id: 'container-3',
    uuid: 'e1f2g3h4-5i6j-7k8l-9m0n-1o2p3q4r5s6t',
    name: 'Mixtral AI Inference',
    type: 'container',
    description: 'AI inference engine for network anomaly detection',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: 87, // High memory usage
    lastRestart: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    health: 'degraded',
    uptime: '0d 12h 32m',
    assignedResources: {
      cpuCores: 8,
      ram: 32768, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 2456, // KB/s
      write: 1123 // KB/s
    },
    networkIO: {
      received: 1234, // KB/s
      transmitted: 5678 // KB/s
    },
    dependencies: ['weaviate', 'minio-storage'],
    containerImage: 'alpine:mixtral-inference:1.2.0',
    logEntries: generateLogEntries(30)
  },
  {
    id: 'container-4',
    uuid: 'f1g2h3i4-5j6k-7l8m-9n0o-1p2q3r4s5t6u',
    name: 'Weaviate Vector DB',
    type: 'container',
    description: 'Vector database for AI-driven network insights',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    health: 'ok',
    uptime: '2d 3h 17m',
    assignedResources: {
      cpuCores: 4,
      ram: 16384, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 4567, // KB/s
      write: 3456 // KB/s
    },
    networkIO: {
      received: 987, // KB/s
      transmitted: 876 // KB/s
    },
    dependencies: ['minio-storage'],
    containerImage: 'alpine:weaviate:1.18.4',
    logEntries: generateLogEntries(15)
  },
  {
    id: 'container-5',
    uuid: 'g1h2i3j4-5k6l-7m8n-9o0p-1q2r3s4t5u6v',
    name: 'Wazuh Manager',
    type: 'container',
    description: 'Security monitoring and threat detection service',
    status: 'running',
    cpuUsage: 45, // Updated from high value
    memoryUsage: 58, // Updated from high value
    lastRestart: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago - Changed from 0.1 days
    health: 'ok', // Changed from 'critical' to 'ok'
    uptime: '4d 2h 24m', // Updated to match new restart date
    assignedResources: {
      cpuCores: 4,
      ram: 8192, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 12345, // KB/s
      write: 6789 // KB/s
    },
    networkIO: {
      received: 7654, // KB/s
      transmitted: 3210 // KB/s
    },
    dependencies: ['elasticsearch'],
    containerImage: 'alpine:wazuh-manager:4.3.10',
    logEntries: generateLogEntries(40)
  },
  
  // System Services
  {
    id: 'system-1',
    uuid: 'h1i2j3k4-5l6m-7n8o-9p0q-1r2s3t4u5v6w',
    name: 'MinIO Object Storage',
    type: 'system',
    description: 'S3-compatible distributed object storage service',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    health: 'ok',
    uptime: '10d 5h 42m',
    assignedResources: {
      cpuCores: 2,
      ram: 4096, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 23456, // KB/s
      write: 34567 // KB/s
    },
    networkIO: {
      received: 4321, // KB/s
      transmitted: 8765 // KB/s
    },
    dependencies: [],
    logEntries: generateLogEntries(20)
  },
  {
    id: 'system-2',
    uuid: 'i1j2k3l4-5m6n-7o8p-9q0r-1s2t3u4v5w6x',
    name: 'Elasticsearch',
    type: 'system',
    description: 'Search and analytics engine for logs and metrics',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: 75,
    lastRestart: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    health: 'degraded',
    uptime: '4d 8h 15m',
    assignedResources: {
      cpuCores: 4,
      ram: 16384, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 8765, // KB/s
      write: 12345 // KB/s
    },
    networkIO: {
      received: 2345, // KB/s
      transmitted: 3456 // KB/s
    },
    dependencies: [],
    logEntries: generateLogEntries(25)
  },
  {
    id: 'system-3',
    uuid: 'j1k2l3m4-5n6o-7p8q-9r0s-1t2u3v4w5x6y',
    name: 'Backup Service',
    type: 'system',
    description: 'Automated backup and recovery system',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    health: 'ok',
    uptime: '2d 12h 5m',
    assignedResources: {
      cpuCores: 1,
      ram: 2048, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 45678, // KB/s
      write: 67890 // KB/s
    },
    networkIO: {
      received: 1234, // KB/s
      transmitted: 2345 // KB/s
    },
    dependencies: ['minio-storage'],
    logEntries: generateLogEntries(15)
  },
  {
    id: 'system-4',
    uuid: 'k1l2m3n4-5o6p-7q8r-9s0t-1u2v3w4x5y6z',
    name: 'Email Security Scanner',
    type: 'system',
    description: 'Email threat detection and spam filtering service',
    status: 'stopped',
    cpuUsage: 0,
    memoryUsage: 0,
    lastRestart: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    health: 'critical',
    uptime: '0d 0h 0m',
    assignedResources: {
      cpuCores: 2,
      ram: 4096, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 0, // KB/s
      write: 0 // KB/s
    },
    networkIO: {
      received: 0, // KB/s
      transmitted: 0 // KB/s
    },
    dependencies: ['wazuh-manager'],
    logEntries: generateLogEntries(10)
  },
  {
    id: 'system-5',
    uuid: 'l1m2n3o4-5p6q-7r8s-9t0u-1v2w3x4y5z6a',
    name: 'Container Orchestration',
    type: 'system',
    description: 'Management service for container lifecycle and scaling',
    status: 'running',
    cpuUsage: randomResourceUsage(),
    memoryUsage: randomResourceUsage(),
    lastRestart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    health: 'ok',
    uptime: '15d 3h 28m',
    assignedResources: {
      cpuCores: 2,
      ram: 4096, // MB
      networkInterfaces: ['eth0']
    },
    networkIO: {
      received: 3456, // KB/s
      transmitted: 2345 // KB/s
    },
    dependencies: [],
    logEntries: generateLogEntries(20)
  },
  // New OpenBox Database service
  {
    id: 'system-6',
    uuid: 'm1n2o3p4-5q6r-7s8t-9u0v-1w2x3y4z5a6b',
    name: 'OpenBox Database',
    type: 'system',
    description: 'High-performance distributed database for secure data storage',
    status: 'running',
    cpuUsage: 42,
    memoryUsage: 55,
    lastRestart: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    health: 'ok',
    uptime: '6d 4h 12m',
    assignedResources: {
      cpuCores: 4,
      ram: 8192, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 18756, // KB/s
      write: 15432 // KB/s
    },
    networkIO: {
      received: 5678, // KB/s
      transmitted: 4321 // KB/s
    },
    dependencies: [],
    logEntries: generateLogEntries(22)
  },
  // New OpenBox DB Sync service
  {
    id: 'system-7',
    uuid: 'n1o2p3q4-5r6s-7t8u-9v0w-1x2y3z4a5b6c',
    name: 'OpenBox DB Sync',
    type: 'system',
    description: 'Synchronization service for OpenBox Database clustering',
    status: 'running',
    cpuUsage: 35,
    memoryUsage: 48,
    lastRestart: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    health: 'ok',
    uptime: '6d 3h 47m',
    assignedResources: {
      cpuCores: 2,
      ram: 4096, // MB
      networkInterfaces: ['eth0']
    },
    diskIO: {
      read: 9876, // KB/s
      write: 5432 // KB/s
    },
    networkIO: {
      received: 3456, // KB/s
      transmitted: 2345 // KB/s
    },
    dependencies: ['openbox-database'],
    logEntries: generateLogEntries(18)
  }
];

