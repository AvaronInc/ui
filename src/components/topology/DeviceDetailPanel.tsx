
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { NetworkDevice } from '@/types/topology';
import { getMockNetworkLogs } from '@/data/topologyData';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Play, 
  Ticket, 
  Activity,
  Clock,
  ServerCrash,
  Wifi,
  Info
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface DeviceDetailPanelProps {
  device: NetworkDevice;
  open: boolean;
  onClose: () => void;
}

const DeviceDetailPanel = ({ device, open, onClose }: DeviceDetailPanelProps) => {
  // Fetch device logs
  const { data: deviceLogs = [] } = useQuery({
    queryKey: ['deviceLogs', device.id],
    queryFn: () => getMockNetworkLogs(device.id),
    enabled: open,
  });

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  // Handle quick actions
  const handleRestartDevice = () => {
    console.log(`Restarting device: ${device.id}`);
  };

  const handleRunDiagnostics = () => {
    console.log(`Running diagnostics on device: ${device.id}`);
  };

  const handleOpenTicket = () => {
    console.log(`Opening ticket for device: ${device.id}`);
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Device Details</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Device Overview */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{device.name}</h3>
                <p className="text-sm text-muted-foreground">{device.description}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${getDeviceStatusColor(device.status)}`}>
                <div className={`h-2 w-2 rounded-full ${device.status === 'online' ? 'bg-success' : device.status === 'warning' ? 'bg-warning' : 'bg-destructive'}`}></div>
                <span className="capitalize">{device.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">IP Address</p>
                <p className="font-medium">{device.ipAddress}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">MAC Address</p>
                <p className="font-medium">{device.macAddress}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Last Restart</p>
                <p className="font-medium">{formatTimestamp(device.lastRestart)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Uptime</p>
                <p className="font-medium">{device.uptime}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{device.location || 'Unknown'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Type</p>
                <p className="font-medium capitalize">{device.type}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRestartDevice}
                disabled={device.status === 'offline'}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRunDiagnostics}
                disabled={device.status === 'offline'}
              >
                <Play className="h-4 w-4 mr-2" />
                Run Diagnostics
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleOpenTicket}
              >
                <Ticket className="h-4 w-4 mr-2" />
                Open Ticket
              </Button>
            </div>
          </div>
          
          {/* Device Details Tabs */}
          <Tabs defaultValue="logs">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="logs">Network Logs</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="logs" className="space-y-4 mt-4">
              {deviceLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No recent logs available</p>
              ) : (
                <div className="space-y-3">
                  {deviceLogs.map((log) => (
                    <div key={log.id} className="border-l-2 pl-3 py-1 text-sm" style={{ borderColor: log.level === 'info' ? '#3b82f6' : log.level === 'warning' ? '#f59e0b' : '#ef4444' }}>
                      <div className="flex items-center justify-between">
                        <div className={`font-semibold ${getLogLevelColor(log.level)}`}>
                          {log.level === 'info' ? <Info className="h-3 w-3 inline mr-1" /> : 
                           log.level === 'warning' ? <Activity className="h-3 w-3 inline mr-1" /> : 
                           <ServerCrash className="h-3 w-3 inline mr-1" />}
                          {log.level.toUpperCase()}
                        </div>
                        <div className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</div>
                      </div>
                      <p className="mt-1">{log.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="connections" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Active Connections</h4>
                {device.connections.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No active connections</p>
                ) : (
                  <div className="grid gap-2">
                    {device.connections.map((connectedDeviceId) => (
                      <div key={connectedDeviceId} className="border rounded-md p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Wifi className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{connectedDeviceId}</span>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-foreground">
                          Active
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">CPU Usage</h4>
                  <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${Math.floor(Math.random() * 100)}%`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Memory Usage</h4>
                  <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${Math.floor(Math.random() * 100)}%`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Bandwidth</h4>
                  <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${(Math.random() * 10).toFixed(2)} Mbps`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Packet Loss</h4>
                  <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${(Math.random() * 2).toFixed(2)}%`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Latency</h4>
                  <span className="text-sm font-semibold">{device.status === 'offline' ? 'N/A' : `${Math.floor(Math.random() * 50)}ms`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Total Uptime</h4>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm font-semibold">{device.uptime}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DeviceDetailPanel;
