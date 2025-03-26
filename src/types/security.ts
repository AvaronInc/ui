
export type SecuritySeverity = 'critical' | 'high' | 'medium' | 'low';
export type EventType = 'intrusion' | 'malware' | 'unauthorized_access' | 'system_error' | 'policy_violation';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: EventType;
  severity: SecuritySeverity;
  affectedDevice: string;
  actionTaken?: string;
  description: string;
  userAffected?: string;
  remediationSteps?: string[];
  logs?: string[];
  acknowledged: boolean;
}

export interface SecurityStats {
  total24h: number;
  bySeverity: Record<SecuritySeverity, number>;
  activeThreats: number;
}

export interface SecurityFilter {
  searchQuery?: string;
  severity?: SecuritySeverity[];
  eventType?: EventType[];
  device?: string[];
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
}

export type ThreatType = 'phishing' | 'c2' | 'malware' | 'botnet' | 'ransomware' | 'cryptomining' | 'ddos' | 'brute_force' | 'data_exfiltration' | 'unknown';
export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type ActionStatus = 'none' | 'blocked' | 'quarantined' | 'under_review';

export interface IPThreat {
  id: string;
  ipAddress: string;
  domain?: string;
  riskScore: number; // 0-100
  threatType: ThreatType;
  confidenceLevel: ConfidenceLevel;
  lastSeen: string;
  sourceDevice: string;
  sourceUser?: string;
  actionTaken: ActionStatus;
  summary?: string;
  externalFeeds?: {
    name: string;
    url: string;
  }[];
  geoInfo?: {
    country: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  firstSeen?: string;
  whoisInfo?: {
    registrar?: string;
    registeredDate?: string;
    expiryDate?: string;
    organization?: string;
  };
}

export interface IPThreatStats {
  uniqueIpsObserved: number;
  flaggedThreats: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  blockedIpsWeek: number;
  emergingTrendsSummary: string;
}

export interface IPThreatFeedItem {
  id: string;
  timestamp: string;
  ipAddress: string;
  domain?: string;
  riskScore: number;
  sourceDevice: string;
  sourceUser?: string;
  severity: SecuritySeverity;
  domainType?: string;
  message: string;
}
