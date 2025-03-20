
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import FirewallManagement from './FirewallManagement';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const location = useLocation();
  
  // Check for active tab from URL or sessionStorage
  useEffect(() => {
    // First check URL hash for direct navigation
    if (location.hash.includes('/firewall')) {
      console.log("Setting active tab to firewall from direct hash");
      setActiveTab('firewall');
      return;
    }
    
    // Then check sessionStorage (set by AdminSettings when using fragment navigation)
    const storedTab = sessionStorage.getItem('security-active-tab');
    if (storedTab) {
      console.log(`Setting active tab to ${storedTab} from sessionStorage`);
      setActiveTab(storedTab);
      // Clear after use
      sessionStorage.removeItem('security-active-tab');
    }
  }, [location]);
  
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
