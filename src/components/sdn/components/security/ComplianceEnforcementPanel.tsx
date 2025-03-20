
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileCheck, Download, Clipboard, Check, CheckCircle, RefreshCw, AlertTriangle, FileWarning } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const ComplianceEnforcementPanel: React.FC = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('hipaa');
  
  const handleTemplateSave = () => {
    toast({
      title: "Template Applied",
      description: "Compliance template has been applied to your network"
    });
  };
  
  const complianceFrameworks = [
    {
      id: "hipaa",
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
      status: "compliant",
      score: 97,
      lastCheck: "2023-07-14 08:15"
    },
    {
      id: "pci",
      name: "PCI-DSS",
      description: "Payment Card Industry Data Security Standard",
      status: "warning",
      score: 85,
      lastCheck: "2023-07-14 09:22"
    },
    {
      id: "soc2",
      name: "SOC 2",
      description: "System and Organization Controls 2",
      status: "compliant",
      score: 94,
      lastCheck: "2023-07-13 15:48"
    },
    {
      id: "nist",
      name: "NIST 800-53",
      description: "National Institute of Standards and Technology",
      status: "warning",
      score: 82,
      lastCheck: "2023-07-12 11:34"
    }
  ];
  
  const auditLogEvents = [
    {
      id: 1,
      event: "User Authentication",
      user: "admin@example.com",
      timestamp: "2023-07-15 15:42:18",
      details: "Successful login from 192.168.1.45",
      compliance: ["HIPAA", "SOC2"]
    },
    {
      id: 2,
      event: "Firewall Rule Change",
      user: "network.admin@example.com",
      timestamp: "2023-07-15 14:22:37",
      details: "Modified rule #27 to restrict database access",
      compliance: ["PCI-DSS", "SOC2", "NIST"]
    },
    {
      id: 3,
      event: "Data Access",
      user: "john.doe@example.com",
      timestamp: "2023-07-15 13:15:09",
      details: "Accessed medical records database",
      compliance: ["HIPAA"]
    },
    {
      id: 4,
      event: "Configuration Change",
      user: "system@automated.task",
      timestamp: "2023-07-15 11:05:44",
      details: "Enabled encryption on backup channel",
      compliance: ["HIPAA", "PCI-DSS", "SOC2"]
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Compliant</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Warning</Badge>;
      case 'non-compliant':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getComplianceBadges = (complianceList: string[]) => {
    return (
      <div className="flex flex-wrap gap-1">
        {complianceList.map(compliance => (
          <Badge key={compliance} variant="outline" className="text-xs">
            {compliance}
          </Badge>
        ))}
      </div>
    );
  };
  
  const getComplianceColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
          <TabsTrigger value="templates">Compliance Templates</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceFrameworks.map(framework => (
              <Card key={framework.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{framework.name}</CardTitle>
                      <CardDescription>{framework.description}</CardDescription>
                    </div>
                    {getStatusBadge(framework.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Compliance Score</span>
                        <span className="text-sm font-medium">{framework.score}%</span>
                      </div>
                      <Progress 
                        value={framework.score} 
                        className={`h-2 ${getComplianceColor(framework.score)}`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Last checked:</span>
                        <div>{framework.lastCheck}</div>
                      </div>
                      <div className="text-sm text-right">
                        <Button variant="link" className="p-0 h-auto">View Details</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Run Check
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Controls in Compliance</h3>
                  </div>
                  <div className="text-3xl font-bold">42</div>
                  <div className="text-sm text-muted-foreground">Out of 52 total controls</div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h3 className="font-medium">Controls at Risk</h3>
                  </div>
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Remediation required</div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileWarning className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Non-Compliant Controls</h3>
                  </div>
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Urgent attention needed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Compliance Templates
              </CardTitle>
              <CardDescription>
                Pre-built templates for various regulatory frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border rounded-lg p-4 ${selectedTemplate === 'hipaa' ? 'border-primary bg-primary/5' : ''}`} 
                     onClick={() => setSelectedTemplate('hipaa')}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">HIPAA</h3>
                      <p className="text-sm text-muted-foreground">Health Insurance Portability and Accountability Act</p>
                    </div>
                    {selectedTemplate === 'hipaa' && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="mt-3 text-sm">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>PHI data protection controls</li>
                      <li>Access logging and auditing</li>
                      <li>Encryption requirements</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${selectedTemplate === 'pci' ? 'border-primary bg-primary/5' : ''}`}
                     onClick={() => setSelectedTemplate('pci')}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">PCI-DSS</h3>
                      <p className="text-sm text-muted-foreground">Payment Card Industry Data Security Standard</p>
                    </div>
                    {selectedTemplate === 'pci' && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="mt-3 text-sm">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Cardholder data protection</li>
                      <li>Network segmentation</li>
                      <li>Vulnerability management</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${selectedTemplate === 'soc2' ? 'border-primary bg-primary/5' : ''}`}
                     onClick={() => setSelectedTemplate('soc2')}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">SOC 2</h3>
                      <p className="text-sm text-muted-foreground">System and Organization Controls 2</p>
                    </div>
                    {selectedTemplate === 'soc2' && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="mt-3 text-sm">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Security and availability controls</li>
                      <li>Processing integrity</li>
                      <li>Privacy and confidentiality</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${selectedTemplate === 'nist' ? 'border-primary bg-primary/5' : ''}`}
                     onClick={() => setSelectedTemplate('nist')}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">NIST 800-53</h3>
                      <p className="text-sm text-muted-foreground">National Institute of Standards and Technology</p>
                    </div>
                    {selectedTemplate === 'nist' && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="mt-3 text-sm">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Federal information security</li>
                      <li>Risk management framework</li>
                      <li>Security control baselines</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  Preview Changes
                </Button>
                <Button onClick={handleTemplateSave}>
                  Apply Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-primary" />
                Audit Logs
              </CardTitle>
              <CardDescription>
                Comprehensive logs of all network access events for compliance reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm font-medium">Log Retention:</span>
                    <span className="ml-2">365 days</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Log Storage:</span>
                    <span className="ml-2">Encrypted</span>
                  </div>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Compliance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>{event.user}</TableCell>
                      <TableCell>{event.timestamp}</TableCell>
                      <TableCell>{event.details}</TableCell>
                      <TableCell>{getComplianceBadges(event.compliance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Audit Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SIEM Integration</h4>
                  <p className="text-sm text-muted-foreground">Send logs to external SIEM system</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Real-time Alerting</h4>
                  <p className="text-sm text-muted-foreground">Notify administrators of compliance violations</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automated Reports</h4>
                  <p className="text-sm text-muted-foreground">Generate and email weekly compliance reports</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Immutable Logging</h4>
                  <p className="text-sm text-muted-foreground">Prevent tampering with audit logs</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceEnforcementPanel;
