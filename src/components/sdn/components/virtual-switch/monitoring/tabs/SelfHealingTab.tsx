
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RefreshCw, AlertTriangle, CheckCircle, Activity, Clock } from 'lucide-react';

interface SelfHealingTabProps {
  selectedSwitch: string;
}

const SelfHealingTab: React.FC<SelfHealingTabProps> = ({ selectedSwitch }) => {
  // Mock data for self-healing events
  const healingEvents = [
    {
      id: 1,
      event: "Port 7 Congestion Detected",
      action: "Traffic rerouted to Port 9",
      timestamp: "2 minutes ago",
      status: "resolved",
    },
    {
      id: 2,
      event: "Memory Utilization Spike",
      action: "Resource reallocation triggered",
      timestamp: "15 minutes ago",
      status: "in_progress",
    },
    {
      id: 3,
      event: "Link Failure on Port 12",
      action: "Failover to redundant path",
      timestamp: "1 hour ago",
      status: "resolved",
    },
    {
      id: 4,
      event: "Intermittent Connection on Port 3",
      action: "Link quality monitoring enabled",
      timestamp: "3 hours ago",
      status: "monitoring",
    },
  ];

  // Mock data for predictive analytics
  const predictiveData = [
    { time: 'Day 1', actual: 65, predicted: 67 },
    { time: 'Day 2', actual: 68, predicted: 72 },
    { time: 'Day 3', actual: 75, predicted: 77 },
    { time: 'Day 4', actual: 82, predicted: 80 },
    { time: 'Day 5', actual: 85, predicted: 86 },
    { time: 'Day 6', actual: 88, predicted: 90 },
    { time: 'Day 7', actual: null, predicted: 95 },
    { time: 'Day 8', actual: null, predicted: 88 },
    { time: 'Day 9', actual: null, predicted: 92 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'monitoring':
        return <Badge className="bg-amber-500">Monitoring</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Automated Self-Healing Mechanism</h3>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Run Health Check</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">System Health</h4>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <Progress value={92} className="h-2" />
            <p className="text-xs text-muted-foreground">92% - Optimal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Self-Healing Events</h4>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Predicted Issues</h4>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-4">AI Predictive Failure Analysis</h4>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                name="Actual Load" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#f97316" 
                name="Predicted Load" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Recent Self-Healing Actions</h4>
        
        {healingEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-4 w-4 ${event.status === 'resolved' ? 'text-green-500' : 'text-amber-500'}`} />
                    <h5 className="font-medium">{event.event}</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.action}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  {getStatusBadge(event.status)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/30">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Predictive Alert</h4>
            <p className="text-sm text-muted-foreground">AI predicts Port 3 may experience significant load increase in the next 24 hours. Self-healing mechanism is preparing alternate routes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfHealingTab;
