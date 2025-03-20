
import { useState } from 'react';
import { AIFailoverConfiguration } from '@/types/sdwan';

// Default configuration
const defaultConfig: AIFailoverConfiguration = {
  confidenceLevel: 85,
  minimumConfidenceRequired: 70,
  thresholdForRecommendations: 'medium',
  requireAdminApproval: true,
  networkConditions: {
    latencyThreshold: 50,
    packetLossThreshold: 2.5,
    jitterThreshold: 10,
    connectionDownThreshold: {
      count: 3,
      timeWindow: 5,
    },
    detectBGPIssues: true,
    ddosResponseEnabled: true,
  },
  adaptiveLearning: {
    enabled: true,
    allowRealTimeTrafficAdjustment: false,
  },
  failoverPriority: 'performance',
  simulationModeEnabled: false,
  logging: {
    enabled: true,
    sendAlerts: true,
  },
  customRules: [
    {
      id: '1',
      sourceIp: '10.0.0.0/24',
      destination: 'Cloud Services',
      priority: 'high',
    },
    {
      id: '2',
      sourceIp: '10.0.1.0/24',
      destination: 'Internal Systems',
      priority: 'medium',
    },
  ],
};

export const useAIFailover = () => {
  const [config, setConfig] = useState<AIFailoverConfiguration>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);

  const updateConfidenceLevel = (value: number) => {
    setConfig(prev => ({ ...prev, confidenceLevel: value }));
  };

  const updateMinimumConfidence = (value: number) => {
    setConfig(prev => ({ ...prev, minimumConfidenceRequired: value }));
  };

  const updateThreshold = (value: 'low' | 'medium' | 'high') => {
    setConfig(prev => ({ ...prev, thresholdForRecommendations: value }));
  };

  const toggleAdminApproval = () => {
    setConfig(prev => ({ ...prev, requireAdminApproval: !prev.requireAdminApproval }));
  };

  const updateNetworkCondition = (key: keyof AIFailoverConfiguration['networkConditions'], value: any) => {
    setConfig(prev => ({
      ...prev,
      networkConditions: {
        ...prev.networkConditions,
        [key]: value,
      }
    }));
  };

  const toggleAdaptiveLearning = (key: keyof AIFailoverConfiguration['adaptiveLearning']) => {
    setConfig(prev => ({
      ...prev,
      adaptiveLearning: {
        ...prev.adaptiveLearning,
        [key]: !prev.adaptiveLearning[key],
      }
    }));
  };

  const updateFailoverPriority = (value: 'cost' | 'performance' | 'stability') => {
    setConfig(prev => ({ ...prev, failoverPriority: value }));
  };

  const toggleSimulationMode = () => {
    setConfig(prev => ({ ...prev, simulationModeEnabled: !prev.simulationModeEnabled }));
  };

  const toggleLogging = (key: keyof AIFailoverConfiguration['logging']) => {
    setConfig(prev => ({
      ...prev,
      logging: {
        ...prev.logging,
        [key]: !prev.logging[key],
      }
    }));
  };

  const addCustomRule = (rule: Omit<AIFailoverConfiguration['customRules'][0], 'id'>) => {
    const newRule = {
      ...rule,
      id: Date.now().toString(),
    };

    setConfig(prev => ({
      ...prev,
      customRules: [...prev.customRules, newRule],
    }));
  };

  const saveConfiguration = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // In a real app, you'd save the configuration to a backend service here
    console.log('Saved configuration:', config);
  };

  return {
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
    saveConfiguration,
  };
};
