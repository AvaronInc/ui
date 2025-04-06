
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zone } from '../types';
import ZoneAutomationBuilder from './ZoneAutomationBuilder';
import '@/components/zones/tabs/automation-flow.css';

const ZoneServices: React.FC<{ zone: Zone }> = ({ zone }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 gap-2">
          <TabsTrigger value="overview">Services Overview</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Active Services</h3>
              <div className="space-y-2">
                {zone.services.map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-card/50 rounded">
                    <span>{service}</span>
                    <span className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-500">Active</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Service Health</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-card/50 rounded">
                  <div className="text-sm text-muted-foreground">Uptime</div>
                  <div className="text-xl font-semibold">99.98%</div>
                </div>
                <div className="p-3 bg-card/50 rounded">
                  <div className="text-sm text-muted-foreground">Response</div>
                  <div className="text-xl font-semibold">124ms</div>
                </div>
                <div className="p-3 bg-card/50 rounded">
                  <div className="text-sm text-muted-foreground">Requests</div>
                  <div className="text-xl font-semibold">1.2M</div>
                </div>
                <div className="p-3 bg-card/50 rounded">
                  <div className="text-sm text-muted-foreground">Errors</div>
                  <div className="text-xl font-semibold">0.02%</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <ZoneAutomationBuilder zone={zone} />
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-4">Services Configuration</h3>
            <p className="text-muted-foreground mb-4">
              Configure service settings, dependencies, and parameters.
            </p>
            
            <div className="space-y-3">
              {zone.services.map((service, idx) => (
                <div key={idx} className="p-3 border rounded">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{service}</h4>
                    <span className="text-xs bg-primary/10 px-2 py-0.5 rounded text-primary">Configured</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated: 3 days ago
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZoneServices;
