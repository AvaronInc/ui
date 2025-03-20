
export type DNSServer = {
  id: number;
  name: string;
  address: string;
  port: number;
  priority: 'primary' | 'secondary' | 'tertiary';
  latency: number;
  status: 'online' | 'offline' | 'degraded';
};

export type DNSLoadBalancer = {
  id: number;
  name: string;
  policy: 'round-robin' | 'geo' | 'weighted' | 'latency';
  status: 'active' | 'inactive';
  servers: number[];
};

export type DNSCacheConfig = {
  id: number;
  domain: string;
  ttl: number;
  recommended_ttl: number | null;
  negativeCache: boolean;
  status: 'active' | 'inactive';
};

export type DNSPerformanceMetric = {
  timestamp: string;
  queryTime: number;
  cacheHits: number;
  cacheMisses: number;
  totalQueries: number;
};
