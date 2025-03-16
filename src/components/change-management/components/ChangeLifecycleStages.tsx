
import React from 'react';
import { useChangeManagement } from '@/hooks/use-change-management';
import { ChangeStatus } from '@/types/change-management';
import { CheckCircle, FileEdit, FileCheck, Play, Search, Archive } from 'lucide-react';

const ChangeLifecycleStages: React.FC = () => {
  const { changeStats } = useChangeManagement();
  
  // Lifecycle stages in order
  const stages: Array<{
    status: ChangeStatus;
    label: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    {
      status: 'draft',
      label: 'Draft',
      icon: <FileEdit className="h-5 w-5" />,
      description: 'Initial creation and documentation'
    },
    {
      status: 'review',
      label: 'Review',
      icon: <FileCheck className="h-5 w-5" />,
      description: 'Technical assessment and peer review'
    },
    {
      status: 'approval',
      label: 'Approval',
      icon: <CheckCircle className="h-5 w-5" />,
      description: 'Formal approval from stakeholders'
    },
    {
      status: 'implementation',
      label: 'Implementation',
      icon: <Play className="h-5 w-5" />,
      description: 'Executing the planned changes'
    },
    {
      status: 'verification',
      label: 'Verification',
      icon: <Search className="h-5 w-5" />,
      description: 'Testing and validating the changes'
    },
    {
      status: 'closed',
      label: 'Closed',
      icon: <Archive className="h-5 w-5" />,
      description: 'Documentation and lessons learned'
    }
  ];
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress Bar */}
        <div className="hidden sm:block absolute left-0 right-0 h-1 bg-muted top-9 transform translate-y-1/2">
          <div className="absolute left-0 h-full bg-primary w-0"></div>
        </div>
        
        {/* Stages */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {stages.map((stage, index) => {
            const count = changeStats.changesByStatus[stage.status] || 0;
            
            return (
              <div key={stage.status} className="flex flex-col items-center text-center">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-2
                  border-2 border-primary bg-background relative z-10
                `}>
                  {stage.icon}
                  {count > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {count}
                    </div>
                  )}
                </div>
                <div className="font-medium">{stage.label}</div>
                <div className="text-xs text-muted-foreground mt-1 hidden md:block">
                  {stage.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangeLifecycleStages;
