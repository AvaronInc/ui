
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Server, Database, AlertCircle, CheckCircle } from 'lucide-react';

interface SimulationProgressProps {
  progress: number;
  status: string;
}

const SimulationProgress: React.FC<SimulationProgressProps> = ({ progress, status }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Simulation Progress</p>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <p className="text-sm font-medium">{status}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SimulationStepCard 
          title="Environment" 
          icon={<Server className="h-5 w-5" />} 
          complete={progress >= 30}
          active={progress < 30 && progress > 0}
        />
        <SimulationStepCard 
          title="Configuration" 
          icon={<Database className="h-5 w-5" />} 
          complete={progress >= 60}
          active={progress >= 30 && progress < 60}
        />
        <SimulationStepCard 
          title="Analysis" 
          icon={<AlertCircle className="h-5 w-5" />} 
          complete={progress >= 90}
          active={progress >= 60 && progress < 90}
        />
        <SimulationStepCard 
          title="Complete" 
          icon={<CheckCircle className="h-5 w-5" />} 
          complete={progress >= 100}
          active={progress >= 90 && progress < 100}
        />
      </div>
    </div>
  );
};

interface SimulationStepCardProps {
  title: string;
  icon: React.ReactNode;
  complete: boolean;
  active: boolean;
}

export const SimulationStepCard: React.FC<SimulationStepCardProps> = ({ 
  title, 
  icon, 
  complete,
  active 
}) => {
  let bgColor = "bg-muted/30";
  let textColor = "text-muted-foreground";
  let borderColor = "";
  
  if (complete) {
    bgColor = "bg-primary/10";
    textColor = "text-primary";
    borderColor = "border-primary/30";
  } else if (active) {
    bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
    textColor = "text-yellow-800 dark:text-yellow-400";
    borderColor = "border-yellow-300 dark:border-yellow-800";
  }
  
  return (
    <div className={`border rounded-md p-3 flex flex-col items-center justify-center text-center transition-all duration-300 ${bgColor} ${borderColor}`}>
      <div className={`mb-1 ${complete ? "text-primary" : active ? textColor : "text-muted-foreground"}`}>
        {icon}
      </div>
      <p className={`text-sm font-medium ${complete ? "" : active ? textColor : "text-muted-foreground"}`}>
        {title}
      </p>
    </div>
  );
};

export default SimulationProgress;
