
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Upload, RefreshCw, Activity } from 'lucide-react';

interface SpeedTestProps {
  sessionId: string;
}

const SpeedTesting = ({ sessionId }: SpeedTestProps) => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    download: number | null;
    upload: number | null;
    latency: number | null;
  }>({
    download: null,
    upload: null,
    latency: null,
  });
  const [testProgress, setTestProgress] = useState(0);

  const runSpeedTest = () => {
    setIsTestRunning(true);
    setTestProgress(0);
    setTestResults({ download: null, upload: null, latency: null });
    
    // Simulate speed test progress
    const interval = setInterval(() => {
      setTestProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTestRunning(false);
          // Simulate test results (in real app, these would come from actual measurements)
          setTestResults({
            download: Math.floor(Math.random() * 50) + 10, // Random between 10-60 Mbps
            upload: Math.floor(Math.random() * 30) + 5,    // Random between 5-35 Mbps
            latency: Math.floor(Math.random() * 80) + 20,  // Random between 20-100 ms
          });
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Connection Speed Test</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={runSpeedTest} 
          disabled={isTestRunning}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {isTestRunning ? 'Testing...' : 'Run Test'}
        </Button>
      </div>
      
      {isTestRunning && (
        <div className="space-y-2">
          <Progress value={testProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">Testing connection speed...</p>
        </div>
      )}

      {!isTestRunning && testResults.download !== null && (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center border rounded-md p-3">
            <Download className="h-4 w-4 text-primary mb-1" />
            <span className="text-lg font-medium">{testResults.download}</span>
            <span className="text-xs text-muted-foreground">Mbps</span>
            <span className="text-xs">Download</span>
          </div>
          
          <div className="flex flex-col items-center border rounded-md p-3">
            <Upload className="h-4 w-4 text-primary mb-1" />
            <span className="text-lg font-medium">{testResults.upload}</span>
            <span className="text-xs text-muted-foreground">Mbps</span>
            <span className="text-xs">Upload</span>
          </div>
          
          <div className="flex flex-col items-center border rounded-md p-3">
            <Activity className="h-4 w-4 text-primary mb-1" />
            <span className="text-lg font-medium">{testResults.latency}</span>
            <span className="text-xs text-muted-foreground">ms</span>
            <span className="text-xs">Latency</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedTesting;
