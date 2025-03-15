
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wifi, Ethernet, Satellite, RefreshCw } from 'lucide-react';

const NetworkConnectivityTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wifi className="mr-2 h-5 w-5" />
            WAN Connectivity Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary-connection">Primary Connection</Label>
              <Select defaultValue="fiber">
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiber">Fiber</SelectItem>
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="starlink">Starlink</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="failover-1">Failover Connection 1</Label>
              <Select defaultValue="copper">
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiber">Fiber</SelectItem>
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="starlink">Starlink</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="failover-2">Failover Connection 2</Label>
              <Select defaultValue="starlink">
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiber">Fiber</SelectItem>
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="starlink">Starlink</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Test Connections
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ethernet className="mr-2 h-5 w-5" />
            Full Mesh Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-mesh">Enable Full Mesh SD-WAN</Label>
            <Switch id="enable-mesh" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Select NESTS to Participate</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select NESTS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All NESTS</SelectItem>
                <SelectItem value="headquarters">Headquarters</SelectItem>
                <SelectItem value="branch1">Branch Office 1</SelectItem>
                <SelectItem value="branch2">Branch Office 2</SelectItem>
                <SelectItem value="datacenter">Data Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="latency-routing">Latency-Based Routing Optimization</Label>
            <Switch id="latency-routing" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="path-selection">Allow Dynamic Path Selection</Label>
            <Switch id="path-selection" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Encryption Key Management</Label>
            <Select defaultValue="auto">
              <SelectTrigger>
                <SelectValue placeholder="Select key management" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatic Rotation</SelectItem>
                <SelectItem value="manual">Manual Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Satellite className="mr-2 h-5 w-5" />
            Connection Status & Bandwidth Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Real-time bandwidth usage graphs will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkConnectivityTab;
