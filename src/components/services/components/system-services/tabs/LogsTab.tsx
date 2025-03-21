
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemService } from '@/types/services';

interface LogsTabProps {
  service: SystemService;
}

const LogsTab: React.FC<LogsTabProps> = ({ service }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Service Logs</h3>
        <Button variant="outline" size="sm">Export Logs</Button>
      </div>
      
      <ScrollArea className="h-[400px] border rounded-md">
        <div className="p-2 font-mono text-xs">
          {service.logEntries.map((entry, index) => (
            <div 
              key={index} 
              className={`py-1 px-2 rounded mb-1 ${
                entry.level === 'error' ? 'bg-destructive/10 text-destructive' :
                entry.level === 'warning' ? 'bg-warning/10 text-warning' :
                entry.level === 'debug' ? 'bg-blue-500/10 text-blue-500' :
                'bg-muted/50'
              }`}
            >
              <span className="mr-2 opacity-80">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>
              <span className="uppercase mr-2 text-[10px] font-bold">{entry.level}</span>
              <span>{entry.message}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Execute Command</h3>
        <div className="flex gap-2">
          <Textarea 
            placeholder="Enter command to execute on service..." 
            className="font-mono text-sm"
          />
          <Button className="flex-shrink-0 mt-auto">Execute</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Note: Commands are executed within the service context. Use with caution.
        </p>
      </div>
    </div>
  );
};

export default LogsTab;
