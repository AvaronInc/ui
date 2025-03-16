
import { SecurityScan } from '@/types/containers';

// Sample security scans data
export const getSampleSecurityScans = (): SecurityScan => ({
  overallScore: 82,
  lastScanTime: '2023-07-18 09:30:00',
  criticalVulnerabilities: 0,
  highVulnerabilities: 2,
  mediumVulnerabilities: 7,
  lowVulnerabilities: 12,
  cisDockerScore: 89,
  pciDssScore: 76,
  hipaaScore: 84
});
