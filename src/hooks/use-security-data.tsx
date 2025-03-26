import { useEffect, useState } from 'react';
import { SecurityEvent, SecurityStats, IPThreat, IPThreatStats, IPThreatFeedItem, ThreatType } from '@/types/security';

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
  ipThreatStats: IPThreatStats;
  ipThreats: IPThreat[];
  ipThreatFeed: IPThreatFeedItem[];
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
  })).reverse(),
  ipThreatStats: {
    uniqueIpsObserved: 2847,
    flaggedThreats: {
      total: 138,
      critical: 12,
      high: 36,
      medium: 55,
      low: 35
    },
    blockedIpsWeek: 78,
    emergingTrendsSummary: "Analysis shows a 27% increase in C2 traffic from Eastern European IPs targeting finance departments. Recommended actions include updating firewall rules and enhancing user security awareness training for finance staff."
  },
  ipThreats: [
    {
      id: "threat-001",
      ipAddress: "203.0.113.45",
      domain: "malicious-payload.example.com",
      riskScore: 92,
      threatType: "c2",
      confidenceLevel: "high",
      lastSeen: new Date(Date.now() - 1200000).toISOString(),
      sourceDevice: "Finance-PC-034",
      sourceUser: "amanda.jones",
      actionTaken: "blocked",
      summary: "This IP is associated with a known command and control server that has been active since March 2023. It shows patterns consistent with data exfiltration attempts and has been reported by multiple threat intelligence feeds.",
      externalFeeds: [
        { name: "AbuseIPDB", url: "https://www.abuseipdb.com/check/203.0.113.45" },
        { name: "VirusTotal", url: "https://www.virustotal.com/gui/ip-address/203.0.113.45" }
      ],
      geoInfo: {
        country: "Russian Federation",
        region: "Moscow",
        city: "Moscow",
        latitude: 55.7558,
        longitude: 37.6173
      }
    },
    {
      id: "threat-002",
      ipAddress: "198.51.100.67",
      domain: "invoice-preview.malware-domain.net",
      riskScore: 87,
      threatType: "phishing",
      confidenceLevel: "high",
      lastSeen: new Date(Date.now() - 3600000).toISOString(),
      sourceDevice: "Marketing-Laptop-12",
      sourceUser: "robert.chen",
      actionTaken: "quarantined",
      summary: "Phishing domain registered within the last 48 hours. Uses invoice-themed lures to distribute credential harvesting forms. Connected to multiple related domains with similar TTP patterns.",
      externalFeeds: [
        { name: "PhishTank", url: "https://phishtank.org/phish_detail.php?phish_id=7654321" }
      ]
    },
    {
      id: "threat-003",
      ipAddress: "45.33.102.184",
      riskScore: 74,
      threatType: "ransomware",
      confidenceLevel: "medium",
      lastSeen: new Date(Date.now() - 7200000).toISOString(),
      sourceDevice: "IT-Admin-PC-002",
      sourceUser: "admin.user",
      actionTaken: "under_review",
      summary: "IP address associated with ransomware distribution campaigns. Connection appears to be related to a scanning attempt against SMB ports. Recommend immediate investigation of admin workstation for signs of compromise."
    },
    {
      id: "threat-004",
      ipAddress: "91.213.160.129",
      domain: "cdn-resources.download-update.com",
      riskScore: 68,
      threatType: "malware",
      confidenceLevel: "medium",
      lastSeen: new Date(Date.now() - 5400000).toISOString(),
      sourceDevice: "Engineering-PC-056",
      sourceUser: "david.wilson",
      actionTaken: "blocked",
      summary: "Domain is masquerading as a legitimate CDN but serves malicious JavaScript that attempts to exploit browser vulnerabilities. Part of a campaign targeting engineering firms.",
      geoInfo: {
        country: "Ukraine",
        region: "Kyiv",
        city: "Kyiv"
      }
    },
    {
      id: "threat-005",
      ipAddress: "172.21.14.87",
      riskScore: 35,
      threatType: "brute_force",
      confidenceLevel: "low",
      lastSeen: new Date(Date.now() - 9000000).toISOString(),
      sourceDevice: "Internal Network",
      actionTaken: "none",
      summary: "Internal IP showing unusual authentication patterns. May indicate compromised credentials or legitimate testing activity. Low confidence score due to internal origin.",
      geoInfo: {
        country: "United States",
        region: "California"
      }
    },
    {
      id: "threat-006",
      ipAddress: "185.159.128.84",
      domain: "analytics-pixel.trackr-metrics.info",
      riskScore: 81,
      threatType: "data_exfiltration",
      confidenceLevel: "high",
      lastSeen: new Date(Date.now() - 1800000).toISOString(),
      sourceDevice: "Sales-Laptop-022",
      sourceUser: "jennifer.lopez",
      actionTaken: "blocked",
      summary: "Domain mimics legitimate analytics services but is exfiltrating sensitive data through obfuscated means. Connected to a newly established bulletproof hosting provider with multiple malicious clients.",
      externalFeeds: [
        { name: "OTX AlienVault", url: "https://otx.alienvault.com/indicator/domain/analytics-pixel.trackr-metrics.info" }
      ]
    },
    {
      id: "threat-007",
      ipAddress: "104.232.39.45",
      domain: "secure-payments.info",
      riskScore: 89,
      threatType: "phishing",
      confidenceLevel: "high",
      lastSeen: new Date(Date.now() - 2700000).toISOString(),
      sourceDevice: "HR-Desktop-007",
      sourceUser: "patricia.wong",
      actionTaken: "blocked",
      summary: "Sophisticated phishing site targeting financial credentials. Domain registered using stolen identity details. Infrastructure linked to previous successful phishing campaigns against similar organizations.",
      externalFeeds: [
        { name: "VirusTotal", url: "https://www.virustotal.com/gui/domain/secure-payments.info" }
      ],
      geoInfo: {
        country: "Netherlands",
        region: "North Holland",
        city: "Amsterdam"
      }
    },
    {
      id: "threat-008",
      ipAddress: "23.227.38.65",
      riskScore: 58,
      threatType: "cryptomining",
      confidenceLevel: "medium",
      lastSeen: new Date(Date.now() - 10800000).toISOString(),
      sourceDevice: "Guest-WiFi-Device",
      actionTaken: "blocked",
      summary: "Connection to known cryptocurrency mining pool. Likely from a guest device on public WiFi. Resource usage patterns consistent with mining activity.",
      geoInfo: {
        country: "Canada",
        region: "Quebec",
        city: "Montreal"
      }
    }
  ],
  ipThreatFeed: [
    {
      id: "feed-001",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      ipAddress: "103.98.64.172",
      domain: "attachment-viewer.info",
      riskScore: 92,
      sourceDevice: "Remote-Worker-Laptop-034",
      sourceUser: "michael.taylor",
      severity: "critical",
      domainType: "newly-registered",
      message: "Critical threat detected: Connection to newly registered phishing domain with known malware payload"
    },
    {
      id: "feed-002",
      timestamp: new Date(Date.now() - 360000).toISOString(),
      ipAddress: "45.147.231.78",
      riskScore: 78,
      sourceDevice: "Exec-Mobile-Device-008",
      sourceUser: "sarah.johnson",
      severity: "high",
      message: "High risk connection detected from executive device to known botnet command server"
    },
    {
      id: "feed-003",
      timestamp: new Date(Date.now() - 540000).toISOString(),
      ipAddress: "195.54.160.149",
      domain: "office365-update.secure-cdn.com",
      riskScore: 81,
      sourceDevice: "Accounting-PC-012",
      sourceUser: "thomas.garcia",
      severity: "high",
      domainType: "typosquat",
      message: "Typosquat domain mimicking Microsoft services contacted from accounting department"
    },
    {
      id: "feed-004",
      timestamp: new Date(Date.now() - 720000).toISOString(),
      ipAddress: "185.193.141.248",
      riskScore: 64,
      sourceDevice: "Marketing-Mac-005",
      sourceUser: "emma.wilson",
      severity: "medium",
      message: "Possible data exfiltration attempt detected from marketing department"
    },
    {
      id: "feed-005",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      ipAddress: "89.35.39.92",
      domain: "cdn-scripts.user-analytics.info",
      riskScore: 73,
      sourceDevice: "Engineering-Linux-016",
      sourceUser: "alex.rodriguez",
      severity: "medium",
      domainType: "suspicious",
      message: "Connection to suspicious domain with malicious script hosting history"
    }
  ]
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

