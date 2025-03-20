import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import FirewallDashboard from '@/components/firewall/FirewallDashboard';

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
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="inspection">Inspection</TabsTrigger>
          <TabsTrigger value="ai">AI & Threat</TabsTrigger>
          <TabsTrigger value="ips">IPS</TabsTrigger>
          <TabsTrigger value="zerotrust">Zero Trust</TabsTrigger>
          <TabsTrigger value="logging">Logging</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <FirewallDashboard />
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Firewall Rules & Policies</h4>
            <p className="text-sm text-muted-foreground">
              Manage firewall rules, access control lists, and security policies.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="inspection" className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Deep Packet Inspection</h4>
            <p className="text-sm text-muted-foreground">
              Configure deep packet inspection settings for enhanced security monitoring.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">AI & Threat Intelligence</h4>
            <p className="text-sm text-muted-foreground">
              Configure AI-powered threat detection and intelligence features.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="ips" className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Intrusion Prevention System</h4>
            <p className="text-sm text-muted-foreground">
              Configure intrusion prevention system settings and policies.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="zerotrust" className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium">Zero Trust Policy Management</h4>
            <p className="text-sm text-muted-foreground">
              Configure zero trust network access policies and controls.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
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
