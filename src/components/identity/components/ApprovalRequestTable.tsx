
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, ShieldAlert, UserPlus, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApprovalRequest {
  id: string;
  type: 'new_user' | 'role_change' | 'admin_access' | 'emergency_access';
  requestedBy: string;
  requestedFor: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  approvers: string[];
  approvedBy: string[];
}

const ApprovalRequestTable: React.FC = () => {
  const approvalRequests: ApprovalRequest[] = [
    {
      id: 'req-1',
      type: 'role_change',
      requestedBy: 'John Engineer',
      requestedFor: 'Jane User',
      description: 'Request to change role from User to Engineer for access to SDMS and Network settings',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: 'pending',
      priority: 'medium',
      approvers: ['Admin User', 'Security Admin'],
      approvedBy: []
    },
    {
      id: 'req-2',
      type: 'emergency_access',
      requestedBy: 'Security Admin',
      requestedFor: 'Security Admin',
      description: 'Emergency production server access needed to resolve critical security vulnerability',
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      status: 'pending',
      priority: 'critical',
      approvers: ['Admin User'],
      approvedBy: []
    },
    {
      id: 'req-3',
      type: 'new_user',
      requestedBy: 'Admin User',
      requestedFor: 'New Employee',
      description: 'Create new user account for recently hired analyst',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: 'approved',
      priority: 'low',
      approvers: ['Admin User', 'Security Admin'],
      approvedBy: ['Admin User', 'Security Admin']
    },
    {
      id: 'req-4',
      type: 'admin_access',
      requestedBy: 'John Engineer',
      requestedFor: 'John Engineer',
      description: 'Request for temporary admin access to configure new SD-WAN policies',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: 'rejected',
      priority: 'high',
      approvers: ['Admin User', 'Security Admin'],
      approvedBy: ['Admin User']
    },
  ];
  
  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'new_user':
        return (
          <div className="flex items-center">
            <UserPlus className="h-4 w-4 mr-1 text-green-500" />
            <span>New User</span>
          </div>
        );
      case 'role_change':
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-blue-500" />
            <span>Role Change</span>
          </div>
        );
      case 'admin_access':
        return (
          <div className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-1 text-amber-500" />
            <span>Admin Access</span>
          </div>
        );
      case 'emergency_access':
        return (
          <div className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-1 text-red-500" />
            <span>Emergency Access</span>
          </div>
        );
      default:
        return type;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request Type</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>For User</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvalRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{getRequestTypeLabel(request.type)}</TableCell>
                <TableCell className="font-medium">{request.requestedBy}</TableCell>
                <TableCell>{request.requestedFor}</TableCell>
                <TableCell className="max-w-xs truncate" title={request.description}>
                  {request.description}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
                </TableCell>
                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {request.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm" className="h-8 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-red-50 hover:bg-red-100 text-red-700 border-red-200">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status !== 'pending' && (
                      <Button variant="outline" size="sm" className="h-8">Details</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ApprovalRequestTable;
