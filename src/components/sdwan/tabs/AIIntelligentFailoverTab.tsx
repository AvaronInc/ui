
import React from 'react';
import {
  AIThresholdSettingsCard,
  NetworkConditionsCard,
  AdaptiveLearningCard,
  FailoverRulesCard,
  LoggingAlertsCard
} from './ai-failover';

const AIIntelligentFailoverTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AIThresholdSettingsCard />
      <NetworkConditionsCard />
      <AdaptiveLearningCard />
      <FailoverRulesCard />
      <LoggingAlertsCard />
    </div>
  );
};

export default AIIntelligentFailoverTab;
