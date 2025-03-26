
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for service-specific issues
const generateServiceIssues = () => [
  {
    id: 'SVC-001',
    title: 'Service API Timeout',
    severity: 'critical',
    timestamp: '2023-10-15T08:22:45Z',
    description: 'Multiple API endpoints experiencing prolonged response times leading to service degradation and client connection timeouts.',
    affectedComponents: ['API Gateway', 'Authentication Service', 'Load Balancer'],
    duration: '3h 45m',
  },
  {
    id: 'SVC-002',
    title: 'Database Connection Pool Exhaustion',
    severity: 'high',
    timestamp: '2023-10-22T13:37:19Z',
    description: 'Connection pool reached maximum capacity due to connections not being properly closed, resulting in new requests being rejected.',
    affectedComponents: ['Database Connection Manager', 'Transaction Service', 'Query Processor'],
    duration: '2h 10m',
  },
  {
    id: 'SVC-003',
    title: 'Microservice Dependency Failure',
    severity: 'high',
    timestamp: '2023-10-28T16:45:33Z',
    description: 'Cascading failures across microservices due to a critical dependency becoming unresponsive, affecting multiple downstream services.',
    affectedComponents: ['Service Discovery', 'Circuit Breaker', 'Dependency Chain'],
    duration: '1h 55m',
  },
  {
    id: 'SVC-004',
    title: 'Service Registry Inconsistency',
    severity: 'medium',
    timestamp: '2023-11-05T11:28:42Z',
    description: 'Service registry contained stale entries causing routing failures and intermittent 404 errors for client requests.',
    affectedComponents: ['Service Registry', 'Service Mesh', 'Routing Layer'],
    duration: '1h 20m',
  },
  {
    id: 'SVC-005',
    title: 'API Rate Limiting Misconfiguration',
    severity: 'medium',
    timestamp: '2023-11-12T14:52:17Z',
    description: 'Incorrectly configured rate limits caused legitimate traffic to be throttled while allowing potential DoS vectors.',
    affectedComponents: ['API Gateway', 'Rate Limiter', 'Traffic Controller'],
    duration: '0h 50m',
  }
];

const RCATab: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const serviceIssues = generateServiceIssues();
  
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
      category: "SERVICES",
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
            Service Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past service-related incidents and analyze their root causes
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
