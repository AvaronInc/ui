
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Zap, Brain, Shield, RefreshCw, ActivitySquare, Settings, ArrowRight } from 'lucide-react';
import AIThreatClassificationChart from '../components/AIThreatClassificationChart';
import SecurityAutomationRules from '../components/SecurityAutomationRules';
import SecurityCorrelationDiagram from '../components/SecurityCorrelationDiagram';

const SecurityAutomation: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('threat-hunting');
  
  const handleOptimizeAI = () => {
    toast({
      title: "AI Optimization Started",
      description: "Optimizing AI models based on your environment's specific threat landscape.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI-Driven Security Automation</h2>
          <p className="text-muted-foreground">
            Automated threat hunting and self-healing infrastructure
          </p>
        </div>
        <Button size="sm" onClick={handleOptimizeAI}>
          <Brain className="mr-2 h-4 w-4" />
          Optimize AI Models
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Security Capabilities</CardTitle>
          <CardDescription>
            Intelligent security automation capabilities across your infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">Threat Classification</div>
              <div className="h-[150px]">
                <AIThreatClassificationChart />
              </div>
              <div className="text-xs text-muted-foreground">
                AI accuracy in correctly classifying security threats
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm font-medium">Learning Progress</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Pattern Recognition</span>
                    <span className="text-xs">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Behavior Analysis</span>
                    <span className="text-xs">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Anomaly Detection</span>
                    <span className="text-xs">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Predictive Analysis</span>
                    <span className="text-xs">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                AI model training and learning progress across security dimensions
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm font-medium">Automated Response Statistics</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-xs">Threats Identified</span>
                  <Badge variant="secondary">1,243</Badge>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-xs">Auto-Remediated</span>
                  <Badge variant="secondary">986</Badge>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-xs">Manual Intervention</span>
                  <Badge variant="secondary">257</Badge>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-xs">Success Rate</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">79.3%</Badge>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Effectiveness of automated threat remediation actions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="threat-hunting" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="threat-hunting" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Threat Hunting & Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="self-healing" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Self-Healing Infrastructure</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="threat-hunting">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Correlation Engine</CardTitle>
                <CardDescription>
                  AI-powered correlation of security events across the enterprise
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SecurityCorrelationDiagram />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    AI Learning Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="self-learning">Self-Learning AI</Label>
                    <Switch id="self-learning" defaultChecked />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="learning-approach">Learning Approach</Label>
                    <Select defaultValue="hybrid">
                      <SelectTrigger id="learning-approach">
                        <SelectValue placeholder="Select approach" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supervised">Supervised Learning</SelectItem>
                        <SelectItem value="unsupervised">Unsupervised Learning</SelectItem>
                        <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feedback-loop">Enable Feedback Loop</Label>
                    <Switch id="feedback-loop" defaultChecked />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="model-training">Model Training Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="model-training">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ActivitySquare className="mr-2 h-5 w-5" />
                    Threat Classification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Enabled Threat Categories</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Malware</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Phishing</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Ransomware</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Data Exfiltration</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Brute Force</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Insider Threats</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Zero-Day Exploits</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="zero-day">Zero-Day Exploit Detection</Label>
                    <Switch id="zero-day" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="behavior-analysis">Behavioral Analysis</Label>
                    <Switch id="behavior-analysis" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prediction">Threat Prediction</Label>
                    <Switch id="prediction" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="self-healing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Automation Rules</CardTitle>
                <CardDescription>
                  Configure automated responses to security incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityAutomationRules />
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Create New Automation Rule
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Automated Security Responses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="firewall-policy">Automated Firewall Policy Adjustments</Label>
                    <Switch id="firewall-policy" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="os-hardening">Real-Time OS Hardening</Label>
                    <Switch id="os-hardening" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="patch-mgmt">Automated Patch Management</Label>
                    <Switch id="patch-mgmt" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isolation">Endpoint Isolation & Healing</Label>
                    <Switch id="isolation" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    System Recovery Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="snapshots">Automated System Snapshots</Label>
                    <Switch id="snapshots" defaultChecked />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="snapshot-frequency">Snapshot Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="snapshot-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rollback">Automated Rollback on Attack</Label>
                    <Switch id="rollback" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="test-recovery">Automatic Recovery Testing</Label>
                    <Switch id="test-recovery" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityAutomation;
