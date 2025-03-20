
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Download, Filter, RefreshCw, Shield, Activity, Database, Server } from 'lucide-react';
import RealtimeLogFeed from '../components/RealtimeLogFeed';
import LogStorageOverview from '../components/LogStorageOverview';
import TopAlertsPanel from '../components/TopAlertsPanel';
import UserActivityTracker from '../components/UserActivityTracker';
import LogSourcesOverview from '../components/LogSourcesOverview';

const LoggingDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('24h');
  
  const handleExportLogs = () => {
    toast({
      title: "Export Initiated",
      description: "Your logs are being prepared for download.",
    });
  };
  
  const handleRefreshLogs = () => {
    toast({
      title: "Logs Refreshed",
      description: "Log data has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Removed redundant title that was here */}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleRefreshLogs}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-1" />
            Export Logs
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>
      
      {/* Log Sources Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-4 p-4 flex flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Log Sources:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Toggle aria-label="Toggle Security Logs" defaultPressed className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              <span>Security</span>
            </Toggle>
            <Toggle aria-label="Toggle System Logs" defaultPressed className="flex items-center gap-1">
              <Server className="h-3.5 w-3.5" />
              <span>System</span>
            </Toggle>
            <Toggle aria-label="Toggle User Activity" defaultPressed className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              <span>User Activity</span>
            </Toggle>
            <Toggle aria-label="Toggle Database Logs" defaultPressed className="flex items-center gap-1">
              <Database className="h-3.5 w-3.5" />
              <span>Database</span>
            </Toggle>
            <Button variant="outline" size="sm">
              More Sources
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Top Row: Top Alerts and Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Top Security & Compliance Alerts
            </CardTitle>
            <CardDescription>
              Critical system events and potential compliance violations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopAlertsPanel />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Log Storage Overview
            </CardTitle>
            <CardDescription>
              Retention status and storage utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LogStorageOverview />
          </CardContent>
        </Card>
      </div>
      
      {/* Real-time Log Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Real-Time Log Feed
          </CardTitle>
          <CardDescription>
            Live monitoring of all system events and logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RealtimeLogFeed searchQuery={searchQuery} timeRange={timeRange} />
        </CardContent>
      </Card>
      
      {/* User Activity Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity & Change Tracking</CardTitle>
          <CardDescription>
            Overview of user actions and system changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserActivityTracker />
        </CardContent>
      </Card>
      
      {/* Log Sources Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Log Sources Configuration</CardTitle>
          <CardDescription>
            Enable or disable log sources and adjust verbosity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogSourcesOverview />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoggingDashboard;
