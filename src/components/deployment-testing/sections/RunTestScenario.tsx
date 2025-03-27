
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

  const handleStartSimulation = () => {
    if (!savedConfig) {
      toast({
        title: "No Configuration Found",
        description: "Please configure your test in the Simulation Configuration tab first",
        variant: "destructive"
      });
      return;
    }
    
    setProgress(0);
    setStatus('Initializing virtual environment...');
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
