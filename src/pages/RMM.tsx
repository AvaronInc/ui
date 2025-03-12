
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DeviceList } from '@/components/rmm/DeviceList';
import { DeviceDetailPanel } from '@/components/rmm/DeviceDetailPanel';
import { DeviceFilters } from '@/components/rmm/DeviceFilters';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Device } from '@/types/rmm';

// Sample data
const devices: Device[] = [
  {
    id: '1',
    name: 'Web Server 01',
    status: 'online',
    lastCheckIn: '2023-09-24T08:30:00Z',
    performanceScore: 92,
    type: 'server',
    ip: '192.168.1.101',
    os: 'Ubuntu 22.04 LTS',
    location: 'Data Center A',
    metrics: {
      cpu: [
        { time: '08:00', value: 42 },
        { time: '09:00', value: 55 },
        { time: '10:00', value: 35 },
        { time: '11:00', value: 65 },
        { time: '12:00', value: 48 },
        { time: '13:00', value: 52 }
      ],
      memory: [
        { time: '08:00', value: 35 },
        { time: '09:00', value: 40 },
        { time: '10:00', value: 45 },
        { time: '11:00', value: 52 },
        { time: '12:00', value: 60 },
        { time: '13:00', value: 58 }
      ],
      network: [
        { time: '08:00', value: 25 },
        { time: '09:00', value: 30 },
        { time: '10:00', value: 45 },
        { time: '11:00', value: 32 },
        { time: '12:00', value: 28 },
        { time: '13:00', value: 35 }
      ]
    },
    alerts: [
      { id: '1-1', message: 'CPU usage spike detected', severity: 'warning', timestamp: '2023-09-24T07:45:00Z' },
      { id: '1-2', message: 'Memory usage above 75% threshold', severity: 'warning', timestamp: '2023-09-23T22:30:00Z' },
      { id: '1-3', message: 'Disk space running low', severity: 'info', timestamp: '2023-09-23T15:20:00Z' }
    ]
  },
  {
    id: '2',
    name: 'Database Server',
    status: 'warning',
    lastCheckIn: '2023-09-24T08:25:00Z',
    performanceScore: 75,
    type: 'server',
    ip: '192.168.1.102',
    os: 'CentOS 7',
    location: 'Data Center A',
    metrics: {
      cpu: [
        { time: '08:00', value: 65 },
        { time: '09:00', value: 70 },
        { time: '10:00', value: 78 },
        { time: '11:00', value: 82 },
        { time: '12:00', value: 75 },
        { time: '13:00', value: 80 }
      ],
      memory: [
        { time: '08:00', value: 60 },
        { time: '09:00', value: 65 },
        { time: '10:00', value: 62 },
        { time: '11:00', value: 70 },
        { time: '12:00', value: 75 },
        { time: '13:00', value: 72 }
      ],
      network: [
        { time: '08:00', value: 40 },
        { time: '09:00', value: 45 },
        { time: '10:00', value: 38 },
        { time: '11:00', value: 42 },
        { time: '12:00', value: 50 },
        { time: '13:00', value: 55 }
      ]
    },
    alerts: [
      { id: '2-1', message: 'Database replication lag', severity: 'critical', timestamp: '2023-09-24T06:15:00Z' },
      { id: '2-2', message: 'Slow query performance', severity: 'warning', timestamp: '2023-09-24T04:30:00Z' },
      { id: '2-3', message: 'Temporary tablespace exceeded 80%', severity: 'warning', timestamp: '2023-09-23T18:45:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Finance Workstation',
    status: 'offline',
    lastCheckIn: '2023-09-23T15:45:00Z',
    performanceScore: 0,
    type: 'workstation',
    ip: '192.168.2.105',
    os: 'Windows 11 Pro',
    location: 'Finance Department',
    metrics: {
      cpu: [
        { time: '08:00', value: 25 },
        { time: '09:00', value: 30 },
        { time: '10:00', value: 35 },
        { time: '11:00', value: 40 },
        { time: '12:00', value: 45 },
        { time: '13:00', value: 0 }
      ],
      memory: [
        { time: '08:00', value: 40 },
        { time: '09:00', value: 42 },
        { time: '10:00', value: 45 },
        { time: '11:00', value: 50 },
        { time: '12:00', value: 55 },
        { time: '13:00', value: 0 }
      ],
      network: [
        { time: '08:00', value: 20 },
        { time: '09:00', value: 25 },
        { time: '10:00', value: 30 },
        { time: '11:00', value: 35 },
        { time: '12:00', value: 15 },
        { time: '13:00', value: 0 }
      ]
    },
    alerts: [
      { id: '3-1', message: 'Device went offline unexpectedly', severity: 'critical', timestamp: '2023-09-23T15:45:00Z' },
      { id: '3-2', message: 'Failed login attempts detected', severity: 'warning', timestamp: '2023-09-23T15:40:00Z' },
      { id: '3-3', message: 'Antivirus definitions out of date', severity: 'info', timestamp: '2023-09-22T09:15:00Z' }
    ]
  },
  {
    id: '4',
    name: 'Marketing Laptop',
    status: 'online',
    lastCheckIn: '2023-09-24T08:15:00Z',
    performanceScore: 88,
    type: 'laptop',
    ip: '192.168.2.110',
    os: 'macOS Monterey',
    location: 'Marketing Department',
    metrics: {
      cpu: [
        { time: '08:00', value: 30 },
        { time: '09:00', value: 35 },
        { time: '10:00', value: 40 },
        { time: '11:00', value: 25 },
        { time: '12:00', value: 30 },
        { time: '13:00', value: 35 }
      ],
      memory: [
        { time: '08:00', value: 45 },
        { time: '09:00', value: 50 },
        { time: '10:00', value: 55 },
        { time: '11:00', value: 45 },
        { time: '12:00', value: 40 },
        { time: '13:00', value: 45 }
      ],
      network: [
        { time: '08:00', value: 15 },
        { time: '09:00', value: 20 },
        { time: '10:00', value: 25 },
        { time: '11:00', value: 30 },
        { time: '12:00', value: 25 },
        { time: '13:00', value: 20 }
      ]
    },
    alerts: [
      { id: '4-1', message: 'Low disk space warning', severity: 'warning', timestamp: '2023-09-24T07:30:00Z' },
      { id: '4-2', message: 'Battery health degraded', severity: 'info', timestamp: '2023-09-23T14:20:00Z' },
      { id: '4-3', message: 'Software update available', severity: 'info', timestamp: '2023-09-22T10:45:00Z' }
    ]
  },
  {
    id: '5',
    name: 'File Server',
    status: 'online',
    lastCheckIn: '2023-09-24T08:28:00Z',
    performanceScore: 95,
    type: 'server',
    ip: '192.168.1.103',
    os: 'Windows Server 2022',
    location: 'Data Center B',
    metrics: {
      cpu: [
        { time: '08:00', value: 20 },
        { time: '09:00', value: 25 },
        { time: '10:00', value: 30 },
        { time: '11:00', value: 35 },
        { time: '12:00', value: 30 },
        { time: '13:00', value: 25 }
      ],
      memory: [
        { time: '08:00', value: 40 },
        { time: '09:00', value: 45 },
        { time: '10:00', value: 42 },
        { time: '11:00', value: 50 },
        { time: '12:00', value: 48 },
        { time: '13:00', value: 45 }
      ],
      network: [
        { time: '08:00', value: 60 },
        { time: '09:00', value: 65 },
        { time: '10:00', value: 70 },
        { time: '11:00', value: 75 },
        { time: '12:00', value: 65 },
        { time: '13:00', value: 62 }
      ]
    },
    alerts: [
      { id: '5-1', message: 'High network traffic detected', severity: 'info', timestamp: '2023-09-24T08:10:00Z' },
      { id: '5-2', message: 'Scheduled backup completed', severity: 'info', timestamp: '2023-09-24T02:00:00Z' },
      { id: '5-3', message: 'File share permission change detected', severity: 'warning', timestamp: '2023-09-23T16:40:00Z' }
    ]
  }
];

const RMM = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  
  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setIsPanelOpen(true);
  };
  
  const handleFilterChange = (searchTerm: string, statusFilter: string) => {
    let filtered = [...devices];
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(lowerSearchTerm) ||
        device.ip.toLowerCase().includes(lowerSearchTerm) ||
        device.type.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(device => device.status === statusFilter);
    }
    
    setFilteredDevices(filtered);
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">
                        <Home className="h-4 w-4 mr-1" />
                        <span>Dashboard</span>
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>Remote Monitoring</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-2xl font-semibold mt-2">Remote Monitoring & Management</h1>
              <p className="text-muted-foreground">Monitor and manage all your network devices</p>
            </div>
            <DeviceFilters onFilterChange={handleFilterChange} />
          </div>

          <DeviceList 
            devices={filteredDevices} 
            onDeviceSelect={handleDeviceSelect} 
          />
          
          <DeviceDetailPanel 
            device={selectedDevice} 
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default RMM;
