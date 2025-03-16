
import React from 'react';
import StatusCard from './StatusCard';
import { Server, Shield, Users, Network, Activity, AlertTriangle, Check, X, Clock, Cpu, Globe, CheckCircle } from 'lucide-react';

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
    patchCompliance?: number;
    averageRiskScore?: number;
    vpnSessions?: number;
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
    connectedSystems: 18,
    patchCompliance: 87,
    averageRiskScore: 24,
    vpnSessions: 42
  },
  onClick 
}: StatusCardGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="Managed Devices"
        status={metrics.warningDevices === 0 ? "healthy" : metrics.warningDevices < 10 ? "warning" : "critical"}
        description={`${metrics.onlineDevices}/${metrics.totalDevices} devices online`}
        updated="2 minutes ago"
        icon={<Server className="h-5 w-5" />}
        detail={`${metrics.warningDevices} devices need attention`}
        onClick={() => onClick?.('devices')}
      />
      <StatusCard
        title="Patch Compliance"
        status={metrics.patchCompliance >= 90 ? "healthy" : metrics.patchCompliance >= 70 ? "warning" : "critical"}
        description={`${metrics.patchCompliance}% of devices up-to-date`}
        updated="1 hour ago"
        icon={<Check className="h-5 w-5" />}
        detail={`${metrics.totalDevices - Math.round(metrics.totalDevices * metrics.patchCompliance / 100)} devices need patches`}
        onClick={() => onClick?.('patching')}
      />
      <StatusCard
        title="VPN Sessions"
        status="healthy"
        description={`${metrics.vpnSessions} active connections`}
        updated="5 minutes ago"
        icon={<Globe className="h-5 w-5" />}
        detail="All connections secure"
        trend="up"
        trendValue="+12% today"
        onClick={() => onClick?.('vpn')}
      />
      <StatusCard
        title="Security Posture"
        status={metrics.averageRiskScore <= 30 ? "healthy" : metrics.averageRiskScore <= 60 ? "warning" : "critical"}
        description={`Risk score: ${metrics.averageRiskScore}/100`}
        updated="15 minutes ago"
        icon={<Shield className="h-5 w-5" />}
        detail={metrics.averageRiskScore <= 30 ? "Good security posture" : "Security issues detected"}
        onClick={() => onClick?.('security')}
      />
    </div>
  );
};

export default StatusCardGrid;
