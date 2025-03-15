
import React from 'react';
import { motion } from 'framer-motion';
import BillingPanel from '@/components/billing/BillingPanel';
import PageTransition from '@/components/transitions/PageTransition';

const Billing = () => {
  return (
    <PageTransition>
      <motion.div
        className="flex-1 space-y-4 p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <BillingPanel />
      </motion.div>
    </PageTransition>
  );
};

export default Billing;
