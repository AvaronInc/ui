import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DeviceList } from '@/components/rmm/DeviceList';
import { DeviceDetailPanel } from '@/components/rmm/DeviceDetailPanel';
import { DeviceFilters } from '@/components/rmm/DeviceFilters';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Server, RefreshCw, Wrench, Shield, Activity, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Device } from '@/types/rmm';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';
import { toast } from 'sonner';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

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

const performanceData = [
  { name: '8:00', cpu: 32, memory: 45, network: 12 },
  { name: '10:00', cpu: 40, memory: 50, network: 14 },
  { name: '12:00', cpu: 52, memory: 58, network: 20 },
  { name: '14:00', cpu: 38, memory: 52, network: 15 },
  { name: '16:00', cpu: 45, memory: 56, network: 18 },
  { name: '18:00', cpu: 42, memory: 55, network: 16 },
];

const osDistributionData = [
  { name: 'Windows', value: 45 },
  { name: 'Linux', value: 30 },
  { name: 'macOS', value: 20 },
  { name: 'Other', value: 5 },
];

const issueSeverityData = [
  { name: 'Critical', value: 5, color: '#ef4444' },
  { name: 'Warning', value: 12, color: '#f59e0b' },
  { name: 'Info', value: 28, color: '#3b82f6' },
];

const RMM = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  const [activeTab, setActiveTab] = useState('overview');
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  
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

  const handleRunDiagnostics = () => {
    toast.info("Running system diagnostics on all devices...");
  };

  const handleApplySecurityPatches = () => {
    toast.info("Scheduling security patches for eligible devices...");
  };

  const handleRemoteReboot = () => {
    toast.info("Preparing remote reboot options...");
  };

  const deviceMetrics = {
    totalDevices: devices.length,
    onlineDevices: devices.filter(d => d.status === 'online').length,
    offlineDevices: devices.filter(d => d.status === 'offline').length,
    warningDevices: devices.filter(d => d.status === 'warning').length,
    uptime: "99.8%",
    securityScore: 92,
    activeUsers: 246,
    connectedSystems: 18
  };

  const chartColors = {
    cpu: isDarkMode ? "#3B82F6" : "#3B82F6",
    memory: isDarkMode ? "#10B981" : "#10B981",
    network: isDarkMode ? "#F59E0B" : "#F59E0B",
    grid: isDarkMode ? "#333333" : "#e5e7eb",
    text: isDarkMode ? "#FFFFFF" : "#000000"
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
              <p className="text-muted-foreground">Monitor, manage and automate your network devices</p>
            </div>
            <DeviceFilters onFilterChange={handleFilterChange} />
          </div>

          <div className="mb-6">
            <StatusCardGrid metrics={deviceMetrics} onClick={(section) => {
              if (section === 'devices') {
                setActiveTab('devices');
              }
            }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-3">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-1">System Diagnostics</h3>
                <p className="text-sm text-muted-foreground mb-3">Run comprehensive diagnostics on all monitored devices</p>
                <Button size="sm" onClick={handleRunDiagnostics}>Run Diagnostics</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-1">Security Patches</h3>
                <p className="text-sm text-muted-foreground mb-3">Apply latest security updates to vulnerable devices</p>
                <Button size="sm" variant="outline" onClick={handleApplySecurityPatches}>Apply Patches</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-3">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-1">Remote Actions</h3>
                <p className="text-sm text-muted-foreground mb-3">Reboot, restart services or troubleshoot devices</p>
                <Button size="sm" variant="outline" onClick={handleRemoteReboot}>Remote Reboot</Button>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full overflow-x-auto flex justify-start space-x-1 p-1 mb-4">
              <TabsTrigger value="overview" className="flex-shrink-0">{isMobile ? 'Overview' : 'Dashboard Overview'}</TabsTrigger>
              <TabsTrigger value="devices" className="flex-shrink-0">{isMobile ? 'Devices' : 'Device Management'}</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-shrink-0">{isMobile ? 'Analytics' : 'Performance Analytics'}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      System Performance Trends
                    </CardTitle>
                    <CardDescription>Average across all monitored devices</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                          <XAxis 
                            dataKey="name" 
                            stroke={chartColors.text}
                            tick={{ fill: chartColors.text }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `${value}%`}
                            stroke={chartColors.text}
                            tick={{ fill: chartColors.text }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: isDarkMode ? '#1f2937' : 'white',
                              color: chartColors.text,
                              border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                            }}
                            labelStyle={{ color: chartColors.text }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="cpu" 
                            name="CPU Usage" 
                            stroke={chartColors.cpu} 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="memory" 
                            name="Memory Usage" 
                            stroke={chartColors.memory} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="network" 
                            name="Network Load" 
                            stroke={chartColors.network} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Server className="h-5 w-5 text-purple-500" />
                      Device Distribution
                    </CardTitle>
                    <CardDescription>OS types and alert severity</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={osDistributionData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {osDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={
                                  index === 0 ? '#3b82f6' : 
                                  index === 1 ? '#10b981' : 
                                  index === 2 ? '#f59e0b' : 
                                  '#8b5cf6'
                                } />
                              ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={issueSeverityData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {issueSeverityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Network className="h-5 w-5 text-amber-500" />
                    Recent Status Changes
                  </CardTitle>
                  <CardDescription>Latest device status updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {devices.slice(0, 3).map(device => (
                      <div key={device.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                        <div className={`mt-1 p-1.5 rounded-full ${
                          device.status === 'online' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                          device.status === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                          'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          <Server className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{device.name}</h4>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              device.status === 'online' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                              device.status === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                              'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {device.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{device.alerts[0]?.message || "No recent alerts"}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('devices')}>
                      View All Devices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices">
              <DeviceList 
                devices={filteredDevices} 
                onDeviceSelect={handleDeviceSelect} 
              />
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Resource utilization across all monitored devices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={devices.slice(0, 5).map(device => ({
                          name: device.name,
                          cpu: device.metrics.cpu[device.metrics.cpu.length - 1].value,
                          memory: device.metrics.memory[device.metrics.memory.length - 1].value,
                          network: device.metrics.network[device.metrics.network.length - 1].value
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                          <XAxis 
                            dataKey="name" 
                            stroke={chartColors.text}
                            tick={{ fill: chartColors.text }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `${value}%`}
                            stroke={chartColors.text}
                            tick={{ fill: chartColors.text }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: isDarkMode ? '#1f2937' : 'white',
                              color: chartColors.text,
                              border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                            }}
                            labelStyle={{ color: chartColors.text }}
                          />
                          <Legend />
                          <Bar dataKey="cpu" name="CPU Usage" fill={chartColors.cpu} />
                          <Bar dataKey="memory" name="Memory Usage" fill={chartColors.memory} />
                          <Bar dataKey="network" name="Network Load" fill={chartColors.network} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
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
