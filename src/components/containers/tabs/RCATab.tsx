
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for container-specific issues
const generateContainerIssues = () => [
  {
    id: 'CNT-001',
    title: 'Container Memory Leak Detection',
    severity: 'critical',
    timestamp: '2023-10-15T08:22:45Z',
    description: 'Memory leak detected in container runtime causing gradual resource exhaustion and performance degradation across the container cluster.',
    affectedComponents: ['Container Runtime', 'Memory Manager', 'Resource Controller'],
    duration: '4h 15m',
  },
  {
    id: 'CNT-002',
    title: 'Container Network Isolation Breach',
    severity: 'high',
    timestamp: '2023-10-22T13:37:19Z',
    description: 'Network namespace isolation failure detected between containers, potentially allowing unauthorized cross-container communication.',
    affectedComponents: ['Network Plugin', 'Container Network', 'Security Module'],
    duration: '2h 30m',
  },
  {
    id: 'CNT-003',
    title: 'Container Image Layer Corruption',
    severity: 'high',
    timestamp: '2023-10-28T16:45:33Z',
    description: 'Container image layer integrity check failed during deployment, causing container startup failures across multiple pods.',
    affectedComponents: ['Image Registry', 'Container Runtime', 'Storage Driver'],
    duration: '1h 55m',
  },
  {
    id: 'CNT-004',
    title: 'Resource Quota Misconfiguration',
    severity: 'medium',
    timestamp: '2023-11-05T11:28:42Z',
    description: 'Container resource quotas incorrectly applied, leading to resource starvation and scheduling conflicts in the cluster.',
    affectedComponents: ['Resource Quotas', 'Scheduler', 'Control Plane'],
    duration: '1h 20m',
  },
  {
    id: 'CNT-005',
    title: 'Container Health Check Failure',
    severity: 'medium',
    timestamp: '2023-11-12T14:52:17Z',
    description: 'Multiple containers failing liveness probes due to application deadlock, triggering repeated restarts and service disruption.',
    affectedComponents: ['Health Checker', 'Container Runtime', 'Application Layer'],
    duration: '0h 50m',
  }
];

const RCATab: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const containerIssues = generateContainerIssues();
  
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
      category: "CONTAINERS",
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
            Container Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past container-related incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {containerIssues.map((issue) => (
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
