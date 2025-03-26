
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Filter, Globe, ChevronRight, ChevronDown, Building, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAPTData } from './hooks/useAPTData';

const APTGroupDirectory = () => {
  const { aptGroups, regions, sectors } = useAPTData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  
  // Filter the APT groups based on search term, region, and sector
  const filteredGroups = aptGroups.filter(group => {
    const matchesSearch = !searchTerm || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = !selectedRegion || group.origin === selectedRegion;
    const matchesSector = !selectedSector || group.targetedSectors.includes(selectedSector);
    
    return matchesSearch && matchesRegion && matchesSector;
  });
  
  const handleToggleExpand = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };
  
  const getThreatLevelColor = (level: 'low' | 'medium' | 'high' | 'critical') => {
    switch (level) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return '';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search APT groups by name, alias, or description..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="h-10 px-3 flex items-center gap-1.5 shrink-0"
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion(null);
              setSelectedSector(null);
            }}
          >
            <Filter className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="region" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="region">By Region</TabsTrigger>
                  <TabsTrigger value="sector">By Sector</TabsTrigger>
                </TabsList>
                
                <TabsContent value="region" className="mt-2">
                  <ScrollArea className="h-[200px] pr-3">
                    <div className="space-y-1">
                      {regions.map(region => (
                        <Button
                          key={region}
                          variant={selectedRegion === region ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          {region}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="sector" className="mt-2">
                  <ScrollArea className="h-[200px] pr-3">
                    <div className="space-y-1">
                      {sectors.map(sector => (
                        <Button
                          key={sector}
                          variant={selectedSector === sector ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
                        >
                          <Building className="mr-2 h-4 w-4" />
                          {sector}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">APT Statistics</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Total APT Groups</span>
                    <span>{aptGroups.length}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Active Groups</span>
                    <span>{aptGroups.filter(g => g.isActive).length}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Critical Threat Level</span>
                    <span>{aptGroups.filter(g => g.threatLevel === 'critical').length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-9">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">APT Groups ({filteredGroups.length})</div>
                {(selectedRegion || selectedSector) && (
                  <div className="flex gap-2">
                    {selectedRegion && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {selectedRegion}
                      </Badge>
                    )}
                    {selectedSector && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {selectedSector}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              <ScrollArea className="h-[500px] pr-3">
                <div className="space-y-2">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                      <Collapsible
                        key={group.id}
                        open={expandedGroup === group.id}
                        onOpenChange={() => handleToggleExpand(group.id)}
                        className="border rounded-md"
                      >
                        <CollapsibleTrigger className="flex justify-between items-center p-3 w-full hover:bg-accent/50 rounded-md">
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <div className="text-sm font-medium">{group.name}</div>
                            <Badge variant="outline" className={getThreatLevelColor(group.threatLevel)}>
                              {group.threatLevel.charAt(0).toUpperCase() + group.threatLevel.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-primary/10">
                              {group.origin}
                            </Badge>
                            {expandedGroup === group.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-3 pt-0 border-t mt-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">Description</div>
                              <div className="text-sm">{group.description}</div>
                              
                              <div className="text-xs font-medium text-muted-foreground mt-3 mb-1">Also Known As</div>
                              <div className="flex flex-wrap gap-1">
                                {group.aliases.map((alias, index) => (
                                  <Badge key={index} variant="outline" className="bg-secondary/10">
                                    {alias}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">Targeted Sectors</div>
                              <div className="flex flex-wrap gap-1">
                                {group.targetedSectors.map((sector, index) => (
                                  <Badge key={index} variant="outline">
                                    {sector}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="text-xs font-medium text-muted-foreground mt-3 mb-1">First Observed</div>
                              <div className="text-sm">{group.firstObserved}</div>
                              
                              <div className="text-xs font-medium text-muted-foreground mt-3 mb-1">Activity Status</div>
                              <Badge variant={group.isActive ? "default" : "secondary"}>
                                {group.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </div>
                          
                          {group.associatedMalware && group.associatedMalware.length > 0 && (
                            <div className="mt-3">
                              <div className="text-xs font-medium text-muted-foreground mb-1">Associated Malware</div>
                              <div className="flex flex-wrap gap-1">
                                {group.associatedMalware.map((malware, index) => (
                                  <Badge key={index} variant="outline" className="bg-destructive/10">
                                    {malware}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">View Full Profile</Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No APT groups found matching your search criteria.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default APTGroupDirectory;
