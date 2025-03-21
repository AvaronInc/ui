
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Package, AlertTriangle, ShieldCheck } from 'lucide-react';
import { licenseSummary } from './mockLicenseData';

const LicenseSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard 
        title="Open Source Licenses" 
        value={licenseSummary.totalLicenses.toString()}
        icon={<FileCheck className="h-5 w-5 text-primary" />}
        description="Total licenses being used"
      />
      
      <SummaryCard 
        title="Dependencies Tracked" 
        value={licenseSummary.totalDependencies.toString()}
        icon={<Package className="h-5 w-5 text-blue-500" />}
        description="Total dependencies in use"
      />
      
      <SummaryCard 
        title="Restricted Licenses" 
        value={licenseSummary.restrictedLicenses.toString()}
        icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        description="GPL, AGPL, etc."
        badge={licenseSummary.restrictedLicenses > 0 ? "Attention" : "None"}
      />
      
      <SummaryCard 
        title="Compliance Status" 
        value={licenseSummary.complianceStatus}
        icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
        description="Overall license audit status"
        badge={licenseSummary.complianceStatus}
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  description,
  badge
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {badge && (
                <Badge 
                  className={`ml-2 ${
                    badge === 'Review Needed' ? 'bg-amber-500' : 
                    badge === 'Non-Compliant' ? 'bg-red-500' : 
                    badge === 'Attention' ? 'bg-amber-500' :
                    badge === 'Compliant' ? 'bg-green-500' :
                    ''
                  }`}
                >
                  {badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="p-2 rounded-full bg-muted">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseSummaryCards;
