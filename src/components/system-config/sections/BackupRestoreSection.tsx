
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackupOptionsSection from '../backup/BackupOptionsSection';
import BackupSchedulingSection from '../backup/BackupSchedulingSection';
import BackupHistorySection from '../backup/BackupHistorySection';
import VersionDiffSection from '../backup/VersionDiffSection';
import AutomationAlertsSection from '../backup/AutomationAlertsSection';

const BackupRestoreSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState('backup-options');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">System Backup & Restore</h2>
          <p className="text-muted-foreground text-sm">
            Configure, schedule, and manage backups of all system configurations
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="backup-options"
        value={activeSection}
        onValueChange={setActiveSection}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="backup-options">Backup Options</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="history">History & Versions</TabsTrigger>
          <TabsTrigger value="restore">Restore & Compare</TabsTrigger>
          <TabsTrigger value="automation">Automation & Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="backup-options" className="mt-0">
          <BackupOptionsSection />
        </TabsContent>
        
        <TabsContent value="scheduling" className="mt-0">
          <BackupSchedulingSection />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <BackupHistorySection />
        </TabsContent>
        
        <TabsContent value="restore" className="mt-0">
          <VersionDiffSection />
        </TabsContent>
        
        <TabsContent value="automation" className="mt-0">
          <AutomationAlertsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackupRestoreSection;
