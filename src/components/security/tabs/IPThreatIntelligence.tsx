
import React, { useState } from 'react';
import { useSecurityData } from '@/hooks/use-security-data';
import ThreatSummaryHeader from '../ipthreat/ThreatSummaryHeader';
import IPThreatTable from '../ipthreat/IPThreatTable';
import ThreatFeedPanel from '../ipthreat/ThreatFeedPanel';
import IPThreatSearch from '../ipthreat/IPThreatSearch';
import { IPThreat, SecuritySeverity } from '@/types/security';

const IPThreatIntelligence: React.FC = () => {
  const securityData = useSecurityData();
  const [selectedThreat, setSelectedThreat] = useState<IPThreat | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<SecuritySeverity[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectThreat = (threat: IPThreat) => {
    setSelectedThreat(threat);
  };

  const handleOpenSearch = () => {
    setSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const filteredThreats = securityData.ipThreats.filter(threat => {
    // Filter by search query
    if (searchQuery && !threat.ipAddress.includes(searchQuery) && 
        !(threat.domain && threat.domain.includes(searchQuery))) {
      return false;
    }
    
    // Filter by severity (based on risk score)
    if (severityFilter.length > 0) {
      const severity = getSeverityFromScore(threat.riskScore);
      if (!severityFilter.includes(severity)) {
        return false;
      }
    }
    
    // Filter by threat type
    if (typeFilter.length > 0 && !typeFilter.includes(threat.threatType)) {
      return false;
    }
    
    return true;
  });

  // Helper function to convert risk score to severity
  const getSeverityFromScore = (score: number): SecuritySeverity => {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="space-y-4">
      <ThreatSummaryHeader stats={securityData.ipThreatStats} onSearch={handleOpenSearch} />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <IPThreatTable 
            threats={filteredThreats} 
            onSelectThreat={handleSelectThreat}
            severityFilter={severityFilter}
            onSeverityFilterChange={setSeverityFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
        </div>
        <div className="xl:col-span-1">
          <ThreatFeedPanel feedItems={securityData.ipThreatFeed} />
        </div>
      </div>
      
      <IPThreatSearch 
        open={searchOpen} 
        onClose={handleCloseSearch} 
        selectedThreat={selectedThreat}
      />
    </div>
  );
};

export default IPThreatIntelligence;
