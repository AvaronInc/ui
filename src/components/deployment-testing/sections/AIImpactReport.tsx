import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, AlertTriangle, AlertCircle, FileText, Download, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeDiffView } from './ai-report/CodeDiffView';

interface AIImpactReportProps {
  results: any | null;
}

const AIImpactReport: React.FC<AIImpactReportProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState('summary');

  if (!results) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Test Results Available</h2>
        <p className="text-muted-foreground">
          Run a deployment test to see AI-generated impact analysis here.
        </p>
      </div>
    );
  }

  const { riskScore, configDiff, affectedServices, criticalIssues, warnings } = results;
  
  const getRiskColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const configChanges = {
    before: `{
  "networkSettings": {
    "zone": "us-east-1",
    "subnetMask": "255.255.255.0",
    "gatewayIP": "10.0.1.1",
    "dnsServers": ["8.8.8.8", "1.1.1.1"],
    "ipRange": "10.0.1.0/24",
    "vlan": 100
  }
}`,
    after: `{
  "networkSettings": {
    "zone": "us-east-1",
    "subnetMask": "255.255.255.0", 
    "gatewayIP": "10.0.1.1",
    "dnsServers": ["8.8.8.8", "1.1.1.1", "9.9.9.9"],
    "ipRange": "10.0.4.0/24",
    "vlan": 200,
    "mtu": 1500
  }
}`,
    fileType: 'json'
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">AI-Generated Impact Report</h2>
        <p className="text-sm text-muted-foreground">
          AI analysis of potential impacts based on simulated deployment of your configuration changes.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Impact Summary</TabsTrigger>
          <TabsTrigger value="diff">Configuration Changes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Risk Assessment</span>
                  <Badge 
                    variant={criticalIssues > 0 ? "destructive" : warnings > 0 ? "outline" : "default"}
                    className={criticalIssues > 0 ? "bg-red-500" : warnings > 0 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500" : "bg-green-500"}
                  >
                    {criticalIssues > 0 ? "High Risk" : warnings > 0 ? "Medium Risk" : "Low Risk"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <div className={`text-5xl font-bold ${getRiskColor(riskScore)}`}>
                      {riskScore}%
                    </div>
                    <p className="text-sm text-muted-foreground">Confidence in Successful Deployment</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span>{criticalIssues > 0 ? "High" : warnings > 0 ? "Medium" : "Low"}</span>
                    </div>
                    <Progress 
                      value={riskScore} 
                      className="h-2"
                      indicatorClassName={riskScore >= 90 ? "bg-green-500" : riskScore >= 70 ? "bg-yellow-500" : "bg-red-500"}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span>Critical Issues</span>
                      </div>
                      <span className="font-medium">{criticalIssues}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Warnings</span>
                      </div>
                      <span className="font-medium">{warnings}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Passed Checks</span>
                      </div>
                      <span className="font-medium">32</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export as PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Configuration Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <div className="text-xl font-bold text-green-500">+{configDiff.added}</div>
                      <p className="text-xs text-muted-foreground">Added</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <div className="text-xl font-bold text-red-500">-{configDiff.removed}</div>
                      <p className="text-xs text-muted-foreground">Removed</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <div className="text-xl font-bold text-blue-500">{configDiff.modified}</div>
                      <p className="text-xs text-muted-foreground">Modified</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-3">Affected Services</h4>
                    <div className="space-y-3">
                      {affectedServices.map((service: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{service.name}</span>
                          <Badge
                            variant="outline"
                            className={
                              service.impact === "none" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500" 
                                : service.impact === "minor" 
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
                            }
                          >
                            {service.impact === "none" ? "No Impact" : service.impact === "minor" ? "Minor Impact" : "Major Impact"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">AI Recommendations</h4>
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                        <span className="text-sm">Configuration can be applied without service disruption</span>
                      </div>
                      {warnings > 0 && (
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                          <span className="text-sm">Consider increasing timeout values for better compatibility with existing services</span>
                        </div>
                      )}
                      {warnings > 1 && (
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                          <span className="text-sm">Update documentation to reflect new IP range allocations</span>
                        </div>
                      )}
                      {criticalIssues > 0 && (
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                          <span className="text-sm">CRITICAL: Potential IP address conflicts detected in subnet 10.0.4.0/24</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Timeline Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estimated Deployment Time</span>
                  <span className="text-sm">15-20 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Potential Service Interruption</span>
                  <span className="text-sm">{criticalIssues > 0 ? "5-10 minutes" : "None expected"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recommended Maintenance Window</span>
                  <span className="text-sm">{criticalIssues > 0 ? "Off-hours required" : warnings > 0 ? "Business hours with caution" : "Anytime"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rollback Time (if needed)</span>
                  <span className="text-sm">5 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diff">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Configuration Changes Detail</span>
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  Download Complete Diff
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 mr-2"></div>
                    <span>Removed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 mr-2"></div>
                    <span>Added</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900/30 mr-2"></div>
                    <span>Modified</span>
                  </div>
                </div>
                
                <CodeDiffView
                  before={configChanges.before}
                  after={configChanges.after}
                  fileType={configChanges.fileType}
                />

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Change Summary</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Added DNS server: 9.9.9.9</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Changed IP range from 10.0.1.0/24 to 10.0.4.0/24</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Changed VLAN from 100 to 200</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Added MTU setting: 1500</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Analysis of Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                  <span className="text-sm">IP range change to 10.0.4.0/24 may impact existing services expecting the previous range</span>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                  <span className="text-sm">VLAN change from 100 to 200 will require switch configuration updates</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span className="text-sm">Adding DNS server 9.9.9.9 provides additional DNS resilience</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span className="text-sm">MTU of 1500 is standard and compatible with most networks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIImpactReport;
