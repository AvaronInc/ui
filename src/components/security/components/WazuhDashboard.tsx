
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Shield, Terminal, FileText, AlertTriangle } from 'lucide-react';

const WazuhDashboard: React.FC = () => {
  const alertsByAgentData = [
    { name: 'Web Server', alerts: 124 },
    { name: 'DB Server', alerts: 85 },
    { name: 'Domain Controller', alerts: 42 },
    { name: 'NAS Storage', alerts: 36 },
    { name: 'Dev Workstation', alerts: 28 },
  ];

  const ruleViolationData = [
    { name: 'Authentication', value: 157, color: '#ef4444' },
    { name: 'File Integrity', value: 89, color: '#f59e0b' },
    { name: 'Access Control', value: 73, color: '#3b82f6' },
    { name: 'System Auditing', value: 58, color: '#10b981' },
    { name: 'Network Security', value: 42, color: '#8b5cf6' },
  ];

  const alertTrendData = [
    { day: 'Mon', alerts: 42 },
    { day: 'Tue', alerts: 38 },
    { day: 'Wed', alerts: 55 },
    { day: 'Thu', alerts: 74 },
    { day: 'Fri', alerts: 62 },
    { day: 'Sat', alerts: 37 },
    { day: 'Sun', alerts: 30 },
  ];

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="fim" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>File Integrity</span>
          </TabsTrigger>
          <TabsTrigger value="siem" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>SIEM Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Log Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Alerts by Agent</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={alertsByAgentData}
                      layout="vertical"
                      margin={{ top: 5, right: 5, bottom: 5, left: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="alerts" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Rule Violations</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ruleViolationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={40}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {ruleViolationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Alerts']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Alert Trend (7 Days)</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={alertTrendData}
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="alerts" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fim">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">File Integrity Monitoring Dashboard</h3>
              <p className="text-muted-foreground mt-2">
                Detailed file integrity monitoring data would be displayed here, including
                changed files, modification times, and responsible users.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="siem">
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">SIEM Alerts Dashboard</h3>
              <p className="text-muted-foreground mt-2">
                Security Information and Event Management alerts would be displayed here,
                including correlation between different security events.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardContent className="p-4 text-center">
              <Terminal className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Log Analysis Dashboard</h3>
              <p className="text-muted-foreground mt-2">
                Detailed log analysis would be displayed here, including system logs,
                application logs, and security logs with search and filter capabilities.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WazuhDashboard;
