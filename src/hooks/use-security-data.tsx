
import { useEffect, useState } from 'react';
import { SecurityEvent, SecurityStats } from '@/types/security';

interface NetworkAnomaly {
  timestamp: string;
  normal: number;
  anomalous: number;
}

interface SecurityScore {
  overall: number;
  lastUpdate: string;
  components: {
    network: number;
    endpoints: number;
    authentication: number;
    dataProtection: number;
    patchStatus: number;
  }
}

interface ComplianceStatus {
  frameworks: {
    [key: string]: {
      score: number;
      status: 'compliant' | 'partial' | 'non-compliant';
      lastAudit: string;
    }
  }
}

export interface SecurityData {
  securityStats: SecurityStats;
  recentEvents: SecurityEvent[];
  securityScore: SecurityScore;
  complianceStatus: ComplianceStatus;
  lastScanTime: string;
  activeThreatsByType: Record<string, number>;
  networkAnomaly: NetworkAnomaly[];
}

// Sample security data
const dummySecurityData: SecurityData = {
  securityStats: {
    total24h: 157,
    bySeverity: {
      critical: 3,
      high: 12,
      medium: 45,
      low: 97
    },
    activeThreats: 5
  },
  recentEvents: [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      eventType: 'intrusion',
      severity: 'critical',
      affectedDevice: 'Main Server (192.168.1.100)',
      description: 'Multiple failed login attempts detected',
      userAffected: 'admin',
      actionTaken: 'IP blocked',
      remediationSteps: [
        'Review authentication logs',
        'Check for suspicious activity',
        'Update firewall rules'
      ],
      logs: [
        '2024-02-20 10:15:23 - Failed login attempt from IP 203.0.113.1',
        '2024-02-20 10:15:25 - Account locked due to multiple failures',
        '2024-02-20 10:15:26 - IP automatically blocked by security system'
      ],
      acknowledged: false
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      eventType: 'malware',
      severity: 'high',
      affectedDevice: 'Workstation-15',
      description: 'Suspicious file activity detected',
      actionTaken: 'File quarantined',
      acknowledged: false
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      eventType: 'unauthorized_access',
      severity: 'medium',
      affectedDevice: 'Database Server',
      description: 'Unauthorized access attempt to restricted database',
      actionTaken: 'Access denied, alert generated',
      acknowledged: true
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      eventType: 'policy_violation',
      severity: 'low',
      affectedDevice: 'User Laptop (192.168.1.45)',
      description: 'Security policy violation: Disabled antivirus',
      actionTaken: 'Antivirus re-enabled remotely',
      acknowledged: true
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      eventType: 'system_error',
      severity: 'medium',
      affectedDevice: 'Network Switch (Core)',
      description: 'System error causing packet loss',
      actionTaken: 'Automatic failover triggered',
      acknowledged: false
    }
  ],
  securityScore: {
    overall: 82,
    lastUpdate: new Date(Date.now() - 86400000).toISOString(),
    components: {
      network: 85,
      endpoints: 79,
      authentication: 90,
      dataProtection: 82,
      patchStatus: 76
    }
  },
  complianceStatus: {
    frameworks: {
      'SOC 2': {
        score: 87,
        status: 'compliant',
        lastAudit: new Date(Date.now() - 2592000000).toISOString() // 30 days ago
      },
      'ISO 27001': {
        score: 83,
        status: 'compliant',
        lastAudit: new Date(Date.now() - 5184000000).toISOString() // 60 days ago
      },
      'NIST 800-53': {
        score: 79,
        status: 'partial',
        lastAudit: new Date(Date.now() - 7776000000).toISOString() // 90 days ago
      },
      'HIPAA': {
        score: 91,
        status: 'compliant',
        lastAudit: new Date(Date.now() - 3456000000).toISOString() // 40 days ago
      },
      'GDPR': {
        score: 85,
        status: 'compliant',
        lastAudit: new Date(Date.now() - 4320000000).toISOString() // 50 days ago
      }
    }
  },
  lastScanTime: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  activeThreatsByType: {
    'Malware': 2,
    'Network Intrusion': 1,
    'Authentication Failures': 5,
    'DDoS Attacks': 0
  },
  networkAnomaly: Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    normal: Math.floor(Math.random() * 80) + 20,
    anomalous: Math.floor(Math.random() * 15)
  })).reverse()
};

export const useSecurityData = () => {
  const [data, setData] = useState<SecurityData>(dummySecurityData);
  
  // Simulate API fetching
  useEffect(() => {
    // In a real implementation, we would fetch data from an API
    // For now, we'll just use our dummy data
    const fetchData = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(dummySecurityData);
      } catch (error) {
        console.error('Error fetching security data:', error);
      }
    };
    
    fetchData();
    
    // Set up periodic refresh
    const intervalId = setInterval(fetchData, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  return data;
};
