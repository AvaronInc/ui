
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Brain, Clock, FileText, Search, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RiskEvent {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  eventType: 'suspicious_login' | 'multiple_failures' | 'unusual_time' | 'privilege_escalation' | 'geolocation_change';
  description: string;
  ipAddress: string;
  timestamp: string;
  riskScore: number;
  status: 'open' | 'resolved' | 'ignored';
}

const eventTypeLabels: Record<string, string> = {
  'suspicious_login': 'Suspicious Login',
  'multiple_failures': 'Multiple Login Failures',
  'unusual_time': 'Unusual Login Time',
  'privilege_escalation': 'Privilege Escalation',
  'geolocation_change': 'Geolocation Change'
};

const AIRiskAnalysis: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock risk events data
  const riskEvents: RiskEvent[] = [
    {
      id: 'event-1',
      userId: 'user-3',
      username: 'regularuser',
      fullName: 'Jane User',
      eventType: 'suspicious_login',
      description: 'Login from unusual IP address not associated with this user',
      ipAddress: '203.0.113.42',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      riskScore: 85,
      status: 'open'
    },
    {
      id: 'event-2',
      userId: 'user-5',
      username: 'revokeduser',
      fullName: 'Revoked User',
      eventType: 'multiple_failures',
      description: 'Multiple failed login attempts (5) before successful authentication',
      ipAddress: '192.168.1.100',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      riskScore: 75,
      status: 'resolved'
    },
    {
      id: 'event-3',
      userId: 'user-2',
      username: 'engineer1',
      fullName: 'John Engineer',
      eventType: 'geolocation_change',
      description: 'Rapid change in login location (Chicago to Singapore)',
      ipAddress: '203.0.113.100',
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      riskScore: 92,
      status: 'resolved'
    },
    {
      id: 'event-4',
      userId: 'user-1',
      username: 'admin123',
      fullName: 'Admin User',
      eventType: 'unusual_time',
      description: 'Login at 3:42 AM, outside of typical working hours',
      ipAddress: '192.168.1.10',
      timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      riskScore: 65,
      status: 'ignored'
    },
    {
      id: 'event-5',
      userId: 'user-4',
      username: 'securityadmin',
      fullName: 'Security Admin',
      eventType: 'privilege_escalation',
      description: 'Attempt to access high-privilege functions without proper clearance',
      ipAddress: '192.168.1.5',
      timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      riskScore: 88,
      status: 'open'
    }
  ];
  
  const filteredEvents = riskEvents.filter(event => {
    // Apply search filter
    const matchesSearch = 
      event.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.ipAddress.includes(searchQuery);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getRiskBadge = (score: number) => {
    if (score < 30) {
      return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
    } else if (score < 70) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Open</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Resolved</Badge>;
      case 'ignored':
        return <Badge variant="outline" className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300">Ignored</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-muted/40">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <Brain className="h-12 w-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium">AI-Driven Risk Analysis</h3>
              <p className="text-sm text-muted-foreground">
                The system continuously monitors login patterns, location changes, and access attempts 
                to identify potential security risks. Each login attempt is assigned a real-time risk score 
                based on multiple factors including location, time, device fingerprint, and behavioral patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search security events..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="ignored">Ignored</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Button variant="outline" className="whitespace-nowrap">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="whitespace-nowrap">
            <Shield className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl">
            <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
            Security Risk Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                    No risk events found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {eventTypeLabels[event.eventType] || event.eventType}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate" title={event.description}>
                      {event.description}
                    </TableCell>
                    <TableCell>{event.ipAddress}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>{getRiskBadge(event.riskScore)}</TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {event.status === 'open' && (
                          <>
                            <Button variant="outline" size="sm" className="h-8">Resolve</Button>
                            <Button variant="ghost" size="sm" className="h-8">Ignore</Button>
                          </>
                        )}
                        {event.status !== 'open' && (
                          <Button variant="outline" size="sm" className="h-8">Details</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRiskAnalysis;
