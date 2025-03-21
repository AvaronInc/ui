
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Package, AlertTriangle, ShieldCheck, RotateCw } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { licenseSummary } from './mockLicenseData';
import { toast } from 'sonner';

const LicenseSummaryCards: React.FC = () => {
  const handleRefreshSummary = () => {
    toast.success('License summary refreshed');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">License Summary</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefreshSummary}
                className="h-8 w-8"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh license summary</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

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
          badgeTooltip={
            licenseSummary.restrictedLicenses > 0 
              ? "Contains licenses that may require special handling" 
              : "No restricted licenses detected"
          }
        />
        
        <SummaryCard 
          title="Compliance Status" 
          value={licenseSummary.complianceStatus}
          icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
          description="Overall license audit status"
          badge={licenseSummary.complianceStatus}
          badgeTooltip={
            licenseSummary.complianceStatus === "Compliant" 
              ? "All licenses are compliant with policies" 
              : licenseSummary.complianceStatus === "Review Needed" 
              ? "Some licenses need legal review" 
              : "License conflicts detected requiring immediate action"
          }
        />
      </div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
  badgeTooltip?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  description,
  badge,
  badgeTooltip
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge 
                        className={`ml-2 ${
                          badge === 'Review Needed' ? 'bg-amber-500' : 
                          badge === 'Non-Compliant' ? 'bg-red-500' : 
                          badge === 'Attention' ? 'bg-amber-500' :
                          badge === 'Compliant' ? 'bg-green-500' :
                          badge === 'None' ? 'bg-gray-500' :
                          ''
                        }`}
                      >
                        {badge === 'None' ? '0' : badge}
                      </Badge>
                    </TooltipTrigger>
                    {badgeTooltip && (
                      <TooltipContent>
                        <p>{badgeTooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
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

