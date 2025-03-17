
import React from 'react';
import WorkforceHealthChart from '@/components/workforce/WorkforceHealthChart';
import RecentActivityCard from '@/components/workforce/RecentActivityCard';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';

interface WorkforceDashboardProps {
  healthData: any[];
}

const WorkforceDashboard = ({ healthData }: WorkforceDashboardProps) => {
  return (
    <>
      <section>
        <StatusCardGrid />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WorkforceHealthChart 
          data={healthData}
          className="md:col-span-2"
        />
        <RecentActivityCard />
      </section>
    </>
  );
};

export default WorkforceDashboard;
