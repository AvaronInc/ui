
// Mock data - in a real implementation, this would come from an API
export const healthData = {
  networkStatus: {
    status: 'healthy' as const, // 'healthy', 'warning', 'critical'
    uptime: '99.98%',
    activeConnections: 547,
    bandwidth: {
      used: 78,
      total: 100
    }
  },
  securityPosture: {
    status: 'warning' as const,
    alerts: {
      critical: 0,
      warning: 3,
      info: 12
    },
    lastScan: '2 hours ago',
    complianceScore: 92
  },
  systemPerformance: {
    status: 'healthy' as const,
    cpu: 42,
    memory: 68,
    storage: 51
  }
};

export type HealthData = typeof healthData;
