
import { 
  ChangeRequest, 
  ChangeStats, 
  ApprovalWorkflow 
} from '@/types/change-management';
import { addDays, subDays } from 'date-fns';

// Helper to create dates
const today = new Date();
const yesterday = subDays(today, 1);
const lastWeek = subDays(today, 7);
const nextWeek = addDays(today, 7);
const tomorrow = addDays(today, 1);

// Mock Change Requests
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: '1',
    title: 'Update Firewall Rules for Remote Workers',
    description: 'Updating firewall configuration to allow secure remote access for the marketing team working from home.',
    requestedBy: 'Jane Smith',
    assignedTo: 'Mike Johnson',
    type: 'standard',
    status: 'approval',
    affectedComponents: ['Firewall', 'VPN', 'Network'],
    plannedDate: nextWeek.toISOString(),
    rollbackPlan: 'Restore previous firewall configuration from backup.',
    riskLevel: 'medium',
    riskScore: 56,
    approvals: [
      {
        id: 'a1',
        role: 'Network Admin',
        approver: 'David Lee',
        status: 'approved',
        comments: 'Looks good, tested in lab environment.',
        approvedAt: yesterday.toISOString(),
      },
      {
        id: 'a2',
        role: 'Security Officer',
        status: 'pending',
      }
    ],
    aiAssessment: {
      riskScore: 56,
      securityRisk: 45,
      businessImpact: 30,
      systemStability: 20,
      potentialDowntime: '5 minutes',
      dependencies: ['VPN Service', 'Identity Management', 'Email Gateway'],
      mitigationStrategies: [
        'Implement during off-hours',
        'Notify remote workers in advance',
        'Have backup access method ready'
      ],
      recommendedActions: [
        'Test with a small group first',
        'Create detailed rollback plan',
        'Monitor for unusual access patterns after implementation'
      ],
      assessmentDate: yesterday.toISOString(),
    },
    createdAt: subDays(today, 3).toISOString(),
    updatedAt: yesterday.toISOString(),
  },
  {
    id: '2',
    title: 'Server Patch for Critical Security Vulnerability',
    description: 'Emergency patching of all production servers to address the recently identified CVE-2023-12345 vulnerability.',
    requestedBy: 'Alex Brown',
    assignedTo: 'Sarah Wilson',
    type: 'emergency',
    status: 'implementation',
    affectedComponents: ['Application Servers', 'Database Servers'],
    plannedDate: tomorrow.toISOString(),
    rollbackPlan: 'Restore servers from last night\'s backup if issues occur.',
    riskLevel: 'critical',
    riskScore: 89,
    approvals: [
      {
        id: 'a3',
        role: 'IT Director',
        approver: 'Robert Chen',
        status: 'approved',
        comments: 'Given the severity, proceed ASAP.',
        approvedAt: today.toISOString(),
      }
    ],
    aiAssessment: {
      riskScore: 89,
      securityRisk: 95,
      businessImpact: 75,
      systemStability: 45,
      potentialDowntime: '15-30 minutes',
      dependencies: ['Customer Portal', 'Payment Processing', 'Inventory System'],
      mitigationStrategies: [
        'Implement during lowest traffic hours',
        'Test patch in staging first',
        'Have standby team ready for issues'
      ],
      recommendedActions: [
        'Implement in phases starting with non-critical systems',
        'Prepare user communication',
        'Validate all services after patching each server'
      ],
      assessmentDate: today.toISOString(),
    },
    createdAt: yesterday.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: '3',
    title: 'Network Switch Upgrade - East Building',
    description: 'Replace aging network switches in the east building with new models supporting higher bandwidth.',
    requestedBy: 'Thomas Green',
    assignedTo: 'Lisa Parker',
    type: 'major',
    status: 'draft',
    affectedComponents: ['Network Infrastructure', 'East Building'],
    plannedDate: addDays(today, 14).toISOString(),
    rollbackPlan: 'Keep old switches on standby, revert connections if issues arise.',
    riskLevel: 'high',
    riskScore: 72,
    approvals: [],
    aiAssessment: {
      riskScore: 72,
      securityRisk: 40,
      businessImpact: 80,
      systemStability: 65,
      potentialDowntime: '2-4 hours',
      dependencies: ['All East Building Services', 'Inter-building Communication'],
      mitigationStrategies: [
        'Schedule during weekend',
        'Migrate one floor at a time',
        'Prepare temporary network paths'
      ],
      recommendedActions: [
        'Create detailed migration plan for each connection',
        'Test new switches thoroughly before deployment',
        'Have vendor support on standby'
      ],
      assessmentDate: subDays(today, 2).toISOString(),
    },
    createdAt: subDays(today, 5).toISOString(),
    updatedAt: subDays(today, 2).toISOString(),
  },
  {
    id: '4',
    title: 'Update SSL Certificates',
    description: 'Renew and replace SSL certificates for all customer-facing web services before expiration.',
    requestedBy: 'Emily Johnson',
    assignedTo: 'Carlos Rodriguez',
    type: 'routine',
    status: 'verification',
    affectedComponents: ['Web Servers', 'Load Balancers', 'API Gateway'],
    plannedDate: subDays(today, 1).toISOString(),
    completedDate: today.toISOString(),
    rollbackPlan: 'Revert to previous certificates if issues occur.',
    riskLevel: 'low',
    riskScore: 25,
    approvals: [
      {
        id: 'a4',
        role: 'Security Officer',
        approver: 'Maria Zhang',
        status: 'approved',
        comments: 'Standard renewal procedure, no concerns.',
        approvedAt: subDays(today, 2).toISOString(),
      }
    ],
    aiAssessment: {
      riskScore: 25,
      securityRisk: 30,
      businessImpact: 15,
      systemStability: 10,
      potentialDowntime: 'None expected',
      dependencies: ['Customer Portal', 'Partner API', 'Mobile Applications'],
      mitigationStrategies: [
        'Test certificates in staging environment',
        'Verify all services after deployment',
        'Monitor certificate chain validation'
      ],
      recommendedActions: [
        'Create automated certificate renewal process',
        'Document updated certificate details',
        'Update monitoring for new expiration dates'
      ],
      assessmentDate: subDays(today, 3).toISOString(),
    },
    createdAt: subDays(today, 10).toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: '5',
    title: 'Database Server Migration to Cloud',
    description: 'Migrate on-premise Oracle databases to AWS RDS for improved reliability and management.',
    requestedBy: 'Kevin Washington',
    assignedTo: 'Priya Patel',
    type: 'major',
    status: 'review',
    affectedComponents: ['Database', 'Application Servers', 'Backup Systems'],
    plannedDate: addDays(today, 30).toISOString(),
    rollbackPlan: 'Maintain on-premise servers until migration is confirmed successful for 2 weeks.',
    riskLevel: 'high',
    riskScore: 78,
    approvals: [],
    aiAssessment: {
      riskScore: 78,
      securityRisk: 60,
      businessImpact: 85,
      systemStability: 70,
      potentialDowntime: '4-8 hours',
      dependencies: ['CRM System', 'ERP System', 'Reporting Services'],
      mitigationStrategies: [
        'Use AWS Database Migration Service with minimal downtime',
        'Perform dry runs in test environment',
        'Create detailed cutover plan'
      ],
      recommendedActions: [
        'Establish VPN connection for secure migration',
        'Verify data integrity with checksums',
        'Update application connection strings in stages'
      ],
      assessmentDate: subDays(today, 5).toISOString(),
    },
    createdAt: subDays(today, 15).toISOString(),
    updatedAt: subDays(today, 5).toISOString(),
  }
];

// Mock Change Statistics
export const mockChangeStats: ChangeStats = {
  totalPending: 12,
  pendingApproval: 5,
  recentlyApproved: 8,
  recentlyImplemented: 6,
  highRiskChanges: 3,
  changesByType: {
    standard: 15,
    emergency: 3,
    major: 7,
    minor: 12,
    routine: 23,
    security: 9,
  },
  changesByStatus: {
    draft: 8,
    review: 7,
    approval: 5,
    implementation: 4,
    verification: 3,
    closed: 42,
  }
};

// Mock Approval Workflows
export const mockApprovalWorkflows: ApprovalWorkflow[] = [
  {
    id: 'wf1',
    name: 'Standard Change Approval',
    description: 'Default workflow for standard and minor changes',
    changeTypes: ['standard', 'minor', 'routine'],
    requiredApprovals: [
      { role: 'Technical Lead', riskThreshold: 'low' },
      { role: 'Change Manager', riskThreshold: 'medium' },
      { role: 'IT Director', riskThreshold: 'high' }
    ],
    escalationRules: [
      { after: 48, escalateTo: 'IT Director' }
    ]
  },
  {
    id: 'wf2',
    name: 'Emergency Change Process',
    description: 'Expedited approval for emergency changes',
    changeTypes: ['emergency'],
    requiredApprovals: [
      { role: 'Technical Lead', riskThreshold: 'medium' },
      { role: 'IT Director', riskThreshold: 'critical' }
    ],
    escalationRules: [
      { after: 2, escalateTo: 'CIO' }
    ]
  },
  {
    id: 'wf3',
    name: 'Major Change Approval',
    description: 'Comprehensive approval for major infrastructure changes',
    changeTypes: ['major'],
    requiredApprovals: [
      { role: 'Technical Lead', riskThreshold: 'low' },
      { role: 'Change Manager', riskThreshold: 'low' },
      { role: 'Security Officer', riskThreshold: 'medium' },
      { role: 'IT Director', riskThreshold: 'medium' },
      { role: 'CIO', riskThreshold: 'high' }
    ],
    escalationRules: [
      { after: 72, escalateTo: 'CIO' }
    ]
  },
  {
    id: 'wf4',
    name: 'Security Patch Process',
    description: 'Security-focused approval for vulnerability patches',
    changeTypes: ['security'],
    requiredApprovals: [
      { role: 'Security Officer', riskThreshold: 'low' },
      { role: 'Technical Lead', riskThreshold: 'medium' },
      { role: 'IT Director', riskThreshold: 'high' }
    ],
    escalationRules: [
      { after: 24, escalateTo: 'Security Officer' },
      { after: 48, escalateTo: 'CIO' }
    ]
  }
];
