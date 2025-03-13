
export interface StorageBucket {
  id: string;
  name: string;
  provider: 'minio' | 's3' | 'other';
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  region?: string;
  createdAt: string;
  totalSpace: number;
  usedSpace: number;
  objectCount: number;
  locked: boolean;
  versioned: boolean;
  encrypted: boolean;
  endpoint?: string;
  lastSync?: string;
}
