
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, BarChart2, ArrowRight, Check, Clock } from 'lucide-react';

interface AIOptimizationTabProps {
  selectedSwitch: string;
}

const AIOptimizationTab: React.FC<AIOptimizationTabProps> = ({ selectedSwitch }) => {
  // Mock data for optimization recommendations
  const optimizationRecommendations = [
    {
      id: 1,
      title: "Adjust QoS Settings",
      description: "Prioritize critical application traffic by adjusting QoS settings on ports 3, 7, and 12.",
      impact: "high",
      status: "pending",
    },
    {
      id: 2,
      title: "Load Balance Traffic",
      description: "Redistribute traffic from overloaded Port 7 to the underutilized Port 9 and Port 15.",
      impact: "medium",
      status: "in_progress",
    },
    {
      id: 3,
      title: "Update Route Tables",
      description: "Optimize routing tables to reduce latency by 15% for east-west traffic patterns.",
      impact: "high",
      status: "completed",
    },
    {
      id: 4,
      title: "Adjust Buffer Allocations",
      description: "Increase buffer sizes on high-traffic ports to reduce packet loss during peak times.",
      impact: "medium",
      status: "pending",
    },
  ];

  // Mock data for performance comparison
  const performanceData = [
    { time: 'Day 1', current: 75, optimized: 85 },
    { time: 'Day 2', current: 73, optimized: 89 },
    { time: 'Day 3', current: 70, optimized: 90 },
    { time: 'Day 4', current: 72, optimized: 92 },
    { time: 'Day 5', current: 68, optimized: 91 },
    { time: 'Day 6', current: 66, optimized: 93 },
    { time: 'Day 7', current: 65, optimized: 95 },
  ];

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-green-500">High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500">Medium Impact</Badge>;
      case 'low':
        return <Badge className="bg-gray-500">Low Impact</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'in_progress':
        return <BarChart2 className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">AI-Optimized Routing & Traffic Engineering</h3>
        <Badge className="bg-purple-600">AI-Powered</Badge>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-4">Performance Optimization Projection</h4>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
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
              <Area 
                type="monotone" 
                dataKey="current" 
                stackId="1" 
                stroke="#9333ea" 
                fill="#9333ea" 
                name="Current Performance"
                fillOpacity={0.2} 
              />
              <Area 
                type="monotone" 
                dataKey="optimized" 
                stackId="2" 
                stroke="#10b981" 
                fill="#10b981" 
                name="AI-Optimized"
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">AI-Generated Optimization Recommendations</h4>
        
        {optimizationRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <h5 className="font-medium">{recommendation.title}</h5>
                    {getImpactBadge(recommendation.impact)}
                  </div>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(recommendation.status)}
                  <Button variant={recommendation.status === 'completed' ? 'secondary' : 'default'} size="sm" disabled={recommendation.status === 'completed'}>
                    {recommendation.status === 'pending' && 'Apply'}
                    {recommendation.status === 'in_progress' && 'In Progress'}
                    {recommendation.status === 'completed' && 'Applied'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/30">
        <div className="flex items-start">
          <Zap className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">AI Insight</h4>
            <p className="text-sm text-muted-foreground">Applying all recommended optimizations could improve overall switch performance by approximately 25% and reduce latency by up to 40%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOptimizationTab;
