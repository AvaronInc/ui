
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, AlertTriangle, Info, FileText, Download, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

interface AIImpactReportProps {
  testResults: any; // In a real app, this would have a proper type
  testId: string | null;
}

const AIImpactReport: React.FC<AIImpactReportProps> = ({ testResults, testId }) => {
  const [activeView, setActiveView] = useState('summary');
  const { toast } = useToast();

  if (!testResults || !testId) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Test Results Available</h3>
        <p className="text-sm text-muted-foreground mb-6">Run a deployment test simulation first to view AI-generated impact analysis.</p>
        <Button variant="outline">Go to Run Test Scenario</Button>
      </div>
    );
  }

  const exportReport = () => {
    toast({
      title: "Report Exported",
      description: "The report has been exported as a PDF file"
    });
  };

  const shareReport = () => {
    toast({
      title: "Report Shared",
      description: "Share link has been copied to clipboard"
    });
  };

  const getRiskLevel = (score: number) => {
    if (score >= 90) return { label: 'Low Risk', color: 'bg-green-500' };
    if (score >= 75) return { label: 'Moderate Risk', color: 'bg-amber-500' };
    return { label: 'High Risk', color: 'bg-red-500' };
  };

  const riskInfo = getRiskLevel(testResults.riskScore);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">AI-Generated Impact Report</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive analysis of potential impacts from the simulated deployment.
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={exportReport}>
            <FileText className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" size="sm" onClick={shareReport}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{testResults.riskScore}%</div>
              <Badge className={`${riskInfo.color} text-white`}>{riskInfo.label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {testResults.configType} impact simulation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{testResults.confidence}%</div>
              <Badge variant="outline">AI Prediction</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {testResults.replicateZone ? "actual zone data" : "simulated environment"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{testResults.affectedEndpoints}</div>
              <Badge variant="secondary">Endpoints Affected</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Est. downtime: {testResults.estimatedDowntime} {testResults.estimatedDowntime === 1 ? 'minute' : 'minutes'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Impact Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Key Findings</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Configuration successfully applied in simulation environment</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                    <span>Service dependency warning detected: Auth service restart required</span>
                  </li>
                  {testResults.criticalIssues.length > 0 && (
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span>{testResults.criticalIssues[0]}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Impacted Services</h4>
                <div className="flex flex-wrap gap-2">
                  {testResults.impactedServices.map((service: string) => (
                    <Badge key={service} variant="outline">{service}</Badge>
                  ))}
                </div>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This deployment may require a brief service interruption during the maintenance window.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Configuration Diff</h4>
                <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                  <code>
                    {`+ {
  "${testResults.configType.toLowerCase()}": {
    ${testResults.configData.slice(10, 100)}...
  }
}`}
                  </code>
                </pre>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Performance Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Network Latency</span>
                      <Badge variant="outline" className="text-green-500">+0.3ms</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Throughput</span>
                      <Badge variant="outline" className="text-amber-500">-2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Connection Rate</span>
                      <Badge variant="outline" className="text-green-500">No Change</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Security Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Surface Area</span>
                      <Badge variant="outline" className="text-green-500">No Change</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Access Controls</span>
                      <Badge variant="outline" className="text-green-500">Improved</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Logging Coverage</span>
                      <Badge variant="outline" className="text-amber-500">Gap Detected</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">AI Recommendations</h4>
                <ul className="space-y-3">
                  {testResults.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">{rec}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Suggested Schedule</h4>
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Recommended Deployment Window</span>
                    <Badge>Off-Peak Hours</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on traffic analysis, the optimal deployment time is between 11:00 PM and 2:00 AM.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
                <Button size="sm">
                  Attach to Change Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIImpactReport;
