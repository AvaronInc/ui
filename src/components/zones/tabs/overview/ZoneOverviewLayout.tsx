
import React from 'react';
import { Zone } from '../../types';
import ZoneHeader from './ZoneHeader';
import ResourceUsage from './ResourceUsage';
import ZoneServices from './ZoneServices';
import ComplianceSecurity from './ComplianceSecurity';
import ZoneAdmins from './ZoneAdmins';
import RecentIncidents from './RecentIncidents';
import RecentActivity from './RecentActivity';
import SupportTickets from './SupportTickets';
import AISystemSummary from './AISystemSummary';

interface ZoneOverviewLayoutProps {
  zone: Zone;
}

const ZoneOverviewLayout: React.FC<ZoneOverviewLayoutProps> = ({ zone }) => {
  return (
    <div className="space-y-6">
      {/* Zone Header Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ZoneHeader zone={zone} />
        </div>

        <div className="lg:col-span-4">
          <ResourceUsage zone={zone} />
        </div>
      </div>

      {/* Services and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ZoneServices zone={zone} />
        </div>

        <div className="lg:col-span-6">
          <ComplianceSecurity zone={zone} />
        </div>
      </div>

      {/* Admins and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <ZoneAdmins zone={zone} />
        </div>

        <div className="lg:col-span-8">
          <RecentIncidents />
        </div>
      </div>

      {/* Activity and Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <RecentActivity />
        </div>

        <div className="lg:col-span-6">
          <SupportTickets />
        </div>
      </div>

      {/* AI System Summary */}
      <AISystemSummary />
    </div>
  );
};

export default ZoneOverviewLayout;
