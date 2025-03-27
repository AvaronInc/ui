
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Server, Database, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

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
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Test Configuration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Configuration Type</p>
                    <p className="text-sm text-muted-foreground">
                      {configurationTypes.find(t => t.value === savedConfig.configType)?.label || savedConfig.configType}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Traffic Profile</p>
                    <p className="text-sm text-muted-foreground">
                      {trafficProfiles.find(t => t.value === savedConfig.trafficProfile)?.label || savedConfig.trafficProfile}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Zone Replication</p>
                    <p className="text-sm text-muted-foreground">
                      {savedConfig.replicateZone ? "Enabled - using current zone data" : "Disabled"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Configured At</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(savedConfig.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
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
                    />
                    <SimulationStepCard 
                      title="Configuration" 
                      icon={<Database className="h-5 w-5" />} 
                      complete={progress >= 60}
                    />
                    <SimulationStepCard 
                      title="Analysis" 
                      icon={<AlertCircle className="h-5 w-5" />} 
                      complete={progress >= 90}
                    />
                    <SimulationStepCard 
                      title="Complete" 
                      icon={<CheckCircle className="h-5 w-5" />} 
                      complete={progress >= 100}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface SimulationStepCardProps {
  title: string;
  icon: React.ReactNode;
  complete: boolean;
}

const SimulationStepCard: React.FC<SimulationStepCardProps> = ({ title, icon, complete }) => {
  return (
    <div className={`border rounded-md p-3 flex flex-col items-center justify-center text-center transition-colors duration-200 ${
      complete ? 'bg-primary/10 border-primary/30' : 'bg-muted/30'
    }`}>
      <div className={`mb-1 ${complete ? 'text-primary' : 'text-muted-foreground'}`}>
        {icon}
      </div>
      <p className={`text-sm font-medium ${complete ? '' : 'text-muted-foreground'}`}>{title}</p>
    </div>
  );
};

const configurationTypes = [
  { value: 'network', label: 'Network Configuration' },
  { value: 'firewall', label: 'Firewall Rules' },
  { value: 'sdwan', label: 'Routing/SD-WAN Policies' },
  { value: 'dns', label: 'DNS/IPAM Updates' },
  { value: 'identity', label: 'Identity/Access Policy Change' },
  { value: 'software', label: 'Software Update' },
  { value: 'custom', label: 'Custom Config Upload' },
];

const trafficProfiles = [
  { value: 'normal', label: 'Normal production traffic' },
  { value: 'burst-25', label: 'Burst load (25% spike)' },
  { value: 'burst-50', label: 'Burst load (50% spike)' },
  { value: 'burst-100', label: 'Burst load (100% spike)' },
  { value: 'security', label: 'Security event scenarios' },
  { value: 'random', label: 'Randomized traffic and latency' },
];

export default RunTestScenario;
