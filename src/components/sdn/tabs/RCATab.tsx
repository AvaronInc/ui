
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for SDN related issues
const sdnIssues = [
  {
    id: 'SDN-001',
    title: 'Virtual Switch Fabric Degradation',
    severity: 'critical',
    timestamp: '2023-09-17T10:25:12Z',
    description: 'Critical performance degradation detected in the core virtual switch fabric affecting multiple tenants. Packet drops and latency spikes observed across network segments.',
    affectedNodes: ['Core-VS-01', 'Core-VS-02', 'Distribution-VS-01'],
    duration: '3h 15m',
  },
  {
    id: 'SDN-002',
    title: 'OpenFlow Controller Connection Loss',
    severity: 'high',
    timestamp: '2023-09-20T08:42:33Z',
    description: 'Multiple SDN switches lost connection to the central OpenFlow controller, resulting in fallback to legacy forwarding mechanisms. Affected east-west traffic patterns.',
    affectedNodes: ['SDN-Controller-1', 'Edge-VS-05', 'Edge-VS-06'],
    duration: '1h 40m',
  },
  {
    id: 'SDN-003',
    title: 'Network Virtualization Overlay Failure',
    severity: 'high',
    timestamp: '2023-09-22T14:03:27Z',
    description: 'VXLAN overlay network experienced tunnel establishment failures affecting tenant isolation. Some cross-tenant traffic leakage detected before containment.',
    affectedNodes: ['VTEP-Gateway-01', 'Compute-VS-03', 'Compute-VS-04'],
    duration: '2h 50m',
  },
  {
    id: 'SDN-004',
    title: 'SDN Policy Enforcement Point Outage',
    severity: 'medium',
    timestamp: '2023-09-24T16:15:05Z',
    description: 'Policy enforcement service on the virtual network experienced resource exhaustion, causing new flows to bypass security policies temporarily.',
    affectedNodes: ['Policy-Enforcer-02', 'Security-Gateway-01'],
    duration: '0h 55m',
  },
  {
    id: 'SDN-005',
    title: 'Network Service Function Chain Disruption',
    severity: 'medium',
    timestamp: '2023-09-26T11:30:18Z',
    description: 'Service function chaining for traffic inspection broke due to misconfigured virtual topology, causing some application traffic to bypass DPI functions.',
    affectedNodes: ['Service-Chain-01', 'DPI-Function-02', 'Load-Balancer-VS-01'],
    duration: '1h 25m',
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
      category: "SDN",
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
            SDN Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past SDN incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sdnIssues.map((issue) => (
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
                    {issue.affectedNodes.map((node) => (
                      <span key={node} className="text-xs bg-muted px-2 py-1 rounded">
                        {node}
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
