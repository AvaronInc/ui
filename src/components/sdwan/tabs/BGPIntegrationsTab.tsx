
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitBranch, Cloud, Share, Network } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BGPIntegrationsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="mr-2 h-5 w-5" />
            BGP Engine Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-bgp">Enable BGP for External Routing</Label>
            <Switch id="enable-bgp" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="as-number">Define AS Number</Label>
            <Input id="as-number" placeholder="AS64512" defaultValue="AS64512" />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>BGP Peers & Neighbors</Label>
              <Button variant="outline" size="sm">Add Peer</Button>
            </div>
            
            <div className="bg-muted rounded-md p-3 space-y-3 max-h-[150px] overflow-y-auto">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">ISP Router (203.0.113.1)</div>
                  <div className="text-xs text-muted-foreground">AS64500</div>
                </div>
                <Badge>Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Cloud Gateway (172.31.0.1)</div>
                  <div className="text-xs text-muted-foreground">AS64501</div>
                </div>
                <Badge variant="outline">Idle</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Route Filtering Policies</Label>
            <Select defaultValue="allow-all">
              <SelectTrigger>
                <SelectValue placeholder="Select policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allow-all">Allow All Routes</SelectItem>
                <SelectItem value="deny-private">Deny Private Networks</SelectItem>
                <SelectItem value="prefix-list">Use Prefix List</SelectItem>
                <SelectItem value="custom">Custom Filter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>BGP Path Selection Preferences</Label>
            <Select defaultValue="shortest-path">
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shortest-path">Shortest Path</SelectItem>
                <SelectItem value="preferred-route">Preferred Route</SelectItem>
                <SelectItem value="lowest-med">Lowest MED</SelectItem>
                <SelectItem value="highest-weight">Highest Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cloud className="mr-2 h-5 w-5" />
            Third-Party Network Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="aws" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="aws">AWS</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
              <TabsTrigger value="gcp">Google Cloud</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aws" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="aws-connect">Connect to AWS</Label>
                <Switch id="aws-connect" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aws-account">AWS Account ID</Label>
                <Input id="aws-account" placeholder="123456789012" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aws-region">AWS Region</Label>
                <Select>
                  <SelectTrigger id="aws-region">
                    <SelectValue placeholder="Select AWS region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aws-cidr">CIDR Range for Peering</Label>
                <Input id="aws-cidr" placeholder="10.0.0.0/16" />
              </div>
              
              <Button className="w-full">
                Set Up AWS Connection
              </Button>
            </TabsContent>
            
            <TabsContent value="azure" className="space-y-4">
              {/* Azure-specific content, similar structure to AWS */}
              <div className="flex items-center justify-between">
                <Label htmlFor="azure-connect">Connect to Azure</Label>
                <Switch id="azure-connect" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="azure-tenant">Azure Tenant ID</Label>
                <Input id="azure-tenant" placeholder="tenant-id" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="azure-subscription">Subscription ID</Label>
                <Input id="azure-subscription" placeholder="subscription-id" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="azure-cidr">CIDR Range for Peering</Label>
                <Input id="azure-cidr" placeholder="10.1.0.0/16" />
              </div>
              
              <Button className="w-full">
                Set Up Azure Connection
              </Button>
            </TabsContent>
            
            <TabsContent value="gcp" className="space-y-4">
              {/* Google Cloud-specific content */}
              <div className="flex items-center justify-between">
                <Label htmlFor="gcp-connect">Connect to Google Cloud</Label>
                <Switch id="gcp-connect" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gcp-project">GCP Project ID</Label>
                <Input id="gcp-project" placeholder="project-id" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gcp-region">GCP Region</Label>
                <Select>
                  <SelectTrigger id="gcp-region">
                    <SelectValue placeholder="Select GCP region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-central1">US Central (Iowa)</SelectItem>
                    <SelectItem value="us-east4">US East (Virginia)</SelectItem>
                    <SelectItem value="europe-west1">Europe West (Belgium)</SelectItem>
                    <SelectItem value="asia-east1">Asia East (Taiwan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gcp-cidr">CIDR Range for Peering</Label>
                <Input id="gcp-cidr" placeholder="10.2.0.0/16" />
              </div>
              
              <Button className="w-full">
                Set Up GCP Connection
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BGPIntegrationsTab;
