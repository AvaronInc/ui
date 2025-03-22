
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LicenseData } from '../types';
import { getLicenseBadgeColor, getRiskLevelIcon, getRiskLevelTextColor } from '../utils/licenseUtils';

interface LicenseTableRowProps {
  license: LicenseData;
  onLicenseClick: (license: LicenseData) => void;
}

export const LicenseTableRow: React.FC<LicenseTableRowProps> = ({ license, onLicenseClick }) => {
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
          <span className={`text-sm ${getRiskLevelTextColor(license.riskLevel)}`}>
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
