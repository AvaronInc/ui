
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, AreaChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InterfaceStatsDialogProps {
  interfaceData: any;
}

// Mock data for interface statistics
const generateMockChartData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    rx: Math.floor(Math.random() * 100),
    tx: Math.floor(Math.random() * 80),
  }));
};

const mockErrorData = {
  rx_errors: 23,
  tx_errors: 12,
  rx_dropped: 8,
  tx_dropped: 3,
  collisions: 0,
};

const InterfaceStatsDialog: React.FC<InterfaceStatsDialogProps> = ({ interfaceData }) => {
  const [timeRange, setTimeRange] = useState('1h');
  const chartData = generateMockChartData();

  if (!interfaceData) return null;

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle className="flex items-center text-xl">
          Interface Details: {interfaceData.name}
          <Badge variant="outline" className="ml-2">
            {interfaceData.role}
          </Badge>
        </DialogTitle>
        <DialogDescription>
          View real-time statistics and configuration details
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="stats">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="stats">Traffic Statistics</TabsTrigger>
          <TabsTrigger value="details">Interface Details</TabsTrigger>
          <TabsTrigger value="services">Attached Services</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Traffic Monitoring</h3>
            <div className="flex items-center space-x-2">
              <button 
                className={`px-2 py-1 text-xs rounded-md ${timeRange === '1h' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                onClick={() => setTimeRange('1h')}
              >
                1h
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded-md ${timeRange === '6h' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                onClick={() => setTimeRange('6h')}
              >
                6h
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded-md ${timeRange === '24h' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                onClick={() => setTimeRange('24h')}
              >
                24h
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Bandwidth Usage</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <AreaChart className="mx-auto h-16 w-16 opacity-50" />
                  <p>Traffic chart would render here</p>
                  <p className="text-xs">Time range: {timeRange}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Packets per Second</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="mx-auto h-16 w-16 opacity-50" />
                  <p>PPS chart would render here</p>
                  <p className="text-xs">Time range: {timeRange}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Error Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">RX Errors</p>
                  <p className="text-lg font-medium">{mockErrorData.rx_errors}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">TX Errors</p>
                  <p className="text-lg font-medium">{mockErrorData.tx_errors}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">RX Dropped</p>
                  <p className="text-lg font-medium">{mockErrorData.rx_dropped}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">TX Dropped</p>
                  <p className="text-lg font-medium">{mockErrorData.tx_dropped}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">Collisions</p>
                  <p className="text-lg font-medium">{mockErrorData.collisions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Interface Properties</h3>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-sm">Type</div>
                      <div className="text-sm font-medium capitalize">{interfaceData.type}</div>
                      
                      <div className="text-sm">MAC Address</div>
                      <div className="text-sm font-medium">{interfaceData.macAddress}</div>
                      
                      <div className="text-sm">Status</div>
                      <div className="text-sm font-medium capitalize">{interfaceData.status}</div>
                      
                      <div className="text-sm">Link Speed</div>
                      <div className="text-sm font-medium">{interfaceData.speed}</div>
                      
                      <div className="text-sm">Duplex</div>
                      <div className="text-sm font-medium capitalize">{interfaceData.duplex}</div>

                      <div className="text-sm">MTU</div>
                      <div className="text-sm font-medium">1500</div>

                      <div className="text-sm">Uptime</div>
                      <div className="text-sm font-medium">15d 7h 22m</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Network Configuration</h3>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-sm">IP Address</div>
                      <div className="text-sm font-medium">{interfaceData.ipAddress}</div>
                      
                      <div className="text-sm">Gateway</div>
                      <div className="text-sm font-medium">192.168.1.254</div>
                      
                      <div className="text-sm">Primary DNS</div>
                      <div className="text-sm font-medium">8.8.8.8</div>
                      
                      <div className="text-sm">Secondary DNS</div>
                      <div className="text-sm font-medium">8.8.4.4</div>
                      
                      <div className="text-sm">DHCP</div>
                      <div className="text-sm font-medium">No</div>
                      
                      <div className="text-sm">IPv6</div>
                      <div className="text-sm font-medium">Disabled</div>
                    </div>
                  </div>
                  
                  {interfaceData.type === 'bonded' && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Bond Configuration</h3>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-sm">Bond Mode</div>
                        <div className="text-sm font-medium">802.3ad (LACP)</div>
                        
                        <div className="text-sm">Member Interfaces</div>
                        <div className="text-sm font-medium">eth2, eth3</div>
                        
                        <div className="text-sm">Hash Policy</div>
                        <div className="text-sm font-medium">layer2+3</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Attached Services</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <span className="font-medium">Firewall Zone</span>
                        <p className="text-sm text-muted-foreground">WAN_ZONE</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    {interfaceData.role === 'SD-WAN' && (
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <span className="font-medium">SD-WAN Routing Policy</span>
                          <p className="text-sm text-muted-foreground">Policy: High Throughput</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    )}
                    
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <span className="font-medium">Traffic Monitoring</span>
                        <p className="text-sm text-muted-foreground">Netflow, SNMP</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    {interfaceData.role === 'LAN' && (
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <span className="font-medium">DHCP Server</span>
                          <p className="text-sm text-muted-foreground">Pool: 10.0.0.100 - 10.0.0.200</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">VLANs</h3>
                  
                  {interfaceData.role === 'LAN' ? (
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <span className="font-medium">VLAN 10</span>
                          <p className="text-sm text-muted-foreground">10.10.10.1/24 - Guest Network</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <span className="font-medium">VLAN 20</span>
                          <p className="text-sm text-muted-foreground">10.20.20.1/24 - IoT Devices</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No VLANs configured on this interface</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default InterfaceStatsDialog;
