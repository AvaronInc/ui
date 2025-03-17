
import React from 'react';
import { NetworkLog } from '@/types/topology';
import { Info, Activity, ServerCrash } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface NetworkLogsProps {
  logs: NetworkLog[];
  getLogLevelColor: (level: string) => string;
}

const NetworkLogs = ({ logs, getLogLevelColor }: NetworkLogsProps) => {
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      {logs.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No recent logs available</p>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="border-l-2 pl-3 py-1 text-sm" style={{ borderColor: log.level === 'info' ? '#3b82f6' : log.level === 'warning' ? '#f59e0b' : '#ef4444' }}>
              <div className="flex items-center justify-between">
                <div className={`font-semibold ${getLogLevelColor(log.level)}`}>
                  {log.level === 'info' ? <Info className="h-3 w-3 inline mr-1" /> : 
                   log.level === 'warning' ? <Activity className="h-3 w-3 inline mr-1" /> : 
                   <ServerCrash className="h-3 w-3 inline mr-1" />}
                  {log.level.toUpperCase()}
                </div>
                <div className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</div>
              </div>
              <p className="mt-1">{log.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkLogs;
