
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { BarChart3, Bot } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { DNSAnomaly } from '../types';

const AnomalyDetectionTab: React.FC = () => {
  const { toast } = useToast();
  const [aiAnomalyDetection, setAiAnomalyDetection] = useState(true);
  
  // Sample DNS anomalies
  const dnsAnomalies: DNSAnomaly[] = [
    { id: 1, type: 'DNS Tunneling', source: '192.168.1.23', destination: 'tunnel.maliciousdomain.com', timestamp: '2023-07-15 14:23:45', status: 'Blocked' },
    { id: 2, type: 'Excessive Queries', source: '192.168.1.45', destination: 'Multiple', timestamp: '2023-07-15 16:12:33', status: 'Warned' },
    { id: 3, type: 'Pattern Anomaly', source: '192.168.1.102', destination: 'random.domain.net', timestamp: '2023-07-14 09:45:22', status: 'Monitoring' },
  ];

  const handleToggleAIAnomaly = () => {
    setAiAnomalyDetection(!aiAnomalyDetection);
    toast({
      title: aiAnomalyDetection ? "AI Anomaly Detection Disabled" : "AI Anomaly Detection Enabled",
      description: aiAnomalyDetection 
        ? "AI-based DNS anomaly detection has been disabled." 
        : "AI-based DNS anomaly detection has been enabled.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium">AI-Based DNS Anomaly Detection</h3>
              <p className="text-sm text-muted-foreground">Detect DNS tunneling, malware C2 traffic, and suspicious queries</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>{aiAnomalyDetection ? 'Enabled' : 'Disabled'}</span>
              <Switch checked={aiAnomalyDetection} onCheckedChange={handleToggleAIAnomaly} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Detection Capabilities
                </h4>
                <div className="rounded-md border p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DNS Tunneling Detection</span>
                    <Switch checked={true} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Command & Control Detection</span>
                    <Switch checked={true} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Exfiltration Detection</span>
                    <Switch checked={true} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Excessive Query Detection</span>
                    <Switch checked={true} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pattern Anomaly Detection</span>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  Recent Anomalies
                </h4>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dnsAnomalies.map((anomaly) => (
                        <TableRow key={anomaly.id}>
                          <TableCell className="font-medium">{anomaly.type}</TableCell>
                          <TableCell>{anomaly.source}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              anomaly.status === 'Blocked' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : anomaly.status === 'Warned'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {anomaly.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetectionTab;
