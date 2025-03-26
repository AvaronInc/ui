
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackupRestoreSection from './sections/BackupRestoreSection';
import NetworkSettingsSection from './sections/NetworkSettingsSection';
import RCASection from './sections/RCASection';
import { toast } from 'sonner';

export const SystemConfigPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('backup-restore');

  return (
    <div className="flex flex-col h-full w-full gap-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">System Configuration</h1>
      </div>

      <Tabs
        defaultValue="backup-restore"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="backup-restore">Backup & Restore</TabsTrigger>
          <TabsTrigger value="network">Network Settings</TabsTrigger>
          <TabsTrigger value="rca">RCA</TabsTrigger>
          <TabsTrigger value="identity" disabled>Identity & RBAC</TabsTrigger>
          <TabsTrigger value="security" disabled>Firewall & Security</TabsTrigger>
          <TabsTrigger value="integration" disabled>Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="backup-restore" className="mt-0">
          <BackupRestoreSection />
        </TabsContent>
        
        <TabsContent value="network" className="mt-0">
          <NetworkSettingsSection />
        </TabsContent>
        
        <TabsContent value="rca" className="mt-0">
          <RCASection />
        </TabsContent>
        
        <TabsContent value="identity" className="mt-0">
          <div className="flex items-center justify-center h-60 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">Identity & RBAC Configuration will be available in a future update</p>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <div className="flex items-center justify-center h-60 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">Security Configuration will be available in a future update</p>
          </div>
        </TabsContent>
        
        <TabsContent value="integration" className="mt-0">
          <div className="flex items-center justify-center h-60 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">Integration Configuration will be available in a future update</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

