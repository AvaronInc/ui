
import React from 'react';
import { Service } from '@/types/services';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ServiceMetricsChartProps {
  service?: Service;
  timeRange: string;
}

const ServiceMetricsChart = ({ service, timeRange }: ServiceMetricsChartProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view metrics</div>;
  }
  
  // Generate mock data for the selected time range
  const generateMetricsData = () => {
    const now = new Date();
    const data = [];
    
    let points = 24;
    let interval = 60; // 1 hour in minutes
    
    switch (timeRange) {
      case '1h':
        points = 12;
        interval = 5;
        break;
      case '6h':
        points = 24;
        interval = 15;
        break;
      case '24h':
        points = 24;
        interval = 60;
        break;
      case '7d':
        points = 28;
        interval = 6 * 60;
        break;
      case '30d':
        points = 30;
        interval = 24 * 60;
        break;
    }
    
    for (let i = 0; i < points; i++) {
      const time = new Date(now.getTime() - (points - i) * interval * 60 * 1000);
      
      // Generate random data with some fluctuation based on the service's resources
      const responseTime = Math.max(10, Math.random() * 50 + (service.resources.cpu > 50 ? 100 : 30));
      const throughput = Math.max(10, Math.random() * 100 + service.resources.network);
      const errorRate = Math.random() * (service.status === 'healthy' ? 0.5 : 5);
      
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        responseTime,
        throughput,
        errorRate
      });
    }
    
    return data;
  };
  
  const metricsData = generateMetricsData();
  
  return (
    <div className="space-y-6">
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={metricsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="responseTime" name="Response Time (ms)" stroke="#3b82f6" activeDot={{ r: 8 }} />
            <Line yAxisId="left" type="monotone" dataKey="throughput" name="Throughput (req/s)" stroke="#10b981" />
            <Line yAxisId="right" type="monotone" dataKey="errorRate" name="Error Rate (%)" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(metricsData[metricsData.length - 1].responseTime)} ms
              </div>
              <div className="text-sm text-muted-foreground">Current Response Time</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(metricsData[metricsData.length - 1].throughput)} req/s
              </div>
              <div className="text-sm text-muted-foreground">Current Throughput</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {metricsData[metricsData.length - 1].errorRate.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">Current Error Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceMetricsChart;
