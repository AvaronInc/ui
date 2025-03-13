
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ComplianceReport } from '@/types/sdms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileCheck, AlertTriangle, Calendar, Download } from 'lucide-react';

// Mock compliance reports
const mockReports: ComplianceReport[] = [
  {
    id: 'rep-1',
    name: 'GDPR Compliance Audit',
    standard: 'gdpr',
    createdAt: '2024-01-15T00:00:00.000Z',
    status: 'compliant',
    score: 92,
    issues: [
      {
        id: 'issue-1',
        description: 'User consent forms need updating to latest requirements',
        severity: 'low',
        remediation: 'Update privacy policy and consent forms to latest GDPR standards'
      }
    ]
  },
  {
    id: 'rep-2',
    name: 'HIPAA Security Assessment',
    standard: 'hipaa',
    createdAt: '2024-02-01T00:00:00.000Z',
    status: 'partially-compliant',
    score: 78,
    issues: [
      {
        id: 'issue-2',
        description: 'Insufficient audit logging for PHI access',
        severity: 'medium',
        remediation: 'Implement comprehensive audit logging for all PHI data access'
      },
      {
        id: 'issue-3',
        description: 'Missing encryption for some data at rest',
        severity: 'high',
        remediation: 'Enable encryption for all databases containing sensitive health information'
      }
    ]
  },
  {
    id: 'rep-3',
    name: 'SOC 2 Type II Preparation',
    standard: 'soc2',
    createdAt: '2024-02-15T00:00:00.000Z',
    status: 'partially-compliant',
    score: 85,
    issues: [
      {
        id: 'issue-4',
        description: 'Vendor management documentation incomplete',
        severity: 'medium',
        remediation: 'Update vendor management procedures and document all third-party risk assessments'
      }
    ]
  }
];

const ComplianceReports = () => {
  const [selectedReport, setSelectedReport] = useState<ComplianceReport | null>(null);
  const [reportFrequency, setReportFrequency] = useState("monthly");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Compliant</Badge>;
      case 'non-compliant':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Non-Compliant</Badge>;
      case 'partially-compliant':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Partially Compliant</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStandardName = (standard: string) => {
    switch (standard) {
      case 'gdpr':
        return 'GDPR';
      case 'hipaa':
        return 'HIPAA';
      case 'soc2':
        return 'SOC 2';
      case 'pci':
        return 'PCI DSS';
      default:
        return standard.toUpperCase();
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">High</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">Auto-Generated Compliance Reports</div>
      <p className="text-muted-foreground">
        AI-generated compliance reports for various regulatory standards.
      </p>
      
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>
                    Select a report to view details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <Card 
                        key={report.id} 
                        className={`cursor-pointer hover:bg-accent/50 ${selectedReport?.id === report.id ? 'bg-accent' : ''}`}
                        onClick={() => setSelectedReport(report)}
                      >
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm font-medium flex items-center justify-between">
                            <span>{report.name}</span>
                            {getStatusBadge(report.status)}
                          </CardTitle>
                          <CardDescription className="text-xs flex items-center justify-between">
                            <span>{getStandardName(report.standard)}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Generate New Report</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {selectedReport ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedReport.name}</CardTitle>
                        <CardDescription>
                          {getStandardName(selectedReport.standard)} • Generated on {new Date(selectedReport.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl">{selectedReport.score}%</div>
                        <div>{getStatusBadge(selectedReport.status)}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Compliance Issues</h3>
                        {selectedReport.issues.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Issue</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Remediation</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedReport.issues.map((issue) => (
                                <TableRow key={issue.id}>
                                  <TableCell>{issue.description}</TableCell>
                                  <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                                  <TableCell>{issue.remediation}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center p-4 bg-muted/50 rounded-md">
                            <FileCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">No compliance issues found</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm">Data Protection</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-center">
                              {selectedReport.standard === 'gdpr' ? '96%' : '90%'}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm">Access Controls</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-center">
                              {selectedReport.standard === 'hipaa' ? '82%' : '94%'}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm">Documentation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-center">
                              {selectedReport.standard === 'soc2' ? '88%' : '93%'}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Full Report</Button>
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      Export PDF
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full border rounded-lg p-8">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No Report Selected</h3>
                    <p className="text-muted-foreground mt-2">
                      Please select a report from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Report Schedule</CardTitle>
              <CardDescription>
                Configure automatic generation of compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Form>
                    <div className="space-y-4">
                      <FormField
                        name="frequency"
                        render={() => (
                          <FormItem>
                            <FormLabel>Report Frequency</FormLabel>
                            <Select defaultValue={reportFrequency} onValueChange={setReportFrequency}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="standards"
                        render={() => (
                          <FormItem>
                            <FormLabel>Compliance Standards</FormLabel>
                            <Select defaultValue="all">
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select standards" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="all">All Standards</SelectItem>
                                <SelectItem value="gdpr">GDPR</SelectItem>
                                <SelectItem value="hipaa">HIPAA</SelectItem>
                                <SelectItem value="soc2">SOC 2</SelectItem>
                                <SelectItem value="pci">PCI DSS</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="delivery"
                        render={() => (
                          <FormItem>
                            <FormLabel>Delivery Method</FormLabel>
                            <Select defaultValue="email">
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select delivery method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="storage">Save to Storage</SelectItem>
                                <SelectItem value="both">Email & Storage</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <Button className="w-full">Save Schedule</Button>
                    </div>
                  </Form>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Active Schedules</h3>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Monthly Compliance Report</span>
                        <Badge>Active</Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        All Standards • First day of month • Email & Storage
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>HIPAA Weekly Check</span>
                        <Badge>Active</Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        HIPAA • Every Monday • Email
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="standards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GDPR Compliance</CardTitle>
                <CardDescription>
                  General Data Protection Regulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overall Compliance:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">92%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Processing:</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Privacy Notices:</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subject Rights:</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Measures:</span>
                    <span className="font-medium">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>HIPAA Compliance</CardTitle>
                <CardDescription>
                  Health Insurance Portability and Accountability Act
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overall Compliance:</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">78%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Privacy Rule:</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Rule:</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Breach Notification:</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Enforcement Rule:</span>
                    <span className="font-medium">80%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SOC 2 Compliance</CardTitle>
                <CardDescription>
                  Service Organization Control 2
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overall Compliance:</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">85%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security:</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Integrity:</span>
                    <span className="font-medium">83%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidentiality:</span>
                    <span className="font-medium">86%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Privacy:</span>
                    <span className="font-medium">80%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PCI DSS Compliance</CardTitle>
                <CardDescription>
                  Payment Card Industry Data Security Standard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overall Compliance:</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Not Applicable</Badge>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-md">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      PCI DSS compliance monitoring has not been enabled for this network.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceReports;
