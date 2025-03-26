
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RetentionPoliciesTab from '../retention/RetentionPoliciesTab';
import StorageConfigurationTab from '../retention/StorageConfigurationTab';
import ArchivalSettingsTab from '../retention/ArchivalSettingsTab';
import RetentionSummary from '../retention/RetentionSummary';

const LogRetentionTab: React.FC = () => {
  const [innerTab, setInnerTab] = useState('policies');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Log Retention & Storage</h2>
          <p className="text-muted-foreground">
            Manage retention policies, storage configurations, and archival settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={innerTab} onValueChange={setInnerTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="policies">Retention Policies</TabsTrigger>
              <TabsTrigger value="storage">Storage Configuration</TabsTrigger>
              <TabsTrigger value="archival">Archival Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="policies" className="pt-4">
              <RetentionPoliciesTab />
            </TabsContent>

            <TabsContent value="storage" className="pt-4">
              <StorageConfigurationTab />
            </TabsContent>

            <TabsContent value="archival" className="pt-4">
              <ArchivalSettingsTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <RetentionSummary />
        </div>
      </div>
    </div>
  );
};

export default LogRetentionTab;
