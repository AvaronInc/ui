
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRightLeft, Shield, Activity, Zap } from 'lucide-react';
import NetworkStatusCards from '../components/NetworkStatusCards';
import TrafficMetricsChart from '../components/TrafficMetricsChart';
import SDNTopologyMap from '../components/SDNTopologyMap';

const SDNOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Global SDN Map */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            Global SDN Topology
          </CardTitle>
          <CardDescription>
            Visual map of interconnected CyberNest NESTS, cloud deployments, and remote offices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SDNTopologyMap />
        </CardContent>
      </Card>

      {/* Network Health Status Cards */}
      <NetworkStatusCards />

      {/* Traffic Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Traffic Overview
          </CardTitle>
          <CardDescription>
            Real-time network throughput, bandwidth utilization, and latency metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrafficMetricsChart />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common SDN management operations and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button className="w-full flex items-center gap-2 justify-center">
              <Plus className="h-4 w-4" />
              <span>Deploy New Connection</span>
            </Button>
            <Button className="w-full flex items-center gap-2 justify-center" variant="outline">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Modify Routes</span>
            </Button>
            <Button className="w-full flex items-center gap-2 justify-center" variant="outline">
              <Shield className="h-4 w-4" />
              <span>Security Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SDNOverview;

function Network(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M16.616 7.376a7 7 0 1 0-9.24 9.247" />
      <path d="M21.524 2.476a12 12 0 0 0-19.047 19.048" />
    </svg>
  );
}
