
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import FirewallDashboard from '@/components/firewall/FirewallDashboard';
import RulesPolicy from '@/components/firewall/components/RulesPolicy';
import DeepPacketInspection from '@/components/firewall/components/dpi/DeepPacketInspection';
import { AIThreatPanel } from '@/components/firewall/components/ai';
import { IPSThreatPanel } from '@/components/firewall/components/ips';
import { ZeroTrustPanel } from '@/components/firewall/components/zerotrust';
import { LoggingCompliance } from '@/components/settings/firewall/logging';

const FirewallManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleSave = () => {
    toast({
      title: "Firewall settings saved",
      description: "Firewall configuration has been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Removed the redundant heading and description here */}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rules">Rules & Policies</TabsTrigger>
          <TabsTrigger value="inspection">Inspection</TabsTrigger>
          <TabsTrigger value="ai">AI & Threat</TabsTrigger>
          <TabsTrigger value="ips">IPS/IDS</TabsTrigger>
          <TabsTrigger value="zerotrust">Zero Trust</TabsTrigger>
          <TabsTrigger value="logging">Logging</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <FirewallDashboard />
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-6">
          <RulesPolicy />
        </TabsContent>
        
        <TabsContent value="inspection" className="space-y-6">
          <DeepPacketInspection />
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <AIThreatPanel />
        </TabsContent>
        
        <TabsContent value="ips" className="space-y-6">
          <IPSThreatPanel />
        </TabsContent>
        
        <TabsContent value="zerotrust" className="space-y-6">
          <ZeroTrustPanel />
        </TabsContent>
        
        <TabsContent value="logging" className="space-y-6">
          <LoggingCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirewallManagement;
