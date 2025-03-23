import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Cable, Wifi, Link, Tag, Globe } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AddInterfaceFormProps {
  onAddInterface: (interfaceData: any) => void;
}

// Mock data for physical interfaces
const availablePhysicalInterfaces = [
  { id: 'eth2', name: 'eth2', description: 'Intel E810-CQDA2 - 100GbE' },
  { id: 'eth3', name: 'eth3', description: 'Intel E810-CQDA2 - 100GbE' },
  { id: 'eth4', name: 'eth4', description: 'Intel E810-CQDA2 - 100GbE' },
  { id: 'eth5', name: 'eth5', description: 'Intel E810-CQDA2 - 100GbE' },
];

const roleOptions = [
  { value: 'WAN', label: 'WAN' },
  { value: 'LAN', label: 'LAN' },
  { value: 'Management', label: 'Management' },
  { value: 'SD-WAN', label: 'SD-WAN' },
  { value: 'DMZ', label: 'DMZ' },
  { value: 'Guest', label: 'Guest' },
  { value: 'IoT', label: 'IoT' },
];

// Define an interface for our network interface data structure
interface NetworkInterface {
  name: string;
  type: string;
  ipAddress: string;
  ipv6Address: string;
  macAddress: string;
  status: string;
  speed: string;
  duplex: string;
  role: string;
  vlans: any[];
  isSDNControlled: boolean;
  vlanId?: number; // Added optional vlanId property
  parentInterface?: string; // Added optional parentInterface property
}

const AddInterfaceForm: React.FC<AddInterfaceFormProps> = ({ onAddInterface }) => {
  const [interfaceType, setInterfaceType] = useState('physical');
  const [formState, setFormState] = useState({
    // Physical
    physicalInterface: '',
    // Virtual
    virtualName: '',
    virtualType: 'memif',
    bindToInterface: '',
    // Bonded
    bondName: 'bond0',
    bondMode: 'active-backup',
    bondMembers: [] as string[],
    // VLAN
    enableVLAN: false,
    vlanId: '',
    vlanRole: 'access',
    parentInterface: '',
    // Common
    ipAddress: '',
    ipMethod: 'static',
    netmask: '',
    gateway: '',
    dns1: '',
    dns2: '',
    role: '',
    mtu: '1500',
    // IPv6
    enableIpv6: false,
    ipv6Method: 'static',
    ipv6Address: '',
    ipv6PrefixLength: '64',
    ipv6Gateway: '',
    ipv6Dns1: '',
    ipv6Dns2: '',
    useIpv4Dns: true,
    // Other options
    enableNat: false,
  });

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let newInterface: NetworkInterface = {
      name: '',
      type: interfaceType,
      ipAddress: formState.ipMethod === 'dhcp' ? 'DHCP' : formState.ipAddress,
      ipv6Address: formState.enableIpv6 
        ? (formState.ipv6Method === 'dhcp' 
          ? 'DHCPv6' 
          : formState.ipv6Method === 'slaac' 
            ? 'SLAAC' 
            : `${formState.ipv6Address}/${formState.ipv6PrefixLength}`) 
        : '-',
      macAddress: '00:1A:2B:3C:4D:65', // Would be dynamically determined in real implementation
      status: 'up',
      speed: interfaceType === 'physical' ? '1 Gbps' : '-',
      duplex: interfaceType === 'physical' ? 'full' : '-',
      role: formState.role,
      vlans: [],
      isSDNControlled: false,
    };
    
    // Set the name based on interface type
    if (interfaceType === 'physical') {
      newInterface.name = formState.physicalInterface;
    } else if (interfaceType === 'virtual') {
      newInterface.name = formState.virtualName;
    } else if (interfaceType === 'bonded') {
      newInterface.name = formState.bondName;
    } else if (interfaceType === 'vlan') {
      newInterface.name = `${formState.parentInterface}.${formState.vlanId}`;
      newInterface.type = 'vlan';
      newInterface.vlanId = Number(formState.vlanId);
      newInterface.parentInterface = formState.parentInterface;
    }
    
    onAddInterface(newInterface);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs value={interfaceType} onValueChange={setInterfaceType} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="physical" className="flex items-center">
              <Cable className="mr-2 h-4 w-4" />
              Physical
            </TabsTrigger>
            <TabsTrigger value="virtual" className="flex items-center">
              <Wifi className="mr-2 h-4 w-4" />
              Virtual
            </TabsTrigger>
            <TabsTrigger value="bonded" className="flex items-center">
              <Link className="mr-2 h-4 w-4" />
              Bonded
            </TabsTrigger>
            <TabsTrigger value="vlan" className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              VLAN
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="physical">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="physical-interface">Physical Interface</Label>
                    <Select
                      value={formState.physicalInterface}
                      onValueChange={(value) => handleChange('physicalInterface', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a physical interface" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePhysicalInterfaces.map((iface) => (
                          <SelectItem key={iface.id} value={iface.id}>
                            {iface.name} ({iface.description})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enable-vlan-tag"
                      checked={formState.enableVLAN}
                      onCheckedChange={(checked) => handleChange('enableVLAN', checked)}
                    />
                    <Label htmlFor="enable-vlan-tag">Enable VLAN Tagging</Label>
                  </div>
                  
                  {formState.enableVLAN && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="vlan-id">VLAN ID (1-4094)</Label>
                        <Input
                          id="vlan-id"
                          type="number"
                          min="1"
                          max="4094"
                          value={formState.vlanId}
                          onChange={(e) => handleChange('vlanId', e.target.value)}
                          placeholder="e.g. 10"
                          required={formState.enableVLAN}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vlan-role">VLAN Role</Label>
                        <Select
                          value={formState.vlanRole}
                          onValueChange={(value) => handleChange('vlanRole', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="access">Access</SelectItem>
                            <SelectItem value="trunk">Trunk</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="virtual">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="virtual-name">Interface Name</Label>
                    <Input
                      id="virtual-name"
                      value={formState.virtualName}
                      onChange={(e) => handleChange('virtualName', e.target.value)}
                      placeholder="e.g. vpp0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="virtual-type">Interface Type</Label>
                    <Select
                      value={formState.virtualType}
                      onValueChange={(value) => handleChange('virtualType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="memif">memif</SelectItem>
                        <SelectItem value="vhost-user">vhost-user</SelectItem>
                        <SelectItem value="tap">tap</SelectItem>
                        <SelectItem value="loopback">loopback</SelectItem>
                        <SelectItem value="vxlan">vxlan</SelectItem>
                        <SelectItem value="gre">gre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bind-to-interface">Bind to Physical Interface</Label>
                  <Select
                    value={formState.bindToInterface}
                    onValueChange={(value) => handleChange('bindToInterface', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an interface" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth0">eth0</SelectItem>
                      <SelectItem value="eth1">eth1</SelectItem>
                      <SelectItem value="bond0">bond0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable-nat"
                    checked={formState.enableNat}
                    onCheckedChange={(checked) => handleChange('enableNat', checked)}
                  />
                  <Label htmlFor="enable-nat">Enable NAT</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bonded">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bond-name">Bond Interface Name</Label>
                    <Input
                      id="bond-name"
                      value={formState.bondName}
                      onChange={(e) => handleChange('bondName', e.target.value)}
                      placeholder="e.g. bond0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bond-mode">Bond Mode</Label>
                    <Select
                      value={formState.bondMode}
                      onValueChange={(value) => handleChange('bondMode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="active-backup">Active-Backup</SelectItem>
                        <SelectItem value="balance-xor">Balance XOR</SelectItem>
                        <SelectItem value="broadcast">Broadcast</SelectItem>
                        <SelectItem value="802.3ad">LACP (802.3ad)</SelectItem>
                        <SelectItem value="balance-tlb">Adaptive TLB</SelectItem>
                        <SelectItem value="balance-alb">Adaptive ALB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Member Interfaces</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availablePhysicalInterfaces.map((iface) => (
                      <div key={iface.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`member-${iface.id}`}
                          value={iface.id}
                          checked={formState.bondMembers.includes(iface.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const members = [...formState.bondMembers];
                            if (checked && !members.includes(iface.id)) {
                              members.push(iface.id);
                            } else if (!checked) {
                              const index = members.indexOf(iface.id);
                              if (index !== -1) members.splice(index, 1);
                            }
                            handleChange('bondMembers', members);
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`member-${iface.id}`}>{iface.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enable-vlan-tag-bond"
                      checked={formState.enableVLAN}
                      onCheckedChange={(checked) => handleChange('enableVLAN', checked)}
                    />
                    <Label htmlFor="enable-vlan-tag-bond">Enable VLAN Tagging</Label>
                  </div>
                  
                  {formState.enableVLAN && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="vlan-id-bond">VLAN ID (1-4094)</Label>
                        <Input
                          id="vlan-id-bond"
                          type="number"
                          min="1"
                          max="4094"
                          value={formState.vlanId}
                          onChange={(e) => handleChange('vlanId', e.target.value)}
                          placeholder="e.g. 10"
                          required={formState.enableVLAN}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vlan-role-bond">VLAN Role</Label>
                        <Select
                          value={formState.vlanRole}
                          onValueChange={(value) => handleChange('vlanRole', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="access">Access</SelectItem>
                            <SelectItem value="trunk">Trunk</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="vlan">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent-interface">Parent Interface</Label>
                    <Select
                      value={formState.parentInterface}
                      onValueChange={(value) => handleChange('parentInterface', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent interface" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eth0">eth0</SelectItem>
                        <SelectItem value="eth1">eth1</SelectItem>
                        <SelectItem value="bond0">bond0</SelectItem>
                        <SelectItem value="br0">br0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vlan-id-direct">VLAN ID (1-4094)</Label>
                    <Input
                      id="vlan-id-direct"
                      type="number"
                      min="1"
                      max="4094"
                      value={formState.vlanId}
                      onChange={(e) => handleChange('vlanId', e.target.value)}
                      placeholder="e.g. 10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vlan-role-direct">VLAN Mode</Label>
                  <Select
                    value={formState.vlanRole}
                    onValueChange={(value) => handleChange('vlanRole', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="access">Access</SelectItem>
                      <SelectItem value="trunk">Trunk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {/* Common settings for all interface types */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Network Configuration</h3>
              
              <Accordion type="single" collapsible defaultValue="ipv4" className="mt-2">
                <AccordionItem value="ipv4">
                  <AccordionTrigger>IPv4 Configuration</AccordionTrigger>
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
                              {roleOptions.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                              ))}
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
                          <div className="space-y-2">
                            <Label htmlFor="gateway">Default Gateway</Label>
                            <Input
                              id="gateway"
                              value={formState.gateway}
                              onChange={(e) => handleChange('gateway', e.target.value)}
                              placeholder="e.g. 192.168.1.254"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mtu">MTU</Label>
                            <Input
                              id="mtu"
                              value={formState.mtu}
                              onChange={(e) => handleChange('mtu', e.target.value)}
                              placeholder="e.g. 1500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dns1">Primary DNS</Label>
                            <Input
                              id="dns1"
                              value={formState.dns1}
                              onChange={(e) => handleChange('dns1', e.target.value)}
                              placeholder="e.g. 8.8.8.8"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dns2">Secondary DNS</Label>
                            <Input
                              id="dns2"
                              value={formState.dns2}
                              onChange={(e) => handleChange('dns2', e.target.value)}
                              placeholder="e.g. 8.8.4.4"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ipv6">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      IPv6 Configuration
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 pb-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="enable-ipv6"
                          checked={formState.enableIpv6}
                          onCheckedChange={(checked) => handleChange('enableIpv6', checked)}
                        />
                        <Label htmlFor="enable-ipv6">Enable IPv6</Label>
                      </div>
                    </div>
                    
                    {formState.enableIpv6 && (
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ipv6-method">IPv6 Assignment</Label>
                            <Select
                              value={formState.ipv6Method}
                              onValueChange={(value) => handleChange('ipv6Method', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="static">Static IPv6</SelectItem>
                                <SelectItem value="dhcp">DHCPv6</SelectItem>
                                <SelectItem value="slaac">SLAAC (Stateless Autoconfig)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {formState.ipv6Method === 'static' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ipv6-address">IPv6 Address</Label>
                              <Input
                                id="ipv6-address"
                                value={formState.ipv6Address}
                                onChange={(e) => handleChange('ipv6Address', e.target.value)}
                                placeholder="e.g. 2001:db8::1"
                                required={formState.ipv6Method === 'static'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ipv6-prefix">Prefix Length</Label>
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
                            <div className="space-y-2">
                              <Label htmlFor="ipv6-gateway">IPv6 Gateway</Label>
                              <Input
                                id="ipv6-gateway"
                                value={formState.ipv6Gateway}
                                onChange={(e) => handleChange('ipv6Gateway', e.target.value)}
                                placeholder="e.g. 2001:db8::1:1"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 mb-4">
                                <Switch
                                  id="use-ipv4-dns"
                                  checked={formState.useIpv4Dns}
                                  onCheckedChange={(checked) => handleChange('useIpv4Dns', checked)}
                                />
                                <Label htmlFor="use-ipv4-dns">Use same DNS servers as IPv4</Label>
                              </div>
                              
                              {!formState.useIpv4Dns && (
                                <>
                                  <Label htmlFor="ipv6-dns1">IPv6 Primary DNS</Label>
                                  <Input
                                    id="ipv6-dns1"
                                    value={formState.ipv6Dns1}
                                    onChange={(e) => handleChange('ipv6Dns1', e.target.value)}
                                    placeholder="e.g. 2001:4860:4860::8888"
                                  />
                                </>
                              )}
                            </div>
                            
                            {!formState.useIpv4Dns && (
                              <div className="space-y-2">
                                <Label htmlFor="ipv6-dns2">IPv6 Secondary DNS</Label>
                                <Input
                                  id="ipv6-dns2"
                                  value={formState.ipv6Dns2}
                                  onChange={(e) => handleChange('ipv6Dns2', e.target.value)}
                                  placeholder="e.g. 2001:4860:4860::8844"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button type="submit">Add Interface</Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AddInterfaceForm;
