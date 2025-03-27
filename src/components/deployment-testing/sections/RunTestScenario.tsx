
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import SimulationProgress from './run-test/SimulationProgress';
import ConfigSummary from './run-test/ConfigSummary';

interface RunTestScenarioProps {
  onRunSimulation: (configData: any) => void;
  isRunning: boolean;
}

const RunTestScenario: React.FC<RunTestScenarioProps> = ({ 
  onRunSimulation, 
  isRunning 
}) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get the saved configuration from localStorage
    const configStr = localStorage.getItem('deployment-test-config');
    if (configStr) {
      try {
        const config = JSON.parse(configStr);
        setSavedConfig(config);
      } catch (e) {
        console.error('Error parsing saved config:', e);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      setProgress(0);
      setStatus('Initializing virtual environment...');
      
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          
          // Update status message based on progress
          if (prev < 20) {
            setStatus('Creating virtualized environment...');
          } else if (prev < 40) {
            setStatus('Replicating network topology and endpoints...');
          } else if (prev < 60) {
            setStatus('Applying configuration changes...');
          } else if (prev < 80) {
            setStatus('Simulating traffic and analyzing impact...');
          } else if (prev < 95) {
            setStatus('Running AI analysis on results...');
          } else {
            setStatus('Finalizing report and recommendations...');
          }
          
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 200);
    } else if (progress > 0 && progress < 100) {
      // If simulation was running but stopped externally
      setProgress(100);
      setStatus('Test completed');
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, progress]);

  const handleStartSimulation = () => {
    if (!savedConfig) {
      toast({
        title: "No Configuration Found",
        description: "Please configure your test in the Simulation Configuration tab first",
        variant: "destructive"
      });
      return;
    }
    
    onRunSimulation(savedConfig);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Run Test Scenario</h2>
        <p className="text-sm text-muted-foreground">
          Execute the simulation in a virtualized sandbox environment to identify potential issues before deployment.
        </p>
      </div>
      
      {!savedConfig && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No configuration detected</AlertTitle>
          <AlertDescription>
            Please configure your deployment test in the Simulation Configuration tab first.
          </AlertDescription>
        </Alert>
      )}
      
      {savedConfig && (
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <ConfigSummary config={savedConfig} />
              
              {!isRunning && progress === 0 && (
                <Button 
                  onClick={handleStartSimulation} 
                  className="w-full"
                  size="lg"
                >
                  Start Deployment Test Simulation
                </Button>
              )}
              
              {(isRunning || progress > 0) && (
                <SimulationProgress progress={progress} status={status} />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RunTestScenario;
