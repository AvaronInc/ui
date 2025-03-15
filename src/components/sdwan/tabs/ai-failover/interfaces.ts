
import { AIFailoverConfiguration } from '@/types/sdwan';

export interface AIThresholdSettingsProps {
  confidenceLevel: number;
  minimumConfidence: number;
  threshold: 'low' | 'medium' | 'high';
  requireAdminApproval: boolean;
  onConfidenceLevelChange: (value: number) => void;
  onMinimumConfidenceChange: (value: number) => void;
  onThresholdChange: (value: 'low' | 'medium' | 'high') => void;
  onAdminApprovalToggle: () => void;
}

export interface NetworkConditionsProps {
  networkConditions: AIFailoverConfiguration['networkConditions'];
  onNetworkConditionChange: (key: keyof AIFailoverConfiguration['networkConditions'], value: any) => void;
}

export interface AdaptiveLearningProps {
  adaptiveLearning: AIFailoverConfiguration['adaptiveLearning'];
  onToggleAdaptiveLearning: (key: keyof AIFailoverConfiguration['adaptiveLearning']) => void;
}

export interface FailoverRulesProps {
  failoverPriority: AIFailoverConfiguration['failoverPriority'];
  simulationMode: boolean;
  customRules: AIFailoverConfiguration['customRules'];
  onFailoverPriorityChange: (value: 'cost' | 'performance' | 'stability') => void;
  onSimulationModeToggle: () => void;
  onAddRule: (rule: Omit<AIFailoverConfiguration['customRules'][0], 'id'>) => void;
}

export interface LoggingAlertsProps {
  logging: AIFailoverConfiguration['logging'];
  onLoggingToggle: (key: keyof AIFailoverConfiguration['logging']) => void;
}
