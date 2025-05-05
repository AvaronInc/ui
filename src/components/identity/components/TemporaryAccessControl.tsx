
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Shield, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TemporaryAccessControl: React.FC = () => {
  const [tempAccessRequests, setTempAccessRequests] = useState([
    {
      id: 'temp-1',
      user: 'John Engineer',
      role: 'Admin',
      requestedBy: 'John Engineer',
      reason: 'Emergency server maintenance',
      duration: '24 hours',
      status: 'Active',
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    },
    {
      id: 'temp-2',
      user: 'Sarah Technician',
      role: 'System Engineer',
      requestedBy: 'Mike Manager',
      reason: 'Database migration support',
      duration: '8 hours',
      status: 'Active',
      expiresAt: new Date(Date.now() + 28800000).toISOString(), // 8 hours from now
    },
    {
      id: 'temp-3',
      user: 'VertexEdge Support',
      role: 'Admin',
      requestedBy: 'Help Desk',
      reason: 'Critical system issue troubleshooting',
      duration: '4 hours',
      status: 'Expired',
      expiresAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h3 className="text-lg font-medium mb-2">Temporary Access Control</h3>
          <p className="text-sm text-muted-foreground">
            Grant time-limited access to users for specific tasks, automatically revoked when expired.
          </p>
        </div>
        <Button className="flex-shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          New Temporary Access
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Active Temporary Access Grants
          </CardTitle>
          <CardDescription>
            All temporary access is automatically revoked after the specified duration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Temporary Role</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tempAccessRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.user}</TableCell>
                  <TableCell>
                    <Badge variant={request.role === 'Admin' ? 'destructive' : 'secondary'}>
                      {request.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{request.duration}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Active' ? 'outline' : 'secondary'}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={request.status === 'Expired'}>
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            VertexEdge Technician Access
          </CardTitle>
          <CardDescription>
            Grant temporary admin access to VertexEdge support technicians
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Access Duration</label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Technician ID</label>
                <Input placeholder="Enter technician ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Support Ticket Number</label>
                <Input placeholder="Enter ticket number" />
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                All actions performed by VertexEdge technicians will be logged and recorded for security auditing purposes.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button>
                Grant Temporary Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemporaryAccessControl;
