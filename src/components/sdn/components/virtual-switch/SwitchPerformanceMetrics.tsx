
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface SwitchMetrics {
  id: string;
  latency: number; // in ms
  bandwidth: {
    used: number; // in Mbps
    total: number; // in Mbps
  };
  packetLoss: number; // percentage
  activePorts: number;
  totalPorts: number;
  errorCount: number;
}

interface SwitchPerformanceMetricsProps {
  selectedSwitch: string | null;
}

const SwitchPerformanceMetrics: React.FC<SwitchPerformanceMetricsProps> = ({ selectedSwitch }) => {
  // Mock data for switch metrics
  const switchMetricsData: Record<string, SwitchMetrics> = {
    'vs-001': {
      id: 'vs-001',
      latency: 0.4,
      bandwidth: { used: 4750, total: 10000 },
      packetLoss: 0.02,
      activePorts: 22,
      totalPorts: 24,
      errorCount: 0,
    },
    'vs-002': {
      id: 'vs-002',
      latency: 0.8,
      bandwidth: { used: 650, total: 1000 },
      packetLoss: 0.05,
      activePorts: 14,
      totalPorts: 16,
      errorCount: 2,
    },
    'vs-003': {
      id: 'vs-003',
      latency: 1.2,
      bandwidth: { used: 2200, total: 10000 },
      packetLoss: 0,
      activePorts: 6,
      totalPorts: 8,
      errorCount: 0,
    },
    'vs-004': {
      id: 'vs-004',
      latency: 0,
      bandwidth: { used: 0, total: 10000 },
      packetLoss: 0,
      activePorts: 0,
      totalPorts: 24,
      errorCount: 0,
    },
    'vs-005': {
      id: 'vs-005',
      latency: 5.7,
      bandwidth: { used: 850, total: 1000 },
      packetLoss: 2.4,
      activePorts: 10,
      totalPorts: 16,
      errorCount: 18,
    },
  };
  
  const metrics = selectedSwitch ? switchMetricsData[selectedSwitch] : null;

  if (!selectedSwitch || !metrics) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>Select a virtual switch to view performance metrics</p>
      </div>
    );
  }

  const bandwidthPercentage = (metrics.bandwidth.used / metrics.bandwidth.total) * 100;
  const portsPercentage = (metrics.activePorts / metrics.totalPorts) * 100;

  const MetricCard = ({ title, value, unit, status, change }: { title: string; value: string | number; unit: string; status?: 'increase' | 'decrease'; change?: string }) => (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="ml-1 text-sm text-muted-foreground">{unit}</p>
          </div>
        </div>
        {status && change && (
          <div className={`flex items-center text-xs ${status === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {status === 'increase' ? (
              <ArrowUpIcon className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
          title="Latency" 
          value={metrics.latency} 
          unit="ms" 
          status={metrics.latency < 1 ? 'decrease' : 'increase'} 
          change={metrics.latency < 1 ? '20%' : '15%'} 
        />
        <MetricCard 
          title="Packet Loss" 
          value={metrics.packetLoss} 
          unit="%" 
          status={metrics.packetLoss < 0.1 ? 'decrease' : 'increase'} 
          change={metrics.packetLoss < 0.1 ? '5%' : '12%'} 
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Bandwidth Utilization</p>
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className={`h-full rounded-full ${
              bandwidthPercentage > 80 ? 'bg-red-500' : 
              bandwidthPercentage > 60 ? 'bg-amber-500' : 
              'bg-green-500'
            }`}
            style={{ width: `${bandwidthPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>{metrics.bandwidth.used} Mbps used</p>
          <p>{metrics.bandwidth.total} Mbps total</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Active Ports</p>
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${portsPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>{metrics.activePorts} active ports</p>
          <p>{metrics.totalPorts} total ports</p>
        </div>
      </div>

      {metrics.errorCount > 0 && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">
            {metrics.errorCount} Error{metrics.errorCount > 1 ? 's' : ''} Detected
          </p>
          <p className="text-xs text-red-700 dark:text-red-300 mt-1">
            Check error logs for more details
          </p>
        </div>
      )}
    </div>
  );
};

export default SwitchPerformanceMetrics;
