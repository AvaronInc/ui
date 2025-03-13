
import React from 'react';
import StatusCardGrid from './StatusCardGrid';
import MetricsAlertsSection from './MetricsAlertsSection';
import NavigationTileGrid from './NavigationTileGrid';

const MainDashboard = () => {
  return (
    <div className="space-y-6">
      <StatusCardGrid />
      <MetricsAlertsSection />
      <NavigationTileGrid />
    </div>
  );
};

export default MainDashboard;
