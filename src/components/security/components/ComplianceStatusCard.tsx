
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ComplianceStatusCardProps {
  compliance: {
    frameworks: {
      [key: string]: {
        score: number;
        status: 'compliant' | 'partial' | 'non-compliant';
        lastAudit: string;
      }
    }
  }
}

const ComplianceStatusCard: React.FC<ComplianceStatusCardProps> = ({ compliance }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'partial':
        return <AlertTriangle className="h-3 w-3 text-amber-500" />;
      case 'non-compliant':
        return <XCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Compliant</Badge>;
      case 'partial':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Partial</Badge>;
      case 'non-compliant':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Non-Compliant</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <FileCheck className="h-4 w-4 mr-2 text-green-500" />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(compliance.frameworks).map(([framework, data], i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(data.status)}
                <span className="ml-2 text-sm">{framework}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{data.score}%</span>
                {getStatusBadge(data.status)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-4 text-center">
          Next audit scheduled: {formatDistanceToNow(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), { addSuffix: true })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceStatusCard;
