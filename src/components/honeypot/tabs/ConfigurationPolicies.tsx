
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Settings, Lock, Bell, Shield } from 'lucide-react';
import { HoneypotPolicies } from '../components/HoneypotPolicies';
import { SecuritySettings } from '../components/SecuritySettings';
import { NotificationSettings } from '../components/NotificationSettings';

const ConfigurationPolicies: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Configuration & Policies</h2>
        <p className="text-muted-foreground text-sm">Manage honeypot settings, security policies, and notification rules</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Policies
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-500" />
                Honeypot Configuration
              </CardTitle>
              <CardDescription>Global configuration settings for all honeypot deployments</CardDescription>
            </CardHeader>
            <CardContent>
              <HoneypotPolicies />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Security Controls
              </CardTitle>
              <CardDescription>Security settings for honeypot infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2 text-yellow-500" />
                Notification Configuration
              </CardTitle>
              <CardDescription>Alert settings and notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigurationPolicies;
