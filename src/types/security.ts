
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
