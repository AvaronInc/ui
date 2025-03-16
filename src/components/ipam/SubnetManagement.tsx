
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Network, AlertTriangle, RefreshCw, Plus, Trash2, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SubnetManagementProps {
  subnetData: any;
}

const SubnetManagement: React.FC<SubnetManagementProps> = ({ subnetData }) => {
  // Mock subnets data - in a real app, this would come from an API or props
  const [subnets] = useState([
    {
      id: '1',
      name: 'Primary Office Network',
      cidr: '192.168.1.0/24',
      vlan: 10,
      totalIPs: 254,
      usedIPs: 125,
      lastScan: '2023-11-20T08:15:00Z',
      status: 'active',
      department: 'All',
      description: 'Main network for office staff'
    },
    {
      id: '2',
      name: 'Guest Network',
      cidr: '192.168.2.0/24',
      vlan: 20,
      totalIPs: 254,
      usedIPs: 32,
      lastScan: '2023-11-20T08:15:00Z',
      status: 'active',
      department: 'Visitors',
      description: 'Restricted network for guests'
    },
    {
      id: '3',
      name: 'Data Center Network',
      cidr: '10.10.10.0/24',
      vlan: 30,
      totalIPs: 254,
      usedIPs: 210,
      lastScan: '2023-11-20T08:15:00Z',
      status: 'active',
      department: 'IT',
      description: 'Servers and infrastructure'
    },
    {
      id: '4',
      name: 'Development Environment',
      cidr: '10.20.0.0/24',
      vlan: 40,
      totalIPs: 254,
      usedIPs: 85,
      lastScan: '2023-11-20T08:15:00Z',
      status: 'active',
      department: 'Development',
      description: 'For development and testing'
    },
    {
      id: '5',
      name: 'IoT Devices',
      cidr: '172.16.1.0/24',
      vlan: 50,
      totalIPs: 254,
      usedIPs: 48,
      lastScan: '2023-11-20T08:15:00Z',
      status: 'active',
      department: 'Facilities',
      description: 'Smart devices and sensors'
    },
    {
      id: '6',
      name: 'Legacy Systems',
      cidr: '192.168.5.0/24',
      vlan: 60,
      totalIPs: 254,
      usedIPs: 5,
      lastScan: '2023-11-20T08:15:00Z',
      status: 'inactive',
      department: 'Legacy',
      description: 'Old systems pending decommission'
    }
  ]);

  // Calculate overall subnet usage for visualization
  const totalIPsAcrossSubnets = subnets.reduce((acc, subnet) => acc + subnet.totalIPs, 0);
  const usedIPsAcrossSubnets = subnets.reduce((acc, subnet) => acc + subnet.usedIPs, 0);
  const unusedIPsAcrossSubnets = totalIPsAcrossSubnets - usedIPsAcrossSubnets;
  
  const pieData = [
    { name: 'Used IPs', value: usedIPsAcrossSubnets },
    { name: 'Available IPs', value: unusedIPsAcrossSubnets }
  ];
  
  const COLORS = ['#FEC6A1', '#4ADE80'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subnet Utilization Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Subnet Utilization Overview
            </CardTitle>
            <CardDescription>
              Total IP address usage across all subnets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} IPs`, '']}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FEC6A1]"></div>
                  <span className="text-sm font-medium">Used</span>
                </div>
                <p className="text-2xl font-bold">{usedIPsAcrossSubnets}</p>
                <p className="text-xs text-muted-foreground">
                  {((usedIPsAcrossSubnets / totalIPsAcrossSubnets) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div>
                  <span className="text-sm font-medium">Available</span>
                </div>
                <p className="text-2xl font-bold">{unusedIPsAcrossSubnets}</p>
                <p className="text-xs text-muted-foreground">
                  {((unusedIPsAcrossSubnets / totalIPsAcrossSubnets) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subnet Actions & Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Network Management
            </CardTitle>
            <CardDescription>
              Subnet allocation and VLAN management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Active Subnets</h4>
                <div className="text-2xl font-bold">
                  {subnets.filter(subnet => subnet.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {subnets.length} total subnets
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Active VLANs</h4>
                <div className="text-2xl font-bold">
                  {new Set(subnets.filter(subnet => subnet.status === 'active').map(s => s.vlan)).size}
                </div>
                <p className="text-xs text-muted-foreground">
                  Configured across networks
                </p>
              </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subnet
                </Button>
                <Button variant="secondary" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create VLAN
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Scan All Subnets
                </Button>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clean Unused
                </Button>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Network Health</h4>
              <div className={cn(
                "p-4 rounded-md",
                unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.2 
                  ? "bg-destructive/10 text-destructive" 
                  : unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.4
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  {unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.2 ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <Network className="h-5 w-5" />
                  )}
                  <span className="font-medium">
                    {unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.2 
                      ? "Critical: Low IP Availability" 
                      : unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.4
                      ? "Warning: Monitor IP Usage"
                      : "Good: Healthy IP Distribution"}
                  </span>
                </div>
                <p className="text-sm">
                  {unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.2 
                    ? "Consider extending IP ranges or reclaiming unused addresses." 
                    : unusedIPsAcrossSubnets / totalIPsAcrossSubnets < 0.4
                    ? "Address availability is moderate. Plan ahead for growth."
                    : "Network has sufficient address space for current needs."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Subnet Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subnet & VLAN Inventory</CardTitle>
          <CardDescription>
            Detailed view of all network segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>CIDR</TableHead>
                  <TableHead>VLAN</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subnets.map((subnet) => (
                  <TableRow key={subnet.id}>
                    <TableCell className="font-medium">{subnet.name}</TableCell>
                    <TableCell>{subnet.cidr}</TableCell>
                    <TableCell>{subnet.vlan}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{subnet.usedIPs} / {subnet.totalIPs} IPs</span>
                          <span>{Math.round((subnet.usedIPs / subnet.totalIPs) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(subnet.usedIPs / subnet.totalIPs) * 100} 
                          className="h-2"
                          indicatorClassName={cn(
                            (subnet.usedIPs / subnet.totalIPs) > 0.9 ? "bg-destructive" : 
                            (subnet.usedIPs / subnet.totalIPs) > 0.7 ? "bg-warning" : 
                            "bg-success"
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subnet.status === 'active' ? "default" : "secondary"}>
                        {subnet.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{subnet.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubnetManagement;
