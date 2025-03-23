
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
  LineChart
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import InterfaceStatsDialog from '../network/InterfaceStatsDialog';
import AddInterfaceForm from '../network/AddInterfaceForm';

// Mock data for interface list
const mockInterfaces = [
  {
    id: '1',
    name: 'eth0',
    type: 'physical',
    ipAddress: '192.168.1.1/24',
    macAddress: '00:1A:2B:3C:4D:5E',
    status: 'up',
    speed: '1 Gbps',
    duplex: 'full',
    role: 'WAN',
  },
  {
    id: '2',
    name: 'eth1',
    type: 'physical',
    ipAddress: '10.0.0.1/24',
    macAddress: '00:1A:2B:3C:4D:5F',
    status: 'up',
    speed: '1 Gbps',
    duplex: 'full',
    role: 'LAN',
  },
  {
    id: '3',
    name: 'vpp0',
    type: 'virtual',
    ipAddress: '172.16.0.1/24',
    macAddress: '-',
    status: 'up',
    speed: '-',
    duplex: '-',
    role: 'SD-WAN',
  },
  {
    id: '4',
    name: 'bond0',
    type: 'bonded',
    ipAddress: '192.168.10.1/24',
    macAddress: '00:1A:2B:3C:4D:60',
    status: 'up',
    speed: '2 Gbps',
    duplex: 'full',
    role: 'Management',
  },
  {
    id: '5',
    name: 'eth2',
    type: 'physical',
    ipAddress: '-',
    macAddress: '00:1A:2B:3C:4D:61',
    status: 'down',
    speed: '-',
    duplex: '-',
    role: '-',
  },
];

const NetworkSettingsSection: React.FC = () => {
  const [interfaces, setInterfaces] = useState(mockInterfaces);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [expandAddInterface, setExpandAddInterface] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState<any | null>(null);

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
      default:
        return <Network className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
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
          <div className="mb-6 flex items-center space-x-4">
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
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interface Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>IP Address</TableHead>
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
                      <TableCell className="font-medium">{iface.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(iface.type)}
                          <span className="ml-2 capitalize">{iface.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{iface.ipAddress}</TableCell>
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
                        {iface.role !== '-' && (
                          <Badge className="flex items-center space-x-1" variant="outline">
                            {getRoleIcon(iface.role)}
                            <span>{iface.role}</span>
                          </Badge>
                        )}
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
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(iface.id)}
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

      <Card>
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
    </div>
  );
};

export default NetworkSettingsSection;
