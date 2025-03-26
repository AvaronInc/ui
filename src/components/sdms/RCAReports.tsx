
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSearch, Download, FileText } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RCAReportDetailDialog from './RCAReportDetailDialog';
import { useToast } from '@/components/ui/use-toast';

// Mock data for RCA reports from various services
const rcaReports = [
  {
    id: 'RCA-001',
    title: 'Network Latency Spike Investigation',
    service: 'SDN',
    severity: 'high',
    timestamp: '2023-11-05T14:22:18Z',
    analyst: 'John Smith',
    fileSize: '2.4 MB',
    incidentId: 'SDN-129',
  },
  {
    id: 'RCA-002',
    title: 'Storage Quota Exceeded Analysis',
    service: 'Storage',
    severity: 'critical',
    timestamp: '2023-11-12T09:45:33Z',
    analyst: 'Emma Johnson',
    fileSize: '1.8 MB',
    incidentId: 'STG-002',
  },
  {
    id: 'RCA-003',
    title: 'Firewall Rule Misconfiguration',
    service: 'Firewall',
    severity: 'medium',
    timestamp: '2023-11-18T16:30:21Z',
    analyst: 'Michael Chen',
    fileSize: '3.2 MB',
    incidentId: 'FW-073',
  },
  {
    id: 'RCA-004',
    title: 'Authentication Service Failure',
    service: 'Identity',
    severity: 'critical',
    timestamp: '2023-11-24T11:05:42Z',
    analyst: 'Sarah Williams',
    fileSize: '4.1 MB',
    incidentId: 'AUTH-456',
  },
  {
    id: 'RCA-005',
    title: 'DNS Resolution Delays',
    service: 'DNS',
    severity: 'medium',
    timestamp: '2023-11-30T08:15:27Z',
    analyst: 'Robert Garcia',
    fileSize: '1.5 MB',
    incidentId: 'DNS-088',
  },
  {
    id: 'RCA-006',
    title: 'Container Orchestration Failure',
    service: 'Containers',
    severity: 'high',
    timestamp: '2023-12-05T13:40:19Z',
    analyst: 'Jennifer Lee',
    fileSize: '2.9 MB',
    incidentId: 'CNT-134',
  },
  {
    id: 'RCA-007',
    title: 'Email Gateway Security Breach',
    service: 'Email Security',
    severity: 'critical',
    timestamp: '2023-12-12T10:22:36Z',
    analyst: 'David Wilson',
    fileSize: '5.6 MB',
    incidentId: 'ES-027',
  },
  {
    id: 'RCA-008',
    title: 'Endpoint Device Compromise',
    service: 'Workforce',
    severity: 'high',
    timestamp: '2023-12-18T15:11:48Z',
    analyst: 'Lisa Brown',
    fileSize: '2.2 MB',
    incidentId: 'WF-112',
  }
];

const RCAReports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<typeof rcaReports[0] | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleDownload = (reportId: string) => {
    // In a real app, this would trigger a download of the report file
    console.log(`Downloading report: ${reportId}`);
    // Show download confirmation using toast
    toast({
      title: "Download started",
      description: `Report ${reportId} is being downloaded`,
      duration: 3000,
    });
  };
  
  const handleViewReport = (report: typeof rcaReports[0]) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
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

  // Filter reports by search query and service
  const filteredReports = rcaReports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.analyst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.incidentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesService = serviceFilter === 'all' || report.service === serviceFilter;
    
    return matchesSearch && matchesService;
  });

  // Get unique services for filter dropdown
  const services = ['all', ...Array.from(new Set(rcaReports.map(report => report.service)))];
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Root Cause Analysis Reports
          </CardTitle>
          <CardDescription>
            Access and download historical root cause analysis reports from all services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by title, ID, or analyst..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-64">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service === 'all' ? 'All Services' : service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredReports.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Analyst</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow 
                      key={report.id} 
                      className="cursor-pointer" 
                      onClick={() => handleViewReport(report)}
                    >
                      <TableCell className="font-medium">
                        {report.id}
                        <div className="text-xs text-muted-foreground">
                          {report.incidentId}
                        </div>
                      </TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.service}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(report.timestamp)}</TableCell>
                      <TableCell>{report.analyst}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(report.id);
                          }}
                        >
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">{report.fileSize}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center p-8 border rounded-md bg-muted/40">
              <FileSearch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No reports found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Detail Dialog */}
      <RCAReportDetailDialog
        report={selectedReport}
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default RCAReports;
