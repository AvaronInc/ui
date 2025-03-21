
import React from 'react';
import { Activity, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

interface ConnectionThroughputProps {
  receivedData: string;
  sentData: string;
  packetLoss: string;
}

const ConnectionThroughput = ({ receivedData, sentData, packetLoss }: ConnectionThroughputProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Activity className="h-4 w-4 text-muted-foreground" />
        Connection Throughput
      </h3>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <ArrowDownToLine className="h-4 w-4 text-green-500" />
          <div>
            <p className="font-medium">{receivedData}</p>
            <p className="text-xs text-muted-foreground">Received</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpFromLine className="h-4 w-4 text-blue-500" />
          <div>
            <p className="font-medium">{sentData}</p>
            <p className="text-xs text-muted-foreground">Sent</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-yellow-500" />
          <div>
            <p className="font-medium">{packetLoss}</p>
            <p className="text-xs text-muted-foreground">Packet Loss</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionThroughput;
