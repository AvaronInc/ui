
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
          <div className="space-y-4">
            <h4 className="text-md font-medium">Firewall Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Traffic</h5>
                <p className="text-2xl font-bold text-blue-600">512 Mbps</p>
                <p className="text-xs text-muted-foreground">Current throughput</p>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Blocked</h5>
                <p className="text-2xl font-bold text-red-600">24,153</p>
                <p className="text-xs text-muted-foreground">Threats blocked today</p>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Status</h5>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Apply Configuration
            </Button>
          </div>
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
