
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Shield, BarChart, Network, ActivitySquare, Database, Droplets, Wifi, Lock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSecurityData } from '@/hooks/use-security-data';
import AIThreatAnalysis from '../components/AIThreatAnalysis';
import WazuhDashboard from '../components/WazuhDashboard';
import ThreatRemediationPanel from '../components/ThreatRemediationPanel';
import NetworkAnomalyChart from '../components/NetworkAnomalyChart';

const ThreatDetection: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState('ai-intelligence');
  const { activeThreatsByType, networkAnomaly } = useSecurityData();

  const handleIsolateDevice = () => {
    toast({
      title: "Device Isolated",
      description: "The compromised device has been isolated from the network.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Threat Detection & Incident Response</h2>
          <p className="text-muted-foreground">
            AI-driven threat intelligence and Wazuh security monitoring
          </p>
        </div>
        <Button variant="destructive" size="sm" onClick={handleIsolateDevice}>
          <Shield className="mr-2 h-4 w-4" />
          Isolate Compromised Devices
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(activeThreatsByType).map(([type, count], index) => (
          <Card key={index} className={`${count > 0 ? 'border-amber-300 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-800/50' : ''}`}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{type}</div>
                <div className="text-2xl font-bold">{count}</div>
              </div>
              {getThreatIcon(type)}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Network Anomaly Detection</CardTitle>
          <CardDescription>AI-powered behavioral analysis across your infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <NetworkAnomalyChart data={networkAnomaly} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ai-intelligence" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="ai-intelligence" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>{isMobile ? "AI Analysis" : "AI Threat Intelligence"}</span>
          </TabsTrigger>
          <TabsTrigger value="wazuh-monitoring" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>{isMobile ? "Wazuh" : "Wazuh Monitoring"}</span>
          </TabsTrigger>
          <TabsTrigger value="incident-response" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>{isMobile ? "Response" : "Incident Response"}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-intelligence">
          <Card>
            <CardHeader>
              <CardTitle>AI-Driven Threat Intelligence</CardTitle>
              <CardDescription>
                Real-time threat correlation and behavioral analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIThreatAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wazuh-monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Wazuh Security Monitoring</CardTitle>
              <CardDescription>
                Integrated HIDS, FIM, and SIEM capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <WazuhDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incident-response">
          <Card>
            <CardHeader>
              <CardTitle>Automated Incident Response</CardTitle>
              <CardDescription>
                AI-based threat remediation and containment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatRemediationPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function getThreatIcon(type: string) {
  switch (type) {
    case 'Malware':
      return <Droplets className="h-10 w-10 text-red-500" />;
    case 'Network Intrusion':
      return <Network className="h-10 w-10 text-amber-500" />;
    case 'Authentication Failures':
      return <Lock className="h-10 w-10 text-blue-500" />;
    case 'DDoS Attacks':
      return <Wifi className="h-10 w-10 text-purple-500" />;
    default:
      return <AlertTriangle className="h-10 w-10 text-gray-500" />;
  }
}

export default ThreatDetection;
