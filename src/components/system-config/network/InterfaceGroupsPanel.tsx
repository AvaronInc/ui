
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  CheckCircle, 
  XCircle, 
  Layers, 
  Pencil, 
  Trash2, 
  Plus, 
  Tag,
  Network,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

interface InterfaceGroupsPanelProps {
  bridgeGroups: any[];
  interfaces: any[];
  onAddGroup: (groupData: any) => void;
}

const InterfaceGroupsPanel: React.FC<InterfaceGroupsPanelProps> = ({ 
  bridgeGroups, 
  interfaces,
  onAddGroup 
}) => {
  const [expandAddGroup, setExpandAddGroup] = useState(false);
  const [formState, setFormState] = useState({
    name: 'br0',
    ipAddress: '',
    ipMethod: 'static',
    netmask: '',
    members: [] as string[],
    role: '',
    enableVLAN: false,
    vlanId: '',
    enableIpv6: false,
    ipv6Address: '',
    ipv6PrefixLength: '64',
  });

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGroup = {
      name: formState.name,
      ipAddress: formState.ipMethod === 'dhcp' ? 'DHCP' : formState.ipAddress,
      ipv6Address: formState.enableIpv6 ? `${formState.ipv6Address}/${formState.ipv6PrefixLength}` : '-',
      members: formState.members,
      status: 'up',
      role: formState.role,
      vlans: formState.enableVLAN ? [{ id: Number(formState.vlanId), name: `${formState.name}.${formState.vlanId}`, role: formState.role }] : [],
    };
    
    onAddGroup(newGroup);
    setExpandAddGroup(false);
    setFormState({
      name: `br${bridgeGroups.length + 1}`,
      ipAddress: '',
      ipMethod: 'static',
      netmask: '',
      members: [],
      role: '',
      enableVLAN: false,
      vlanId: '',
      enableIpv6: false,
      ipv6Address: '',
      ipv6PrefixLength: '64',
    });
  };

  const handleDelete = (id: string) => {
    toast.success(`Bridge group ${id} deleted`);
  };

  const availableInterfaces = interfaces.filter(iface => 
    (iface.type === 'physical' || iface.type === 'virtual') && iface.status === 'up'
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'WAN':
        return <Globe className="h-4 w-4 text-red-500" />;
      case 'LAN':
        return <Network className="h-4 w-4 text-blue-500" />;
      case 'Management':
        return <Network className="h-4 w-4 text-green-500" />;
      case 'IoT':
        return <Network className="h-4 w-4 text-emerald-500" />;
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
              <CardTitle className="text-2xl">Interface Groups</CardTitle>
              <CardDescription>
                Create logical bridges and interface groupings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Member Interfaces</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>VLANs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bridgeGroups.length > 0 ? (
                  bridgeGroups.map((group, index) => (
                    <TableRow key={group.id || index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Layers className="mr-2 h-4 w-4" />
                          {group.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {group.ipAddress}
                          {group.ipv6Address && group.ipv6Address !== '-' && (
                            <div className="mt-1">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Globe className="mr-1 h-3 w-3 inline" />
                                IPv6
                              </Badge>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {group.members.map((member: string, idx: number) => (
                            <Badge key={idx} variant="outline">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${group.status === 'up' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                        >
                          {group.status === 'up' ? 
                            <CheckCircle className="mr-1 h-3 w-3 inline" /> : 
                            <XCircle className="mr-1 h-3 w-3 inline" />
                          }
                          {group.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {group.role && (
                          <Badge className="flex items-center space-x-1" variant="outline">
                            {getRoleIcon(group.role)}
                            <span>{group.role}</span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {group.vlans && group.vlans.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {group.vlans.map((vlan: any, idx: number) => (
                              <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                <Tag className="mr-1 h-3 w-3 inline" />
                                VLAN {vlan.id}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(group.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No interface groups defined
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setExpandAddGroup(!expandAddGroup)}
              className="w-full flex items-center justify-center"
            >
              {expandAddGroup ? (
                <>
                  Hide Add Group Form
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Interface Group
                </>
              )}
            </Button>
          </div>

          {expandAddGroup && (
            <div className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name</Label>
                          <Input
                            id="group-name"
                            value={formState.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="e.g. br0"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Interface Role</Label>
                          <Select
                            value={formState.role}
                            onValueChange={(value) => handleChange('role', value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LAN">LAN</SelectItem>
                              <SelectItem value="IoT">IoT</SelectItem>
                              <SelectItem value="Guest">Guest</SelectItem>
                              <SelectItem value="Transit">Transit</SelectItem>
                              <SelectItem value="Management">Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Member Interfaces</Label>
                        <div className="border rounded-md p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {availableInterfaces.map((iface) => (
                              <div key={iface.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`member-${iface.id}`}
                                  value={iface.name}
                                  checked={formState.members.includes(iface.name)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    const members = [...formState.members];
                                    if (checked && !members.includes(iface.name)) {
                                      members.push(iface.name);
                                    } else if (!checked) {
                                      const index = members.indexOf(iface.name);
                                      if (index !== -1) members.splice(index, 1);
                                    }
                                    handleChange('members', members);
                                  }}
                                  className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor={`member-${iface.id}`}>{iface.name}</Label>
                              </div>
                            ))}
                          </div>
                          
                          {availableInterfaces.length === 0 && (
                            <p className="text-sm text-muted-foreground">No available interfaces found</p>
                          )}
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible defaultValue="ipv4" className="mt-2">
                        <AccordionItem value="ipv4">
                          <AccordionTrigger>IP Configuration</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="ip-method">IP Assignment</Label>
                                  <Select
                                    value={formState.ipMethod}
                                    onValueChange={(value) => handleChange('ipMethod', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="static">Static IP</SelectItem>
                                      <SelectItem value="dhcp">DHCP</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              {formState.ipMethod === 'static' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="ip-address">IP Address</Label>
                                    <Input
                                      id="ip-address"
                                      value={formState.ipAddress}
                                      onChange={(e) => handleChange('ipAddress', e.target.value)}
                                      placeholder="e.g. 192.168.1.1"
                                      required={formState.ipMethod === 'static'}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="netmask">Subnet Mask</Label>
                                    <Input
                                      id="netmask"
                                      value={formState.netmask}
                                      onChange={(e) => handleChange('netmask', e.target.value)}
                                      placeholder="e.g. 255.255.255.0 or /24"
                                      required={formState.ipMethod === 'static'}
                                    />
                                  </div>
                                </div>
                              )}
                              
                              <div className="mt-3 pt-3 border-t">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="enable-ipv6-group"
                                    checked={formState.enableIpv6}
                                    onCheckedChange={(checked) => handleChange('enableIpv6', checked)}
                                  />
                                  <Label htmlFor="enable-ipv6-group">Enable IPv6</Label>
                                </div>
                                
                                {formState.enableIpv6 && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="ipv6-address-group">IPv6 Address</Label>
                                      <Input
                                        id="ipv6-address-group"
                                        value={formState.ipv6Address}
                                        onChange={(e) => handleChange('ipv6Address', e.target.value)}
                                        placeholder="e.g. 2001:db8::1"
                                        required={formState.enableIpv6}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="ipv6-prefix-group">Prefix Length</Label>
                                      <Select
                                        value={formState.ipv6PrefixLength}
                                        onValueChange={(value) => handleChange('ipv6PrefixLength', value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="128">/128</SelectItem>
                                          <SelectItem value="64">/64</SelectItem>
                                          <SelectItem value="56">/56</SelectItem>
                                          <SelectItem value="48">/48</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="vlan">
                          <AccordionTrigger>VLAN Configuration</AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4 pb-2">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="enable-vlan-group"
                                  checked={formState.enableVLAN}
                                  onCheckedChange={(checked) => handleChange('enableVLAN', checked)}
                                />
                                <Label htmlFor="enable-vlan-group">Enable VLAN Tagging</Label>
                              </div>
                              
                              {formState.enableVLAN && (
                                <div className="mt-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="vlan-id-group">VLAN ID (1-4094)</Label>
                                    <Input
                                      id="vlan-id-group"
                                      type="number"
                                      min="1"
                                      max="4094"
                                      value={formState.vlanId}
                                      onChange={(e) => handleChange('vlanId', e.target.value)}
                                      placeholder="e.g. 10"
                                      required={formState.enableVLAN}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="mt-6 flex justify-end">
                        <Button type="submit">Add Interface Group</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Group Configuration Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex space-x-3">
                  <Layers className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Bridge Mode</h4>
                    <p className="text-muted-foreground">Interface groups operate in bridge mode, allowing traffic to flow between member interfaces as if they were a single interface.</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Tag className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">VLAN Support</h4>
                    <p className="text-muted-foreground">VLANs can be created on bridge interfaces to segment traffic across the same physical ports.</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Globe className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">IP Assignment</h4>
                    <p className="text-muted-foreground">Each bridge can have its own IPv4 and IPv6 addresses for management and routing purposes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterfaceGroupsPanel;
