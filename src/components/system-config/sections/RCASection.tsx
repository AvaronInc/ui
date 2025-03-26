
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for system configuration related issues
const generateConfigIssues = () => [
  {
    id: 'config-001',
    title: 'Configuration Database Corruption',
    severity: 'critical',
    timestamp: '2023-10-18T09:15:32Z',
    description: 'System configuration database experienced corruption during scheduled backup process, causing inconsistent state across cluster nodes.',
    affectedComponents: ['Configuration Store', 'Backup Service', 'Cluster Sync'],
    duration: '3h 25m',
  },
  {
    id: 'config-002',
    title: 'Network Interface Configuration Conflict',
    severity: 'high',
    timestamp: '2023-10-25T14:42:18Z',
    description: 'Duplicate IP address assignment detected in network interface configuration, causing intermittent connectivity issues across multiple services.',
    affectedComponents: ['Network Configuration', 'DHCP Service', 'Interface Management'],
    duration: '2h 10m',
  },
  {
    id: 'config-003',
    title: 'Security Certificate Expiration',
    severity: 'high',
    timestamp: '2023-11-02T07:38:45Z',
    description: 'TLS certificate for admin interface expired unexpectedly, causing authentication failures for management connections.',
    affectedComponents: ['Certificate Store', 'Authentication Service', 'Admin Portal'],
    duration: '1h 50m',
  },
  {
    id: 'config-004',
    title: 'Configuration Sync Failure',
    severity: 'medium',
    timestamp: '2023-11-08T11:27:39Z',
    description: 'Configuration synchronization between primary and backup nodes failed, resulting in divergent settings after system update.',
    affectedComponents: ['Sync Manager', 'Configuration API', 'Version Control'],
    duration: '1h 35m',
  },
  {
    id: 'config-005',
    title: 'Backup Schedule Misconfiguration',
    severity: 'medium',
    timestamp: '2023-11-15T16:09:22Z',
    description: 'Automated backup schedule contained invalid cron expression, preventing execution of regular system backups for 72 hours.',
    affectedComponents: ['Scheduler', 'Backup Agent', 'Storage Manager'],
    duration: '0h 40m',
  }
];

const RCASection: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const configIssues = generateConfigIssues();
  
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
      category: "CONFIGURATION",
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
            System Configuration Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past configuration-related incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {configIssues.map((issue) => (
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

export default RCASection;
