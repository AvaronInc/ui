
export interface CaptureSession {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  startTime: string;
  duration: string;
  status: 'active' | 'completed';
  packets: number;
  bytes: number;
  encryption: 'strong' | 'weak' | 'none';
  threatScore: number;
}
