import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Bot,
  Shield,
  Zap,
  Brain,
  MapPin,
  Bell,
  Check,
  X,
  AlertCircle,
  Lock,
  BarChart,
  RefreshCw,
  PlusCircle
} from 'lucide-react';

interface AIRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  action: 'allow' | 'block';
  confidence: number;
  status: 'active' | 'proposed' | 'rejected';
  created: string;
  threat: string;
  automated: boolean;
}

const AIThreatPanel = () => {
  const { toast } = useToast();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [autoBlocking, setAutoBlocking] = useState(false);
  const [zeroTrust, setZeroTrust] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  
  const [aiRules, setAiRules] = useState<AIRule[]>([
    {
      id: '1',
      name: 'Block Malicious IP Range',
      source: '194.31.98.0/24',
      destination: 'Any',
      action: 'block',
      confidence: 96,
      status: 'active',
      created: '2025-03-15 08:43:21',
      threat: 'Command & Control Traffic',
      automated: true
    },
    {
      id: '2',
      name: 'Restrict Suspicious Host',
      source: '10.0.3.45',
      destination: 'Internet',
      action: 'block',
      confidence: 88,
      status: 'active',
      created: '2025-03-17 14:21:05',
      threat: 'Data Exfiltration',
      automated: true
    },
    {
      id: '3',
      name: 'Allow Legitimate Service',
      source: 'Any',
      destination: '10.0.2.15:8080',
      action: 'allow',
      confidence: 92,
      status: 'active',
      created: '2025-03-18 11:05:33',
      threat: 'False Positive Resolution',
      automated: false
    },
    {
      id: '4',
      name: 'Block Port Scanning',
      source: '172.16.83.12',
      destination: 'Any',
      action: 'block',
      confidence: 71,
      status: 'proposed',
      created: '2025-03-19 16:32:45',
      threat: 'Port Scanning Activity',
      automated: false
    },
    {
      id: '5',
      name: 'Segment IoT Device',
      source: '10.0.4.102',
      destination: 'Internal Network',
      action: 'block',
      confidence: 63,
      status: 'proposed',
      created: '2025-03-20 09:15:27',
      threat: 'Anomalous Behavior',
      automated: false
    }
  ]);

  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "AI Security Disabled" : "AI Security Enabled",
      description: aiEnabled 
        ? "AI-powered security features have been turned off." 
        : "AI-powered security features are now active.",
    });
  };

  const toggleLearningMode = () => {
    setLearningMode(!learningMode);
    toast({
      title: learningMode ? "Learning Mode Disabled" : "Learning Mode Enabled",
      description: learningMode 
        ? "AI will no longer adapt rules based on traffic patterns." 
        : "AI will now learn from traffic patterns and adapt rules accordingly.",
    });
  };

  const toggleAutoBlocking = () => {
    setAutoBlocking(!autoBlocking);
    toast({
      title: autoBlocking ? "Auto-Blocking Disabled" : "Auto-Blocking Enabled",
      description: autoBlocking 
        ? "AI will only suggest rules for admin approval." 
        : "AI will automatically implement high-confidence blocking rules.",
    });
  };

  const toggleZeroTrust = () => {
    setZeroTrust(!zeroTrust);
    toast({
      title: zeroTrust ? "Zero Trust Segmentation Disabled" : "Zero Trust Segmentation Enabled",
      description: zeroTrust 
        ? "Automatic isolation of high-risk endpoints disabled." 
        : "AI will now automatically segment high-risk endpoints.",
    });
  };

  const handleApproveRule = (id: string) => {
    setAiRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: 'active' } : rule
    ));
    toast({
      title: "Rule Approved",
      description: "The AI-suggested rule has been activated.",
    });
  };

  const handleRejectRule = (id: string) => {
    setAiRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: 'rejected' } : rule
    ));
    toast({
      title: "Rule Rejected",
      description: "The AI-suggested rule has been rejected.",
    });
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <Check className="h-3 w-3" /> {confidence}%
        </Badge>
      );
    } else if (confidence >= 70) {
      return (
        <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
          <Bell className="h-3 w-3" /> {confidence}%
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
          <X className="h-3 w-3" /> {confidence}%
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Controls */}
      <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">AI-Powered Firewall Intelligence</h3>
            <p className="text-sm text-muted-foreground">Autonomous threat detection and response</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {aiEnabled ? 'AI Security Active' : 'AI Security Inactive'}
          </span>
          <Switch 
            checked={aiEnabled} 
            onCheckedChange={toggleAI} 
          />
        </div>
      </div>

      {/* AI Settings Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Adaptive AI Settings
            </CardTitle>
            <CardDescription>
              Configure how the AI learns and responds to threats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Self-Learning Firewall</div>
                <div className="text-sm text-muted-foreground">
                  Learns traffic patterns and updates rules
                </div>
              </div>
              <Switch 
                checked={learningMode} 
                onCheckedChange={toggleLearningMode} 
                disabled={!aiEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Dynamic Threat Blocking</div>
                <div className="text-sm text-muted-foreground">
                  Automatically create rules for emerging threats
                </div>
              </div>
              <Switch 
                checked={autoBlocking} 
                onCheckedChange={toggleAutoBlocking} 
                disabled={!aiEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Zero Trust Segmentation</div>
                <div className="text-sm text-muted-foreground">
                  Automatically isolate high-risk endpoints
                </div>
              </div>
              <Switch 
                checked={zeroTrust} 
                onCheckedChange={toggleZeroTrust} 
                disabled={!aiEnabled}
              />
            </div>
            
            <div className="pt-2">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Confidence Threshold</span>
                <span className="text-sm">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className="w-full"
                disabled={!aiEnabled || !autoBlocking}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Permissive</span>
                <span>Strict</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Security Intelligence
            </CardTitle>
            <CardDescription>
              AI-driven security metrics and predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Rules Created</div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-xs text-muted-foreground mt-1">Past 7 days</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Threats Blocked</div>
                <div className="text-2xl font-bold">143</div>
                <div className="text-xs text-muted-foreground mt-1">Past 7 days</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">False Positives</div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground mt-1">2.1% of detections</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Learning Hours</div>
                <div className="text-2xl font-bold">124</div>
                <div className="text-xs text-muted-foreground mt-1">Model maturity 78%</div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh Stats
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Run Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Rules Panel */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI-Generated Firewall Rules
            </CardTitle>
            <Button size="sm" disabled={!aiEnabled}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Generate Rule
            </Button>
          </div>
          <CardDescription>
            View and manage rules automatically created by the AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Rules</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="proposed">Proposed</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Status</th>
                      <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiRules.map((rule) => (
                      <tr key={rule.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-xs text-muted-foreground">{rule.created}</div>
                        </td>
                        <td className="py-3 px-4">{rule.source}</td>
                        <td className="py-3 px-4">{rule.destination}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                            {rule.threat}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getConfidenceBadge(rule.confidence)}
                        </td>
                        <td className="py-3 px-4">
                          {rule.status === 'active' && (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          )}
                          {rule.status === 'proposed' && (
                            <Badge className="bg-blue-100 text-blue-800">Proposed</Badge>
                          )}
                          {rule.status === 'rejected' && (
                            <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {rule.status === 'proposed' && (
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 text-xs"
                                onClick={() => handleApproveRule(rule.id)}
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 text-xs"
                                onClick={() => handleRejectRule(rule.id)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                          {rule.status !== 'proposed' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs"
                            >
                              Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="m-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                      <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiRules.filter(rule => rule.status === 'active').map((rule) => (
                      <tr key={rule.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-xs text-muted-foreground">{rule.created}</div>
                        </td>
                        <td className="py-3 px-4">{rule.source}</td>
                        <td className="py-3 px-4">{rule.destination}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                            {rule.threat}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getConfidenceBadge(rule.confidence)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="proposed" className="m-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                      <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiRules.filter(rule => rule.status === 'proposed').map((rule) => (
                      <tr key={rule.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-xs text-muted-foreground">{rule.created}</div>
                        </td>
                        <td className="py-3 px-4">{rule.source}</td>
                        <td className="py-3 px-4">{rule.destination}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                            {rule.threat}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getConfidenceBadge(rule.confidence)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs"
                              onClick={() => handleApproveRule(rule.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs"
                              onClick={() => handleRejectRule(rule.id)}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="rejected" className="m-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                      <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                      <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiRules.filter(rule => rule.status === 'rejected').map((rule) => (
                      <tr key={rule.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-xs text-muted-foreground">{rule.created}</div>
                        </td>
                        <td className="py-3 px-4">{rule.source}</td>
                        <td className="py-3 px-4">{rule.destination}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                            {rule.threat}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getConfidenceBadge(rule.confidence)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Zero Trust Segmentation Section */}
      <Card className={`${zeroTrust ? 'border-primary/50' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>Autonomous Zero Trust Segmentation</span>
            {zeroTrust && (
              <Badge className="ml-2 bg-primary text-primary-foreground">Active</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Automatically isolate high-risk endpoints from sensitive network areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium">Zero Trust Segmentation</div>
            <Switch 
              checked={zeroTrust} 
              onCheckedChange={toggleZeroTrust}
              disabled={!aiEnabled}
            />
          </div>
          
          {zeroTrust ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="text-sm font-medium mb-1">Isolated Endpoints</div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground mt-1">Currently segmented</div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="text-sm font-medium mb-1">Protected Assets</div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground mt-1">Behind zero trust</div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="text-sm font-medium mb-1">Segmentation Rules</div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-xs text-muted-foreground mt-1">Auto-generated</div>
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="p-3 border-b bg-muted/50">
                  <h4 className="font-medium">Isolated Endpoints</h4>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20">
                      <th className="py-2 px-4 text-sm font-medium text-left">Host</th>
                      <th className="py-2 px-4 text-sm font-medium text-left">Risk Reason</th>
                      <th className="py-2 px-4 text-sm font-medium text-left">Isolation Level</th>
                      <th className="py-2 px-4 text-sm font-medium text-left">Since</th>
                      <th className="py-2 px-4 text-sm font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">
                        <div className="font-medium">10.0.3.45</div>
                        <div className="text-xs text-muted-foreground">Sales Laptop</div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="text-sm text-red-600">Data Exfiltration</div>
                      </td>
                      <td className="py-2 px-4">
                        <Badge className="bg-red-100 text-red-800">Full Isolation</Badge>
                      </td>
                      <td className="py-2 px-4">3h 42m ago</td>
                      <td className="py-2 px-4 text-right">
                        <Button variant="outline" size="sm">Release</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">
                        <div className="font-medium">10.0.4.102</div>
                        <div className="text-xs text-muted-foreground">IoT Camera</div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="text-sm text-amber-600">Anomalous Behavior</div>
                      </td>
                      <td className="py-2 px-4">
                        <Badge className="bg-amber-100 text-amber-800">Limited Access</Badge>
                      </td>
                      <td className="py-2 px-4">1d 7h ago</td>
                      <td className="py-2 px-4 text-right">
                        <Button variant="outline" size="sm">Release</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">
                        <div className="font-medium">172.16.83.12</div>
                        <div className="text-xs text-muted-foreground">Dev Workstation</div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="text-sm text-amber-600">Port Scanning</div>
                      </td>
                      <td className="py-2 px-4">
                        <Badge className="bg-amber-100 text-amber-800">Limited Access</Badge>
                      </td>
                      <td className="py-2 px-4">5h 18m ago</td>
                      <td className="py-2 px-4 text-right">
                        <Button variant="outline" size="sm">Release</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-md border p-6 text-center">
              <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-1">Zero Trust Segmentation is Disabled</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enable to automatically isolate high-risk endpoints and protect your network.
              </p>
              <Button
                onClick={toggleZeroTrust}
                disabled={!aiEnabled}
              >
                Enable Zero Trust
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIThreatPanel;
