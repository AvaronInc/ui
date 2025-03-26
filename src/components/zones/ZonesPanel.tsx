
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ZonesOverview from './tabs/ZonesOverview';
import ZoneSettings from './tabs/ZoneSettings';
import ZoneInsights from './sidebar/ZoneInsights';
import ZoneNestvault from './tabs/ZoneNestvault';
import { Zone } from './types';
import { mockZones } from './mockData';

const ZonesPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeZone, setActiveZone] = useState<Zone | null>(null);

  const handleZoneClick = (zone: Zone) => {
    setActiveZone(zone);
  };

  const handleBackToZones = () => {
    setActiveZone(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {activeZone ? `Zone: ${activeZone.name}` : 'Avaron Zones Management'}
          </h1>
          <p className="text-muted-foreground">
            {activeZone 
              ? `Viewing zone-specific configuration and status`
              : `Manage isolated virtual compartments with dedicated service stacks`
            }
          </p>
        </div>
        {activeZone && (
          <button 
            onClick={handleBackToZones}
            className="px-3 py-1.5 text-sm bg-secondary rounded-md"
          >
            ← Back to Zones
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeZone ? (
            // Zone detail view
            <div className="p-6 bg-card border rounded-lg">
              <ZoneDetail zone={activeZone} />
            </div>
          ) : (
            // Zones list view
            <div className="p-6 bg-card border rounded-lg">
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-2 gap-2">
                  <TabsTrigger value="overview">Zones Overview</TabsTrigger>
                  <TabsTrigger value="settings">Settings & Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <ZonesOverview zones={mockZones} onZoneClick={handleZoneClick} />
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <ZoneSettings />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <ZoneInsights />
        </div>
      </div>
    </div>
  );
};

// Zone Detail Component
const ZoneDetail: React.FC<{ zone: Zone }> = ({ zone }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{zone.name}</h2>
          <p className="text-muted-foreground">{zone.description}</p>
        </div>
        <ZoneStatusBadge status={zone.status} />
      </div>
      
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="ai">AI Profile</TabsTrigger>
          <TabsTrigger value="nestvault">NestVault</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <p>Zone-specific dashboard and overview would appear here.</p>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <p>Services control panel would appear here.</p>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <p>Zone-specific logs would appear here.</p>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <p>Zone users and assets would appear here.</p>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          <p>AI behavior profiles would appear here.</p>
        </TabsContent>
        
        <TabsContent value="nestvault" className="space-y-4">
          <ZoneNestvault zone={zone} />
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          <p>Zone-specific policies would appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Zone Status Badge Component
export const ZoneStatusBadge: React.FC<{ status: Zone['status'] }> = ({ status }) => {
  const getStatusColors = () => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'degraded':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColors()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default ZonesPanel;
