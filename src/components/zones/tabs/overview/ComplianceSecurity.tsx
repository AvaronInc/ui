
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { Zone } from '../../types';

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

interface ComplianceSecurityProps {
  zone: Zone;
}

const ComplianceSecurity: React.FC<ComplianceSecurityProps> = ({ zone }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Compliance & Security</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {zone.complianceTags.map((tag) => (
              <Badge key={tag} variant="outline" className="justify-center py-1.5 border-green-500 text-green-500">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground mt-2">
            All compliance checks are passing. Last audit: {formatDate(zone.modified)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceSecurity;
