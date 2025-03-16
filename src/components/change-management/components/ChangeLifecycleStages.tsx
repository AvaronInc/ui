
import React from 'react';
import { useChangeManagement } from '@/hooks/use-change-management';
import { getLifecycleStages } from './stages/lifecycleStagesData';
import LifecycleStageItem from './stages/LifecycleStageItem';
import StagesProgressBar from './stages/StagesProgressBar';

const ChangeLifecycleStages: React.FC = () => {
  const { changeStats } = useChangeManagement();
  const stages = getLifecycleStages();
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress Bar */}
        <StagesProgressBar />
        
        {/* Stages */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {stages.map((stage) => {
            const count = changeStats.changesByStatus[stage.status] || 0;
            return (
              <LifecycleStageItem 
                key={stage.status} 
                stage={stage} 
                count={count} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangeLifecycleStages;
