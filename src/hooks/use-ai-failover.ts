
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AIFailoverConfiguration } from '@/types/sdwan';

const defaultAIFailoverConfig: AIFailoverConfiguration = {
  confidenceLevel: 75,
  minimumConfidenceRequired: 80,
  thresholdForRecommendations: 'medium',
  requireAdminApproval: true,
  networkConditions: {
    latencyThreshold: 100,
    packetLossThreshold: 5,
    jitterThreshold: 30,
    connectionDownThreshold: {
      count: 3,
      timeWindow: 5
    },
    detectBGPIssues: true,
    ddosResponseEnabled: true
  },
  adaptiveLearning: {
    enabled: true,
    allowRealTimeTrafficAdjustment: true
  },
  failoverPriority: 'performance',
  simulationModeEnabled: false,
  logging: {
    enabled: true,
    sendAlerts: true
  },
  customRules: [
    {
      id: '1',
      sourceIp: '10.0.1.0/24',
      destination: 'SaaS Apps',
      priority: 'high'
    },
    {
      id: '2',
      sourceIp: '10.0.2.0/24',
      destination: 'Cloud Services',
      priority: 'medium'
    }
  ]
};

export const useAIFailover = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<AIFailoverConfiguration>(defaultAIFailoverConfig);
  const [isLoading, setIsLoading] = useState(false);

  const updateConfidenceLevel = (value: number) => {
    setConfig(prev => ({
      ...prev,
      confidenceLevel: value
    }));
  };

  const updateMinimumConfidence = (value: number) => {
    setConfig(prev => ({
      ...prev,
      minimumConfidenceRequired: value
    }));
  };

  const updateThreshold = (value: 'low' | 'medium' | 'high') => {
    setConfig(prev => ({
      ...prev,
      thresholdForRecommendations: value
    }));
  };

  const toggleAdminApproval = () => {
    setConfig(prev => ({
      ...prev,
      requireAdminApproval: !prev.requireAdminApproval
    }));
  };

  const updateNetworkCondition = (
    key: keyof AIFailoverConfiguration['networkConditions'],
    value: any
  ) => {
    setConfig(prev => ({
      ...prev,
      networkConditions: {
        ...prev.networkConditions,
        [key]: value
      }
    }));
  };

  const toggleAdaptiveLearning = (key: keyof AIFailoverConfiguration['adaptiveLearning']) => {
    setConfig(prev => ({
      ...prev,
      adaptiveLearning: {
        ...prev.adaptiveLearning,
        [key]: !prev.adaptiveLearning[key]
      }
    }));
  };

  const updateFailoverPriority = (value: 'cost' | 'performance' | 'stability') => {
    setConfig(prev => ({
      ...prev,
      failoverPriority: value
    }));
  };

  const toggleSimulationMode = () => {
    setConfig(prev => ({
      ...prev,
      simulationModeEnabled: !prev.simulationModeEnabled
    }));
  };

  const toggleLogging = (key: keyof AIFailoverConfiguration['logging']) => {
    setConfig(prev => ({
      ...prev,
      logging: {
        ...prev.logging,
        [key]: !prev.logging[key]
      }
    }));
  };

  const addCustomRule = (rule: Omit<AIFailoverConfiguration['customRules'][0], 'id'>) => {
    const newRule = {
      ...rule,
      id: String(config.customRules.length + 1)
    };
    
    setConfig(prev => ({
      ...prev,
      customRules: [...prev.customRules, newRule]
    }));
  };

  const saveConfiguration = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "AI Failover configuration has been saved",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to save AI Failover configuration", error);
      
      toast({
        title: "Error",
        description: "Failed to save AI Failover configuration",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
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
    saveConfiguration
  };
};
