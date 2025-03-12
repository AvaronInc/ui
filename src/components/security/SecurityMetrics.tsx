
import React from 'react';
import { SecurityStats } from '@/types/security';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, AlertOctagon, AlertCircle, Bell } from 'lucide-react';

interface SecurityMetricsProps {
  stats: SecurityStats;
}

const SecurityMetrics = ({ stats }: SecurityMetricsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events (24h)</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total24h}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-red-500/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical</CardTitle>
          <AlertOctagon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{stats.bySeverity.critical}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-purple-500/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High</CardTitle>
          <AlertTriangle className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">{stats.bySeverity.high}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-500/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Medium</CardTitle>
          <AlertCircle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">{stats.bySeverity.medium}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeThreats}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMetrics;
