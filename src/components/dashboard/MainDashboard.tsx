
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Network, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusCardGrid from './StatusCardGrid';
import NetworkStatusSection from './sections/NetworkStatusSection';
import SystemPerformanceSection from './sections/SystemPerformanceSection';
import ActiveAlertsSection from './sections/ActiveAlertsSection';
import { toast } from 'sonner';
import { GridLayout } from './grid/GridLayout';
import { GridLayoutProvider } from './grid/GridLayoutContext';
import ZoneInsights from '../zones/sidebar/ZoneInsights';
import { useIsMobile } from '@/hooks/use-mobile';

// Import the widgets
import {
  MFALoginAttempts,
  UnverifiedUsers, 
  PendingIdentityApprovals,
  ZoneStorageUsage,
  CloudSyncStatus,
  TopBucketsByGrowth,
  ThreatSummary,
  TopBlockedIPs,
  ActiveCVEs,
  WeatherBySiteWidget
} from './widgets';

const MainDashboard = () => {
  const isMobile = useIsMobile();
  
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
    
    // Weather widget
    'weather-by-site': <WeatherBySiteWidget />,
  };

  return (
    <GridLayoutProvider>
      <div className="space-y-4 sm:space-y-6 animate-fade-in pb-6">
        {/* System Overview & Status */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">System Overview</h2>
            <div className="text-xs sm:text-sm text-muted-foreground">Last updated: 2 minutes ago</div>
          </div>
          <StatusCardGrid />
        </div>

        {/* Interactive Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          <Card className="hover-scale">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center">
              <Shield className="h-6 sm:h-8 w-6 sm:w-8 mb-1 sm:mb-2 text-blue-500" />
              <h3 className="font-medium mb-0 sm:mb-1 text-sm sm:text-base">Security Analysis</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Investigate security events</p>
              <Button size={isMobile ? "sm" : "default"} onClick={handleInvestigateSecurity}>Investigate</Button>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center">
              <Network className="h-6 sm:h-8 w-6 sm:w-8 mb-1 sm:mb-2 text-green-500" />
              <h3 className="font-medium mb-0 sm:mb-1 text-sm sm:text-base">Network Diagnostic</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Run AI network assessment</p>
              <Button size={isMobile ? "sm" : "default"} variant="outline" onClick={handleRunDiagnostic}>Diagnose</Button>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center">
              <BarChart className="h-6 sm:h-8 w-6 sm:w-8 mb-1 sm:mb-2 text-purple-500" />
              <h3 className="font-medium mb-0 sm:mb-1 text-sm sm:text-base">Performance Report</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">View system metrics</p>
              <Button size={isMobile ? "sm" : "default"} variant="outline" onClick={handleViewReport}>Report</Button>
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
