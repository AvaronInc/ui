
import React from 'react';
import { MetricsCards, AnalyticsSection, ConfigurationPanel } from './auto-healing';

const AutoHealingOptimization = () => {
  return (
    <div className="space-y-6">
      <MetricsCards />
      <AnalyticsSection />
      <ConfigurationPanel />
    </div>
  );
};

export default AutoHealingOptimization;
