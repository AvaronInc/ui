
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SystemConfigPanel } from '@/components/system-config';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const SystemConfiguration = () => {
  useDocumentTitle('System Configuration');
  
  return (
    <DashboardLayout>
      <SystemConfigPanel />
    </DashboardLayout>
  );
};

export default SystemConfiguration;
