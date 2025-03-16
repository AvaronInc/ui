
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, AlertTriangle, Workflow, RefreshCw, ArrowRight } from 'lucide-react';

const ThreatRemediationPanel: React.FC = () => {
  const { toast } = useToast();
  const [remediating, setRemediating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const remediationSteps = [
    { name: 'Isolate Affected Systems', completed: false },
    { name: 'Kill Malicious Processes', completed: false },
    { name: 'Remove Malware Components', completed: false },
    { name: 'Patch Vulnerabilities', completed: false },
    { name: 'Restore System Configurations', completed: false },
    { name: 'Verify System Integrity', completed: false },
  ];

  const [steps, setSteps] = useState(remediationSteps);

  const handleStartRemediation = () => {
    setRemediating(true);
    setProgress(0);
    setCurrentStep(0);
    setSteps(steps.map(step => ({ ...step, completed: false })));
    
    toast({
      title: "Remediation Started",
      description: "Automated incident response workflow initiated",
    });
    
    // Simulate remediation progress
    const totalSteps = steps.length;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Remediation Complete",
            description: "All threats have been successfully remediated",
          });
          setRemediating(false);
          return 100;
        }
        
        // Calculate which step we're on
        const newProgress = prev + (100 / totalSteps / 5);
        const newStepIndex = Math.floor((newProgress / 100) * totalSteps);
        
        if (newStepIndex > currentStep && newStepIndex < totalSteps) {
          setCurrentStep(newStepIndex);
          setSteps(current => 
            current.map((step, i) => 
              i < newStepIndex ? { ...step, completed: true } : step
            )
          );
          
          toast({
            title: `Step ${newStepIndex + 1} Completed`,
            description: `${steps[newStepIndex].name} successfully completed`,
          });
        }
        
        return newProgress;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-4">
      <Card className="border-amber-300 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-800/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
            <div>
              <h3 className="text-lg font-medium">Active Threat Detected</h3>
              <p className="text-sm text-muted-foreground">
                Malware infection detected on 3 endpoints requiring immediate remediation
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-amber-50/80 dark:bg-amber-950/20 p-4 border-t border-amber-200 dark:border-amber-800/50">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2">
            <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              Severity: High
            </Badge>
            <Button 
              onClick={handleStartRemediation} 
              disabled={remediating}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {remediating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Remediating...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Start Automated Remediation
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {remediating && (
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Remediation Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.completed ? (
                    <div className="rounded-full h-6 w-6 bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  ) : currentStep === index ? (
                    <div className="rounded-full h-6 w-6 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
                      <Workflow className="h-4 w-4 animate-pulse" />
                    </div>
                  ) : (
                    <div className="rounded-full h-6 w-6 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                  <span className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : currentStep === index ? 'font-medium' : ''}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium mb-3">Remediation Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="outline" disabled={remediating} className="justify-start">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Isolate Affected Systems
            </Button>
            <Button variant="outline" disabled={remediating} className="justify-start">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Block Malicious IPs
            </Button>
            <Button variant="outline" disabled={remediating} className="justify-start">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Reset Compromised Accounts
            </Button>
            <Button variant="outline" disabled={remediating} className="justify-start">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Deploy Emergency Patches
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatRemediationPanel;
