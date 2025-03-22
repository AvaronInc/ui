
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ClipboardList, 
  RefreshCw, 
  Download, 
  Calendar, 
  ArrowUpDown 
} from 'lucide-react';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type AuditLogEvent = 'apk_generated' | 'apk_downloaded' | 'mfa_used' | 'mfa_revoked' | 'link_expired';
type AuditLogStatus = 'success' | 'warning' | 'error';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  email: string;
  event: AuditLogEvent;
  status: AuditLogStatus;
  details: string;
  ipAddress?: string;
  userAgent?: string;
}

const AuthenticatorAuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  // Mock audit log data
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      userId: 'user-4',
      userName: 'Security Admin',
      email: 'security@example.com',
      event: 'mfa_used',
      status: 'success',
      details: 'MFA authentication successful',
      ipAddress: '192.168.1.5',
      userAgent: 'Chrome/Windows'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      userId: 'user-1',
      userName: 'Admin User',
      email: 'admin@example.com',
      event: 'mfa_used',
      status: 'success',
      details: 'MFA authentication successful',
      ipAddress: '192.168.1.10',
      userAgent: 'Firefox/MacOS'
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      userId: 'user-3',
      userName: 'Jane User',
      email: 'jane@example.com',
      event: 'apk_generated',
      status: 'success',
      details: 'APK authentication app generated for iOS device',
      ipAddress: '192.168.1.20',
      userAgent: 'Chrome/MacOS'
    },
    {
      id: 'log-4',
      timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
      userId: 'user-3',
      userName: 'Jane User',
      email: 'jane@example.com',
      event: 'apk_downloaded',
      status: 'success',
      details: 'APK downloaded successfully',
      ipAddress: '10.0.0.15',
      userAgent: 'Safari/iOS'
    },
    {
      id: 'log-5',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      userId: 'user-2',
      userName: 'John Engineer',
      email: 'john@example.com',
      event: 'mfa_used',
      status: 'success',
      details: 'MFA authentication successful',
      ipAddress: '192.168.1.15',
      userAgent: 'Chrome/Windows'
    },
    {
      id: 'log-6',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      userId: 'user-5',
      userName: 'Revoked User',
      email: 'revoked@example.com',
      event: 'mfa_revoked',
      status: 'warning',
      details: 'MFA authenticator app access revoked',
      ipAddress: '192.168.1.100',
      userAgent: 'Edge/Windows'
    },
    {
      id: 'log-7',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      userId: 'user-5',
      userName: 'Revoked User',
      email: 'revoked@example.com',
      event: 'mfa_used',
      status: 'error',
      details: 'Failed MFA authentication - invalid token',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/Windows'
    },
    {
      id: 'log-8',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      userId: 'user-3',
      userName: 'Jane User',
      email: 'jane@example.com',
      event: 'link_expired',
      status: 'warning',
      details: 'APK download link expired without being used',
      ipAddress: '192.168.1.20',
      userAgent: 'Chrome/MacOS'
    },
  ]);

  const getEventLabel = (event: AuditLogEvent): string => {
    switch (event) {
      case 'apk_generated': return 'APK Generated';
      case 'apk_downloaded': return 'APK Downloaded';
      case 'mfa_used': return 'MFA Used';
      case 'mfa_revoked': return 'MFA Revoked';
      case 'link_expired': return 'Link Expired';
      default: return 'Unknown Event';
    }
  };

  const getStatusBadge = (status: AuditLogStatus) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Success
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Warning
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            Unknown
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Audit Logs Refreshed",
        description: "The audit log data has been updated.",
      });
    }, 1000);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Logs",
      description: "Audit logs are being exported to CSV.",
    });
    
    // In a real app, this would trigger a CSV download
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Audit logs have been exported successfully.",
      });
    }, 1500);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter logs based on search query
  const filteredLogs = auditLogs.filter(
    log => 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getEventLabel(log.event).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort logs based on sort field and direction
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    
    if (sortField === 'userName') {
      return sortDirection === 'asc'
        ? a.userName.localeCompare(b.userName)
        : b.userName.localeCompare(a.userName);
    }
    
    if (sortField === 'event') {
      return sortDirection === 'asc'
        ? a.event.localeCompare(b.event)
        : b.event.localeCompare(a.event);
    }
    
    return 0;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <ClipboardList className="mr-2 h-6 w-6 text-primary" />
            MFA Authentication Audit Logs
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center w-full max-w-sm">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input 
              placeholder="Search audit logs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Showing all log events</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort('timestamp')}>
                  <div className="flex items-center">
                    Timestamp
                    {sortField === 'timestamp' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('userName')}>
                  <div className="flex items-center">
                    User
                    {sortField === 'userName' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('event')}>
                  <div className="flex items-center">
                    Event
                    {sortField === 'event' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Client Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No audit logs found matching your search
                  </TableCell>
                </TableRow>
              ) : (
                sortedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help text-sm">{formatTimeAgo(log.timestamp)}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{formatDate(log.timestamp)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{log.userName}</div>
                      <div className="text-sm text-muted-foreground">{log.email}</div>
                    </TableCell>
                    <TableCell>
                      {getEventLabel(log.event)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(log.status)}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{log.details}</span>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help text-sm text-muted-foreground">
                            {log.ipAddress || 'Unknown IP'}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>IP: {log.ipAddress || 'Unknown'}</p>
                          <p>Browser: {log.userAgent || 'Unknown'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthenticatorAuditLogs;
