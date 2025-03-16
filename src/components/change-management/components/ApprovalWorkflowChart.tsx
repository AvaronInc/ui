
import React from 'react';
import { ApprovalWorkflow } from '@/types/change-management';
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Users } from 'lucide-react';

interface ApprovalWorkflowChartProps {
  workflow: ApprovalWorkflow;
}

const ApprovalWorkflowChart: React.FC<ApprovalWorkflowChartProps> = ({ workflow }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        {workflow.requiredApprovals.map((approval, index) => (
          <React.Fragment key={approval.role}>
            <div className="flex flex-col items-center p-3 border rounded-md min-w-[150px] bg-card">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <span className="font-medium text-center">{approval.role}</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                Required for {approval.riskThreshold}+ risk
              </span>
            </div>
            
            {index < workflow.requiredApprovals.length - 1 && (
              <div className="rotate-90 md:rotate-0">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="flex flex-col items-center p-3 border rounded-md">
          <CheckCircle className="h-6 w-6 mb-2 text-green-500" />
          <span className="font-medium">Approved</span>
          <span className="text-xs text-muted-foreground mt-1 text-center">
            All required approvals received
          </span>
        </div>
        
        <div className="flex flex-col items-center p-3 border rounded-md">
          <AlertTriangle className="h-6 w-6 mb-2 text-red-500" />
          <span className="font-medium">Rejected</span>
          <span className="text-xs text-muted-foreground mt-1 text-center">
            Change request denied
          </span>
        </div>
        
        <div className="flex flex-col items-center p-3 border rounded-md">
          <Clock className="h-6 w-6 mb-2 text-amber-500" />
          <span className="font-medium">Escalation</span>
          <span className="text-xs text-muted-foreground mt-1 text-center">
            After {workflow.escalationRules[0]?.after || 24} hours
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflowChart;
