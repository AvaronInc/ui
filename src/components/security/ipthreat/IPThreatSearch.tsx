import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPThreat } from '@/types/security';
import { Search, Clock, Globe, AlertTriangle, Shield, Info, ExternalLink } from 'lucide-react';

interface IPThreatSearchProps {
  open: boolean;
  onClose: () => void;
  selectedThreat: IPThreat | null;
}

const IPThreatSearch: React.FC<IPThreatSearchProps> = ({ 
  open, 
  onClose,
  selectedThreat
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<IPThreat | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  
  // Pre-fill search if a threat is selected
  React.useEffect(() => {
    if (selectedThreat) {
      setSearchInput(selectedThreat.ipAddress);
      setSearchResult(selectedThreat);
    }
  }, [selectedThreat]);
  
  const handleSearch = () => {
    if (!searchInput.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API search - in a real app this would query an API
    setTimeout(() => {
      setIsSearching(false);
      
      // If we already have the selected threat, use that
      if (selectedThreat && (
        selectedThreat.ipAddress === searchInput || 
        selectedThreat.domain === searchInput
      )) {
        setSearchResult(selectedThreat);
        return;
      }
      
      // Otherwise create a mock result (in real app this would come from API)
      setSearchResult({
        id: "search-result",
        ipAddress: searchInput,
        domain: searchInput.includes('.') ? searchInput : undefined,
        riskScore: Math.floor(Math.random() * 100),
        threatType: "unknown",
        confidenceLevel: "medium",
        lastSeen: new Date().toISOString(),
        sourceDevice: "Unknown",
        actionTaken: "none",
        summary: "This is a simulated search result for the IP or domain. In a production environment, this would contain real threat intelligence from multiple sources.",
        geoInfo: {
          country: "United States",
          region: "California",
          city: "Mountain View"
        },
        whoisInfo: {
          registrar: "Example Registrar, LLC",
          registeredDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          organization: "Example Organization"
        },
        externalFeeds: [
          { name: "VirusTotal", url: `https://www.virustotal.com/gui/search/${searchInput}` },
          { name: "AbuseIPDB", url: `https://www.abuseipdb.com/check/${searchInput}` }
        ]
      });
    }, 1500);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-white bg-destructive';
    if (score >= 60) return 'text-white bg-orange-500';
    if (score >= 40) return 'text-white bg-yellow-500';
    return 'text-white bg-blue-500';
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
        // Don't clear the state immediately so it doesn't flash on close animation
        setTimeout(() => {
          if (!selectedThreat) {
            setSearchInput('');
            setSearchResult(null);
          }
        }, 300);
      }
    }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            IP/Domain Intelligence Search
          </DialogTitle>
          <DialogDescription>
            Search for threat intelligence on any IP address or domain
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter an IP address or domain..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        {searchResult && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">
                  {searchResult.ipAddress}
                  {searchResult.domain && searchResult.domain !== searchResult.ipAddress && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {searchResult.domain}
                    </span>
                  )}
                </h3>
                <div className="flex items-center mt-1">
                  <Badge className={getScoreColor(searchResult.riskScore)}>
                    Risk Score: {searchResult.riskScore}
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    Last seen: {formatDate(searchResult.lastSeen)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Shield className="h-4 w-4" />
                  Block
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="geo">Geo & WHOIS</TabsTrigger>
                <TabsTrigger value="ai">AI Verdict</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium flex items-center">
                        <Info className="h-4 w-4 mr-1 text-primary" />
                        Threat Details
                      </h4>
                      <p className="text-sm mt-1">{searchResult.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Threat Type</h4>
                      <p className="text-sm mt-1 capitalize">{searchResult.threatType.replace('_', ' ')}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Confidence Level</h4>
                      <p className="text-sm mt-1 capitalize">{searchResult.confidenceLevel}</p>
                    </div>
                    
                    {searchResult.externalFeeds && searchResult.externalFeeds.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium">External Intelligence</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {searchResult.externalFeeds.map((feed, index) => (
                            <Button 
                              key={index} 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1 h-8"
                              asChild
                            >
                              <a href={feed.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                                {feed.name}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="geo" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {searchResult.geoInfo && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center">
                          <Globe className="h-4 w-4 mr-1 text-primary" />
                          Geographic Location
                        </h4>
                        <p className="text-sm mt-1">
                          {[
                            searchResult.geoInfo.city,
                            searchResult.geoInfo.region,
                            searchResult.geoInfo.country
                          ].filter(Boolean).join(', ')}
                        </p>
                      </div>
                    )}
                    
                    {searchResult.whoisInfo && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center">
                          <Info className="h-4 w-4 mr-1 text-primary" />
                          WHOIS Information
                        </h4>
                        <div className="text-sm mt-1 space-y-1">
                          {searchResult.whoisInfo.organization && (
                            <p>Organization: {searchResult.whoisInfo.organization}</p>
                          )}
                          {searchResult.whoisInfo.registrar && (
                            <p>Registrar: {searchResult.whoisInfo.registrar}</p>
                          )}
                          {searchResult.whoisInfo.registeredDate && (
                            <p>Registered: {formatDate(searchResult.whoisInfo.registeredDate)}</p>
                          )}
                          {searchResult.whoisInfo.expiryDate && (
                            <p>Expires: {formatDate(searchResult.whoisInfo.expiryDate)}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Mixtral Verdict</h4>
                        <div className="text-sm mt-2 space-y-2">
                          <p>
                            Based on analysis of this {searchResult.domain ? 'domain' : 'IP address'} 
                            and its observed behavior, it appears to be associated with 
                            {searchResult.riskScore > 70 ? ' high-risk malicious activity.' : 
                             searchResult.riskScore > 40 ? ' potentially suspicious behavior.' : 
                             ' normal traffic patterns with low risk indicators.'} 
                          </p>
                          
                          {searchResult.riskScore > 60 && (
                            <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20 flex items-start gap-2 mt-3">
                              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-destructive">Recommended Action</p>
                                <p className="text-sm mt-1">
                                  This entity should be blocked on your network and any systems 
                                  that have communicated with it should be isolated and scanned 
                                  for potential compromise.
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {searchResult.riskScore > 40 && searchResult.riskScore <= 60 && (
                            <div className="bg-orange-500/10 p-3 rounded-md border border-orange-500/20 flex items-start gap-2 mt-3">
                              <Clock className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-orange-500">Recommended Action</p>
                                <p className="text-sm mt-1">
                                  Monitor communications with this entity closely and consider 
                                  implementing temporary restrictions while further investigation 
                                  is conducted.
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {searchResult.riskScore <= 40 && (
                            <div className="bg-blue-500/10 p-3 rounded-md border border-blue-500/20 flex items-start gap-2 mt-3">
                              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-blue-500">Recommended Action</p>
                                <p className="text-sm mt-1">
                                  No immediate action required, but maintain standard monitoring 
                                  as part of normal security operations.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {!searchResult && !isSearching && (
          <div className="text-center p-8 border rounded-md">
            <Search className="h-10 w-10 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Search for an IP or domain</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter an IP address or domain name to view threat intelligence data
            </p>
          </div>
        )}
        
        {isSearching && (
          <div className="text-center p-8 border rounded-md">
            <div className="animate-pulse flex justify-center">
              <div className="h-10 w-10 bg-primary/20 rounded-full"></div>
            </div>
            <h3 className="mt-4 text-lg font-medium">Searching...</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Querying multiple threat intelligence sources
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IPThreatSearch;
