
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, UserCheck, Shield as ShieldIcon, FileCheck, Zap, Server, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetworkIntrusionPreventionPanel from '../components/security/NetworkIntrusionPreventionPanel';
import ZeroTrustNetworkingPanel from '../components/security/ZeroTrustNetworkingPanel';
import FirewallPolicyPanel from '../components/security/FirewallPolicyPanel';
import ComplianceEnforcementPanel from '../components/security/ComplianceEnforcementPanel';

const SecurityComplianceTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('intrusion-prevention');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Security & Compliance</h2>
        <Button>Generate Security Report</Button>
      </div>
      
      <Tabs defaultValue="intrusion-prevention" value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="intrusion-prevention" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Network Intrusion Prevention</span>
          </TabsTrigger>
          <TabsTrigger value="zero-trust" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Zero Trust Networking</span>
          </TabsTrigger>
          <TabsTrigger value="firewall-policy" className="flex items-center gap-2">
            <ShieldIcon className="h-4 w-4" />
            <span>Firewall Policy</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Compliance Enforcement</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="intrusion-prevention" className="space-y-4">
          <NetworkIntrusionPreventionPanel />
        </TabsContent>
        
        <TabsContent value="zero-trust" className="space-y-4">
          <ZeroTrustNetworkingPanel />
        </TabsContent>
        
        <TabsContent value="firewall-policy" className="space-y-4">
          <FirewallPolicyPanel />
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <ComplianceEnforcementPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityComplianceTab;
