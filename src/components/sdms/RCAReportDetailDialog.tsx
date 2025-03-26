
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface RCAReport {
  id: string;
  title: string;
  service: string;
  severity: string;
  timestamp: string;
  analyst: string;
  fileSize: string;
  incidentId: string;
  content?: string;
}

interface RCAReportDetailDialogProps {
  report: RCAReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (reportId: string) => void;
}

const RCAReportDetailDialog: React.FC<RCAReportDetailDialogProps> = ({
  report,
  open,
  onOpenChange,
  onDownload
}) => {
  if (!report) return null;
  
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
  
  // Generate mock content for the report if not provided
  const reportContent = report.content || `
# Root Cause Analysis Report: ${report.title}

## Incident Overview
**Incident ID:** ${report.incidentId}
**Service:** ${report.service}
**Severity:** ${report.severity.toUpperCase()}
**Date/Time:** ${formatDate(report.timestamp)}
**Duration:** 3 hours 45 minutes
**Affected Systems:** Primary ${report.service} cluster, API endpoints, Authentication services

## Executive Summary
On ${formatDate(report.timestamp)}, the ${report.service} service experienced a significant disruption affecting user access and system performance. This report details the incident timeline, root causes, and recommended actions to prevent similar issues.

## Incident Timeline
- **${formatDate(new Date(new Date(report.timestamp).getTime() - 30 * 60000).toISOString())}:** Initial alerts triggered for elevated error rates
- **${formatDate(new Date(new Date(report.timestamp).getTime() - 15 * 60000).toISOString())}:** System monitoring detected performance degradation
- **${formatDate(report.timestamp)}:** Incident declared by ${report.analyst}
- **${formatDate(new Date(new Date(report.timestamp).getTime() + 60 * 60000).toISOString())}:** Emergency response team engaged
- **${formatDate(new Date(new Date(report.timestamp).getTime() + 180 * 60000).toISOString())}:** Service restored to normal operation

## Root Cause Analysis
The primary cause was identified as a resource exhaustion event triggered by an unexpected surge in connection requests, combined with a configuration error in the auto-scaling policies that prevented proper resource allocation.

### Contributing Factors
1. Recent deployment introduced a connection pooling inefficiency
2. Monitoring thresholds were set too high to provide early warning
3. Backup systems failed to activate due to misconfigured failover parameters

## Remediation Actions
1. Immediate configuration changes to connection handling parameters
2. Adjusted auto-scaling policies to respond more aggressively to demand
3. Implemented additional monitoring for connection pool states
4. Corrected failover system configuration and validation processes

## Preventative Measures
1. Review and update threshold alerts for earlier detection
2. Implement comprehensive pre-deployment testing for connection handling
3. Schedule quarterly failover testing
4. Develop enhanced documentation for emergency response procedures

---
Report prepared by: ${report.analyst}
Last updated: ${formatDate(new Date().toISOString())}
  `;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-primary" />
              {report.title}
            </DialogTitle>
            <Badge className={getSeverityColor(report.severity)}>
              {report.severity.toUpperCase()}
            </Badge>
          </div>
          <DialogDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
            <span><strong>ID:</strong> {report.id}</span>
            <span><strong>Incident:</strong> {report.incidentId}</span>
            <span><strong>Service:</strong> {report.service}</span>
            <span><strong>Date:</strong> {formatDate(report.timestamp)}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between items-center py-2 border-y my-2">
          <div className="text-sm text-muted-foreground">
            <span>Analyzed by: <strong>{report.analyst}</strong></span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onDownload(report.id)}
          >
            <Download className="h-4 w-4" />
            Download Report ({report.fileSize})
          </Button>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">{reportContent}</pre>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RCAReportDetailDialog;
