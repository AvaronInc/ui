
import React, { useState, useEffect } from 'react';
import { FileSearch } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/types/tickets';
import { AnalysisIntro } from './rca/AnalysisIntro';
import { AnalysisProgress } from './rca/AnalysisProgress';
import { AnalysisResult } from './rca/AnalysisResult';
import { mockAnalysisData } from './rca/types';

interface RootCauseAnalysisDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RootCauseAnalysisDialog: React.FC<RootCauseAnalysisDialogProps> = ({
  ticket,
  open,
  onOpenChange,
}) => {
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setAnalysisStarted(false);
      setProgress(0);
      setAnalysisComplete(false);
    }
  }, [open]);

  useEffect(() => {
    let interval: number | undefined;
    
    if (analysisStarted && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.floor(Math.random() * 10) + 1;
          const newProgress = Math.min(prev + increment, 100);
          
          if (newProgress === 100) {
            clearInterval(interval);
            setTimeout(() => setAnalysisComplete(true), 500);
          }
          
          return newProgress;
        });
      }, 400) as unknown as number;
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [analysisStarted, progress]);

  const startAnalysis = () => {
    setAnalysisStarted(true);
  };

  const resetAnalysis = () => {
    setAnalysisStarted(false);
    setProgress(0);
    setAnalysisComplete(false);
  };

  const getAnalysisStage = () => {
    if (progress < 25) return "Collecting system diagnostics...";
    if (progress < 50) return "Analyzing infrastructure components...";
    if (progress < 75) return "Correlating event patterns...";
    if (progress < 95) return "Generating root cause probabilities...";
    return "Finalizing analysis report...";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5" />
            Root Cause Analysis
            {ticket && <span className="text-sm font-normal text-muted-foreground ml-2">Ticket #{ticket.id}</span>}
          </DialogTitle>
          <DialogDescription>
            {!analysisStarted ? (
              "Automated analysis to determine the underlying cause of the reported issue."
            ) : analysisComplete ? (
              "Analysis complete. Review the findings below."
            ) : (
              "Analysis in progress. Please wait while we investigate the issue."
            )}
          </DialogDescription>
        </DialogHeader>

        {!analysisStarted ? (
          <AnalysisIntro />
        ) : !analysisComplete ? (
          <AnalysisProgress 
            progress={progress} 
            getAnalysisStage={getAnalysisStage} 
          />
        ) : (
          <AnalysisResult 
            ticket={ticket}
            rootCauses={mockAnalysisData.rootCauses}
            recommendedActions={mockAnalysisData.recommendedActions}
          />
        )}

        <DialogFooter>
          {!analysisStarted ? (
            <Button onClick={startAnalysis}>Begin Analysis</Button>
          ) : analysisComplete ? (
            <div className="flex gap-2 justify-end w-full">
              <Button variant="outline" onClick={resetAnalysis}>Run New Analysis</Button>
              <Button onClick={() => onOpenChange(false)}>Close Report</Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RootCauseAnalysisDialog;
