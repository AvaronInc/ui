
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Shield, 
  Download, 
  Search, 
  Clock, 
  Filter, 
  BarChart4,
  AlertTriangle,
  CheckCircle,
  Server,
  RefreshCw,
  HardDrive,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const complianceReports = [
  { id: 1, name: 'GDPR Compliance Report', type: 'regulatory', date: '2025-03-15', status: 'compliant', score: 98 },
  { id: 2, name: 'PCI-DSS Audit Report', type: 'regulatory', date: '2025-03-01', status: 'compliant', score: 95 },
  { id: 3, name: 'SOC 2 Security Assessment', type: 'audit', date: '2025-02-20', status: 'compliant', score: 92 },
  { id: 4, name: 'HIPAA Compliance Check', type: 'regulatory', date: '2025-02-15', status: 'action-needed', score: 87 },
  { id: 5, name: 'NIST 800-53 Assessment', type: 'audit', date: '2025-02-01', status: 'compliant', score: 94 },
];

const securityEvents = [
  { id: 1, timestamp: '2025-03-20 08:42:15', type: 'BLOCK', source: '203.0.113.12', destination: '192.168.1.5', rule: 'SQL Injection Detection', severity: 'critical' },
  { id: 2, timestamp: '2025-03-20 09:12:37', type: 'ALERT', source: '192.168.1.105', destination: '198.51.100.28', rule: 'Unusual Outbound Traffic', severity: 'medium' },
  { id: 3, timestamp: '2025-03-20 10:03:58', type: 'ALLOW', source: '192.168.1.110', destination: '192.168.1.25', rule: 'Internal Traffic', severity: 'info' },
  { id: 4, timestamp: '2025-03-20 10:15:22', type: 'BLOCK', source: '198.51.100.73', destination: '192.168.1.10', rule: 'Brute Force Protection', severity: 'high' },
  { id: 5, timestamp: '2025-03-20 10:31:45', type: 'ALERT', source: '192.168.1.118', destination: '203.0.113.56', rule: 'Data Exfiltration Attempt', severity: 'high' },
];

const complianceFrameworks = [
  { id: 1, name: 'PCI-DSS', enabled: true, version: '4.0', requirements: 12, requirementsCompleted: 11 },
  { id: 2, name: 'GDPR', enabled: true, version: '2018', requirements: 10, requirementsCompleted: 10 },
  { id: 3, name: 'SOC 2', enabled: true, version: 'Type II', requirements: 5, requirementsCompleted: 5 },
  { id: 4, name: 'HIPAA', enabled: true, version: '2023', requirements: 8, requirementsCompleted: 7 },
  { id: 5, name: 'NIST 800-53', enabled: true, version: 'Rev. 5', requirements: 20, requirementsCompleted: 19 },
  { id: 6, name: 'ISO 27001', enabled: false, version: '2022', requirements: 14, requirementsCompleted: 0 },
];

type LoggingComplianceProps = {
  form: UseFormReturn<any>;
};

const LoggingCompliance: React.FC<LoggingComplianceProps> = ({ form }) => {
  const [fullLoggingEnabled, setFullLoggingEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('logs');
  const [searchValue, setSearchValue] = useState('');
  
  const handleToggleLogging = () => {
    setFullLoggingEnabled(!fullLoggingEnabled);
    toast.success(`Full compliance logging ${!fullLoggingEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleExportLogs = () => {
    toast.success('Log export initiated. Download will begin shortly.');
  };
  
  const handleExportReport = (id: number) => {
    toast.success(`Report #${id} export initiated. Download will begin shortly.`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-semibold">Logging & Compliance</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive logging, auditing, and regulatory compliance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Switch 
              checked={fullLoggingEnabled} 
              onCheckedChange={handleToggleLogging}
            />
            <span className={fullLoggingEnabled ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {fullLoggingEnabled ? "Full Logging Active" : "Basic Logging Only"}
            </span>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-1" />
            Export Logs
          </Button>
        </div>
      </div>
      
      {/* Logging Status Card */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Log Storage</h3>
              <div className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2 text-blue-600" />
                <span className="text-lg font-medium">2.4 TB / 5 TB</span>
              </div>
              <Progress value={48} className="h-2" />
              <p className="text-sm text-muted-foreground">
                48% utilized
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Retention Period</h3>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                <span className="text-lg font-medium">365 Days</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All security logs kept for 1 year
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">SIEM Integration</h3>
              <div className="flex items-center">
                <Server className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-lg font-medium">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connected to ELK Stack
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Overall Compliance</h3>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-lg font-medium">96%</span>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  PCI-DSS
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  GDPR
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  SOC 2
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="logs">Firewall Logs</TabsTrigger>
          <TabsTrigger value="forensics">Forensic Mode</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="siem">SIEM Integration</TabsTrigger>
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="space-y-4 pt-4">
          <div className="flex justify-between">
            <div className="relative w-1/3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
              
              <Button variant="outline" onClick={handleExportLogs}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Rule</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={
                          event.type === 'BLOCK' ? 'destructive' : 
                          event.type === 'ALERT' ? 'default' : 
                          'outline'
                        }>
                          {event.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.source}</TableCell>
                      <TableCell>{event.destination}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={event.rule}>{event.rule}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          event.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          event.severity === 'high' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                          event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          event.severity === 'low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        }>
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Search className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              Showing 5 of 1,245 log entries
            </div>
            
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="forensics" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forensic Analysis Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Forensic mode allows for detailed investigation of security incidents with advanced log correlation and timeline visualization.
                Use this mode to perform historical traffic analysis and build forensic evidence for security investigations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Historical Query</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Range</label>
                      <div className="flex gap-2">
                        <Input type="datetime-local" className="flex-1" />
                        <span className="flex items-center">to</span>
                        <Input type="datetime-local" className="flex-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">IP Address Filter</label>
                      <Input placeholder="e.g. 192.168.1.5 or leave blank for all" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Events</SelectItem>
                          <SelectItem value="block">Blocked Traffic</SelectItem>
                          <SelectItem value="allow">Allowed Traffic</SelectItem>
                          <SelectItem value="alert">Security Alerts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">
                        <Search className="h-4 w-4 mr-1" />
                        Run Forensic Query
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Advanced Options</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Timeline Visualization</h4>
                        <p className="text-sm text-muted-foreground">Interactive event timeline</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Connection Mapping</h4>
                        <p className="text-sm text-muted-foreground">Map related network connections</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Full Packet Capture</h4>
                        <p className="text-sm text-muted-foreground">Include raw packet data if available</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Correlation Engine</h4>
                        <p className="text-sm text-muted-foreground">Connect related security events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center py-8 border-2 border-dashed rounded-md bg-muted">
                <div className="text-center">
                  <BarChart4 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">Forensic Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Run a query to see timeline visualization and analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="pt-4 space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Compliance Reports</h3>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-1" />
                Run New Assessment
              </Button>
              
              <Button>
                <FileText className="h-4 w-4 mr-1" />
                Generate Report
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compliance Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'compliant' ? 'outline' : 'default'} className={
                          report.status === 'compliant' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                          'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }>
                          {report.status === 'compliant' ? 'Compliant' : 'Action Needed'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={report.score} className="h-2 w-16" />
                          <span>{report.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleExportReport(report.id)}>
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Compliance Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceFrameworks.map((framework) => (
                    <div key={framework.id} className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{framework.name}</h4>
                          <Badge variant="outline" className="text-xs">v{framework.version}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{framework.requirementsCompleted} of {framework.requirements} requirements met</span>
                          <Progress value={(framework.requirementsCompleted / framework.requirements) * 100} className="h-1.5 w-16" />
                        </div>
                      </div>
                      <Switch checked={framework.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Compliance Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">PCI-DSS Issue</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Requirement 3.4: Encrypt transmission of cardholder data across open, public networks.
                        Some internal services are using outdated TLS versions.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-white dark:bg-background">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">HIPAA Compliance</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        §164.312(e)(1): Implement technical security measures to guard against unauthorized
                        access to PHI being transmitted over an electronic network.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-white dark:bg-background">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-300">SOC 2 Compliant</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        All Type II requirements are met. Next assessment due in 6 months.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="siem" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SIEM Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure integration with Security Information and Event Management (SIEM) systems for centralized log management,
                correlation, and analysis.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Current SIEM Configuration</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">ELK Stack Integration</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Elasticsearch, Logstash, Kibana</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Wazuh Dashboard</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Intrusion detection visualization</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Splunk Integration</h4>
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">Inactive</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Enterprise log management</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Log Forwarding</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Log Format</label>
                      <Select defaultValue="json">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="cef">CEF (Common Event Format)</SelectItem>
                          <SelectItem value="leef">LEEF (Log Event Extended Format)</SelectItem>
                          <SelectItem value="syslog">Syslog</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Categories</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="security" className="h-4 w-4" defaultChecked />
                          <label htmlFor="security" className="text-sm">Security Events</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="traffic" className="h-4 w-4" defaultChecked />
                          <label htmlFor="traffic" className="text-sm">Traffic Logs</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="system" className="h-4 w-4" defaultChecked />
                          <label htmlFor="system" className="text-sm">System Events</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="audit" className="h-4 w-4" defaultChecked />
                          <label htmlFor="audit" className="text-sm">Audit Logs</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="compliance" className="h-4 w-4" defaultChecked />
                          <label htmlFor="compliance" className="text-sm">Compliance Events</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="debug" className="h-4 w-4" />
                          <label htmlFor="debug" className="text-sm">Debug Logs</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Real-time Forwarding</h4>
                        <p className="text-sm text-muted-foreground">Send logs as they are generated</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Batched Forwarding</h4>
                        <p className="text-sm text-muted-foreground">Send logs in batches (every 5 minutes)</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Test Connection</Button>
                <Button>Save SIEM Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Alert Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure how and when security alerts are triggered, and define notification channels for different severities and event types.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Alert Triggers</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Critical Security Events</h4>
                          <Badge variant="destructive">Immediate</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Intrusion attempts, malware detection</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">High-Priority Events</h4>
                          <Badge>5 Minutes</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Multiple failed logins, permission escalation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Policy Violations</h4>
                          <Badge variant="outline">Hourly Digest</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Compliance violations, policy breaches</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">System Events</h4>
                          <Badge variant="outline">Daily Digest</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Configuration changes, updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Alert Channels</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">security-team@example.com</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">SMS Alerts</h4>
                        <p className="text-sm text-muted-foreground">Critical events only</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Microsoft Teams</h4>
                        <p className="text-sm text-muted-foreground">Security channel webhook</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Slack Notifications</h4>
                        <p className="text-sm text-muted-foreground">Not configured</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">Ticketing System Integration</h4>
                        <p className="text-sm text-muted-foreground">Create tickets for critical alerts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Alert Templates</h3>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Security Alert Template</h4>
                  <div className="bg-muted p-3 rounded text-sm font-mono">
                    <p>[Severity] Security Alert: [Event Type]</p>
                    <p>Time: [Timestamp]</p>
                    <p>Source: [Source IP/Host]</p>
                    <p>Destination: [Destination IP/Host]</p>
                    <p>Rule: [Rule Name]</p>
                    <p>Details: [Event Details]</p>
                    <p>Recommended Action: [Action]</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm">
                      Edit Template
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Test Alerts</Button>
                <Button>Save Alert Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoggingCompliance;
