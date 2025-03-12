
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  getNetworkOverallBandwidth, 
  getNetworkOverallPacketLoss, 
  getNetworkOverallLatency,
  getMockNetworkAlerts
} from '@/data/topologyData';
import MetricsChart from '@/components/dashboard/MetricsChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface DiagnosticsSectionProps {
  className?: string;
  selectedDeviceId?: string;
}

const DiagnosticsSection = ({ className, selectedDeviceId }: DiagnosticsSectionProps) => {
  // Fetch overall network metrics
  const { data: bandwidthData = [] } = useQuery({
    queryKey: ['networkBandwidth'],
    queryFn: getNetworkOverallBandwidth,
  });

  const { data: packetLossData = [] } = useQuery({
    queryKey: ['networkPacketLoss'],
    queryFn: getNetworkOverallPacketLoss,
  });

  const { data: latencyData = [] } = useQuery({
    queryKey: ['networkLatency'],
    queryFn: getNetworkOverallLatency,
  });

  // Fetch network alerts
  const { data: alerts = [] } = useQuery({
    queryKey: ['networkAlerts'],
    queryFn: getMockNetworkAlerts,
  });

  // Format chart data
  const formatChartData = (data: any[], valueKey: string = 'value') => {
    return data.map((item) => ({
      name: new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      [valueKey]: item.value
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  const getAlertSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="warning">Warning</Badge>;
      case 'info':
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-xl font-semibold">Network Diagnostics</h2>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsChart
          title="Bandwidth Usage"
          type="area"
          data={formatChartData(bandwidthData, 'bandwidth')}
          value="bandwidth"
          percentage={false}
        />
        
        <MetricsChart
          title="Packet Loss"
          type="area"
          data={formatChartData(packetLossData, 'loss')}
          value="loss"
          percentage={true}
        />
        
        <MetricsChart
          title="Latency (ms)"
          type="area"
          data={formatChartData(latencyData, 'latency')}
          value="latency"
          percentage={false}
        />
      </div>
      
      {/* Health Status & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DNS & DHCP Health */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Services Health</CardTitle>
            <CardDescription>DNS & DHCP status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">DNS Service</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  Healthy
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span className="font-medium">DHCP Service</span>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                  Warning
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">NTP Service</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  Healthy
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="font-medium">LDAP Service</span>
                </div>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                  Offline
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Network Alerts */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Network Alerts</CardTitle>
            <CardDescription>Detected issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No alerts detected</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.deviceId}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell>{getAlertSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>{formatTimestamp(alert.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosticsSection;
