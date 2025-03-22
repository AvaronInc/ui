
import { Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { LicenseType, RiskLevel } from '../types';

/**
 * Get the appropriate badge color class for a license type
 */
export const getLicenseBadgeColor = (licenseType: LicenseType): string => {
  switch (licenseType) {
    case 'Apache 2.0':
    case 'MIT':
    case 'BSD-2-Clause':
    case 'BSD-3-Clause':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'GPL':
    case 'LGPL':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'AGPL':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'Proprietary':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'Custom':
    case 'MPL':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

/**
 * Get the appropriate risk level text color
 */
export const getRiskLevelTextColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return 'text-green-600 dark:text-green-400';
    case 'Medium':
      return 'text-amber-600 dark:text-amber-400';
    case 'High':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

/**
 * Get the appropriate risk level icon component
 */
export const getRiskLevelIcon = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case 'Low':
      return <Shield className="h-4 w-4 text-green-500" />;
    case 'Medium':
      return <ShieldAlert className="h-4 w-4 text-amber-500" />;
    case 'High':
      return <ShieldX className="h-4 w-4 text-red-500" />;
    default:
      return <Shield className="h-4 w-4 text-gray-500" />;
  }
};
