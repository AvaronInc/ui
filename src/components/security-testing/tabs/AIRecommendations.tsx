
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Server, LightbulbIcon, CheckCircle2, HelpCircle, RefreshCw, Filter } from 'lucide-react';
import AIInsightsChart from '../components/AIInsightsChart';
import RecommendationsList from '../components/RecommendationsList';

const AIRecommendations: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">AI Security Recommendations</h2>
          <p className="text-muted-foreground text-sm">AI-generated security insights and remediation suggestions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Analysis</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              Security Insights
            </CardTitle>
            <CardDescription>AI-powered security analysis based on test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                    <LightbulbIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">AI Security Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your recent test results, we've identified 12 security improvements that would significantly enhance your security posture. Primary concerns are found in firewall configurations and endpoint protection.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <AIInsightsChart />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                      <Server className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="font-medium">Firewall Rules</span>
                  </div>
                  <div className="mt-1 text-sm">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                      4 High Risk Issues
                    </Badge>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                      <Server className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="font-medium">Network Segmentation</span>
                  </div>
                  <div className="mt-1 text-sm">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                      3 Medium Risk Issues
                    </Badge>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Server className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium">Access Controls</span>
                  </div>
                  <div className="mt-1 text-sm">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                      Properly Configured
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Automated Response</CardTitle>
            <CardDescription>One-click remediation options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 dark:hover:border-blue-800 cursor-pointer transition-colors">
                <div className="flex justify-between">
                  <h3 className="font-medium">Firewall Hardening</h3>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High Priority</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Apply recommended firewall configurations to close 4 detected vulnerabilities</p>
                <div className="mt-2 flex items-center text-xs gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-muted-foreground">Remediation available</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 dark:hover:border-blue-800 cursor-pointer transition-colors">
                <div className="flex justify-between">
                  <h3 className="font-medium">Update IDS Signatures</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium Priority</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Update intrusion detection signatures to latest version</p>
                <div className="mt-2 flex items-center text-xs gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-muted-foreground">Remediation available</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 dark:hover:border-blue-800 cursor-pointer transition-colors">
                <div className="flex justify-between">
                  <h3 className="font-medium">Zero Trust Implementation</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium Priority</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Implement additional zero trust network access controls</p>
                <div className="mt-2 flex items-center text-xs gap-1">
                  <HelpCircle className="h-3.5 w-3.5 text-yellow-600" />
                  <span className="text-muted-foreground">Requires Change Management</span>
                </div>
              </div>
              
              <Button className="w-full">
                Apply All Safe Remediations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Detailed Recommendations</CardTitle>
          <CardDescription>Comprehensive security improvement suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
