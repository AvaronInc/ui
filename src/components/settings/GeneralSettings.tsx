
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const GeneralSettings = () => {
  const { toast } = useToast();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemName, setSystemName] = useState('Network Pulse Management');
  const [timeZone, setTimeZone] = useState('UTC');
  const [defaultLanguage, setDefaultLanguage] = useState('en-US');
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleReset = () => {
    setMaintenanceMode(false);
    setSystemName('Network Pulse Management');
    setTimeZone('UTC');
    setDefaultLanguage('en-US');
    
    toast({
      title: "Settings reset",
      description: "Your general settings have been reset to defaults.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="system">
        <TabsList className="mb-4">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode" className="font-medium">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, the system will be inaccessible to regular users.
                </p>
              </div>
              <Switch 
                id="maintenance-mode" 
                checked={maintenanceMode} 
                onCheckedChange={setMaintenanceMode}
              />
            </div>
            
            <div>
              <Label htmlFor="system-name">System Name</Label>
              <Input 
                id="system-name" 
                value={systemName} 
                onChange={(e) => setSystemName(e.target.value)} 
                className="mt-1.5"
              />
              <p className="text-sm text-muted-foreground mt-1.5">
                This name appears on the login screen and browser title.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="localization" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="timezone">Default Time Zone</Label>
              <Select value={timeZone} onValueChange={setTimeZone}>
                <SelectTrigger id="timezone" className="mt-1.5">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                  <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                  <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                  <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                  <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="language">Default Language</Label>
              <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                <SelectTrigger id="language" className="mt-1.5">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark mode across the application.
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>
            
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="grid grid-cols-6 gap-2 mt-1.5">
                <div className="h-10 bg-blue-500 rounded-md cursor-pointer border-2 border-primary" />
                <div className="h-10 bg-green-500 rounded-md cursor-pointer" />
                <div className="h-10 bg-purple-500 rounded-md cursor-pointer" />
                <div className="h-10 bg-red-500 rounded-md cursor-pointer" />
                <div className="h-10 bg-orange-500 rounded-md cursor-pointer" />
                <div className="h-10 bg-gray-500 rounded-md cursor-pointer" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
