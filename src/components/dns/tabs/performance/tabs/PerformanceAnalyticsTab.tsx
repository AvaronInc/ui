
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, RefreshCw, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { DNSPerformanceMetric } from '../types';

const PerformanceAnalyticsTab: React.FC = () => {
  // Mock performance data for charts
  const [timeRange, setTimeRange] = useState('24h');
  
  const performanceData: DNSPerformanceMetric[] = [
    { timestamp: '00:00', queryTime: 12, cacheHits: 840, cacheMisses: 160, totalQueries: 1000 },
    { timestamp: '02:00', queryTime: 15, cacheHits: 760, cacheMisses: 240, totalQueries: 1000 },
    { timestamp: '04:00', queryTime: 18, cacheHits: 720, cacheMisses: 280, totalQueries: 1000 },
    { timestamp: '06:00', queryTime: 14, cacheHits: 800, cacheMisses: 200, totalQueries: 1000 },
    { timestamp: '08:00', queryTime: 10, cacheHits: 880, cacheMisses: 120, totalQueries: 1000 },
    { timestamp: '10:00', queryTime: 8, cacheHits: 920, cacheMisses: 80, totalQueries: 1000 },
    { timestamp: '12:00', queryTime: 9, cacheHits: 900, cacheMisses: 100, totalQueries: 1000 },
    { timestamp: '14:00', queryTime: 11, cacheHits: 870, cacheMisses: 130, totalQueries: 1000 },
    { timestamp: '16:00', queryTime: 13, cacheHits: 850, cacheMisses: 150, totalQueries: 1000 },
    { timestamp: '18:00', queryTime: 15, cacheHits: 830, cacheMisses: 170, totalQueries: 1000 },
    { timestamp: '20:00', queryTime: 18, cacheHits: 790, cacheMisses: 210, totalQueries: 1000 },
    { timestamp: '22:00', queryTime: 14, cacheHits: 820, cacheMisses: 180, totalQueries: 1000 },
  ];

  // Calculate cache hit ratio
  const cacheHitRatio = performanceData.reduce((sum, entry) => sum + entry.cacheHits, 0) / 
                        performanceData.reduce((sum, entry) => sum + entry.totalQueries, 0) * 100;
  
  // Calculate average query time
  const avgQueryTime = performanceData.reduce((sum, entry) => sum + entry.queryTime, 0) / performanceData.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground mb-1">Cache Hit Ratio</p>
            <p className="text-3xl font-bold">{cacheHitRatio.toFixed(1)}%</p>
            <Badge variant={cacheHitRatio > 85 ? "outline" : "secondary"} className="mt-2">
              {cacheHitRatio > 85 ? "Excellent" : "Good"}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground mb-1">Avg. Query Time</p>
            <p className="text-3xl font-bold">{avgQueryTime.toFixed(1)} ms</p>
            <Badge variant={avgQueryTime < 10 ? "outline" : "secondary"} className="mt-2">
              {avgQueryTime < 10 ? "Excellent" : "Good"}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground mb-1">DNS Uptime</p>
            <p className="text-3xl font-bold">99.99%</p>
            <Badge variant="outline" className="mt-2">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">DNS Query Response Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="timestamp" />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'ms', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                  }} 
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="queryTime" 
                  name="Response Time (ms)" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Cache Hits vs. Misses</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                  }} 
                />
                <Legend />
                <Bar dataKey="cacheHits" name="Cache Hits" fill="#10b981" stackId="a" />
                <Bar dataKey="cacheMisses" name="Cache Misses" fill="#f59e0b" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Performance Insights</h3>
            
            <div className="space-y-3">
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Query Latency Analysis</h4>
                  <Badge variant="outline">High Impact</Badge>
                </div>
                <p className="text-sm">DNS queries to external domains experience higher latency during peak hours (10AM-2PM). Consider implementing time-based caching policies to improve response times.</p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Cache Optimization</h4>
                  <Badge variant="outline">Medium Impact</Badge>
                </div>
                <p className="text-sm">Your cache hit ratio is good at 84.3%, but could be improved. The AI has identified 12 frequently queried domains that would benefit from longer TTL values.</p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Server Distribution</h4>
                  <Badge variant="outline">Medium Impact</Badge>
                </div>
                <p className="text-sm">DNS query load is unevenly distributed across your resolvers. Primary server handling 72% of traffic. Consider adjusting load balancing settings for better distribution.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalyticsTab;
