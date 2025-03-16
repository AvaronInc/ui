
import React from 'react';
import StatusCard from './StatusCard';
import { Server, Shield, Users, Network, Activity, AlertTriangle, Check, X } from 'lucide-react';

interface StatusCardGridProps {
  metrics?: {
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    warningDevices: number;
    uptime: string;
    securityScore: number;
    activeUsers: number;
    connectedSystems: number;
  };
  onClick?: (section: string) => void;
}

const StatusCardGrid = ({ 
  metrics = {
    totalDevices: 248,
    onlineDevices: 221,
    offlineDevices: 12,
    warningDevices: 15,
    uptime: "99.9%",
    securityScore: 92,
    activeUsers: 246,
    connectedSystems: 18
  },
  onClick 
}: StatusCardGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="System Availability"
        status="healthy"
        description={`Last 30 days uptime: ${metrics.uptime}`}
        updated="5 minutes ago"
        icon={<Server className="h-5 w-5" />}
        onClick={() => onClick?.('availability')}
      />
      <StatusCard
        title="Security Score"
        status={metrics.securityScore >= 90 ? "healthy" : metrics.securityScore >= 70 ? "warning" : "critical"}
        description={`${metrics.securityScore}/100 based on 42 criteria`}
        updated="1 hour ago"
        icon={<Shield className="h-5 w-5" />}
        onClick={() => onClick?.('security')}
      />
      <StatusCard
        title="Devices Online"
        status={metrics.offlineDevices === 0 ? "healthy" : metrics.offlineDevices < 5 ? "warning" : "critical"}
        description={`${metrics.onlineDevices}/${metrics.totalDevices} devices connected`}
        updated="2 minutes ago"
        icon={<Network className="h-5 w-5" />}
        onClick={() => onClick?.('devices')}
      />
      <StatusCard
        title="Active Alerts"
        status={metrics.warningDevices === 0 ? "healthy" : metrics.warningDevices < 10 ? "warning" : "critical"}
        description={`${metrics.warningDevices} devices need attention`}
        updated="10 minutes ago"
        icon={<AlertTriangle className="h-5 w-5" />}
        onClick={() => onClick?.('alerts')}
      />
    </div>
  );
};

export default StatusCardGrid;
