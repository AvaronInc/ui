
import React, { useState, useEffect } from 'react';
import { FileSearch, AlertTriangle, Check, Cpu } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Ticket } from '@/types/tickets';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

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

  // Mock data for the report
  const rootCauses = [
    { 
      id: 1,
      cause: "Network Latency Spike",
      probability: "92%",
      description: "A sudden increase in network latency caused by routing issues in the core switch infrastructure.",
      evidence: "Analyzed traffic patterns show a 300% increase in packet loss starting at 14:32 GMT on the affected systems.",
    },
    { 
      id: 2,
      cause: "Outdated Firmware",
      probability: "78%",
      description: "The affected system is running firmware version 3.2.1, which has known bugs when handling high volumes of concurrent connections.",
      evidence: "System logs show connection timeouts occurring at predictable intervals, matching bug reports for this firmware version.",
    },
    { 
      id: 3,
      cause: "Memory Allocation Error",
      probability: "65%",
      description: "A memory leak in the application caused gradual resource depletion until system failure.",
      evidence: "Memory usage graphs show a linear increase over time without corresponding user activity increases.",
    }
  ];

  const recommendedActions = [
    "Update switch firmware to latest stable release (v4.2.3)",
    "Implement QoS prioritization for critical application traffic",
    "Add 30% capacity buffer to network monitoring thresholds",
    "Schedule weekly restart of affected services until permanent fix is deployed"
  ];

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
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-4">
              <Cpu className="h-8 w-8 text-primary mt-1" />
              <div>
                <h4 className="font-medium">AI-Powered Root Cause Analysis</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  This process will analyze system logs, network traffic, and infrastructure metrics 
                  to identify the most likely cause of the reported issue.
                </p>
              </div>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Automated process</AlertTitle>
              <AlertDescription>
                The analysis may take several minutes to complete. You can close this dialog and return 
                to the ticket while the process runs in the background.
              </AlertDescription>
            </Alert>
          </div>
        ) : !analysisComplete ? (
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
        ) : (
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
                  <div key={cause.id} className="border rounded-md p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">{cause.cause}</h5>
                      <Badge variant="outline" className="bg-primary/10">Probability: {cause.probability}</Badge>
                    </div>
                    <p className="text-sm">{cause.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <strong>Evidence:</strong> {cause.evidence}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium">Recommended Actions</h4>
                <ul className="space-y-2">
                  {recommendedActions.map((action, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs font-medium mr-2 shrink-0">
                        {index + 1}
                      </span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
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
