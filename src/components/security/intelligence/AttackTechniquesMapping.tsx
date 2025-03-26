
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, Workflow, ShieldAlert, Target, ArrowUpRight } from 'lucide-react';
import { useMitreData } from './hooks/useMitreData';

const AttackTechniquesMapping = () => {
  const { techniques, tactics, aptMappings } = useMitreData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTactic, setActiveTactic] = useState<string | null>(null);
  
  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = !searchTerm || 
      technique.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technique.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTactic = !activeTactic || technique.tactics.includes(activeTactic);
    
    return matchesSearch && matchesTactic;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search techniques by ID, name, or description..."
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
              setActiveTactic(null);
            }}
          >
            <Filter className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">MITRE ATT&CK Tactics</div>
              <ScrollArea className="h-[300px] pr-3">
                <div className="space-y-1">
                  {tactics.map(tactic => (
                    <Button
                      key={tactic.id}
                      variant={activeTactic === tactic.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTactic(activeTactic === tactic.id ? null : tactic.id)}
                    >
                      <div className="mr-2 flex items-center justify-center w-6">
                        {tactic.icon}
                      </div>
                      <div className="text-xs font-medium">{tactic.name}</div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Statistics</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Total Techniques</span>
                  <span>{techniques.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Total Tactics</span>
                  <span>{tactics.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>APT Mappings</span>
                  <span>{aptMappings.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-9">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">
                  Techniques {activeTactic ? `for ${tactics.find(t => t.id === activeTactic)?.name}` : ''} ({filteredTechniques.length})
                </div>
                {activeTactic && (
                  <Badge variant="outline" className="bg-primary/10">
                    {tactics.find(t => t.id === activeTactic)?.name}
                  </Badge>
                )}
              </div>
              
              <ScrollArea className="h-[500px] pr-3">
                <div className="space-y-3">
                  {filteredTechniques.length > 0 ? (
                    filteredTechniques.map(technique => {
                      const relatedApts = aptMappings
                        .filter(mapping => mapping.techniqueIds.includes(technique.id))
                        .map(mapping => mapping.aptName);
                      
                      return (
                        <Card key={technique.id} className="border border-accent">
                          <CardContent className="p-3">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="font-mono bg-secondary/10">
                                    {technique.id}
                                  </Badge>
                                  <div className="text-sm font-medium">{technique.name}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">{technique.description}</div>
                                
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {technique.tactics.map(tacticId => {
                                    const tactic = tactics.find(t => t.id === tacticId);
                                    return tactic ? (
                                      <Badge 
                                        key={tacticId} 
                                        variant="outline" 
                                        className="flex items-center gap-1 bg-primary/5"
                                      >
                                        {tactic.icon}
                                        <span className="text-xs">{tactic.name}</span>
                                      </Badge>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                              
                              <div className="md:min-w-[200px]">
                                <div className="text-xs font-medium text-muted-foreground mb-1">Associated APTs</div>
                                {relatedApts.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {relatedApts.slice(0, 3).map((apt, index) => (
                                      <Badge key={index} variant="outline" className="bg-destructive/10">
                                        {apt}
                                      </Badge>
                                    ))}
                                    {relatedApts.length > 3 && (
                                      <Badge variant="outline" className="bg-muted">
                                        +{relatedApts.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-xs text-muted-foreground italic">No associated APTs</div>
                                )}
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="mt-2 w-full text-xs flex items-center gap-1 justify-center"
                                >
                                  <span>View Details</span>
                                  <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No techniques found matching your search criteria.
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

export default AttackTechniquesMapping;
