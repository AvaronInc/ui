
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fingerprint, Shield, Users, RefreshCw } from 'lucide-react';
import { IdentityAccessControl } from './components';
import { AdaptiveAccessPolicies } from './components';
import { NetworkSegmentation } from './components';
import { ContinuousVerification } from './components';

const ZeroTrustPanel = () => {
  const { toast } = useToast();
  const [zeroTrustEnabled, setZeroTrustEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('identity');
  
  const toggleZeroTrust = () => {
    setZeroTrustEnabled(!zeroTrustEnabled);
    toast({
      title: zeroTrustEnabled ? "Zero Trust Disabled" : "Zero Trust Enabled",
      description: zeroTrustEnabled 
        ? "Zero Trust security policies have been disabled." 
        : "Zero Trust security policies are now active.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Zero Trust Controls */}
      <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-full">
            <Fingerprint className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Zero Trust Security Policy Management</h3>
            <p className="text-sm text-muted-foreground">AI-driven identity verification and micro-segmentation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {zeroTrustEnabled ? 'Policies Active' : 'Policies Inactive'}
          </span>
          <Switch 
            checked={zeroTrustEnabled} 
            onCheckedChange={toggleZeroTrust} 
          />
        </div>
      </div>
      
      {/* Main content area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="identity">
            <Fingerprint className="h-4 w-4 mr-2" />
            Identity Access
          </TabsTrigger>
          <TabsTrigger value="adaptive">
            <Shield className="h-4 w-4 mr-2" />
            Adaptive Policies
          </TabsTrigger>
          <TabsTrigger value="segmentation">
            <Users className="h-4 w-4 mr-2" />
            Network Segmentation
          </TabsTrigger>
          <TabsTrigger value="verification">
            <RefreshCw className="h-4 w-4 mr-2" />
            Continuous Verification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="identity" className="space-y-4 mt-4">
          <IdentityAccessControl disabled={!zeroTrustEnabled} />
        </TabsContent>
        
        <TabsContent value="adaptive" className="space-y-4 mt-4">
          <AdaptiveAccessPolicies disabled={!zeroTrustEnabled} />
        </TabsContent>
        
        <TabsContent value="segmentation" className="space-y-4 mt-4">
          <NetworkSegmentation disabled={!zeroTrustEnabled} />
        </TabsContent>
        
        <TabsContent value="verification" className="space-y-4 mt-4">
          <ContinuousVerification disabled={!zeroTrustEnabled} />
        </TabsContent>
      </Tabs>
      
      {/* Actions */}
      <div className="flex justify-end">
        <Button onClick={() => {
          toast({
            title: "Policies Saved",
            description: "Zero Trust security policies have been updated."
          });
        }} disabled={!zeroTrustEnabled}>
          Save All Policies
        </Button>
      </div>
    </div>
  );
};

export default ZeroTrustPanel;
