
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const NetworkPolicies: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Network Policies</h2>
          <p className="text-muted-foreground">Define and enforce networking policies across regions and zones</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Policy
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Policy Summary</CardTitle>
            <CardDescription>Overview of network policies across regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span>Total Active Policies</span>
                <Badge variant="default">24</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Security Policies</span>
                <Badge variant="destructive">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Performance Policies</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Compliance Policies</span>
                <Badge variant="outline">4</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Policy Distribution</CardTitle>
            <CardDescription>Policy distribution across regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>North America</span>
                  <span>8</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Europe</span>
                  <span>10</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Asia Pacific</span>
                  <span>6</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Network Policies</CardTitle>
          <CardDescription>Manage network policies across all regions and zones</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Active network policies configuration</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Inter-Region Traffic</TableCell>
                <TableCell>
                  <Badge variant="outline">Performance</Badge>
                </TableCell>
                <TableCell>North America</TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Firewall Rules</TableCell>
                <TableCell>
                  <Badge variant="outline">Security</Badge>
                </TableCell>
                <TableCell>Global</TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">GDPR Compliance</TableCell>
                <TableCell>
                  <Badge variant="outline">Compliance</Badge>
                </TableCell>
                <TableCell>Europe</TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">QoS Policy</TableCell>
                <TableCell>
                  <Badge variant="outline">Performance</Badge>
                </TableCell>
                <TableCell>Asia Pacific</TableCell>
                <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkPolicies;
