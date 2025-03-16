
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, HardDrive, Cpu, Monitor } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const SystemPerformanceSection = () => {
  const resourceData = [
    { name: 'Servers', cpu: 65, memory: 78, storage: 45 },
    { name: 'Database', cpu: 85, memory: 72, storage: 68 },
    { name: 'Storage', cpu: 40, memory: 35, storage: 82 },
    { name: 'NESTS', cpu: 52, memory: 48, storage: 30 },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-card/50 pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Server className="h-5 w-5 mr-2 text-purple-500" />
          IT Asset & System Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-1">
              <Monitor className="h-4 w-4 mr-1 text-blue-500" />
              <span className="text-sm">Endpoints</span>
            </div>
            <div className="text-2xl font-bold">248</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">↑</span> 
              <span>12 new this month</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <HardDrive className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-sm">Storage</span>
            </div>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-1.5 mt-1" />
          </div>
        </div>

        <div className="h-[180px] mb-4">
          <div className="text-sm font-medium mb-1">Resource Utilization</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="cpu" name="CPU" fill="#3b82f6" />
              <Bar dataKey="memory" name="Memory" fill="#8b5cf6" />
              <Bar dataKey="storage" name="Storage" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cpu className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm">Database Server CPU</span>
            </div>
            <span className="text-sm font-medium text-red-500">85%</span>
          </div>
          <Progress value={85} className="h-1.5 bg-red-100" />
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <HardDrive className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">Backup Status</span>
            </div>
            <span className="text-sm font-medium text-green-500">Completed 2h ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemPerformanceSection;
