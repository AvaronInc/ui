
import React from 'react';
import { motion } from 'framer-motion';
import ContainersPanel from '@/components/containers/ContainersPanel';
import PageTransition from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Containers = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <motion.div
          className="flex-1 space-y-4 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ContainersPanel />
        </motion.div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Containers;
