
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, ActivitySquare, AlertTriangle, Network } from 'lucide-react';

const AIThreatAnalysis: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                <span className="font-medium">AI Threat Prediction</span>
              </div>
              <Badge className="bg-amber-100 text-amber-800">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered prediction of potential threats based on behavior analysis
            </p>
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs">Prediction Confidence</span>
                <span className="text-xs">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ActivitySquare className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-medium">Behavioral Analysis</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Learning</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Continuous analysis of user and network behavior for anomalies
            </p>
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs">Detection Accuracy</span>
                <span className="text-xs">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="network" className="w-full space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="endpoint">Endpoint</TabsTrigger>
          <TabsTrigger value="user">User Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="network">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-700">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <div className="font-medium">Unusual Traffic Pattern Detected</div>
                    <div className="text-sm text-muted-foreground">High volume of outbound traffic to uncommon destinations</div>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Medium Risk</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Network Behavior Analysis</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Current Outbound Traffic</span>
                    <span className="font-medium text-amber-500">2.3 GB/hour</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Baseline Traffic</span>
                    <span className="font-medium">0.8 GB/hour</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unusual Destination IPs</span>
                    <span className="font-medium">5 detected</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Protocol Anomalies</span>
                    <span className="font-medium">3 detected</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <div className="font-medium mb-1">AI Recommendation:</div>
                <p>Investigate the unusual outbound traffic to the following IPs: 203.0.113.15, 203.0.113.28, 198.51.100.7, 198.51.100.12, 198.51.100.22. Consider temporarily restricting outbound traffic to these destinations while investigation is ongoing.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="endpoint">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-700">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <div className="font-medium">Multiple Failed Login Attempts</div>
                    <div className="text-sm text-muted-foreground">Unusual login activity detected on multiple endpoints</div>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">High Risk</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Affected Endpoints</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>workstation-12.internal</span>
                    <span className="font-medium text-red-500">12 failed attempts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>workstation-15.internal</span>
                    <span className="font-medium text-red-500">8 failed attempts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>laptop-exec-3.internal</span>
                    <span className="font-medium text-red-500">7 failed attempts</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <div className="font-medium mb-1">AI Recommendation:</div>
                <p>Possible coordinated brute force attack in progress. Recommend temporary lockout of affected accounts, enable additional authentication factors, and investigate source of attack attempts (Source IP: 198.51.100.55).</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200 dark:border-blue-700">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <div className="font-medium">Unusual User Activity</div>
                    <div className="text-sm text-muted-foreground">Access patterns deviate from established baseline</div>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Low Risk</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Behavior Analysis</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>User</span>
                    <span className="font-medium">jsmith@company.com</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unusual Access Time</span>
                    <span className="font-medium">3:15 AM (Local)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Resources Accessed</span>
                    <span className="font-medium">Financial Reports, HR Database</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Anomaly Score</span>
                    <span className="font-medium">68/100</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <div className="font-medium mb-1">AI Recommendation:</div>
                <p>Monitor user activity closely. While not immediately alarming, this activity is outside normal patterns. Consider confirming with the user if this access was legitimate, as it occurred outside normal working hours.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIThreatAnalysis;
