
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { activeServices, recentAlerts } from '@/data/servicesData';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, Clock, Info, Server, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceStatusCard from '../components/ServiceStatusCard';
import ResourceUsageChart from '../components/ResourceUsageChart';
import RecentAlertsTable from '../components/RecentAlertsTable';

const ServicesOverview = () => {
  // Calculate service status counts
  const statusCounts = {
    healthy: activeServices.filter(s => s.status === 'healthy').length,
    warning: activeServices.filter(s => s.status === 'warning').length,
    critical: activeServices.filter(s => s.status === 'critical').length,
    offline: activeServices.filter(s => s.status === 'offline').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Server className="mr-2 h-5 w-5 text-primary" />
              Active Services Summary
            </CardTitle>
            <CardDescription>
              Overview of all deployed services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ServiceStatusCard 
                title="Total Services" 
                value={activeServices.length.toString()}
                icon={<Server className="h-4 w-4" />}
              />
              <ServiceStatusCard 
                title="Healthy" 
                value={statusCounts.healthy.toString()}
                status="success"
                icon={<Check className="h-4 w-4" />}
              />
              <ServiceStatusCard 
                title="Warning" 
                value={statusCounts.warning.toString()}
                status="warning"
                icon={<AlertTriangle className="h-4 w-4" />}
              />
              <ServiceStatusCard 
                title="Critical" 
                value={(statusCounts.critical + statusCounts.offline).toString()}
                status="error"
                icon={<Info className="h-4 w-4" />}
              />
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Service Types</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(activeServices.map(s => s.type))).map(type => (
                  <Badge key={type} variant="outline" className="capitalize">
                    {type.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button size="sm">
                View All Services
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Resource Usage
            </CardTitle>
            <CardDescription>
              CPU, Memory, and Network usage across services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResourceUsageChart services={activeServices} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            Recent Alerts & Logs
          </CardTitle>
          <CardDescription>
            Latest service failures, security incidents, and performance degradation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentAlertsTable alerts={recentAlerts} services={activeServices} />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Button size="lg" className="flex-grow sm:flex-grow-0">
          Deploy New Service
        </Button>
        <Button size="lg" variant="outline" className="flex-grow sm:flex-grow-0">
          View Logs & Diagnostics
        </Button>
        <Button size="lg" variant="outline" className="flex-grow sm:flex-grow-0">
          Service Health Check
        </Button>
      </div>
    </div>
  );
};

export default ServicesOverview;
