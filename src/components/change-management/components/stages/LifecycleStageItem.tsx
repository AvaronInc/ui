
import React from 'react';
import { LifecycleStage } from './StageTypes';

interface LifecycleStageItemProps {
  stage: LifecycleStage;
  count: number;
}

const LifecycleStageItem: React.FC<LifecycleStageItemProps> = ({ stage, count }) => {
  return (
    <div className="flex flex-col items-center text-center">
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
};

export default LifecycleStageItem;
