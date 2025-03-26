
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClientTenants, mockSupportTickets } from '../mockData';
import { Search, ArrowUpRight, MessageSquare, AlertTriangle, User, Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TenantsSupport: React.FC = () => {
  return (
    <Tabs defaultValue="tenants" className="space-y-4">
      <TabsList className="grid grid-cols-2 w-full md:w-[300px]">
        <TabsTrigger value="tenants" className="flex items-center gap-2">
          <User size={16} />
          <span>Client Tenants</span>
        </TabsTrigger>
        <TabsTrigger value="tickets" className="flex items-center gap-2">
          <MessageSquare size={16} />
          <span>Support Tickets</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="tenants">
        <ClientTenants />
      </TabsContent>
      
      <TabsContent value="tickets">
        <SupportTickets />
      </TabsContent>
    </Tabs>
  );
};

const ClientTenants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      case 'Pending':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      case 'Inactive':
        return 'bg-gray-600/20 text-gray-500 hover:bg-gray-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  const getSLABadgeColor = (sla: string) => {
    switch(sla) {
      case 'Basic':
        return 'bg-blue-600/20 text-blue-500 hover:bg-blue-600/30';
      case 'Standard':
        return 'bg-purple-600/20 text-purple-500 hover:bg-purple-600/30';
      case 'Premium':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      case 'Enterprise':
        return 'bg-indigo-600/20 text-indigo-500 hover:bg-indigo-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  const filteredTenants = searchQuery.trim() === '' 
    ? mockClientTenants 
    : mockClientTenants.filter(tenant => 
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Client Tenants</h2>
          <p className="text-muted-foreground">Manage your client tenants</p>
        </div>
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tenants..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>SLA Tier</TableHead>
                <TableHead>Latest Ticket</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map(tenant => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusBadgeColor(tenant.status)}`}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tenant.userCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      <span>{formatDate(tenant.lastLogin)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getSLABadgeColor(tenant.slaTier)}`}>
                      {tenant.slaTier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm inline-flex gap-1 items-center">
                      {tenant.lastTicket.status === 'In Progress' && (
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                      )}
                      {tenant.lastTicket.status === 'Pending' && (
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      )}
                      {tenant.lastTicket.status === 'Completed' || tenant.lastTicket.status === 'Resolved' && (
                        <Clock className="h-3.5 w-3.5 text-green-500" />
                      )}
                      {tenant.lastTicket.summary}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="h-8 flex gap-2 items-center">
                      <span>Manage</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TenantMetricsCard 
          title="Total Tenants"
          value={filteredTenants.length.toString()}
          description="Across all clients"
        />
        <TenantMetricsCard 
          title="Active Users"
          value={filteredTenants.reduce((sum, tenant) => sum + tenant.userCount, 0).toString()}
          description="Cumulative end users"
        />
        <TenantMetricsCard 
          title="Average SLA"
          value="Premium"
          description="Most common support tier"
        />
      </div>
    </div>
  );
};

const TenantMetricsCard: React.FC<{ title: string; value: string; description: string }> = ({ 
  title, 
  value, 
  description 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

const SupportTickets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'in progress':
        return 'text-amber-500';
      case 'pending':
        return 'text-blue-500';
      case 'resolved':
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getPriorityBadgeColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'bg-red-600/20 text-red-500 hover:bg-red-600/30';
      case 'medium':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      case 'low':
        return 'bg-blue-600/20 text-blue-500 hover:bg-blue-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  const filteredTickets = searchQuery.trim() === '' 
    ? mockSupportTickets 
    : mockSupportTickets.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Support Tickets</h2>
          <p className="text-muted-foreground">View and manage client support tickets</p>
        </div>
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tickets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map(ticket => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.clientName}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      <span>{formatDate(ticket.createdDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityBadgeColor(ticket.priority)}`}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        Comment
                      </Button>
                      {!ticket.isEscalated && (
                        <Button variant="outline" size="sm" className="h-8">
                          Escalate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantsSupport;
