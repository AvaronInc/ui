
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, ServerCrash, Network, Globe, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for BGP Peers
const bgpPeers = [
  {
    id: 'peer-1',
    name: 'ISP Primary',
    asNumber: '64512',
    ipAddress: '203.0.113.1',
    status: 'connected',
    routesReceived: 98,
    routesAdded: 78,
    uptime: '15d 7h'
  },
  {
    id: 'peer-2',
    name: 'ISP Secondary',
    asNumber: '64513',
    ipAddress: '203.0.113.2',
    status: 'connected',
    routesReceived: 98,
    routesAdded: 78,
    uptime: '15d 2h'
  },
  {
    id: 'peer-3',
    name: 'Data Center Router',
    asNumber: '64514',
    ipAddress: '10.1.1.1',
    status: 'connected',
    routesReceived: 35,
    routesAdded: 35,
    uptime: '20d 12h'
  },
  {
    id: 'peer-4',
    name: 'Azure ExpressRoute',
    asNumber: '8075',
    ipAddress: '172.32.0.1',
    status: 'idle',
    routesReceived: 0,
    routesAdded: 0,
    uptime: '0'
  },
  {
    id: 'peer-5',
    name: 'AWS Direct Connect',
    asNumber: '16509',
    ipAddress: '172.16.0.1',
    status: 'connected',
    routesReceived: 42,
    routesAdded: 42,
    uptime: '12d 3h'
  }
];

const BGPEngineConfig: React.FC = () => {
  const [isBgpEnabled, setIsBgpEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BGP Global Configuration */}
        <Card className="border border-amber-100 dark:border-amber-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ServerCrash className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-medium">BGP Global Configuration</h3>
              </div>
              <div className="flex items-center">
                <Label htmlFor="bgp-toggle" className="mr-2 text-sm">Enabled</Label>
                <Checkbox 
                  id="bgp-toggle" 
                  checked={isBgpEnabled} 
                  onCheckedChange={(value) => setIsBgpEnabled(!!value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="as-number">Local AS Number</Label>
                <Input 
                  id="as-number" 
                  placeholder="65000" 
                  value="65000" 
                  disabled={!isBgpEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="router-id">Router ID</Label>
                <Input 
                  id="router-id" 
                  placeholder="192.168.1.1" 
                  value="192.168.1.1" 
                  disabled={!isBgpEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="route-filtering">Route Filtering</Label>
                <Select defaultValue="allow-all" disabled={!isBgpEnabled}>
                  <SelectTrigger id="route-filtering">
                    <SelectValue placeholder="Select filtering mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allow-all">Allow All</SelectItem>
                    <SelectItem value="deny-private">Deny Private Networks</SelectItem>
                    <SelectItem value="prefix-list">Use Prefix Lists</SelectItem>
                    <SelectItem value="custom">Custom Rules</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="path-selection">Path Selection</Label>
                <Select defaultValue="shortest-path" disabled={!isBgpEnabled}>
                  <SelectTrigger id="path-selection">
                    <SelectValue placeholder="Select path selection mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortest-path">Shortest Path First</SelectItem>
                    <SelectItem value="preferred-route">Preferred Route</SelectItem>
                    <SelectItem value="lowest-med">Lowest MED</SelectItem>
                    <SelectItem value="highest-weight">Highest Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="graceful-restart" checked disabled={!isBgpEnabled} />
                <Label htmlFor="graceful-restart">
                  Enable graceful restart
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* BGP Failover Configuration */}
        <Card className="border border-green-100 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-medium">WAN Failover Configuration</h3>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="failover-mode">Failover Mode</Label>
                <Select defaultValue="automatic" disabled={!isBgpEnabled}>
                  <SelectTrigger id="failover-mode">
                    <SelectValue placeholder="Select failover mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="ai-controlled">AI-Controlled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary-provider">Primary WAN Provider</Label>
                <Select defaultValue="isp-primary" disabled={!isBgpEnabled}>
                  <SelectTrigger id="primary-provider">
                    <SelectValue placeholder="Select primary provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isp-primary">ISP Primary</SelectItem>
                    <SelectItem value="isp-secondary">ISP Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-provider">Secondary WAN Provider</Label>
                <Select defaultValue="isp-secondary" disabled={!isBgpEnabled}>
                  <SelectTrigger id="secondary-provider">
                    <SelectValue placeholder="Select secondary provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isp-primary">ISP Primary</SelectItem>
                    <SelectItem value="isp-secondary">ISP Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latency-threshold">Latency Threshold (ms)</Label>
                  <Input id="latency-threshold" placeholder="100" value="100" disabled={!isBgpEnabled} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packet-loss-threshold">Packet Loss Threshold (%)</Label>
                  <Input id="packet-loss-threshold" placeholder="5" value="5" disabled={!isBgpEnabled} />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="load-balance" checked disabled={!isBgpEnabled} />
                <Label htmlFor="load-balance">
                  Enable load balancing between providers
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* BGP Peers */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">BGP Peers</h3>
            </div>
            <Button className="flex items-center gap-2" disabled={!isBgpEnabled}>
              <Plus className="h-4 w-4" />
              Add Peer
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>AS Number</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Routes</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bgpPeers.map((peer) => (
                  <TableRow key={peer.id}>
                    <TableCell className="font-medium">{peer.name}</TableCell>
                    <TableCell>AS{peer.asNumber}</TableCell>
                    <TableCell>{peer.ipAddress}</TableCell>
                    <TableCell>
                      <Badge
                        variant={peer.status === 'connected' ? 'default' : 'outline'}
                        className={
                          peer.status === 'connected' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'border-amber-200 text-amber-700'
                        }
                      >
                        {peer.status === 'connected' ? 'Connected' : 'Idle'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {peer.status === 'connected' ? (
                        <span>{peer.routesReceived} in / {peer.routesAdded} used</span>
                      ) : (
                        <span>-</span>
                      )}
                    </TableCell>
                    <TableCell>{peer.uptime}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" disabled={!isBgpEnabled}>
                          <Network className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={!isBgpEnabled}>
                          <ServerCrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Imported Routes */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">BGP Route Statistics</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Imported Routes</div>
              <div className="text-2xl font-semibold">273</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Active Routes</div>
              <div className="text-2xl font-semibold">233</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Advertised Routes</div>
              <div className="text-2xl font-semibold">42</div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-2">Route Distribution by Peer</div>
          <div className="w-full bg-muted rounded-lg h-10 mb-6 overflow-hidden flex">
            <div 
              className="bg-blue-500 h-full flex items-center justify-center text-white text-xs" 
              style={{ width: '36%' }}
            >
              ISP Primary (36%)
            </div>
            <div 
              className="bg-green-500 h-full flex items-center justify-center text-white text-xs"
              style={{ width: '36%' }}
            >
              ISP Secondary (36%)
            </div>
            <div 
              className="bg-amber-500 h-full flex items-center justify-center text-white text-xs"
              style={{ width: '13%' }}
            >
              DC (13%)
            </div>
            <div 
              className="bg-purple-500 h-full flex items-center justify-center text-white text-xs"
              style={{ width: '15%' }}
            >
              AWS (15%)
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" disabled={!isBgpEnabled}>
              View All Routes
            </Button>
            <Button disabled={!isBgpEnabled}>
              Export Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BGPEngineConfig;
