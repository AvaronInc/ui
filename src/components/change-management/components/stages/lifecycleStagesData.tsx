
import React from 'react';
import { LifecycleStage } from './StageTypes';
import { CheckCircle, FileEdit, FileCheck, Play, Search, Archive } from 'lucide-react';

export const getLifecycleStages = (): LifecycleStage[] => {
  return [
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
};
