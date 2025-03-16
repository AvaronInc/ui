
import { useState, useEffect } from 'react';
import { 
  ChangeRequest, 
  ChangeStats, 
  ApprovalWorkflow 
} from '@/types/change-management';
import { 
  mockChangeRequests, 
  mockChangeStats, 
  mockApprovalWorkflows 
} from '@/data/change-management/mockData';
import { toast } from 'sonner';

export const useChangeManagement = () => {
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>(mockChangeRequests);
  const [changeStats, setChangeStats] = useState<ChangeStats>(mockChangeStats);
  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>(mockApprovalWorkflows);
  const [loading, setLoading] = useState(false);

  // Get pending change requests
  const getPendingChanges = () => {
    return changeRequests.filter(change => 
      change.status === 'approval' || change.status === 'review'
    );
  };

  // Get changes awaiting approval
  const getChangesAwaitingApproval = () => {
    return changeRequests.filter(change => 
      change.status === 'approval' && 
      change.approvals.some(approval => approval.status === 'pending')
    );
  };

  // Get recently approved changes
  const getRecentlyApprovedChanges = () => {
    return changeRequests.filter(change => 
      change.approvals.some(approval => 
        approval.status === 'approved' && 
        new Date(approval.approvedAt!).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      )
    );
  };

  // Get high risk changes
  const getHighRiskChanges = () => {
    return changeRequests.filter(change => 
      change.riskLevel === 'critical' || change.riskLevel === 'high'
    );
  };

  // Submit a new change request
  const submitChangeRequest = (change: Partial<ChangeRequest>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newChange: ChangeRequest = {
        id: `cr-${Date.now()}`,
        title: change.title || '',
        description: change.description || '',
        requestedBy: change.requestedBy || '',
        assignedTo: change.assignedTo || '',
        type: change.type || 'standard',
        status: 'draft',
        affectedComponents: change.affectedComponents || [],
        plannedDate: change.plannedDate || new Date().toISOString(),
        rollbackPlan: change.rollbackPlan || '',
        riskLevel: change.riskLevel || 'medium',
        approvals: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setChangeRequests(prev => [newChange, ...prev]);
      
      // Update stats
      setChangeStats(prev => ({
        ...prev,
        totalPending: prev.totalPending + 1,
        changesByType: {
          ...prev.changesByType,
          [newChange.type]: prev.changesByType[newChange.type] + 1
        },
        changesByStatus: {
          ...prev.changesByStatus,
          draft: prev.changesByStatus.draft + 1
        }
      }));
      
      setLoading(false);
      toast.success("Change request created successfully");
    }, 1000);
  };

  // Update change request status
  const updateChangeStatus = (changeId: string, newStatus: ChangeRequest['status']) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setChangeRequests(prev => 
        prev.map(change => {
          if (change.id === changeId) {
            const oldStatus = change.status;
            return {
              ...change,
              status: newStatus,
              updatedAt: new Date().toISOString()
            };
          }
          return change;
        })
      );
      
      setLoading(false);
      toast.success(`Change status updated to ${newStatus}`);
    }, 1000);
  };

  // Process approval
  const processApproval = (
    changeId: string, 
    approvalId: string, 
    status: 'approved' | 'rejected' | 'on-hold' | 'more-info',
    comments?: string
  ) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setChangeRequests(prev => 
        prev.map(change => {
          if (change.id === changeId) {
            const updatedApprovals = change.approvals.map(approval => {
              if (approval.id === approvalId) {
                return {
                  ...approval,
                  status,
                  comments: comments || approval.comments,
                  approver: 'Current User', // In a real app, this would come from auth context
                  approvedAt: status === 'approved' ? new Date().toISOString() : undefined
                };
              }
              return approval;
            });
            
            // If all required approvals are complete, update status
            const allApproved = updatedApprovals.every(a => 
              a.status === 'approved' || a.status === 'rejected'
            );
            
            const anyRejected = updatedApprovals.some(a => a.status === 'rejected');
            
            const newStatus = anyRejected 
              ? 'review' 
              : (allApproved && change.status === 'approval' ? 'implementation' : change.status);
            
            return {
              ...change,
              status: newStatus,
              approvals: updatedApprovals,
              updatedAt: new Date().toISOString()
            };
          }
          return change;
        })
      );
      
      // Update stats if an approval is completed
      if (status === 'approved') {
        setChangeStats(prev => ({
          ...prev,
          recentlyApproved: prev.recentlyApproved + 1,
          pendingApproval: Math.max(0, prev.pendingApproval - 1)
        }));
      }
      
      setLoading(false);
      toast.success(`Approval ${status}`);
    }, 1000);
  };

  return {
    changeRequests,
    changeStats,
    approvalWorkflows,
    loading,
    getPendingChanges,
    getChangesAwaitingApproval,
    getRecentlyApprovedChanges,
    getHighRiskChanges,
    submitChangeRequest,
    updateChangeStatus,
    processApproval
  };
};
