
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface LoggingHeaderProps {
  fullLoggingEnabled: boolean;
  setFullLoggingEnabled: (enabled: boolean) => void;
}

const LoggingHeader: React.FC<LoggingHeaderProps> = ({ 
  fullLoggingEnabled, 
  setFullLoggingEnabled 
}) => {
  const handleToggleLogging = () => {
    setFullLoggingEnabled(!fullLoggingEnabled);
    toast.success(`Full compliance logging ${!fullLoggingEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleExportLogs = () => {
    toast.success('Log export initiated. Download will begin shortly.');
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-semibold">Logging & Compliance</h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive logging, auditing, and regulatory compliance
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Switch 
            checked={fullLoggingEnabled} 
            onCheckedChange={handleToggleLogging}
          />
          <span className={fullLoggingEnabled ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {fullLoggingEnabled ? "Full Logging Active" : "Basic Logging Only"}
          </span>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleExportLogs}>
          <Download className="h-4 w-4 mr-1" />
          Export Logs
        </Button>
      </div>
    </div>
  );
};

export default LoggingHeader;
