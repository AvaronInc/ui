
import React from 'react';
import StatusCard from './StatusCard';
import { Server, Shield, Users, Network } from 'lucide-react';

const StatusCardGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="System Availability"
        status="healthy"
        description="Last 30 days uptime: 99.9%"
        updated="5 minutes ago"
        icon={<Server className="h-5 w-5" />}
        onClick={() => {}}
      />
      <StatusCard
        title="Security Score"
        status="healthy"
        description="A+ based on 42 criteria"
        updated="1 hour ago"
        icon={<Shield className="h-5 w-5" />}
        onClick={() => {}}
      />
      <StatusCard
        title="Active Users"
        status="warning"
        description="246 users (12% increase)"
        updated="30 minutes ago"
        icon={<Users className="h-5 w-5" />}
        onClick={() => {}}
      />
      <StatusCard
        title="Connected Systems"
        status="healthy"
        description="18 systems (3 new this month)"
        updated="1 hour ago"
        icon={<Network className="h-5 w-5" />}
        onClick={() => {}}
      />
    </div>
  );
};

export default StatusCardGrid;
