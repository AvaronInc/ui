
export type DNSSECEvent = {
  id: number;
  event: string;
  zone: string;
  timestamp: string;
  status: string;
};

export type DNSAnomaly = {
  id: number;
  type: string;
  source: string;
  destination: string;
  timestamp: string;
  status: string;
};

export type ThreatIntelligence = {
  id: number;
  domain: string;
  category: string;
  lastSeen: string;
  riskScore: number;
  action: string;
};
