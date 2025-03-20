
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Lock,
  AlertTriangle,
  Zap,
  ListFilter,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import DNSSECTab from './tabs/DNSSECTab';
import AnomalyDetectionTab from './tabs/AnomalyDetectionTab';
import ThreatIntelligenceTab from './tabs/ThreatIntelligenceTab';
import BlocklistsTab from './tabs/BlocklistsTab';
import DNSFirewallTab from './tabs/DNSFirewallTab';

const DNSSecurityPanel: React.FC = () => {
  const { toast } = useToast();
  const [activeSecurityTab, setActiveSecurityTab] = useState("dnssec");
  
  const handleRunSecurityScan = () => {
    toast({
      title: "DNS Security Scan Initiated",
      description: "Running comprehensive security scan on all DNS zones and records.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-1">DNS Security & Compliance</h2>
          <p className="text-muted-foreground">Enhance DNS security and ensure regulatory compliance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRunSecurityScan} className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Run Security Scan</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dnssec" value={activeSecurityTab} onValueChange={setActiveSecurityTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dnssec" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>DNSSEC</span>
          </TabsTrigger>
          <TabsTrigger value="anomaly" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Anomaly Detection</span>
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Threat Intelligence</span>
          </TabsTrigger>
          <TabsTrigger value="blocklists" className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" />
            <span>Blocklists & Allowlists</span>
          </TabsTrigger>
          <TabsTrigger value="firewall" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>DNS Firewall</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dnssec" className="space-y-4">
          <DNSSECTab />
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <AnomalyDetectionTab />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <ThreatIntelligenceTab />
        </TabsContent>

        <TabsContent value="blocklists" className="space-y-4">
          <BlocklistsTab />
        </TabsContent>

        <TabsContent value="firewall" className="space-y-4">
          <DNSFirewallTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DNSSecurityPanel;
