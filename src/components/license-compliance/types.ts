
export type LicenseType = 'MIT' | 'Apache 2.0' | 'GPL' | 'AGPL' | 'LGPL' | 'BSD-3-Clause' | 'BSD-2-Clause' | 'MPL' | 'Custom' | 'Unknown' | 'Proprietary';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface LicenseData {
  id: string;
  componentName: string;
  licenseType: LicenseType;
  licenseUrl: string;
  version: string;
  source: string;
  usedIn: string[];
  riskLevel: RiskLevel;
  fullLicenseText?: string;
  usageDetails?: {
    containerName?: string;
    apiCalls?: string[];
    dependencies?: string[];
  };
}

export interface LicenseSummary {
  totalLicenses: number;
  totalDependencies: number;
  restrictedLicenses: number;
  complianceStatus: 'Compliant' | 'Review Needed' | 'Non-Compliant';
}

export interface LicenseBreakdown {
  licenseType: LicenseType;
  count: number;
  color: string;
}
