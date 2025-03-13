
import React, { useState } from 'react';
import { Device, DeviceAlert } from '@/types/rmm';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  RefreshCw, 
  Wrench, 
  Ticket,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

interface DeviceDetailPanelProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceDetailPanel = ({ device, isOpen, onClose }: DeviceDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState('metrics');
  const { isDarkMode } = useTheme();
  
  if (!device) return null;
  
  const formatLastCheckIn = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };
  
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
      default:
        return null;
    }
  };
  
  const handleRestartDevice = () => {
    toast.info(`Restarting ${device.name}...`);
    // In a real app, you would trigger an API call here
  };
  
  const handleRunDiagnostics = () => {
    toast.info(`Running diagnostics on ${device.name}...`);
    // In a real app, you would trigger an API call here
  };
  
  const handleOpenTicket = () => {
    toast.info(`Opening a ticket for ${device.name}...`);
    // In a real app, you would navigate to the ticket creation page
  };

  const statusChip = (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
      device.status === 'online' ? 'bg-success/10 text-success' :
      device.status === 'warning' ? 'bg-warning/10 text-warning' :
      'bg-destructive/10 text-destructive'
    }`}>
      {device.status === 'online' ? <CheckCircle className="h-3.5 w-3.5" /> :
      device.status === 'warning' ? <AlertTriangle className="h-3.5 w-3.5" /> :
      <XCircle className="h-3.5 w-3.5" />}
      <span className="capitalize">{device.status}</span>
    </div>
  );

  // Chart colors that work in both light and dark mode
  const chartColors = {
    cpu: isDarkMode ? "#3B82F6" : "#3B82F6",
    memory: isDarkMode ? "#10B981" : "#10B981",
    network: isDarkMode ? "#F59E0B" : "#F59E0B",
    grid: isDarkMode ? "#333333" : "#e5e7eb",
    text: isDarkMode ? "#FFFFFF" : "#000000"
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-3">
          <SheetTitle className="flex items-center justify-between">
            <span>{device.name}</span>
            {statusChip}
          </SheetTitle>
          <SheetDescription>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">IP Address:</div>
              <div>{device.ip}</div>
              <div className="text-muted-foreground">Operating System:</div>
              <div>{device.os}</div>
              <div className="text-muted-foreground">Location:</div>
              <div>{device.location}</div>
              <div className="text-muted-foreground">Last Check-in:</div>
              <div>{formatLastCheckIn(device.lastCheckIn)}</div>
            </div>
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex justify-between mt-6 gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleRestartDevice}
            disabled={device.status === 'offline'}
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleRunDiagnostics} 
            disabled={device.status === 'offline'}
            className="flex-1"
          >
            <Wrench className="w-4 h-4 mr-2" />
            Diagnostics
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleOpenTicket}
            className="flex-1"
          >
            <Ticket className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={device.metrics.cpu}>
                      <XAxis 
                        dataKey="time" 
                        stroke={chartColors.text} 
                        tick={{ fill: chartColors.text }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`} 
                        stroke={chartColors.text}
                        tick={{ fill: chartColors.text }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'CPU Usage']}
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : 'white',
                          color: chartColors.text,
                          border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                        }}
                        labelStyle={{ color: chartColors.text }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={chartColors.cpu} 
                        fill={chartColors.cpu} 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={device.metrics.memory}>
                      <XAxis 
                        dataKey="time" 
                        stroke={chartColors.text}
                        tick={{ fill: chartColors.text }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`} 
                        stroke={chartColors.text}
                        tick={{ fill: chartColors.text }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Memory Usage']}
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : 'white',
                          color: chartColors.text,
                          border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                        }}
                        labelStyle={{ color: chartColors.text }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={chartColors.memory} 
                        fill={chartColors.memory} 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Network Latency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={device.metrics.network}>
                      <XAxis 
                        dataKey="time" 
                        stroke={chartColors.text}
                        tick={{ fill: chartColors.text }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}ms`} 
                        stroke={chartColors.text}
                        tick={{ fill: chartColors.text }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}ms`, 'Latency']}
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : 'white',
                          color: chartColors.text,
                          border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                        }}
                        labelStyle={{ color: chartColors.text }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill={chartColors.network} 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {device.alerts.map((alert: DeviceAlert) => (
                    <li key={alert.id} className="flex gap-3 items-start">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.severity)}
                      </div>
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(parseISO(alert.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default DeviceDetailPanel;
