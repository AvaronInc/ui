
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RegionsPanel from '@/components/regions/RegionsPanel';
import PageTransition from '@/components/transitions/PageTransition';

const Regions = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <RegionsPanel />
      </DashboardLayout>
    </PageTransition>
  );
};

export default Regions;
