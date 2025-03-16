
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AutomationPanel from '@/components/automation/AutomationPanel';
import PageTransition from '@/components/transitions/PageTransition';
import { motion } from 'framer-motion';

const Automation = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <motion.div
          className="flex-1 space-y-4 p-2 sm:p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AutomationPanel />
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Automation;
