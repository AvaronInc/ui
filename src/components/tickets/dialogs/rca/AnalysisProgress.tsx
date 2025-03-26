
import React from 'react';
import { Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnalysisProgressProps {
  progress: number;
  getAnalysisStage: () => string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ 
  progress, 
  getAnalysisStage 
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{getAnalysisStage()}</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
      
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Analysis steps:</h4>
        <ul className="text-sm space-y-1">
          <li className={`flex items-center ${progress >= 25 ? "text-foreground" : "text-muted-foreground"}`}>
            {progress >= 25 ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <span className="h-4 w-4 mr-2" />}
            Collect system diagnostics
          </li>
          <li className={`flex items-center ${progress >= 50 ? "text-foreground" : "text-muted-foreground"}`}>
            {progress >= 50 ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <span className="h-4 w-4 mr-2" />}
            Analyze infrastructure components
          </li>
          <li className={`flex items-center ${progress >= 75 ? "text-foreground" : "text-muted-foreground"}`}>
            {progress >= 75 ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <span className="h-4 w-4 mr-2" />}
            Correlate event patterns
          </li>
          <li className={`flex items-center ${progress >= 95 ? "text-foreground" : "text-muted-foreground"}`}>
            {progress >= 95 ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <span className="h-4 w-4 mr-2" />}
            Generate insights and recommendations
          </li>
        </ul>
      </div>
    </div>
  );
};
