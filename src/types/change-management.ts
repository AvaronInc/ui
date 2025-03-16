
export type ChangeType = 'standard' | 'emergency' | 'major' | 'minor' | 'routine' | 'security';
export type ChangeStatus = 'draft' | 'review' | 'approval' | 'implementation' | 'verification' | 'closed';
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'on-hold' | 'more-info';

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  assignedTo: string;
  type: ChangeType;
  status: ChangeStatus;
  affectedComponents: string[];
  plannedDate: string;
  completedDate?: string;
  rollbackPlan: string;
  riskLevel: RiskLevel;
  riskScore?: number;
  approvals: Approval[];
  aiAssessment?: AIAssessment;
  createdAt: string;
  updatedAt: string;
}

export interface Approval {
  id: string;
  role: string;
  approver?: string;
  status: ApprovalStatus;
  comments?: string;
  approvedAt?: string;
}

export interface AIAssessment {
  riskScore: number;
  securityRisk: number;
  businessImpact: number;
  systemStability: number;
  potentialDowntime: string;
  dependencies: string[];
  mitigationStrategies: string[];
  recommendedActions: string[];
  assessmentDate: string;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description: string;
  changeTypes: ChangeType[];
  requiredApprovals: {
    role: string;
    riskThreshold: RiskLevel;
  }[];
  escalationRules: {
    after: number; // hours
    escalateTo: string;
  }[];
}

export interface ChangeStats {
  totalPending: number;
  pendingApproval: number;
  recentlyApproved: number;
  recentlyImplemented: number;
  highRiskChanges: number;
  changesByType: Record<ChangeType, number>;
  changesByStatus: Record<ChangeStatus, number>;
}
