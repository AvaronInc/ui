
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import MultiTenantView from '@/components/dashboard/MultiTenantView';
import StatusCard from '@/components/dashboard/StatusCard';
import AlertsTable from '@/components/dashboard/AlertsTable';
import MetricsChart from '@/components/dashboard/MetricsChart';
import NavigationTile from '@/components/dashboard/NavigationTile';
import PageTransition from '@/components/transitions/PageTransition';
import { Building, Server, ShieldCheck, Users } from 'lucide-react';

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
                  value="99.9%"
                  trend="up"
                  description="Last 30 days"
                  icon={<Server className="h-5 w-5" />}
                />
                <StatusCard
                  title="Security Score"
                  value="A+"
                  trend="unchanged"
                  description="Based on 42 criteria"
                  icon={<ShieldCheck className="h-5 w-5" />}
                />
                <StatusCard
                  title="Active Users"
                  value="246"
                  trend="up"
                  description="Increased by 12% this month"
                  icon={<Users className="h-5 w-5" />}
                />
                <StatusCard
                  title="Connected Systems"
                  value="18"
                  trend="up"
                  description="3 new this month"
                  icon={<Building className="h-5 w-5" />}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MetricsChart />
                </div>
                <div>
                  <AlertsTable />
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
