
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAIFailover } from '@/hooks/use-ai-failover';
import { Card } from '@/components/ui/card';
import AIThresholdSettingsCard from '@/components/sdwan/tabs/ai-failover/AIThresholdSettingsCard';
import NetworkConditionsCard from '@/components/sdwan/tabs/ai-failover/NetworkConditionsCard';
import AdaptiveLearningCard from '@/components/sdwan/tabs/ai-failover/AdaptiveLearningCard';
import FailoverRulesCard from '@/components/sdwan/tabs/ai-failover/FailoverRulesCard';
import LoggingAlertsCard from '@/components/sdwan/tabs/ai-failover/LoggingAlertsCard';

const AIIntelligentFailoverTab = () => {
  const {
    config,
    isLoading,
    updateConfidenceLevel,
    updateMinimumConfidence,
    updateThreshold,
    toggleAdminApproval,
    updateNetworkCondition,
    toggleAdaptiveLearning,
    updateFailoverPriority,
    toggleSimulationMode,
    toggleLogging,
    addCustomRule,
    saveConfiguration
  } = useAIFailover();

  const handleSave = async () => {
    await saveConfiguration();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIThresholdSettingsCard 
          confidenceLevel={config.confidenceLevel}
          minimumConfidence={config.minimumConfidenceRequired}
          threshold={config.thresholdForRecommendations}
          requireAdminApproval={config.requireAdminApproval}
          onConfidenceLevelChange={updateConfidenceLevel}
          onMinimumConfidenceChange={updateMinimumConfidence}
          onThresholdChange={updateThreshold}
          onAdminApprovalToggle={toggleAdminApproval}
        />
        
        <NetworkConditionsCard 
          networkConditions={config.networkConditions}
          onNetworkConditionChange={updateNetworkCondition}
        />
        
        <AdaptiveLearningCard 
          adaptiveLearning={config.adaptiveLearning}
          onToggleAdaptiveLearning={toggleAdaptiveLearning}
        />
        
        <FailoverRulesCard 
          failoverPriority={config.failoverPriority}
          simulationMode={config.simulationModeEnabled}
          customRules={config.customRules}
          onFailoverPriorityChange={updateFailoverPriority}
          onSimulationModeToggle={toggleSimulationMode}
          onAddRule={addCustomRule}
        />
        
        <LoggingAlertsCard 
          logging={config.logging}
          onLoggingToggle={toggleLogging}
        />
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save AI Failover Configuration'}
        </Button>
      </div>
    </div>
  );
};

export default AIIntelligentFailoverTab;
