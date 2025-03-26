
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileX, FileSearch, Database } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for storage-specific issues
const storageIncidents = [
  {
    id: 'STG-001',
    title: 'Bucket Access Latency Spike',
    severity: 'critical',
    timestamp: '2023-11-05T14:22:18Z',
    description: 'Multiple users reported significant delays when accessing files in primary storage bucket. Average response time increased from 200ms to 5000ms, causing application timeouts.',
    affectedSystems: ['MinIO Primary Bucket', 'S3 Gateway', 'Authentication Layer'],
    duration: '2h 30m',
  },
  {
    id: 'STG-002',
    title: 'Storage Quota Exceeded',
    severity: 'high',
    timestamp: '2023-11-12T09:45:33Z',
    description: 'System automatically rejected new file uploads after reaching 98% capacity on primary storage bucket. Several critical business processes were impacted due to inability to store new documents.',
    affectedSystems: ['Object Storage', 'Quota Management', 'Upload Service'],
    duration: '4h 15m',
  },
  {
    id: 'STG-003',
    title: 'File Corruption During Transfer',
    severity: 'high',
    timestamp: '2023-11-18T16:30:21Z',
    description: 'Batch file transfer process resulted in data corruption for approximately 152 files. MD5 checksums failed validation, suggesting data integrity issues during the transmission process.',
    affectedSystems: ['Data Transfer Service', 'Integrity Verification', 'Backup System'],
    duration: '1h 40m',
  },
  {
    id: 'STG-004',
    title: 'Object Versioning Failure',
    severity: 'medium',
    timestamp: '2023-11-24T11:05:42Z',
    description: 'Object versioning system failed to properly track file versions, resulting in newer versions being overwritten by older ones during concurrent access scenarios.',
    affectedSystems: ['Version Control', 'Metadata Storage', 'Conflict Resolution'],
    duration: '3h 20m',
  },
  {
    id: 'STG-005',
    title: 'Storage Replication Lag',
    severity: 'medium',
    timestamp: '2023-11-30T08:15:27Z',
    description: 'Cross-region replication experienced significant delays, with secondary storage regions falling behind by up to 45 minutes. This resulted in data inconsistency across regions.',
    affectedSystems: ['Replication Service', 'Sync Manager', 'Geographic Distribution'],
    duration: '5h 10m',
  }
];

const StorageRCATab: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAnalyzeIncident = (incident: any) => {
    setSelectedIncident(incident);
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

  // Convert our incident to a ticket format for the dialog
  const incidentToTicket = (incident: any) => {
    return {
      id: incident.id,
      title: incident.title,
      status: "in-progress" as TicketStatus,
      priority: incident.severity === 'critical' ? 'critical' as TicketPriority : 
                incident.severity === 'high' ? 'high' as TicketPriority : 
                incident.severity === 'medium' ? 'medium' as TicketPriority : 'low' as TicketPriority,
      createdAt: incident.timestamp,
      description: incident.description,
      assignedTo: "Storage Management Team",
      category: "STORAGE",
      createdBy: "Automated Monitoring",
      updatedAt: incident.timestamp
    };
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Storage Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Analyze storage-related incidents to determine root causes and prevent recurrence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storageIncidents.map((incident) => (
              <div 
                key={incident.id}
                className="flex items-start justify-between border p-4 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {incident.id} • {formatDate(incident.timestamp)}
                    </span>
                  </div>
                  <h3 className="font-medium">{incident.title}</h3>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Duration: {incident.duration}
                    </span>
                    {incident.affectedSystems.map((system) => (
                      <span key={system} className="text-xs bg-muted px-2 py-1 rounded">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shrink-0 ml-4"
                  onClick={() => handleAnalyzeIncident(incident)}
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
        ticket={selectedIncident ? incidentToTicket(selectedIncident) : null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default StorageRCATab;
