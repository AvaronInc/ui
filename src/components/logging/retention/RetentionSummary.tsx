
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, HardDrive, CloudOff, AlertTriangle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const RetentionSummary = () => {
  // Safe state for progress data
  const [progressError, setProgressError] = useState<boolean>(false);

  // Color indicator based on percentage
  const getProgressColor = useCallback((percentage: number): string => {
    if (percentage > 90) return "bg-red-500";
    if (percentage > 75) return "bg-amber-500";
    if (percentage > 50) return "bg-yellow-500";
    return "bg-blue-500";
  }, []);

  // Safely render progress bars with error handling
  const renderProgressBar = useCallback((value: number, errorHandler: (error: Error) => void) => {
    try {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Invalid progress value');
      }
      
      // Ensure value is within valid range
      const safeValue = Math.max(0, Math.min(100, value));
      
      return (
        <Progress 
          value={safeValue} 
          className="h-2" 
          indicatorClassName={getProgressColor(safeValue)} 
        />
      );
    } catch (error) {
      console.error('Error rendering progress bar:', error);
      errorHandler(error as Error);
      setProgressError(true);
      return <div className="h-2 bg-muted">Error displaying progress</div>;
    }
  }, [getProgressColor]);

  // Error boundaries for sections
  if (progressError) {
    return (
      <Card className="p-6 border-destructive">
        <CardHeader className="p-0">
          <CardTitle className="text-destructive flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Error Loading Retention Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <p className="text-sm text-muted-foreground">
            There was an error loading the retention data. Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            Time-Based Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">System Logs</p>
                <p className="text-xs text-muted-foreground">90 days retention</p>
              </div>
              <Badge variant="outline" className="text-xs">
                85% used
              </Badge>
            </div>
            {renderProgressBar(85, (error) => console.error('System Logs Progress Error:', error))}
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Security Events</p>
                <p className="text-xs text-muted-foreground">180 days retention</p>
              </div>
              <Badge variant="outline" className="text-xs">
                42% used
              </Badge>
            </div>
            {renderProgressBar(42, (error) => console.error('Security Events Progress Error:', error))}
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Audit Trails</p>
                <p className="text-xs text-muted-foreground">365 days retention</p>
              </div>
              <Badge variant="outline" className="text-xs">
                28% used
              </Badge>
            </div>
            {renderProgressBar(28, (error) => console.error('Audit Trails Progress Error:', error))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <HardDrive className="h-4 w-4 mr-2 text-purple-500" />
            Size-Based Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Network Traffic</p>
                <p className="text-xs text-muted-foreground">500 GB capacity</p>
              </div>
              <Badge variant="outline" className="text-xs">
                73% used
              </Badge>
            </div>
            {renderProgressBar(73, (error) => console.error('Network Traffic Progress Error:', error))}
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Packet Captures</p>
                <p className="text-xs text-muted-foreground">2 TB capacity</p>
              </div>
              <Badge variant="outline" className="text-xs">
                64% used
              </Badge>
            </div>
            {renderProgressBar(64, (error) => console.error('Packet Captures Progress Error:', error))}
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Application Logs</p>
                <p className="text-xs text-muted-foreground">350 GB capacity</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="text-xs bg-amber-500 hover:bg-amber-600">
                      91% used
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Critical: Nearing capacity limit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {renderProgressBar(91, (error) => console.error('Application Logs Progress Error:', error))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <CloudOff className="h-4 w-4 mr-2 text-green-500" />
            Offsite Archiving
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Cold Storage</p>
                <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Synced
              </Badge>
            </div>
            {renderProgressBar(100, (error) => console.error('Cold Storage Progress Error:', error))}
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Legal Hold</p>
                <p className="text-xs text-muted-foreground">5 cases active</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Protected
              </Badge>
            </div>
            {renderProgressBar(100, (error) => console.error('Legal Hold Progress Error:', error))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
            Warnings & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Application Logs approaching capacity</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                Consider increasing storage allocation or review retention policy
              </p>
            </div>
            
            <div className="p-3 rounded-md border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">7 days remaining until compliance audit</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                Verify all retention policies are in compliance with regulations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionSummary;
