
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import FirewallManagement from './FirewallManagement';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Security settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Configure security settings, access controls, and compliance requirements.
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General Security</TabsTrigger>
          <TabsTrigger value="firewall">Firewall Management</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">General Security Settings</h3>
            <p className="text-sm text-muted-foreground">
              Basic security settings for the application.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="firewall" className="space-y-6">
          <FirewallManagement />
        </TabsContent>
        
        <TabsContent value="auth" className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Authentication Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure authentication methods and policies.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="encryption" className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Encryption Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure data encryption and key management.
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

export default SecuritySettings;
