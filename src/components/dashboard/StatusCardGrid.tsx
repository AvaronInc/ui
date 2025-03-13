
import React from 'react';
import StatusCard from './StatusCard';

const StatusCardGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="System Availability"
        status="healthy"
        description="Last 30 days uptime: 99.9%"
        updated="5 minutes ago"
      />
      <StatusCard
        title="Security Score"
        status="healthy"
        description="A+ based on 42 criteria"
        updated="1 hour ago"
      />
      <StatusCard
        title="Active Users"
        status="warning"
        description="246 users (12% increase)"
        updated="30 minutes ago"
      />
      <StatusCard
        title="Connected Systems"
        status="healthy"
        description="18 systems (3 new this month)"
        updated="1 hour ago"
      />
    </div>
  );
};

export default StatusCardGrid;
