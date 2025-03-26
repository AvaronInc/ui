
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for security incidents
const securityIncidents = [
  {
    id: 'SEC-001',
    title: 'Unauthorized Access Attempt',
    severity: 'critical',
    timestamp: '2023-11-02T08:15:27Z',
    description: 'Multiple failed login attempts followed by successful authentication from an unknown IP address. Account lockout policies were bypassed through a potential session hijacking attack.',
    affectedSystems: ['Authentication Server', 'User Directory', 'Financial Dashboard'],
    duration: '2h 35m',
  },
  {
    id: 'SEC-002',
    title: 'Data Exfiltration Detection',
    severity: 'high',
    timestamp: '2023-11-08T14:22:18Z',
    description: 'Abnormal outbound data transfer detected from database servers. Large volume of customer records were accessed and transmitted to external endpoints over encrypted channels.',
    affectedSystems: ['Database Cluster', 'Perimeter Firewall', 'Data Loss Prevention'],
    duration: '1h 45m',
  },
  {
    id: 'SEC-003',
    title: 'Malware Outbreak',
    severity: 'high',
    timestamp: '2023-11-15T11:30:42Z',
    description: 'New strain of ransomware detected in the marketing department workstations. Initial infection vector appears to be a phishing email with malicious attachment that bypassed email filters.',
    affectedSystems: ['Email Gateway', 'Endpoint Security', 'File Servers'],
    duration: '3h 20m',
  },
  {
    id: 'SEC-004',
    title: 'Denial of Service Attack',
    severity: 'medium',
    timestamp: '2023-11-22T16:05:33Z',
    description: 'Coordinated DDoS attack targeting public-facing web services. Traffic spike overwhelmed WAF and caused temporary service degradation until mitigation was fully implemented.',
    affectedSystems: ['Web Application Firewall', 'Load Balancers', 'CDN'],
    duration: '1h 10m',
  },
  {
    id: 'SEC-005',
    title: 'Privilege Escalation',
    severity: 'medium',
    timestamp: '2023-11-28T09:47:15Z',
    description: 'Service account compromised and used to elevate privileges within the network. Attacker attempted lateral movement before being contained by segmentation controls.',
    affectedSystems: ['Active Directory', 'Privilege Management', 'SIEM'],
    duration: '0h 55m',
  }
];

const RootCauseAnalysis: React.FC = () => {
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
      assignedTo: "Security Team",
      category: "SECURITY",
      createdBy: "Security Monitoring",
      updatedAt: incident.timestamp
    };
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Security Incident Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Review past security incidents and analyze their root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityIncidents.map((incident) => (
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

export default RootCauseAnalysis;
