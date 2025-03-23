
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  Wifi, 
  Cable, 
  Link, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Pencil, 
  Trash2, 
  Plus, 
  Filter, 
  RefreshCw,
  AlertTriangle,
  Globe,
  Shield,
  ServerCog,
  ChevronDown,
  ChevronUp,
  LineChart,
  Tag,
  Layers,
  Cloud
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import InterfaceStatsDialog from '../network/InterfaceStatsDialog';
import AddInterfaceForm from '../network/AddInterfaceForm';
import InterfaceGroupsPanel from '../network/InterfaceGroupsPanel';

// Enhanced mock data for interface list with VLAN and IPv6 information
const mockInterfaces = [
  {
    id: '1',
    name: 'eth0',
    type: 'physical',
    ipAddress: '192.168.1.1/24',
    ipv6Address: '2001:db8::1/64',
    macAddress: '00:1A:2B:3C:4D:5E',
    status: 'up',
    speed: '1 Gbps',
    duplex: 'full',
    role: 'WAN',
    vlans: [],
    isSDNControlled: false,
  },
  {
    id: '2',
    name: 'eth1',
    type: 'physical',
    ipAddress: '10.0.0.1/24',
    ipv6Address: '2001:db8:1::1/64',
    macAddress: '00:1A:2B:3C:4D:5F',
    status: 'up',
    speed: '1 Gbps',
    duplex: 'full',
    role: 'LAN',
    vlans: [
      { id: 10, name: 'eth1.10', role: 'Guest' },
      { id: 20, name: 'eth1.20', role: 'IoT' }
    ],
    isSDNControlled: false,
  },
  {
    id: '3',
    name: 'vpp0',
    type: 'virtual',
    ipAddress: '172.16.0.1/24',
    ipv6Address: '-',
    macAddress: '-',
    status: 'up',
    speed: '-',
    duplex: '-',
    role: 'SD-WAN',
    vlans: [],
    isSDNControlled: true,
    sdnMeta: {
      fabricName: 'SD-WAN Fabric',
      segment: 'overlay-1',
      vxlanId: '10001'
    }
  },
  {
    id: '4',
    name: 'bond0',
    type: 'bonded',
    ipAddress: '192.168.10.1/24',
    ipv6Address: '2001:db8:2::1/64',
    macAddress: '00:1A:2B:3C:4D:60',
    status: 'up',
    speed: '2 Gbps',
    duplex: 'full',
    role: 'Management',
    vlans: [],
    isSDNControlled: false,
  },
  {
    id: '5',
    name: 'br0',
    type: 'bridge',
    ipAddress: '10.10.10.1/24',
    ipv6Address: '-',
    macAddress: '00:1A:2B:3C:4D:62',
    status: 'up',
    speed: '-',
    duplex: '-',
    role: 'LAN',
    members: ['eth3', 'eth4'],
    vlans: [],
    isSDNControlled: false,
  },
  {
    id: '6',
    name: 'eth1.10',
    type: 'vlan',
    parentInterface: 'eth1',
    vlanId: 10,
    ipAddress: '10.10.0.1/24',
    ipv6Address: '-',
    macAddress: '00:1A:2B:3C:4D:5F',
    status: 'up',
    speed: '1 Gbps',
    duplex: 'full',
    role: 'Guest',
    isSDNControlled: false,
  },
  {
    id: '7',
    name: 'eth1.20',
    type: 'vlan',
    parentInterface: 'eth1',
    vlanId: 20,
    ipAddress: '10.20.0.1/24',
    ipv6Address: '-',
    macAddress: '00:1A:2B:3C:4D:5F',
    status: 'up',
    speed: '1 Gbps',
    duplex: 'full',
    role: 'IoT',
    isSDNControlled: false,
  },
  {
    id: '8',
    name: 'eth2',
    type: 'physical',
    ipAddress: '-',
    ipv6Address: '-',
    macAddress: '00:1A:2B:3C:4D:61',
    status: 'down',
    speed: '-',
    duplex: '-',
    role: '-',
    vlans: [],
    isSDNControlled: false,
  },
];

// Mock data for bridge groups
const mockBridgeGroups = [
  {
    id: '1',
    name: 'br0',
    ipAddress: '10.10.10.1/24',
    ipv6Address: '-',
    members: ['eth3', 'eth4'],
    status: 'up',
    role: 'LAN',
    vlans: []
  },
  {
    id: '2',
    name: 'br-iot',
    ipAddress: '10.20.20.1/24',
    ipv6Address: '2001:db8:3::1/64',
    members: ['eth5', 'eth6'],
    status: 'up',
    role: 'IoT',
    vlans: [
      { id: 30, name: 'br-iot.30', role: 'IoT-Cameras' },
    ]
  }
];

const NetworkSettingsSection: React.FC = () => {
  const [interfaces, setInterfaces] = useState(mockInterfaces);
  const [bridgeGroups, setBridgeGroups] = useState(mockBridgeGroups);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [expandAddInterface, setExpandAddInterface] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('interfaces');
  const [sdnOverrideEnabled, setSDNOverrideEnabled] = useState(false);

  // Filtered interfaces based on active filters
  const filteredInterfaces = interfaces.filter(iface => {
    if (typeFilter && iface.type !== typeFilter) return false;
    if (statusFilter && iface.status !== statusFilter) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    // Show confirmation dialog in real implementation
    setInterfaces(interfaces.filter(iface => iface.id !== id));
    toast.success('Interface deleted successfully');
  };
  
  const handleAddInterface = (newInterface: any) => {
    setInterfaces([...interfaces, { 
      id: (interfaces.length + 1).toString(),
      ...newInterface,
    }]);
    setExpandAddInterface(false);
    toast.success(`Interface ${newInterface.name} added successfully`);
  };
  
  const handleAddGroup = (newGroup: any) => {
    setBridgeGroups([...bridgeGroups, {
      id: (bridgeGroups.length + 1).toString(),
      ...newGroup,
    }]);
    toast.success(`Interface group ${newGroup.name} added successfully`);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'WAN':
        return <Globe className="h-4 w-4 text-red-500" />;
      case 'LAN':
        return <Network className="h-4 w-4 text-blue-500" />;
      case 'Management':
        return <ServerCog className="h-4 w-4 text-green-500" />;
      case 'SD-WAN':
        return <Shield className="h-4 w-4 text-purple-500" />;
      case 'Guest':
        return <Network className="h-4 w-4 text-amber-500" />;
      case 'IoT':
        return <Network className="h-4 w-4 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'physical':
        return <Cable className="h-4 w-4" />;
      case 'virtual':
        return <Wifi className="h-4 w-4" />;
      case 'bonded':
        return <Link className="h-4 w-4" />;
      case 'bridge':
        return <Layers className="h-4 w-4" />;
      case 'vlan':
        return <Tag className="h-4 w-4" />;
      default:
        return <Network className="h-4 w-4" />;
    }
  };

  const renderIPv6Badge = (ipv6: string) => {
    if (ipv6 && ipv6 !== '-') {
      return (
        <div className="mt-1">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Globe className="mr-1 h-3 w-3 inline" />
            IPv6
          </Badge>
        </div>
      );
    }
    return null;
  };

  const renderVLANs = (vlans: any[]) => {
    if (vlans && vlans.length > 0) {
      return (
        <div className="mt-1 flex flex-wrap gap-1">
          {vlans.map((vlan, idx) => (
            <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <Tag className="mr-1 h-3 w-3 inline" />
              VLAN {vlan.id}
            </Badge>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="interfaces">Network Interfaces</TabsTrigger>
          <TabsTrigger value="groups">Interface Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interfaces">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Network Interfaces</CardTitle>
                  <CardDescription>
                    View and manage all physical, virtual, and bonded network interfaces
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={() => {}} className="ml-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="type-filter">Filter by Type:</Label>
                  <Select 
                    onValueChange={(value) => setTypeFilter(value === "all" ? null : value)}
                    defaultValue="all"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="bonded">Bonded</SelectItem>
                      <SelectItem value="bridge">Bridge</SelectItem>
                      <SelectItem value="vlan">VLAN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="status-filter">Filter by Status:</Label>
                  <Select 
                    onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                    defaultValue="all"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="up">Up</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* SDN Override Toggle */}
                <div className="flex items-center space-x-2 ml-auto">
                  <Switch
                    id="sdn-override"
                    checked={sdnOverrideEnabled}
                    onCheckedChange={setSDNOverrideEnabled}
                  />
                  <Label htmlFor="sdn-override">Enable SDN Override</Label>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Interface Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>IP Addresses</TableHead>
                      <TableHead>MAC Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Speed/Duplex</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterfaces.length > 0 ? (
                      filteredInterfaces.map((iface) => (
                        <TableRow key={iface.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="flex items-center">
                                {iface.name}
                                {iface.isSDNControlled && (
                                  <Badge className="ml-2" variant="outline">
                                    <Cloud className="mr-1 h-3 w-3" />SDN
                                  </Badge>
                                )}
                              </span>
                              {iface.isSDNControlled && iface.sdnMeta && (
                                <span className="text-xs text-muted-foreground mt-1">
                                  Fabric: {iface.sdnMeta.fabricName}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getTypeIcon(iface.type)}
                              <span className="ml-2 capitalize">{iface.type}</span>
                              {iface.type === 'vlan' && (
                                <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">
                                  ID {iface.vlanId}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {iface.ipAddress}
                              {renderIPv6Badge(iface.ipv6Address)}
                            </div>
                          </TableCell>
                          <TableCell>{iface.macAddress}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`${iface.status === 'up' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                            >
                              {iface.status === 'up' ? 
                                <CheckCircle className="mr-1 h-3 w-3 inline" /> : 
                                <XCircle className="mr-1 h-3 w-3 inline" />
                              }
                              {iface.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{iface.speed} {iface.duplex !== '-' ? `/ ${iface.duplex}` : ''}</TableCell>
                          <TableCell>
                            <div>
                              {iface.role !== '-' && (
                                <Badge className="flex items-center space-x-1" variant="outline">
                                  {getRoleIcon(iface.role)}
                                  <span>{iface.role}</span>
                                </Badge>
                              )}
                              {renderVLANs(iface.vlans || [])}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setSelectedInterface(iface)}
                                    disabled={iface.status === 'down'}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <InterfaceStatsDialog 
                                  interfaceData={selectedInterface} 
                                />
                              </Dialog>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                disabled={iface.isSDNControlled && !sdnOverrideEnabled}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDelete(iface.id)}
                                disabled={iface.isSDNControlled && !sdnOverrideEnabled}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6">
                          No interfaces found matching the filter criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setExpandAddInterface(!expandAddInterface)}
                  className="w-full flex items-center justify-center"
                >
                  {expandAddInterface ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Hide Add Interface Form
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Interface
                    </>
                  )}
                </Button>
              </div>

              {expandAddInterface && (
                <div className="mt-4">
                  <AddInterfaceForm onAddInterface={handleAddInterface} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Interface Alerts & Conflict Checks</CardTitle>
              <CardDescription>
                System detected warnings and potential conflicts between network interfaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start p-3 border rounded-md bg-amber-50 text-amber-900">
                  <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <div>
                    <p className="font-medium">Subnet Conflict Detected</p>
                    <p className="text-sm">Interfaces eth0 (192.168.1.1/24) and eth3 (192.168.1.10/24) are assigned to the same subnet.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border rounded-md bg-amber-50 text-amber-900">
                  <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <div>
                    <p className="font-medium">Duplicate VLAN ID Detected</p>
                    <p className="text-sm">VLAN ID 10 is configured on both eth1 and eth2 interfaces.</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Default Interface Assignment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-route">Default Route</Label>
                      <Select defaultValue="eth0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select interface" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eth0">eth0 (WAN)</SelectItem>
                          <SelectItem value="eth1">eth1 (LAN)</SelectItem>
                          <SelectItem value="bond0">bond0 (Management)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mgmt-access">Management Access</Label>
                      <Select defaultValue="bond0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select interface" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eth0">eth0 (WAN)</SelectItem>
                          <SelectItem value="eth1">eth1 (LAN)</SelectItem>
                          <SelectItem value="bond0">bond0 (Management)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="failover-priority">Failover Priority</Label>
                      <Select defaultValue="eth0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select interface" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eth0">eth0 (WAN)</SelectItem>
                          <SelectItem value="vpp0">vpp0 (SD-WAN)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="groups">
          <InterfaceGroupsPanel 
            bridgeGroups={bridgeGroups}
            interfaces={interfaces}
            onAddGroup={handleAddGroup}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkSettingsSection;
