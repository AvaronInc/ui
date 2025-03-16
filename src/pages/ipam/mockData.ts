
import { IPAddress } from '@/types/ipam';

// Sample data
export const mockIPAddresses: IPAddress[] = [
  {
    id: '1',
    address: '192.168.1.1',
    subnet: '192.168.1.0/24',
    status: 'in-use',
    deviceName: 'Main Router',
    assignedUser: 'Network Admin',
    lastUpdated: '2023-11-15T10:30:00Z',
    description: 'Main gateway router',
    history: [
      { id: '101', date: '2023-10-15T14:20:00Z', action: 'assigned', user: 'System Admin', details: 'Initially assigned to main router' },
      { id: '102', date: '2023-11-15T10:30:00Z', action: 'modified', user: 'Network Admin', details: 'Updated device description' }
    ]
  },
  {
    id: '2',
    address: '192.168.1.2',
    subnet: '192.168.1.0/24',
    status: 'in-use',
    deviceName: 'File Server',
    assignedUser: 'System Admin',
    lastUpdated: '2023-11-10T08:15:00Z',
    description: 'Primary file server',
    history: [
      { id: '201', date: '2023-09-20T11:45:00Z', action: 'assigned', user: 'System Admin', details: 'Assigned to new file server' }
    ]
  },
  {
    id: '3',
    address: '192.168.1.3',
    subnet: '192.168.1.0/24',
    status: 'conflict',
    deviceName: 'Unknown Device',
    lastUpdated: '2023-11-18T16:45:00Z',
    description: 'IP conflict detected',
    history: [
      { id: '301', date: '2023-11-18T16:45:00Z', action: 'scanned', user: 'System', details: 'Conflict detected during network scan' }
    ]
  },
  {
    id: '4',
    address: '192.168.1.4',
    subnet: '192.168.1.0/24',
    status: 'in-use',
    deviceName: 'Dev Workstation',
    assignedUser: 'Jane Smith',
    lastUpdated: '2023-11-05T09:20:00Z',
    description: 'Developer workstation',
    history: [
      { id: '401', date: '2023-10-01T08:30:00Z', action: 'assigned', user: 'IT Support', details: 'Assigned to new developer' }
    ]
  },
  {
    id: '5',
    address: '192.168.1.5',
    subnet: '192.168.1.0/24',
    status: 'available',
    lastUpdated: '2023-11-01T14:10:00Z',
    history: [
      { id: '501', date: '2023-11-01T14:10:00Z', action: 'released', user: 'IT Support', details: 'Released from decommissioned device' }
    ]
  },
  {
    id: '6',
    address: '192.168.1.10',
    subnet: '192.168.1.0/24',
    status: 'in-use',
    deviceName: 'Marketing Printer',
    assignedUser: 'Marketing Department',
    lastUpdated: '2023-10-25T11:35:00Z',
    description: 'Network printer for marketing',
    history: [
      { id: '601', date: '2023-08-15T13:20:00Z', action: 'assigned', user: 'IT Support', details: 'Set up for new department printer' }
    ]
  },
  {
    id: '7',
    address: '192.168.1.15',
    subnet: '192.168.1.0/24',
    status: 'available',
    lastUpdated: '2023-11-12T15:40:00Z',
    history: [
      { id: '701', date: '2023-11-12T15:40:00Z', action: 'released', user: 'System', details: 'Automatically released after lease expiration' }
    ]
  },
  {
    id: '8',
    address: '192.168.1.20',
    subnet: '192.168.1.0/24',
    status: 'in-use',
    deviceName: 'Conference Room AP',
    assignedUser: 'Facilities',
    lastUpdated: '2023-09-30T10:15:00Z',
    description: 'Access point for conference rooms',
    history: [
      { id: '801', date: '2023-09-30T10:15:00Z', action: 'assigned', user: 'Network Admin', details: 'Configured for conference area coverage' }
    ]
  }
];

export const subnetData = {
  id: '1',
  name: 'Primary Office Network',
  cidr: '192.168.1.0/24',
  totalIPs: 254,
  usedIPs: 6,
  description: 'Main office subnet'
};
