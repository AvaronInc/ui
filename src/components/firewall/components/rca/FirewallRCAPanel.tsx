
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileSearch, Shield } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { RootCauseAnalysisDialog } from "@/components/tickets/dialogs/RootCauseAnalysisDialog";
import { TicketStatus, TicketPriority } from '@/types/tickets';

// Mock data for firewall incidents
const firewallIncidents = [
  {
    id: 'FW-001',
    title: 'Sudden Spike in Blocked Traffic',
    severity: 'critical',
    timestamp: '2023-11-05T14:22:18Z',
    description: 'Firewall detected and blocked an unusual spike in traffic from multiple external IPs targeting port 22. Pattern suggests a coordinated SSH brute force attack.',
    affectedSystems: ['Edge Firewall', 'SSH Services', 'Authentication Systems'],
    duration: '1h 15m',
  },
  {
    id: 'FW-002',
    title: 'Traffic Shaping Rule Failure',
    severity: 'high',
    timestamp: '2023-11-12T09:45:33Z',
    description: 'QoS policy for VoIP traffic failed to apply correctly, resulting in voice quality degradation during peak hours. Investigation shows conflict with recently added rule set.',
    affectedSystems: ['QoS Engine', 'VoIP Gateway', 'Traffic Shaper'],
    duration: '2h 40m',
  },
  {
    id: 'FW-003',
    title: 'NAT Table Overflow',
    severity: 'high',
    timestamp: '2023-11-18T16:30:21Z',
    description: 'NAT translation table reached maximum capacity, causing connection failures for new outbound requests. Appears related to incomplete TCP connections not being properly timed out.',
    affectedSystems: ['NAT Services', 'Connection Tracking', 'External Access'],
    duration: '0h 55m',
  },
  {
    id: 'FW-004',
    title: 'IPS False Positive Surge',
    severity: 'medium',
    timestamp: '2023-11-24T11:05:42Z',
    description: 'After signature update, IPS began flagging legitimate internal application traffic as malicious. Resulted in temporary disruption of critical business applications.',
    affectedSystems: ['Intrusion Prevention', 'Business Applications', 'Signature Database'],
    duration: '3h 20m',
  },
  {
    id: 'FW-005',
    title: 'DPI Certificate Validation Error',
    severity: 'medium',
    timestamp: '2023-11-30T08:15:27Z',
    description: 'Deep Packet Inspection failed to properly validate TLS certificates, causing intermittent connection issues for encrypted traffic to certain domains.',
    affectedSystems: ['DPI Engine', 'Certificate Store', 'TLS Inspection'],
    duration: '1h 45m',
  }
];

const FirewallRCAPanel: React.FC = () => {
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
      assignedTo: "Network Security Team",
      category: "FIREWALL",
      createdBy: "Automated Monitoring",
      updatedAt: incident.timestamp
    };
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Firewall Incident Root Cause Analysis
          </CardTitle>
          <CardDescription>
            Analyze firewall-related incidents to determine root causes and prevent recurrence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {firewallIncidents.map((incident) => (
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

export default FirewallRCAPanel;
