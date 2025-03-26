
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

const mockDailyData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  count: Math.floor(Math.random() * 15) + 1,
}));

const mockSeverityData = [
  { name: 'High', value: 12, color: '#ef4444' },
  { name: 'Medium', value: 28, color: '#f97316' },
  { name: 'Low', value: 45, color: '#eab308' },
];

const CVEOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>New CVEs (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDailyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="CVEs" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            Total Vulnerabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">85</div>
          <p className="text-sm text-muted-foreground mt-2">Detected in environment</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockSeverityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {mockSeverityData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mt-4">
            {mockSeverityData.map((item) => (
              <div key={item.name} style={{ color: item.color }}>
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-xs">{item.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Critical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>3 Zero-day vulnerabilities detected</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
              <AlertCircle className="h-4 w-4" />
              <span>8 Critical patches pending</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVEOverview;
