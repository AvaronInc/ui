
import React from 'react';
import { mockUserContribution } from '../../mockData/gamificationData';
import UserHeader from './dashboard/UserHeader';
import SummaryCards from './dashboard/SummaryCards';
import ContributionTrends from './dashboard/ContributionTrends';
import EngagementMetrics from './dashboard/EngagementMetrics';
import RecentActivityCard from './dashboard/RecentActivityCard';
import SecurityComplianceNotice from './dashboard/SecurityComplianceNotice';

const UserContributionDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <UserHeader />
      
      {/* Summary Cards */}
      <SummaryCards contribution={mockUserContribution} />
      
      {/* Engagement Stats and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contribution Trends */}
          <ContributionTrends contribution={mockUserContribution} />
          
          {/* Engagement Metrics */}
          <EngagementMetrics contribution={mockUserContribution} />
        </div>
        
        {/* Recent Activity */}
        <div>
          <RecentActivityCard contribution={mockUserContribution} />
        </div>
      </div>
      
      {/* Security and Compliance Notice */}
      <SecurityComplianceNotice />
    </div>
  );
};

export default UserContributionDashboard;
