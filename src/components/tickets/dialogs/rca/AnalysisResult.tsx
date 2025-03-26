
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RootCauseCard } from './RootCauseCard';
import { RecommendedActions } from './RecommendedActions';

export interface RootCause {
  id: number;
  cause: string;
  probability: string;
  description: string;
  evidence: string;
}

interface AnalysisResultProps {
  ticket: { id: string } | null;
  rootCauses: RootCause[];
  recommendedActions: string[];
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  ticket,
  rootCauses,
  recommendedActions
}) => {
  return (
    <ScrollArea className="max-h-[60vh] pr-4">
      <div className="space-y-6 py-4">
        <div>
          <h3 className="text-lg font-medium">Analysis Summary</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Based on the collected data, we've identified the following potential root causes for the issue reported in ticket #{ticket?.id}.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-md font-medium">Potential Root Causes</h4>
          {rootCauses.map((cause) => (
            <RootCauseCard key={cause.id} cause={cause} />
          ))}
        </div>
        
        <RecommendedActions actions={recommendedActions} />
      </div>
    </ScrollArea>
  );
};
