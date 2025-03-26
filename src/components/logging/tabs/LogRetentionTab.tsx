
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RetentionSummary from '../retention/RetentionSummary';
import RetentionPoliciesTab from './retention/RetentionPoliciesTab';
import StorageManagementTab from './retention/StorageManagementTab';
import ArchivingTab from './retention/ArchivingTab';

const LogRetentionTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="space-y-4">
      <div className="p-6 bg-card border rounded-lg">
        <h2 className="text-2xl font-bold mb-1">Log Retention & Storage</h2>
        <p className="text-muted-foreground mb-4">
          Configure retention periods, manage storage, and set up archiving policies for all log data
        </p>

        <Tabs
          defaultValue="summary"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="summary">Retention Summary</TabsTrigger>
            <TabsTrigger value="policies">Retention Policies</TabsTrigger>
            <TabsTrigger value="storage">Storage Management</TabsTrigger>
            <TabsTrigger value="archiving">Archiving</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <RetentionSummary />
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <RetentionPoliciesTab />
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <StorageManagementTab />
          </TabsContent>

          <TabsContent value="archiving" className="space-y-4">
            <ArchivingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LogRetentionTab;
