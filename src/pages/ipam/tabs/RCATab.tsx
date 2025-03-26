
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for IPAM related issues
const ipamIssues = [
  {
    id: 'IPAM-001',
    title: 'IP Address Pool Depletion',
    severity: 'critical',
    timestamp: '2023-09-14T09:15:27Z',
    description: 'Primary DHCP server exhausted available IP addresses in 192.168.10.0/24 subnet. New devices unable to obtain IP configuration.',
    affectedComponents: ['DHCP Server', 'IP Pool', 'Subnet 192.168.10.0/24'],
    duration: '1h 40m',
  },
  {
    id: 'IPAM-002',
    title: 'Subnet Allocation Conflict',
    severity: 'high',
    timestamp: '2023-09-17T13:44:08Z',
    description: 'Overlapping subnet allocations detected between dev and production environments. Network routing inconsistencies reported.',
    affectedComponents: ['Subnet Manager', 'Route Tables', 'DNS Resolution'],
    duration: '2h 15m',
  },
  {
    id: 'IPAM-003',
    title: 'DHCP Lease Database Corruption',
    severity: 'high',
    timestamp: '2023-09-21T08:33:19Z',
    description: 'DHCP lease database corrupted, causing IP conflicts and duplicate address assignments across multiple subnets.',
    affectedComponents: ['DHCP Service', 'Lease Database', 'IP Assignment Engine'],
    duration: '3h 05m',
  },
  {
    id: 'IPAM-004',
    title: 'IP Reservation System Failure',
    severity: 'medium',
    timestamp: '2023-09-24T11:27:36Z',
    description: 'Static IP reservation system failed to enforce reservations, allowing dynamic allocation of reserved addresses.',
    affectedComponents: ['Reservation Manager', 'DHCP Configuration', 'IP Assignment Rules'],
    duration: '1h 20m',
  },
  {
    id: 'IPAM-005',
    title: 'Automated Subnet Discovery Error',
    severity: 'medium',
    timestamp: '2023-09-27T15:52:41Z',
    description: 'Network discovery scan incorrectly identified multiple non-existent subnets, causing false reporting in monitoring systems.',
    affectedComponents: ['Network Scanner', 'Discovery Engine', 'Topology Manager'],
    duration: '0h 55m',
  }
];

const RCATab: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAnalyzeIssue = (issue: any) => {
    setSelectedIssue(issue);
    setDialogOpen(true);
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Convert our issue to a ticket format for the dialog
  const issueToTicket = (issue: any) => {
    return {
      id: issue.id,
      title: issue.title,
      status: "in-progress" as TicketStatus,
      priority: issue.severity === 'critical' ? 'critical' as TicketPriority : 
                issue.severity === 'high' ? 'high' as TicketPriority : 
                issue.severity === 'medium' ? 'medium' as TicketPriority : 'low' as TicketPriority,
      createdAt: issue.timestamp,
      description: issue.description,
      assignedTo: "System",
      category: "IPAM",
      createdBy: "System",
      updatedAt: issue.timestamp
    };
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            IPAM Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past IPAM incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ipamIssues.map((issue) => (
              <div 
                key={issue.id}
                className="flex items-start justify-between border p-4 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(issue.severity)}>
                      {issue.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {issue.id} • {formatDate(issue.timestamp)}
                    </span>
                  </div>
                  <h3 className="font-medium">{issue.title}</h3>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Duration: {issue.duration}
                    </span>
                    {issue.affectedComponents.map((component) => (
                      <span key={component} className="text-xs bg-muted px-2 py-1 rounded">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shrink-0 ml-4"
                  onClick={() => handleAnalyzeIssue(issue)}
                >
                  <FileSearch className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <RootCauseAnalysisDialog
        ticket={selectedIssue ? issueToTicket(selectedIssue) : null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default RCATab;
