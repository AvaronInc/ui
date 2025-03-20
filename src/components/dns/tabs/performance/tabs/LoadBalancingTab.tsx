
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Globe } from 'lucide-react';

import { DNSLoadBalancer } from '../types';

const LoadBalancingTab: React.FC = () => {
  // Mock data for DNS load balancers
  const [loadBalancers, setLoadBalancers] = useState<DNSLoadBalancer[]>([
    { id: 1, name: 'Global Round-Robin', policy: 'round-robin', status: 'active', servers: [1, 2, 3] },
    { id: 2, name: 'US GeoRoute', policy: 'geo', status: 'active', servers: [1, 3] },
    { id: 3, name: 'EU Traffic Router', policy: 'latency', status: 'inactive', servers: [2, 4] },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">DNS Load Balancing</h3>
                <p className="text-sm text-muted-foreground">Distribute DNS queries across multiple servers for improved resilience and performance</p>
              </div>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Load Balancer</span>
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Policy</TableHead>
                    <TableHead>Servers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadBalancers.map((balancer) => (
                    <TableRow key={balancer.id}>
                      <TableCell className="font-medium">{balancer.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {balancer.policy === 'geo' && <Globe className="h-3 w-3 mr-1" />}
                          {balancer.policy.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{balancer.servers.length} servers</TableCell>
                      <TableCell>
                        <Switch checked={balancer.status === 'active'} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">GeoDNS Configuration</h3>
            <p className="text-sm text-muted-foreground">Route DNS queries based on geographical location for reduced latency</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Region Configuration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs mb-1">Region</p>
                      <Select defaultValue="north-america">
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                          <SelectItem value="south-america">South America</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-xs mb-1">DNS Server</p>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select server" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Primary DNS (10.0.0.1)</SelectItem>
                          <SelectItem value="2">Secondary DNS (10.0.0.2)</SelectItem>
                          <SelectItem value="3">Cloud Resolver (8.8.8.8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button size="sm" className="mt-2">Add Region Mapping</Button>
                </div>
              </div>

              <div className="rounded-md border p-4 bg-muted/50">
                <h4 className="text-sm font-medium mb-3">AI Traffic Optimization</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">Enable AI optimization</p>
                      <Switch checked={true} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI will analyze query patterns and automatically adjust routing rules to optimize performance
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Learning Mode</p>
                    <Select defaultValue="active">
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passive">Passive (Recommendations Only)</SelectItem>
                        <SelectItem value="active">Active (Automatic Adjustments)</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Approval Required)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadBalancingTab;
