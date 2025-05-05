
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for SD-WAN related issues
const sdwanIssues = [
  {
    id: 'SDWAN-001',
    title: 'Primary WAN Link Outage - Tokyo Office',
    severity: 'critical',
    timestamp: '2023-09-15T08:32:45Z',
    description: 'Complete loss of connectivity on the primary WAN link at Tokyo office location. Failover to secondary link was successful but bandwidth is degraded.',
    affectedNodes: ['Tokyo-Vertex-01', 'Tokyo-Vertex-02'],
    duration: '4h 23m',
  },
  {
    id: 'SDWAN-002',
    title: 'BGP Flapping - Singapore to AWS VPC Connection',
    severity: 'high',
    timestamp: '2023-09-18T14:15:22Z',
    description: 'Intermittent BGP session instability between Singapore office and AWS Southeast region VPC. Multiple route withdrawals and announcements detected.',
    affectedNodes: ['Singapore-Vertex-01', 'AWS-SG-VPC'],
    duration: '1h 47m',
  },
  {
    id: 'SDWAN-003',
    title: 'Packet Loss Spike - New York to London Route',
    severity: 'medium',
    timestamp: '2023-09-22T19:05:10Z',
    description: 'Significant packet loss (>15%) detected on SD-WAN tunnel between New York and London offices. Latency increased by 85ms during event.',
    affectedNodes: ['NewYork-Vertex-03', 'London-Vertex-01'],
    duration: '2h 15m',
  },
  {
    id: 'SDWAN-004',
    title: 'QoS Policy Failure - Video Conferencing Traffic',
    severity: 'medium',
    timestamp: '2023-09-25T11:30:05Z',
    description: 'QoS policy for video conferencing traffic failed to apply correctly, resulting in degraded call quality across European sites.',
    affectedNodes: ['Paris-Vertex-01', 'Berlin-Vertex-01', 'Madrid-Vertex-01'],
    duration: '3h 40m',
  },
  {
    id: 'SDWAN-005',
    title: 'Starlink Failover Latency Spike - Remote Site',
    severity: 'high',
    timestamp: '2023-09-27T02:10:18Z',
    description: 'Abnormal latency increase during failover to Starlink backup connection at remote mining site. Jitter exceeded 120ms during transition.',
    affectedNodes: ['RemoteSite-Vertex-04'],
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
      category: "SD-WAN",
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
            SD-WAN Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past SD-WAN incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sdwanIssues.map((issue) => (
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
