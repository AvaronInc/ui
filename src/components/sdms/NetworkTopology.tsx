import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NetworkDevice, NetworkFlow } from '@/types/sdms';
import { ReactFlow, Controls, Background, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AlertCircle, Activity, Network as NetworkIcon, Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockZones } from '@/components/zones/mockData';
import { Zone } from '@/components/zones/types';
import { ZoneStatusBadge } from '@/components/zones/ZonesPanel';

const mockDevices: NetworkDevice[] = [
  { id: 'fw-01', name: 'Main Firewall', type: 'firewall', ip: '10.0.0.1', zone: 'dmz', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'sw-01', name: 'Core Switch', type: 'switch', ip: '10.0.0.2', zone: 'internal', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'rt-01', name: 'Primary Router', type: 'router', ip: '10.0.0.3', zone: 'internal', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'vpn-01', name: 'VPN Gateway', type: 'vpn', ip: '10.0.0.4', zone: 'public', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'srv-01', name: 'App Server 1', type: 'server', ip: '10.0.1.10', zone: 'internal', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'srv-02', name: 'Database Server', type: 'server', ip: '10.0.1.11', zone: 'private', status: 'warning', lastSeen: new Date().toISOString() }
];

const mockFlows: NetworkFlow[] = [
  { id: 'flow-1', source: 'fw-01', target: 'sw-01', protocol: 'TCP', port: 443, bandwidth: '10 Mbps', latency: 2 },
  { id: 'flow-2', source: 'sw-01', target: 'rt-01', protocol: 'TCP', port: 80, bandwidth: '5 Mbps', latency: 1 },
  { id: 'flow-3', source: 'sw-01', target: 'srv-01', protocol: 'TCP', port: 22, bandwidth: '2 Mbps', latency: 3 },
  { id: 'flow-4', source: 'srv-01', target: 'srv-02', protocol: 'TCP', port: 3306, bandwidth: '8 Mbps', latency: 2 },
  { id: 'flow-5', source: 'vpn-01', target: 'fw-01', protocol: 'UDP', port: 1194, bandwidth: '1 Mbps', latency: 15 }
];

const NetworkTopology = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    const flowNodes = mockDevices.map((device, index) => {
      const angle = (index / mockDevices.length) * 2 * Math.PI;
      const radius = 200;
      const x = 300 + radius * Math.cos(angle);
      const y = 300 + radius * Math.sin(angle);
      
      let color;
      switch (device.status) {
        case 'online':
          color = '#10b981';
          break;
        case 'warning':
          color = '#f59e0b';
          break;
        case 'offline':
          color = '#ef4444';
          break;
      }
      
      return {
        id: device.id,
        data: { label: device.name, device },
        position: { x, y },
        style: { 
          backgroundColor: color, 
          color: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '10px',
          width: 150,
          height: 60
        }
      };
    });
    
    const flowEdges = mockFlows.map(flow => ({
      id: flow.id,
      source: flow.source,
      target: flow.target,
      label: `${flow.protocol}:${flow.port}`,
      animated: flow.latency > 10,
      style: { stroke: '#94a3b8' }
    }));
    
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'sdwan':
        return <div className="w-4 h-4 rounded-full bg-blue-500" title="SD-WAN"></div>;
      case 'identity':
        return <div className="w-4 h-4 rounded-full bg-purple-500" title="Identity"></div>;
      case 'vault':
        return <div className="w-4 h-4 rounded-full bg-green-500" title="Vault"></div>;
      case 'ai':
        return <div className="w-4 h-4 rounded-full bg-amber-500" title="AI"></div>;
      case 'rmm':
        return <div className="w-4 h-4 rounded-full bg-cyan-500" title="RMM"></div>;
      case 'mixtral':
        return <div className="w-4 h-4 rounded-full bg-pink-500" title="Mixtral"></div>;
      case 'nestvault':
        return <div className="w-4 h-4 rounded-full bg-indigo-500" title="Storage (NestVault)"></div>;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-500" title={service}></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">Network Topology & Flow Charts</div>
      <p className="text-muted-foreground">
        Interactive visualization of your network architecture generated by AI analysis.
      </p>
      
      <Tabs defaultValue="topology" className="h-[calc(100vh-300px)]">
        <TabsList>
          <TabsTrigger value="topology">Topology Map</TabsTrigger>
          <TabsTrigger value="flow">Data Flow</TabsTrigger>
          <TabsTrigger value="zones">Security Zones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topology" className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NetworkIcon className="h-5 w-5" />
                <span>Network Topology Map</span>
              </CardTitle>
              <CardDescription>
                Auto-generated map of core network devices and connections
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              <div style={{ height: '100%', width: '100%' }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  fitView
                >
                  <Controls />
                  <Background />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flow" className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span>Data Flow Analysis</span>
              </CardTitle>
              <CardDescription>
                Real-time visualization of data flows between network components
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6 max-w-md">
                  <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Collecting Flow Data</h3>
                  <p className="text-muted-foreground mt-2">
                    The system is currently analyzing network traffic patterns. This may take a few minutes to complete.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zones" className="h-full">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Security Zones Visualization</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    <List className="h-4 w-4 mr-1" />
                    Table
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 className="h-4 w-4 mr-1" />
                    Grid
                  </Button>
                </div>
              </div>
              <CardDescription>
                Management and visualization of security zones across your environment
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-auto">
              {viewMode === 'table' ? (
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Zone Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Services</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Admin Scope</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Isolation Level</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockZones.map((zone) => (
                        <tr key={zone.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{zone.name}</td>
                          <td className="p-4 align-middle"><ZoneStatusBadge status={zone.status} /></td>
                          <td className="p-4 align-middle">
                            <div className="flex space-x-1">
                              {zone.services.map((service) => (
                                <div key={service} className="tooltip" data-tip={service}>
                                  {getServiceIcon(service)}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-wrap gap-1">
                              {zone.adminScopes.map((scope, i) => (
                                <span 
                                  key={i} 
                                  className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-xs"
                                >
                                  {scope}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              zone.isolationLevel === 'airgapped' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                              zone.isolationLevel === 'high' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {zone.isolationLevel.charAt(0).toUpperCase() + zone.isolationLevel.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 align-middle">{formatDate(zone.created)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockZones.map((zone) => (
                    <div 
                      key={zone.id}
                      className="p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-all cursor-pointer hover:translate-y-[-2px]"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg">{zone.name}</h3>
                        <ZoneStatusBadge status={zone.status} />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{zone.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {zone.services.map((service) => (
                            <div 
                              key={service} 
                              className="flex items-center px-2 py-1 bg-secondary/50 rounded-full text-xs"
                            >
                              {getServiceIcon(service)}
                              <span className="ml-1 capitalize">{service}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between text-xs mt-2">
                          <span>Isolation: <span className="font-medium capitalize">{zone.isolationLevel}</span></span>
                          <span>Created: {formatDate(zone.created)}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <div className="flex justify-between mb-1">
                            <span>Resource Usage</span>
                            <span>{zone.resourceUsage.cpu}% CPU</span>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                zone.resourceUsage.cpu > 80 ? 'bg-red-500' : 
                                zone.resourceUsage.cpu > 60 ? 'bg-amber-500' : 
                                'bg-green-500'
                              }`}
                              style={{ width: `${zone.resourceUsage.cpu}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkTopology;
