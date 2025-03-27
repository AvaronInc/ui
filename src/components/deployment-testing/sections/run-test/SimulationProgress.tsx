
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Server, Database, AlertCircle, CheckCircle } from 'lucide-react';

interface SimulationProgressProps {
  progress: number;
  status: string;
}

const SimulationProgress: React.FC<SimulationProgressProps> = ({ progress, status }) => {
  // For demonstration purposes, we'll create internal state that advances
  // This would normally be controlled by the parent component
  const [internalProgress, setInternalProgress] = useState(progress);
  const [currentStatus, setCurrentStatus] = useState(status);

  // Simulate advancing progress for demonstration
  useEffect(() => {
    if (internalProgress < 100) {
      const interval = setInterval(() => {
        setInternalProgress(prev => {
          const newProgress = Math.min(prev + Math.floor(Math.random() * 5) + 1, 100);
          
          // Update status message based on progress
          if (newProgress < 30) {
            setCurrentStatus('Creating virtualized environment...');
          } else if (newProgress < 60) {
            setCurrentStatus('Applying configuration changes...');
          } else if (newProgress < 90) {
            setCurrentStatus('Simulating traffic and analyzing impact...');
          } else {
            setCurrentStatus('Finalizing report and recommendations...');
          }
          
          return newProgress;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [internalProgress]);

  // Determine progress variant
  const getProgressVariant = () => {
    if (internalProgress < 30) return "default";
    if (internalProgress < 60) return "warning";
    if (internalProgress < 90) return "warning";
    return "success";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Simulation Progress</p>
          <p className="text-sm text-muted-foreground">{internalProgress}%</p>
        </div>
        <Progress value={internalProgress} className="h-2" variant={getProgressVariant()} />
      </div>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <p className="text-sm font-medium">{currentStatus}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SimulationStepCard 
          title="Environment" 
          icon={<Server className="h-5 w-5" />} 
          complete={internalProgress >= 30}
          active={internalProgress < 30 && internalProgress > 0}
        />
        <SimulationStepCard 
          title="Configuration" 
          icon={<Database className="h-5 w-5" />} 
          complete={internalProgress >= 60}
          active={internalProgress >= 30 && internalProgress < 60}
        />
        <SimulationStepCard 
          title="Analysis" 
          icon={<AlertCircle className="h-5 w-5" />} 
          complete={internalProgress >= 90}
          active={internalProgress >= 60 && internalProgress < 90}
        />
        <SimulationStepCard 
          title="Complete" 
          icon={<CheckCircle className="h-5 w-5" />} 
          complete={internalProgress >= 100}
          active={internalProgress >= 90 && internalProgress < 100}
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
    bgColor = "bg-green-100 dark:bg-green-900/30";
    textColor = "text-green-800 dark:text-green-400";
    borderColor = "border-green-300 dark:border-green-800";
  } else if (active) {
    bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
    textColor = "text-yellow-800 dark:text-yellow-400";
    borderColor = "border-yellow-300 dark:border-yellow-800";
  }
  
  return (
    <div className={`border rounded-md p-3 flex flex-col items-center justify-center text-center transition-all duration-300 ${bgColor} ${borderColor}`}>
      <div className={`mb-1 ${complete ? "text-green-600 dark:text-green-400" : active ? textColor : "text-muted-foreground"}`}>
        {icon}
      </div>
      <p className={`text-sm font-medium ${complete ? textColor : active ? textColor : "text-muted-foreground"}`}>
        {title}
      </p>
    </div>
  );
};

export default SimulationProgress;
