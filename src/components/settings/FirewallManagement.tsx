
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
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Firewall Management</h3>
        <p className="text-sm text-muted-foreground">
          Configure and monitor firewall settings, rules, and security policies.
        </p>
      </div>
      
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
          <div className="space-y-4">
            <h4 className="text-md font-medium">Logging & Compliance</h4>
            <p className="text-sm text-muted-foreground">
              Configure logging, auditing, and compliance settings for firewall activities.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirewallManagement;
