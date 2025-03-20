
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const LogStorageOverview: React.FC = () => {
  // Mock data for log storage statistics
  const storageStats = {
    totalSize: 10 * 1024 * 1024 * 1024, // 10 GB in bytes
    usedSize: 3.7 * 1024 * 1024 * 1024, // 3.7 GB in bytes
    percentUsed: 37,
    avgDailyIngest: 250 * 1024 * 1024, // 250 MB in bytes
    oldestLogDate: '2025-01-15',
    logCount: 5743982,
    retentionPeriod: 90, // days
  };
  
  // Helper function to format bytes to a human-readable format
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  // Calculate how many days until storage is full based on daily ingest rate
  const daysUntilFull = Math.floor((storageStats.totalSize - storageStats.usedSize) / storageStats.avgDailyIngest);
  
  // Calculate how many days of logs will be available for the set retention period
  const daysOfRetention = storageStats.retentionPeriod;
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Storage Usage</span>
          <span className="text-foreground font-medium">
            {formatBytes(storageStats.usedSize)} / {formatBytes(storageStats.totalSize)}
          </span>
        </div>
        <Progress value={storageStats.percentUsed} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Daily Ingest:</span>
          <span className="float-right font-medium">{formatBytes(storageStats.avgDailyIngest)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Log Count:</span>
          <span className="float-right font-medium">{storageStats.logCount.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Retention:</span>
          <span className="float-right font-medium">{daysOfRetention} days</span>
        </div>
        <div>
          <span className="text-muted-foreground">Capacity For:</span>
          <span className="float-right font-medium">{daysUntilFull} days</span>
        </div>
      </div>
      
      <Button variant="outline" className="w-full mt-2" size="sm">
        <Settings className="h-4 w-4 mr-2" />
        Manage Storage Settings
      </Button>
    </div>
  );
};

export default LogStorageOverview;
