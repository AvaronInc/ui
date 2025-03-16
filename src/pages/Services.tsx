
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import ServicesPanel from '@/components/services/ServicesPanel';
import { Server } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/transitions/PageTransition';

const Services = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <motion.div
          className="flex-1 space-y-4 p-2 sm:p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PageTitle 
            title="Services Panel" 
            description="Deploy, manage, and monitor enterprise services"
            icon={<Server className="h-6 w-6" />}
          />
          <ServicesPanel />
        </motion.div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Services;
