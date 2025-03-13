
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import MultiTenantView from '@/components/dashboard/MultiTenantView';
import StatusCard from '@/components/dashboard/StatusCard';
import AlertsTable from '@/components/dashboard/AlertsTable';
import MetricsChart from '@/components/dashboard/MetricsChart';
import NavigationTile from '@/components/dashboard/NavigationTile';
import PageTransition from '@/components/transitions/PageTransition';
import { Building, Server, ShieldCheck, Users } from 'lucide-react';

// Sample data for metrics chart
const metricsData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 59 },
  { name: 'Wed', value: 80 },
  { name: 'Thu', value: 81 },
  { name: 'Fri', value: 56 },
  { name: 'Sat', value: 55 },
  { name: 'Sun', value: 40 }
];

// Sample alerts data
const alertsData = [
  { id: 1, level: 'critical', message: 'Server CPU usage at 92%', time: '2 min ago' },
  { id: 2, level: 'warning', message: 'Storage space below 15%', time: '15 min ago' },
  { id: 3, level: 'info', message: 'Backup completed successfully', time: '1 hour ago' }
];

const Index = () => {
  const { isAdmin } = useAuth();
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          {isAdmin ? (
            <MultiTenantView />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatusCard
                  title="System Availability"
                  status="healthy"
                  description="Last 30 days uptime: 99.9%"
                  updated="5 minutes ago"
                />
                <StatusCard
                  title="Security Score"
                  status="healthy"
                  description="A+ based on 42 criteria"
                  updated="1 hour ago"
                />
                <StatusCard
                  title="Active Users"
                  status="warning"
                  description="246 users (12% increase)"
                  updated="30 minutes ago"
                />
                <StatusCard
                  title="Connected Systems"
                  status="healthy"
                  description="18 systems (3 new this month)"
                  updated="1 hour ago"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MetricsChart 
                    title="System Performance" 
                    type="area" 
                    data={metricsData} 
                  />
                </div>
                <div>
                  <AlertsTable alerts={alertsData} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <NavigationTile
                  title="Security Operations"
                  description="Monitor and manage security events"
                  href="/security"
                  icon={<ShieldCheck className="h-8 w-8" />}
                />
                <NavigationTile
                  title="Remote Monitoring"
                  description="View and manage monitored devices"
                  href="/rmm"
                  icon={<Server className="h-8 w-8" />}
                />
                <NavigationTile
                  title="Workforce Management"
                  description="Manage employee devices & access"
                  href="/workforce"
                  icon={<Users className="h-8 w-8" />}
                />
                <NavigationTile
                  title="Storage Management"
                  description="Manage files and storage buckets"
                  href="/storage"
                  icon={<Building className="h-8 w-8" />}
                />
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Index;
