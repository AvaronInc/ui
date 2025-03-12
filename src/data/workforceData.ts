
import { 
  VPNSession, 
  EndpointDevice, 
  EndpointDetails, 
  WorkforceStats, 
  PatchStatus, 
  Role
} from '@/types/workforce';

export const workforceStats: WorkforceStats = {
  totalActiveUsers: 243,
  connectedVPNSessions: 18,
  endpointsByStatus: {
    healthy: 178,
    needsUpdate: 42,
    insecure: 23
  }
};

export const vpnSessions: VPNSession[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'John Doe',
    deviceName: 'Johns-MacBook-Pro',
    ipAddress: '203.0.113.1',
    connectionTime: '2023-08-18T08:30:00',
    connectionDuration: '2h 45m',
    location: 'New York, US'
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Jane Smith',
    deviceName: 'Jane-ThinkPad',
    ipAddress: '203.0.113.2',
    connectionTime: '2023-08-18T09:15:00',
    connectionDuration: '2h 0m',
    location: 'London, UK'
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Alex Johnson',
    deviceName: 'AJ-Surface',
    ipAddress: '203.0.113.3',
    connectionTime: '2023-08-18T07:45:00',
    connectionDuration: '3h 15m',
    location: 'Toronto, CA'
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'Maria Garcia',
    deviceName: 'MG-Laptop',
    ipAddress: '203.0.113.4',
    connectionTime: '2023-08-18T10:30:00',
    connectionDuration: '1h 30m',
    location: 'Madrid, ES'
  },
  {
    id: '5',
    userId: 'u5',
    userName: 'David Lee',
    deviceName: 'DL-Dell-XPS',
    ipAddress: '203.0.113.5',
    connectionTime: '2023-08-18T08:00:00',
    connectionDuration: '3h 0m',
    location: 'Singapore, SG'
  }
];

export const endpointDevices: EndpointDevice[] = [
  {
    id: 'd1',
    name: 'WS-DEV-001',
    assignedUser: 'John Doe',
    os: 'Windows',
    version: '11 Pro',
    status: 'up_to_date',
    lastPatchDate: '2023-08-10',
    department: 'Engineering',
    role: 'admin',
    location: 'New York'
  },
  {
    id: 'd2',
    name: 'MB-MKT-002',
    assignedUser: 'Jane Smith',
    os: 'macOS',
    version: 'Monterey',
    status: 'needs_patch',
    lastPatchDate: '2023-07-15',
    department: 'Marketing',
    role: 'user',
    location: 'London'
  },
  {
    id: 'd3',
    name: 'LT-FIN-003',
    assignedUser: 'Alex Johnson',
    os: 'Windows',
    version: '10 Enterprise',
    status: 'security_issue',
    lastPatchDate: '2023-06-20',
    department: 'Finance',
    role: 'manager',
    location: 'Toronto'
  },
  {
    id: 'd4',
    name: 'WS-HR-004',
    assignedUser: 'Maria Garcia',
    os: 'Windows',
    version: '11 Enterprise',
    status: 'up_to_date',
    lastPatchDate: '2023-08-05',
    department: 'HR',
    role: 'user',
    location: 'Madrid'
  },
  {
    id: 'd5',
    name: 'MB-DEV-005',
    assignedUser: 'David Lee',
    os: 'macOS',
    version: 'Ventura',
    status: 'needs_patch',
    lastPatchDate: '2023-07-12',
    department: 'Engineering',
    role: 'admin',
    location: 'Singapore'
  },
  {
    id: 'd6',
    name: 'LT-SAL-006',
    assignedUser: 'Sarah Johnson',
    os: 'Windows',
    version: '10 Pro',
    status: 'security_issue',
    lastPatchDate: '2023-06-10',
    department: 'Sales',
    role: 'user',
    location: 'Chicago'
  }
];

export const endpointDetails: Record<string, EndpointDetails> = {
  'd1': {
    id: 'd1',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-01-15', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '115.0.5790.110', installDate: '2023-07-20', publisher: 'Google', updateAvailable: false },
      { name: 'Adobe Acrobat Reader', version: '23.003.20201', installDate: '2023-05-10', publisher: 'Adobe', updateAvailable: false },
      { name: 'Visual Studio Code', version: '1.80.1', installDate: '2023-07-15', publisher: 'Microsoft', updateAvailable: false }
    ],
    securityPatchStatus: 'All security patches installed',
    updatesAvailable: false,
    lastScan: '2023-08-17',
    complianceStatus: 'Compliant'
  },
  'd2': {
    id: 'd2',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-01-20', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '114.0.5735.198', installDate: '2023-06-10', publisher: 'Google', updateAvailable: true },
      { name: 'Adobe Creative Cloud', version: '5.6.0.788', installDate: '2023-04-15', publisher: 'Adobe', updateAvailable: true },
      { name: 'Slack', version: '4.29.149', installDate: '2023-07-05', publisher: 'Slack Technologies', updateAvailable: false }
    ],
    securityPatchStatus: 'Security patches needed: 2',
    updatesAvailable: true,
    lastScan: '2023-08-16',
    complianceStatus: 'Not Compliant'
  },
  'd3': {
    id: 'd3',
    software: [
      { name: 'Microsoft Office', version: '2019', installDate: '2022-08-10', publisher: 'Microsoft', updateAvailable: true },
      { name: 'Google Chrome', version: '112.0.5481.177', installDate: '2023-04-05', publisher: 'Google', updateAvailable: true },
      { name: 'QuickBooks', version: '2022', installDate: '2022-12-20', publisher: 'Intuit', updateAvailable: true },
      { name: 'Zoom', version: '5.13.5', installDate: '2023-06-10', publisher: 'Zoom Video Communications', updateAvailable: false }
    ],
    securityPatchStatus: 'Critical security vulnerabilities detected',
    updatesAvailable: true,
    lastScan: '2023-08-15',
    complianceStatus: 'Critical Non-Compliance'
  },
  'd4': {
    id: 'd4',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-02-15', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '115.0.5790.110', installDate: '2023-07-25', publisher: 'Google', updateAvailable: false },
      { name: 'Adobe Acrobat Reader', version: '23.003.20201', installDate: '2023-05-15', publisher: 'Adobe', updateAvailable: false },
      { name: 'Workday', version: '2023.2', installDate: '2023-07-01', publisher: 'Workday', updateAvailable: false }
    ],
    securityPatchStatus: 'All security patches installed',
    updatesAvailable: false,
    lastScan: '2023-08-16',
    complianceStatus: 'Compliant'
  },
  'd5': {
    id: 'd5',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-02-05', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '114.0.5735.198', installDate: '2023-06-15', publisher: 'Google', updateAvailable: true },
      { name: 'Visual Studio Code', version: '1.79.0', installDate: '2023-06-10', publisher: 'Microsoft', updateAvailable: true },
      { name: 'Docker Desktop', version: '4.19.0', installDate: '2023-07-01', publisher: 'Docker', updateAvailable: false }
    ],
    securityPatchStatus: 'Security patches needed: 1',
    updatesAvailable: true,
    lastScan: '2023-08-15',
    complianceStatus: 'Not Compliant'
  },
  'd6': {
    id: 'd6',
    software: [
      { name: 'Microsoft Office', version: '2019', installDate: '2022-09-10', publisher: 'Microsoft', updateAvailable: true },
      { name: 'Google Chrome', version: '110.0.5481.177', installDate: '2023-02-15', publisher: 'Google', updateAvailable: true },
      { name: 'Salesforce', version: '1.57.0', installDate: '2023-05-20', publisher: 'Salesforce', updateAvailable: false },
      { name: 'Zoom', version: '5.12.8', installDate: '2023-04-10', publisher: 'Zoom Video Communications', updateAvailable: true }
    ],
    securityPatchStatus: 'Multiple security vulnerabilities detected',
    updatesAvailable: true,
    lastScan: '2023-08-14',
    complianceStatus: 'Critical Non-Compliance'
  }
};

export const departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales'];
export const roles: Role[] = ['admin', 'user', 'manager'];
export const locations = ['New York', 'London', 'Toronto', 'Madrid', 'Singapore', 'Chicago'];
