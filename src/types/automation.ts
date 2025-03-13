
export type ScriptType = 'PowerShell' | 'Ansible' | 'Python' | 'GoLang';
export type ProcessType = 'AI' | 'Backup' | 'Security' | 'System Maintenance' | 'Custom Script';
export type ExecutionFrequency = 'One-Time' | 'Scheduled' | 'Recurring';
export type AutomationStatus = 'Running' | 'Completed' | 'Failed';
export type ScriptStatus = 'Active' | 'Inactive' | 'Deprecated';

export interface AutomationOverview {
  totalAutomations: number;
  activeScriptCounts: Record<ScriptType, number>;
  lastSecurityReportTime: string;
  lastBackupStatus: 'Success' | 'Failed' | 'In Progress';
}

export interface AIDecision {
  id: string;
  description: string;
  timestamp: string;
  confidenceLevel: number;
  outcome: string;
}

export interface AutomationProcess {
  id: string;
  name: string;
  type: ProcessType;
  lastExecutionTime: string;
  status: AutomationStatus;
  scheduledRunTime?: string;
}

export interface Script {
  id: string;
  name: string;
  type: ScriptType;
  lastExecutionDate: string;
  createdBy: string;
  status: ScriptStatus;
  executionFrequency: ExecutionFrequency;
  content: string;
  description: string;
}

export interface NewScriptFormData {
  name: string;
  createdBy: string;
  description: string;
  type: ScriptType;
  generateWithAI: boolean;
}
