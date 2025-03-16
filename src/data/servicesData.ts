
import { Service, ServiceAlert, ServiceTypeConfig } from '@/types/services';

export const activeServices: Service[] = [
  {
    id: 'dns-001',
    name: 'Primary DNS Server',
    description: 'Main DNS server for the corporate network',
    type: 'dns',
    status: 'healthy',
    resources: {
      cpu: 12,
      memory: 25,
      network: 8,
      storage: 5
    },
    uptime: '45d 12h 34m',
    version: 'BIND 9.16.1',
    lastUpdated: '2023-09-15T08:32:45Z',
    endpoints: ['10.0.1.5:53', '10.0.1.5:853'],
    instances: 2,
    securityStatus: 'secure'
  },
  {
    id: 'web-001',
    name: 'Corporate Website',
    description: 'Main corporate website server',
    type: 'web',
    status: 'warning',
    resources: {
      cpu: 65,
      memory: 78,
      network: 42,
      storage: 55
    },
    uptime: '15d 6h 12m',
    version: 'Nginx 1.22.1',
    lastUpdated: '2023-10-02T14:23:10Z',
    endpoints: ['www.example.com:443'],
    instances: 3,
    securityStatus: 'needs_attention',
    lastIncident: {
      time: '2023-10-20T08:45:22Z',
      type: 'High CPU Usage',
      description: 'CPU usage exceeded 80% for more than 15 minutes',
      resolved: true
    }
  },
  {
    id: 'api-001',
    name: 'Customer API Gateway',
    description: 'Main API gateway for customer services',
    type: 'api',
    status: 'healthy',
    resources: {
      cpu: 35,
      memory: 42,
      network: 67,
      storage: 22
    },
    uptime: '32d 18h 45m',
    version: 'Node.js 18.12.0',
    lastUpdated: '2023-09-28T10:15:32Z',
    endpoints: ['api.example.com:443'],
    instances: 5,
    securityStatus: 'secure'
  },
  {
    id: 'lb-001',
    name: 'Web Traffic Balancer',
    description: 'Load balancer for web traffic',
    type: 'load_balancer',
    status: 'healthy',
    resources: {
      cpu: 28,
      memory: 35,
      network: 85,
      storage: 8
    },
    uptime: '65d 3h 22m',
    version: 'HAProxy 2.6.7',
    lastUpdated: '2023-08-12T16:42:18Z',
    endpoints: ['lb.example.com:443'],
    instances: 2,
    securityStatus: 'secure'
  },
  {
    id: 'db-001',
    name: 'Product Database',
    description: 'Main product catalog database',
    type: 'database',
    status: 'critical',
    resources: {
      cpu: 88,
      memory: 92,
      network: 45,
      storage: 78
    },
    uptime: '8d 14h 32m',
    version: 'PostgreSQL 15.3',
    lastUpdated: '2023-10-18T09:25:42Z',
    endpoints: ['db.internal:5432'],
    instances: 1,
    securityStatus: 'vulnerable',
    lastIncident: {
      time: '2023-10-26T03:12:45Z',
      type: 'Disk Space Alert',
      description: 'Database storage approaching 85% capacity',
      resolved: false
    }
  }
];

export const recentAlerts: ServiceAlert[] = [
  {
    id: 'alert-001',
    serviceId: 'db-001',
    timestamp: '2023-10-26T03:12:45Z',
    severity: 'high',
    title: 'Disk Space Alert',
    description: 'Database storage approaching 85% capacity',
    resolved: false
  },
  {
    id: 'alert-002',
    serviceId: 'web-001',
    timestamp: '2023-10-25T18:45:12Z',
    severity: 'medium',
    title: 'High Response Time',
    description: 'Average response time increased to 1.5s (threshold: 1.0s)',
    resolved: true
  },
  {
    id: 'alert-003',
    serviceId: 'api-001',
    timestamp: '2023-10-25T14:22:38Z',
    severity: 'low',
    title: 'Minor Version Update Available',
    description: 'New security patch available for Node.js 18.12.1',
    resolved: false
  },
  {
    id: 'alert-004',
    serviceId: 'db-001',
    timestamp: '2023-10-24T09:15:22Z',
    severity: 'critical',
    title: 'Unauthorized Access Attempt',
    description: 'Multiple failed login attempts detected from IP 203.0.113.42',
    resolved: true
  },
  {
    id: 'alert-005',
    serviceId: 'dns-001',
    timestamp: '2023-10-23T22:08:55Z',
    severity: 'medium',
    title: 'DNS Resolution Delay',
    description: 'DNS queries taking longer than 100ms to resolve',
    resolved: true
  }
];

export const serviceTypeConfigs: ServiceTypeConfig[] = [
  {
    type: 'dns',
    name: 'DNS Server',
    description: 'Domain name resolution services',
    icon: 'globe-network',
    technologies: [
      { id: 'bind', name: 'BIND', description: 'Berkeley Internet Name Domain server' },
      { id: 'unbound', name: 'Unbound', description: 'Validating, recursive, caching DNS resolver' },
      { id: 'powerdns', name: 'PowerDNS', description: 'Versatile DNS server with SQL backends' }
    ]
  },
  {
    type: 'web',
    name: 'Web Server',
    description: 'HTTP/HTTPS web content hosting',
    icon: 'globe',
    technologies: [
      { id: 'nginx', name: 'Nginx', description: 'High-performance HTTP server and reverse proxy' },
      { id: 'apache', name: 'Apache', description: 'Widely-used HTTP server with extensive modules' },
      { id: 'caddy', name: 'Caddy', description: 'HTTP/2 web server with automatic HTTPS' }
    ]
  },
  {
    type: 'api',
    name: 'API Server',
    description: 'REST/GraphQL API endpoints',
    icon: 'brackets',
    technologies: [
      { id: 'node', name: 'Node.js', description: 'JavaScript runtime for building APIs' },
      { id: 'flask', name: 'Flask', description: 'Lightweight Python web framework' },
      { id: 'fastapi', name: 'FastAPI', description: 'Modern, fast Python web framework' }
    ]
  },
  {
    type: 'load_balancer',
    name: 'Load Balancer',
    description: 'Traffic distribution across services',
    icon: 'shuffle',
    technologies: [
      { id: 'haproxy', name: 'HAProxy', description: 'Reliable, high-performance TCP/HTTP load balancer' },
      { id: 'nginx-lb', name: 'Nginx LB', description: 'Nginx as a load balancer' },
      { id: 'envoy', name: 'Envoy', description: 'Cloud-native high-performance edge/service proxy' }
    ]
  },
  {
    type: 'database',
    name: 'Database Server',
    description: 'Data storage and management',
    icon: 'database',
    technologies: [
      { id: 'postgres', name: 'PostgreSQL', description: 'Advanced object-relational database' },
      { id: 'mysql', name: 'MySQL', description: 'Popular open-source relational database' },
      { id: 'mongodb', name: 'MongoDB', description: 'NoSQL document database' }
    ]
  },
  {
    type: 'custom',
    name: 'Custom Service',
    description: 'User-defined service containers',
    icon: 'box',
    technologies: [
      { id: 'docker', name: 'Docker Container', description: 'Custom Docker container' },
      { id: 'binary', name: 'Custom Binary', description: 'Custom executable service' },
      { id: 'script', name: 'Script Service', description: 'Service running via scripts' }
    ]
  }
];
