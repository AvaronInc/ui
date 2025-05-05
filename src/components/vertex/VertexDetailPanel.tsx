
import React from 'react';
import { VertexLocation } from '@/types/vertex';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  RefreshCw, 
  Play, 
  Ticket, 
  Activity,
  Clock,
  Thermometer,
  Droplets,
  Zap,
  Fan,
  Cpu,
  HardDrive,
  Network,
  Calendar,
  Shield,
  Eye
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { restartVertex, runVertexDiagnostics } from '@/data/vertexData';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

interface VertexDetailPanelProps {
  vertex: VertexLocation;
  open: boolean;
  onClose: () => void;
}

const VertexDetailPanel: React.FC<VertexDetailPanelProps> = ({ vertex, open, onClose }) => {
  // Restart mutation
  const restartMutation = useMutation({
    mutationFn: restartVertex,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error('Failed to restart Vertex');
    }
  });

  // Diagnostics mutation
  const diagnosticsMutation = useMutation({
    mutationFn: runVertexDiagnostics,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        console.log('Diagnostic results:', data.results);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error('Failed to run diagnostics.');
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'offline': return 'text-destructive';
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
  const handleRestartVertex = () => {
    restartMutation.mutate(vertex.id);
  };

  const handleRunDiagnostics = () => {
    diagnosticsMutation.mutate(vertex.id);
  };

  const handleScheduleMaintenance = () => {
    toast.info(`Maintenance scheduled for ${vertex.name}`);
  };

  // Format temperature for display with color coding
  const formatTemperature = (temp: number | null) => {
    if (temp === null) return 'N/A';
    
    let colorClass = 'text-success';
    if (temp > 27) colorClass = 'text-warning';
    if (temp > 30) colorClass = 'text-destructive';
    
    return <span className={colorClass}>{temp}°C</span>;
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Vertex Details</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Device Overview */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{vertex.name}</h3>
                <p className="text-sm text-muted-foreground">{vertex.hardwareModel}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${getStatusColor(vertex.status)}`}>
                <div className={`h-2 w-2 rounded-full ${
                  vertex.status === 'online' ? 'bg-success' : 
                  vertex.status === 'degraded' ? 'bg-warning' : 
                  'bg-destructive'
                }`}></div>
                <span className="capitalize">{vertex.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Region</p>
                <p className="font-medium">{vertex.region}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Last Check-in</p>
                <p className="font-medium">{formatTimestamp(vertex.lastCheckIn)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Last Restart</p>
                <p className="font-medium">{formatTimestamp(vertex.lastRestart)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Uptime</p>
                <p className="font-medium">{vertex.uptime}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Temperature</p>
                <p className="font-medium">{formatTemperature(vertex.temperature)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Live Stream</p>
                <p className="font-medium">{vertex.hasLiveStream ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>
          </div>

          {/* Live Stream Button */}
          {vertex.hasLiveStream && (
            <Button 
              className="w-full"
              disabled={vertex.status === 'offline'}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Live Feed
            </Button>
          )}

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRestartVertex}
                disabled={vertex.status === 'offline' || restartMutation.isPending}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${restartMutation.isPending ? 'animate-spin' : ''}`} />
                {restartMutation.isPending ? 'Restarting...' : 'Restart'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRunDiagnostics}
                disabled={vertex.status === 'offline' || diagnosticsMutation.isPending}
              >
                <Play className={`h-4 w-4 mr-2 ${diagnosticsMutation.isPending ? 'animate-spin' : ''}`} />
                {diagnosticsMutation.isPending ? 'Running...' : 'Run Diagnostics'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleScheduleMaintenance}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </div>
          </div>
          
          {/* Vertex Details Tabs */}
          <Tabs defaultValue="hardware">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hardware" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Hardware Inventory</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>CPU</span>
                    </div>
                    <span>{vertex.hardwareInventory.cpu}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-2 text-muted-foreground">RAM</div>
                      <span>Memory</span>
                    </div>
                    <span>{vertex.hardwareInventory.ram}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HardDrive className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Storage</span>
                    </div>
                    <span>{vertex.hardwareInventory.storage}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Network Adapters</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {vertex.hardwareInventory.networkAdapters.map((adapter, index) => (
                    <div key={index} className="flex items-center">
                      <Network className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{adapter}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>CPU Load</span>
                      <span className={vertex.resourceUsage.cpuLoad > 70 ? 'text-warning' : 'text-muted-foreground'}>{vertex.resourceUsage.cpuLoad}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${vertex.resourceUsage.cpuLoad > 70 ? 'bg-warning' : 'bg-primary'}`}
                        style={{ width: `${vertex.resourceUsage.cpuLoad}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Storage Used</span>
                      <span className="text-muted-foreground">{vertex.resourceUsage.storageUsed}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${vertex.resourceUsage.storageUsed}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Network Traffic</span>
                      <span className="text-muted-foreground">{vertex.resourceUsage.networkTraffic} Mbps</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(vertex.resourceUsage.networkTraffic / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="environmental" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Environmental Data</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Temperature</span>
                    </div>
                    <span>{formatTemperature(vertex.temperature)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Humidity</span>
                    </div>
                    <span>{vertex.environmentalData.humidity !== null ? `${vertex.environmentalData.humidity}%` : 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Power Usage</span>
                    </div>
                    <span>{vertex.environmentalData.powerUsage > 0 ? `${vertex.environmentalData.powerUsage}W` : 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Fan className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Cooling Status</span>
                    </div>
                    <Badge 
                      variant={
                        vertex.environmentalData.coolingStatus === 'normal' ? 'default' : 
                        vertex.environmentalData.coolingStatus === 'warning' ? 'warning' : 
                        'destructive'
                      }
                    >
                      {vertex.environmentalData.coolingStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance History</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Last Maintenance</span>
                      <span>{formatTimestamp(vertex.lastMaintenance.date)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Technician:</span>
                      <span className="ml-2">{vertex.lastMaintenance.technician}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Notes:</span>
                      <p className="mt-1 text-xs">{vertex.lastMaintenance.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-4 mt-4">
              {vertex.securityAlerts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-6">
                    <Shield className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No security alerts detected</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {vertex.securityAlerts.map((alert) => (
                    <Card key={alert.id} className="border-l-2" style={{ 
                      borderLeftColor: 
                        alert.severity === 'critical' ? '#ef4444' : 
                        alert.severity === 'high' ? '#f97316' : 
                        alert.severity === 'medium' ? '#f59e0b' : 
                        '#3b82f6'
                    }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={
                              alert.severity === 'critical' ? 'destructive' : 
                              alert.severity === 'high' ? 'destructive' : 
                              alert.severity === 'medium' ? 'warning' : 
                              'default'
                            }
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</span>
                        </div>
                        <p className="mt-2 text-sm font-medium">{alert.message}</p>
                        <div className="mt-2 flex justify-end">
                          {!alert.acknowledged && (
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VertexDetailPanel;
