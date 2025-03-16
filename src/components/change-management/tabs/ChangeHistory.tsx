
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useChangeManagement } from '@/hooks/use-change-management';
import { ChangeRequest, ChangeType, ChangeStatus, RiskLevel } from '@/types/change-management';
import { Calendar, Filter, FileDown, Search } from 'lucide-react';

const ChangeHistory: React.FC = () => {
  const { changeRequests } = useChangeManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Filter change requests based on search and filters
  const filteredChanges = changeRequests.filter(change => {
    const matchesSearch = searchQuery === '' || 
      change.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || change.status === statusFilter;
    const matchesType = typeFilter === 'all' || change.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Sort by date, most recent first
  const sortedChanges = [...filteredChanges].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Change History</CardTitle>
          <CardDescription>
            Comprehensive record of all change requests and their outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search changes by title, description, or requester..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="implementation">Implementation</SelectItem>
                <SelectItem value="verification">Verification</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="minor">Minor</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              Showing {sortedChanges.length} changes
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Requested By</TableHead>
                  <TableHead className="hidden lg:table-cell">Implemented</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Risk</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedChanges.length > 0 ? (
                  sortedChanges.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell className="font-medium">{change.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">
                          {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{change.requestedBy}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {change.completedDate 
                          ? new Date(change.completedDate).toLocaleDateString() 
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(change.status)}>
                          {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge className={getRiskBadgeClass(change.riskLevel)}>
                          {change.riskLevel.charAt(0).toUpperCase() + change.riskLevel.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(change.updatedAt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No change requests found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Compliance Reports</CardTitle>
          <CardDescription>
            Generate change management reports for compliance purposes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR'].map((standard) => (
              <Card key={standard} className="h-[140px]">
                <CardContent className="p-4 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-medium">{standard} Compliance Report</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Change history formatted for {standard} audit requirements
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    <FileDown className="h-4 w-4 mr-2" /> Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
function getStatusBadgeClass(status: ChangeStatus) {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case 'review':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'approval':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'implementation':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'verification':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
    case 'closed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return '';
  }
}

function getRiskBadgeClass(riskLevel: RiskLevel) {
  switch (riskLevel) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'high':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return '';
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export default ChangeHistory;
