
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import ZonesPanel from '@/components/zones/ZonesPanel';

const Zones = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          <ZonesPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Zones;
