
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AutomationPanel from '@/components/automation/AutomationPanel';
import { PageTransition } from '@/components/transitions/PageTransition';

const Automation = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <AutomationPanel />
      </PageTransition>
    </DashboardLayout>
  );
};

export default Automation;
