
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IPSHeader } from './components';
import { SignatureDetection, BehaviorDetection, AutoQuarantine, ThreatLogs } from './components';

const IPSThreatPanel = () => {
  const [ipsEnabled, setIpsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('signatures');

  const toggleIPS = () => {
    setIpsEnabled(!ipsEnabled);
  };

  return (
    <div className="space-y-6">
      <IPSHeader ipsEnabled={ipsEnabled} toggleIPS={toggleIPS} />
      
      {/* Main content area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="signatures">Signature Detection</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Analysis</TabsTrigger>
          <TabsTrigger value="quarantine">Auto-Quarantine</TabsTrigger>
          <TabsTrigger value="logs">Threat Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signatures" className="space-y-4 mt-4">
          <SignatureDetection disabled={!ipsEnabled} />
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-4 mt-4">
          <BehaviorDetection disabled={!ipsEnabled} />
        </TabsContent>
        
        <TabsContent value="quarantine" className="space-y-4 mt-4">
          <AutoQuarantine disabled={!ipsEnabled} />
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4 mt-4">
          <ThreatLogs disabled={!ipsEnabled} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IPSThreatPanel;
