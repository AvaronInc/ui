
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Network, Repeat, Lock, Globe, Plus, Share2, ServerCrash, ArrowRightLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import VirtualNetworksTable from '../components/VirtualNetworksTable';
import RoutingPoliciesTable from '../components/RoutingPoliciesTable';
import WireGuardMeshConfig from '../components/WireGuardMeshConfig';
import BGPEngineConfig from '../components/BGPEngineConfig';

const VirtualNetworksTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState("vlans");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Virtual Networks & Routing</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Network
        </Button>
      </div>
      
      <Tabs defaultValue="vlans" value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="vlans" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>VLANs & VXLANs</span>
          </TabsTrigger>
          <TabsTrigger value="routing" className="flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            <span>Routing Policies</span>
          </TabsTrigger>
          <TabsTrigger value="wireguard" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>WireGuard Mesh</span>
          </TabsTrigger>
          <TabsTrigger value="bgp" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>BGP Engine</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vlans" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-500" />
                Virtual Network Management
              </CardTitle>
              <CardDescription>
                Create and manage VLANs and VXLANs across all NEST deployments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by deployment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Deployments</SelectItem>
                      <SelectItem value="headquarters">Headquarters</SelectItem>
                      <SelectItem value="datacenter">Data Center</SelectItem>
                      <SelectItem value="branch1">Branch Office 1</SelectItem>
                      <SelectItem value="branch2">Branch Office 2</SelectItem>
                      <SelectItem value="cloud">Cloud Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="vlan">VLAN</SelectItem>
                      <SelectItem value="vxlan">VXLAN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-2">
                  <Input placeholder="Search networks..." />
                </div>
              </div>
              
              <VirtualNetworksTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routing" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-green-500" />
                Dynamic Routing Policies
              </CardTitle>
              <CardDescription>
                Configure routing rules with options for static routes, OSPF, BGP, and AI-optimized path selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Protocols</SelectItem>
                      <SelectItem value="static">Static</SelectItem>
                      <SelectItem value="ospf">OSPF</SelectItem>
                      <SelectItem value="bgp">BGP</SelectItem>
                      <SelectItem value="ai">AI-optimized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-2">
                  <Input placeholder="Search routing policies..." />
                </div>
              </div>
              
              <RoutingPoliciesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wireguard" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Share2 className="h-5 w-5 text-purple-500" />
                WireGuard Mesh Configuration
              </CardTitle>
              <CardDescription>
                Deploy fully encrypted peer-to-peer tunnels with Netmaker integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WireGuardMeshConfig />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bgp" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ServerCrash className="h-5 w-5 text-amber-500" />
                BGP Engine Configuration
              </CardTitle>
              <CardDescription>
                Setup custom BGP policies for external networking and WAN failover
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BGPEngineConfig />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualNetworksTab;
