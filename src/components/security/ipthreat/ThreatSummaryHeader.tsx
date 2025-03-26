
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IPThreatStats } from '@/types/security';
import { Search, ShieldAlert, Shield, AlertTriangle, Info } from 'lucide-react';

interface ThreatSummaryHeaderProps {
  stats: IPThreatStats;
  onSearch: () => void;
}

const ThreatSummaryHeader: React.FC<ThreatSummaryHeaderProps> = ({ stats, onSearch }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            IP Threat Intelligence Summary
          </h2>
          <Button 
            variant="outline" 
            className="mt-2 sm:mt-0 flex items-center gap-1"
            onClick={onSearch}
          >
            <Search className="h-4 w-4" />
            Search IP/Domain
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Unique IPs Observed (24h)</div>
            <div className="text-2xl font-semibold mt-1">{stats.uniqueIpsObserved.toLocaleString()}</div>
          </div>
          
          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Flagged Threats</div>
            <div className="text-2xl font-semibold mt-1">{stats.flaggedThreats.total}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="flex items-center">
                <ShieldAlert className="h-3 w-3 mr-1 text-destructive" />
                {stats.flaggedThreats.critical} Critical
              </span>
              <span className="flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1 text-orange-500" />
                {stats.flaggedThreats.high} High
              </span>
            </div>
          </div>
          
          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Blocked IPs This Week</div>
            <div className="text-2xl font-semibold mt-1">{stats.blockedIpsWeek}</div>
          </div>
          
          <div className="bg-muted/40 p-3 rounded-lg flex flex-col">
            <div className="text-sm text-muted-foreground flex items-center">
              <Info className="h-3 w-3 mr-1" />
              Emerging Threat Trends
            </div>
            <div className="text-xs mt-1 flex-1 overflow-hidden">
              {stats.emergingTrendsSummary}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatSummaryHeader;
