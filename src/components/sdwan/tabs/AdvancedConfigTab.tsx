
import React from 'react';
import { ApiAccessSection, CustomScriptingSection, BackupRestoreSection } from './advanced';

const AdvancedConfigTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ApiAccessSection />
      <CustomScriptingSection />
      <BackupRestoreSection />
    </div>
  );
};

export default AdvancedConfigTab;
