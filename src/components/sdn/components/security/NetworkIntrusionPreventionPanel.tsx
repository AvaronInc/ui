
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Brain, AlertTriangle, Activity, Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NetworkIntrusionPreventionPanel: React.FC = () => {
  const { toast } = useToast();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [sensitivityLevel, setSensitivityLevel] = useState(75);
  const [blockingMode, setBlockingMode] = useState(true);
  
  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "AI Intrusion Prevention Disabled" : "AI Intrusion Prevention Enabled",
      description: aiEnabled 
        ? "Manual mode is now active. Automated protection is disabled." 
        : "AI-driven protection is now active.",
    });
  };
  
  const toggleBlockingMode = () => {
    setBlockingMode(!blockingMode);
    toast({
      title: blockingMode ? "Monitor Mode Activated" : "Blocking Mode Activated",
      description: blockingMode 
        ? "System will only monitor and log threats without blocking." 
        : "System will automatically block detected threats.",
    });
  };
  
  const recentThreats = [
    { 
      id: 1, 
      type: "Port Scan", 
      source: "198.51.100.32", 
      timestamp: "2023-07-15 14:32:45", 
      severity: "medium",
      action: "blocked"
    },
    { 
      id: 2, 
      type: "Brute Force", 
      source: "203.0.113.15", 
      timestamp: "2023-07-15 13:15:22", 
      severity: "high",
      action: "blocked"
    },
    { 
      id: 3, 
      type: "SQL Injection", 
      source: "192.0.2.87", 
      timestamp: "2023-07-15 12:45:08", 
      severity: "critical",
      action: "blocked"
    },
    { 
      id: 4, 
      type: "Anomalous Traffic", 
      source: "198.51.100.76", 
      timestamp: "2023-07-15 11:22:17", 
      severity: "low",
      action: "monitored"
    }
  ];
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Critical</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'blocked':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Blocked</Badge>;
      case 'monitored':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Monitored</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* AI Settings Card */}
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI-Driven Network Intrusion Prevention
            </CardTitle>
            <CardDescription>
              Uses machine learning to detect and block anomalies and unauthorized access attempts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">AI Protection</h4>
                <p className="text-sm text-muted-foreground">Enable AI-driven threat detection</p>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={toggleAI} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Sensitivity Level</h4>
                  <p className="text-sm text-muted-foreground">Adjust detection sensitivity</p>
                </div>
                <span className="font-medium">{sensitivityLevel}%</span>
              </div>
              <Slider 
                disabled={!aiEnabled}
                value={[sensitivityLevel]} 
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setSensitivityLevel(value[0])}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Blocking Mode</h4>
                <p className="text-sm text-muted-foreground">
                  {blockingMode 
                    ? "Automatically block detected threats" 
                    : "Monitor threats without blocking"}
                </p>
              </div>
              <Switch checked={blockingMode} onCheckedChange={toggleBlockingMode} />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" disabled={!aiEnabled}>
                Retrain AI Model
              </Button>
              <Button disabled={!aiEnabled}>
                Apply Settings
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Status Card */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Protection Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Threats Detected</div>
                <div className="text-2xl font-bold">47</div>
                <div className="text-xs text-muted-foreground mt-1">This month</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Threats Blocked</div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-xs text-muted-foreground mt-1">This month</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Networks Protected</div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground mt-1">Active protection</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Current Threat Level</div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="text-xl font-bold">Medium</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Threats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Threat Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentThreats.map(threat => (
                <TableRow key={threat.id}>
                  <TableCell>{threat.type}</TableCell>
                  <TableCell>{threat.source}</TableCell>
                  <TableCell>{threat.timestamp}</TableCell>
                  <TableCell>{getSeverityBadge(threat.severity)}</TableCell>
                  <TableCell>{getActionBadge(threat.action)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkIntrusionPreventionPanel;
