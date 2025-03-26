
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for DNS related issues
const dnsIssues = [
  {
    id: 'DNS-001',
    title: 'DNS Zone Transfer Failure',
    severity: 'critical',
    timestamp: '2023-09-15T08:42:33Z',
    description: 'Primary to secondary zone transfer failures detected on multiple internal zones. DNS resolution for internal domains experiencing intermittent failures.',
    affectedComponents: ['Primary DNS Server', 'Zone Transfer Service', 'Internal-Zone-Controllers'],
    duration: '2h 25m',
  },
  {
    id: 'DNS-002',
    title: 'DNSSEC Validation Errors',
    severity: 'high',
    timestamp: '2023-09-18T14:22:17Z',
    description: 'DNSSEC validation failures occurring for multiple signed zones. Users experiencing resolution issues for domain names with DNSSEC implementation.',
    affectedComponents: ['DNSSEC Validator', 'Resolver Cache', 'Key Signing Key-01'],
    duration: '1h 40m',
  },
  {
    id: 'DNS-003',
    title: 'DNS Cache Poisoning Attempt',
    severity: 'high',
    timestamp: '2023-09-22T11:05:41Z',
    description: 'Security system detected potential cache poisoning attempts targeting corporate DNS resolvers. Some traffic may have been misdirected before mitigation.',
    affectedComponents: ['External Resolvers', 'DNS Security Module', 'Cache Manager'],
    duration: '0h 50m',
  },
  {
    id: 'DNS-004',
    title: 'Recursive Query Performance Degradation',
    severity: 'medium',
    timestamp: '2023-09-25T15:33:09Z',
    description: 'Significant latency increase in recursive query resolution. Average query time increased from 10ms to 250ms affecting user experience.',
    affectedComponents: ['Recursive Resolver Pool', 'Query Processor', 'DNS Cache'],
    duration: '3h 15m',
  },
  {
    id: 'DNS-005',
    title: 'DNS Load Balancer Failure',
    severity: 'medium',
    timestamp: '2023-09-28T09:17:26Z',
    description: 'DNS-based load balancing service experienced partial outage, affecting application availability across multiple locations. Failover mechanisms activated with some delay.',
    affectedComponents: ['GeoDNS Service', 'Health Check System', 'Load Balancer-04'],
    duration: '1h 05m',
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
      category: "DNS",
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
            DNS Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past DNS incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dnsIssues.map((issue) => (
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
