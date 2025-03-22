
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { LicenseData, RiskLevel } from '../types';

interface LicenseTableRowProps {
  license: LicenseData;
  onLicenseClick: (license: LicenseData) => void;
}

export const LicenseTableRow: React.FC<LicenseTableRowProps> = ({ license, onLicenseClick }) => {
  const getLicenseBadgeColor = (licenseType: string) => {
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

  const getRiskLevelIcon = (riskLevel: RiskLevel) => {
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

  return (
    <TableRow 
      key={license.id} 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onLicenseClick(license)}
    >
      <TableCell className="font-medium">{license.componentName}</TableCell>
      <TableCell>
        <Badge variant="outline" className={getLicenseBadgeColor(license.licenseType)}>
          {license.licenseType}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5">
          {getRiskLevelIcon(license.riskLevel)}
          <span className={`text-sm ${
            license.riskLevel === 'Low' ? 'text-green-600 dark:text-green-400' :
            license.riskLevel === 'Medium' ? 'text-amber-600 dark:text-amber-400' :
            'text-red-600 dark:text-red-400'
          }`}>
            {license.riskLevel}
          </span>
        </div>
      </TableCell>
      <TableCell>{license.version}</TableCell>
      <TableCell>
        <a 
          href={`https://${license.source}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {license.source}
        </a>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {license.usedIn.map((location, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {location}
            </Badge>
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
};
