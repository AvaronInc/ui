
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';
import { SystemService } from '@/types/services';

interface RCATabProps {
  service: SystemService;
}

// Mock data for system service related issues
const generateServiceIssues = (service: SystemService) => [
  {
    id: `${service.id}-001`,
    title: `${service.name} Resource Exhaustion`,
    severity: 'critical',
    timestamp: '2023-10-14T07:22:18Z',
    description: `${service.name} process consumed excessive memory causing system-wide performance degradation. Service auto-restarted after threshold breach.`,
    affectedComponents: ['Memory Allocator', 'Process Manager', service.name],
    duration: '2h 05m',
  },
  {
    id: `${service.id}-002`,
    title: `${service.name} Configuration Mismatch`,
    severity: 'high',
    timestamp: '2023-10-21T11:38:42Z',
    description: `Configuration changes to ${service.name} resulted in service instability due to incompatible settings between primary and backup nodes.`,
    affectedComponents: ['Configuration Store', 'Service Orchestrator', service.name],
    duration: '1h 40m',
  },
  {
    id: `${service.id}-003`,
    title: `${service.name} Dependency Failure`,
    severity: 'high',
    timestamp: '2023-10-25T15:14:37Z',
    description: `Critical dependency for ${service.name} became unavailable, causing cascading failures across related services and functions.`,
    affectedComponents: ['Service Registry', 'Dependency Chain', service.name],
    duration: '3h 20m',
  },
  {
    id: `${service.id}-004`,
    title: `${service.name} Network Partition`,
    severity: 'medium',
    timestamp: '2023-11-02T09:05:19Z',
    description: `Network partition isolated ${service.name} instances, leading to split-brain condition and inconsistent data state across the service cluster.`,
    affectedComponents: ['Network Fabric', 'Consensus Manager', service.name],
    duration: '1h 15m',
  },
  {
    id: `${service.id}-005`,
    title: `${service.name} Throttling Triggered`,
    severity: 'medium',
    timestamp: '2023-11-08T13:47:22Z',
    description: `Automatic throttling activated for ${service.name} due to excessive request rate, temporarily reducing service availability to prevent complete failure.`,
    affectedComponents: ['Rate Limiter', 'Circuit Breaker', service.name],
    duration: '0h 45m',
  }
];

const RCATab: React.FC<RCATabProps> = ({ service }) => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const serviceIssues = generateServiceIssues(service);
  
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
      category: service.type.toUpperCase(),
      createdBy: "System",
      updatedAt: issue.timestamp
    };
  };
  
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {service.name} Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past incidents related to this service and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceIssues.map((issue) => (
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
