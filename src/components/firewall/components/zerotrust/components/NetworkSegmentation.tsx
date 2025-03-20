
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Network, Lock, Plus, Edit, Trash2 } from 'lucide-react';

interface NetworkSegmentationProps {
  disabled?: boolean;
}

const NetworkSegmentation = ({ disabled }: NetworkSegmentationProps) => {
  const [autoSegmentationEnabled, setAutoSegmentationEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Network Segmentation by Role
          </CardTitle>
          <CardDescription>
            Configure micro-segmentation policies based on user roles and functions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-segment" className="font-medium">Automatic Role-Based Segmentation</Label>
              <p className="text-sm text-muted-foreground">
                Automatically apply network segmentation based on user roles
              </p>
            </div>
            <Switch 
              id="auto-segment" 
              checked={autoSegmentationEnabled} 
              onCheckedChange={setAutoSegmentationEnabled}
              disabled={disabled}
            />
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium">Role-Based Access Segments</h4>
              <Button size="sm" variant="outline" disabled={disabled}>
                <Plus className="h-4 w-4 mr-2" />
                New Segment
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role/Group</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Network Zones</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-red-500" />
                      System Administrators
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      Full Access
                    </Badge>
                  </TableCell>
                  <TableCell>All Zones (12)</TableCell>
                  <TableCell>8 Users</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Network className="h-4 w-4 mr-2 text-amber-500" />
                      Network Engineers
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      Elevated
                    </Badge>
                  </TableCell>
                  <TableCell>Network, Security (6)</TableCell>
                  <TableCell>12 Users</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      Finance Department
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Specialized
                    </Badge>
                  </TableCell>
                  <TableCell>Finance, Shared (3)</TableCell>
                  <TableCell>24 Users</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-green-500" />
                      Standard Users
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Standard
                    </Badge>
                  </TableCell>
                  <TableCell>User, Shared (2)</TableCell>
                  <TableCell>152 Users</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={disabled}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium">Network Zones Configuration</h4>
              <Button size="sm" variant="outline" disabled={disabled}>
                <Plus className="h-4 w-4 mr-2" />
                New Zone
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-red-500" />
                    Critical Zones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Database Servers</span>
                      <Badge variant="outline">Restricted</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Financial Systems</span>
                      <Badge variant="outline">Restricted</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Domain Controllers</span>
                      <Badge variant="outline">Restricted</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Network className="h-4 w-4 mr-2 text-amber-500" />
                    Operational Zones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Internal Applications</span>
                      <Badge variant="outline">Limited</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Development Servers</span>
                      <Badge variant="outline">Limited</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Network Monitoring</span>
                      <Badge variant="outline">Limited</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-green-500" />
                    Standard Zones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>User Workstations</span>
                      <Badge variant="outline">Standard</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Shared Resources</span>
                      <Badge variant="outline">Standard</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Internet Access</span>
                      <Badge variant="outline">Filtered</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkSegmentation;
