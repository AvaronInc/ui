
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Download, Clock, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface LogViewerProps {
  serviceId: string;
  timeRange: string;
}

const LogViewer = ({ serviceId, timeRange }: LogViewerProps) => {
  const [logLevel, setLogLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Generate mock logs
  const generateMockLogs = () => {
    const logTypes = ['info', 'warning', 'error', 'debug'];
    const messages = [
      'Application started',
      'Request received from 192.168.1.1',
      'Database connection established',
      'HTTP 200 response sent',
      'Cache miss for key "user_profile_1234"',
      'Rate limit exceeded for IP 203.0.113.42',
      'Failed to connect to secondary database',
      'Invalid request parameters received',
      'Memory usage above 75%',
      'CPU utilization spike detected',
      'TLS handshake completed'
    ];
    
    const logs = [];
    const now = new Date();
    
    // Number of logs based on time range
    let numLogs = 20;
    switch (timeRange) {
      case '1h': numLogs = 30; break;
      case '6h': numLogs = 60; break;
      case '24h': numLogs = 100; break;
      case '7d': numLogs = 150; break;
      case '30d': numLogs = 200; break;
    }
    
    for (let i = 0; i < numLogs; i++) {
      const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const timestamp = new Date(now.getTime() - Math.random() * parseInt(timeRange) * 60 * 60 * 1000);
      
      logs.push({
        id: `log-${i}`,
        timestamp,
        level: logType,
        message: `[${serviceId}] ${message}`,
      });
    }
    
    // Sort logs by timestamp (newest first)
    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };
  
  const logs = generateMockLogs();
  
  // Filter logs by level and search query
  const filteredLogs = logs.filter(log => {
    const levelMatch = logLevel === 'all' || log.level === logLevel;
    const searchMatch = !searchQuery || log.message.toLowerCase().includes(searchQuery.toLowerCase());
    return levelMatch && searchMatch;
  });
  
  // Function to format timestamp
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString();
  };
  
  // Function to get log level icon
  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'debug':
        return <Clock className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={logLevel} onValueChange={setLogLevel}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Log level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="debug">Debug</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="flex gap-1 items-center">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] border rounded-md bg-black text-gray-200 font-mono text-sm p-2">
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <div key={log.id} className="py-1 flex items-start">
              <span className="text-gray-500 mr-2">[{formatTimestamp(log.timestamp)}]</span>
              <span className="mr-2 mt-0.5">{getLogLevelIcon(log.level)}</span>
              <span className={`
                ${log.level === 'info' ? 'text-blue-400' : ''}
                ${log.level === 'warning' ? 'text-amber-400' : ''}
                ${log.level === 'error' ? 'text-red-400' : ''}
                ${log.level === 'debug' ? 'text-green-400' : ''}
              `}>
                {log.message}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No logs matching your criteria</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LogViewer;
