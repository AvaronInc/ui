
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Network, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusCardGrid from './StatusCardGrid';
import SecurityOverviewSection from './sections/SecurityOverviewSection';
import NetworkStatusSection from './sections/NetworkStatusSection';
import SystemPerformanceSection from './sections/SystemPerformanceSection';
import ActiveAlertsSection from './sections/ActiveAlertsSection';
import { toast } from 'sonner';
import { GridLayout } from './grid/GridLayout';
import { GridLayoutProvider } from './grid/GridLayoutContext';
import ZoneInsights from '../zones/sidebar/ZoneInsights';

// Import the new widgets
import {
  MFALoginAttempts,
  UnverifiedUsers, 
  PendingIdentityApprovals,
  ZoneStorageUsage,
  CloudSyncStatus,
  TopBucketsByGrowth,
  ThreatSummary,
  TopBlockedIPs,
  ActiveCVEs
} from './widgets';

const MainDashboard = () => {
  const handleInvestigateSecurity = () => {
    toast.info("Launching security investigation tool...");
  };

  const handleRunDiagnostic = () => {
    toast.info("Running AI-based network diagnostic...");
  };

  const handleViewReport = () => {
    toast.info("Generating system performance report...");
  };

  // Define all widgets that will be available in the grid layout
  const widgetComponents = {
    // Original widgets
    'security-overview': <SecurityOverviewSection />,
    'network-status': <NetworkStatusSection />,
    'system-performance': <SystemPerformanceSection />,
    'active-alerts': <ActiveAlertsSection />,
    'zone-insights': <ZoneInsights />,
    
    // Identity & Access widgets
    'mfa-login-attempts': <MFALoginAttempts />,
    'unverified-users': <UnverifiedUsers />,
    'pending-identity-approvals': <PendingIdentityApprovals />,
    
    // Storage widgets
    'zone-storage-usage': <ZoneStorageUsage />,
    'cloud-sync-status': <CloudSyncStatus />,
    'top-buckets-by-growth': <TopBucketsByGrowth />,
    
    // Security widgets
    'threat-summary': <ThreatSummary />,
    'top-blocked-ips': <TopBlockedIPs />,
    'active-cves': <ActiveCVEs />,
  };

  console.log("Available widget components:", Object.keys(widgetComponents));

  return (
    <GridLayoutProvider>
      <div className="space-y-6 animate-fade-in">
        {/* System Overview & Status */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">System Overview</h2>
            <div className="text-sm text-muted-foreground">Last updated: 2 minutes ago</div>
          </div>
          <StatusCardGrid />
        </div>

        {/* Interactive Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-scale">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Shield className="h-8 w-8 mb-2 text-blue-500" />
              <h3 className="font-medium mb-1">Security Analysis</h3>
              <p className="text-sm text-muted-foreground mb-3">Investigate recent security events and threats</p>
              <Button size="sm" onClick={handleInvestigateSecurity}>Investigate Security</Button>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Network className="h-8 w-8 mb-2 text-green-500" />
              <h3 className="font-medium mb-1">Network Diagnostic</h3>
              <p className="text-sm text-muted-foreground mb-3">Run AI-powered network health assessment</p>
              <Button size="sm" variant="outline" onClick={handleRunDiagnostic}>Run Diagnostic</Button>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <BarChart className="h-8 w-8 mb-2 text-purple-500" />
              <h3 className="font-medium mb-1">Performance Report</h3>
              <p className="text-sm text-muted-foreground mb-3">View detailed system performance metrics</p>
              <Button size="sm" variant="outline" onClick={handleViewReport}>View Report</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections Grid - Wrapped with the new GridLayout system */}
        <GridLayout widgetComponents={widgetComponents} />
      </div>
    </GridLayoutProvider>
  );
};

export default MainDashboard;
