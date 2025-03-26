
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, AlertTriangle, Clock, ArrowUpDown, Users, Target, Zap, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWazuhData } from './hooks/useWazuhData';

const WazuhIntegration = () => {
  const { alerts, aptGroups, mitreTactics } = useWazuhData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'newest' | 'severity'>('newest');
  const [selectedAPT, setSelectedAPT] = useState<string | null>(null);
  const [selectedTactic, setSelectedTactic] = useState<string | null>(null);
  
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !searchTerm || 
      alert.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAPT = !selectedAPT || alert.aptGroup === selectedAPT;
    const matchesTactic = !selectedTactic || alert.mitreTactics.includes(selectedTactic);
    
    return matchesSearch && matchesAPT && matchesTactic;
  });
  
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortCriteria === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else { // severity
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
  });
  
  const getSeverityBadge = (severity: 'critical' | 'high' | 'medium' | 'low') => {
    const classes = {
      critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    };
    
    return (
      <Badge variant="outline" className={classes[severity]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Wazuh alerts..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="h-10 px-3 flex items-center gap-1.5 shrink-0"
            onClick={() => setSortCriteria(sortCriteria === 'newest' ? 'severity' : 'newest')}
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort by {sortCriteria === 'newest' ? 'Severity' : 'Newest'}
          </Button>
          <Button 
            variant="outline" 
            className="h-10 px-3 flex items-center gap-1.5 shrink-0"
            onClick={() => {
              setSearchTerm('');
              setSelectedAPT(null);
              setSelectedTactic(null);
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
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Filter by APT Group</div>
                  <Select value={selectedAPT || ''} onValueChange={(value) => setSelectedAPT(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select APT Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All APT Groups</SelectItem>
                      {aptGroups.map(group => (
                        <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Filter by MITRE Tactic</div>
                  <Select value={selectedTactic || ''} onValueChange={(value) => setSelectedTactic(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select MITRE Tactic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Tactics</SelectItem>
                      {mitreTactics.map(tactic => (
                        <SelectItem key={tactic.id} value={tactic.id}>{tactic.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Alert Summary</div>
              <div className="space-y-3">
                <div>
                  {['critical', 'high', 'medium', 'low'].map((severity) => {
                    const count = alerts.filter(e => e.severity === severity).length;
                    const percentage = Math.round((count / alerts.length) * 100);
                    return (
                      <div key={severity} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="capitalize">{severity}</span>
                          <span>{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              severity === 'critical' ? 'bg-red-500' :
                              severity === 'high' ? 'bg-orange-500' :
                              severity === 'medium' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Connection Status</div>
              <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-md p-2 text-xs flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                Connected to Wazuh (v4.5.2)
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                Refresh Connection
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-9">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">
                  Wazuh Alerts ({sortedAlerts.length})
                </div>
                <div className="flex gap-2">
                  {selectedAPT && (
                    <Badge variant="outline" className="bg-primary/10 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {aptGroups.find(group => group.id === selectedAPT)?.name}
                    </Badge>
                  )}
                  {selectedTactic && (
                    <Badge variant="outline" className="bg-primary/10 flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {mitreTactics.find(tactic => tactic.id === selectedTactic)?.name}
                    </Badge>
                  )}
                </div>
              </div>
              
              <ScrollArea className="h-[500px] pr-3">
                <div className="space-y-3">
                  {sortedAlerts.length > 0 ? (
                    sortedAlerts.map(alert => (
                      <Card key={alert.id} className="border border-accent">
                        <CardContent className="p-3">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div className="lg:col-span-8">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                {getSeverityBadge(alert.severity)}
                                
                                <div className="text-xs flex items-center text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {new Date(alert.timestamp).toLocaleString()}
                                </div>
                              </div>
                              
                              <div className="text-sm font-medium mb-1.5">{alert.rule}</div>
                              <div className="text-xs text-muted-foreground mb-2.5">{alert.description}</div>
                              
                              <div className="flex flex-wrap gap-2">
                                {alert.mitreTactics.map((tacticId, index) => {
                                  const tactic = mitreTactics.find(t => t.id === tacticId);
                                  return tactic ? (
                                    <div key={index} className="text-xs bg-muted rounded-md px-2 py-1 flex items-center gap-1">
                                      <Target className="h-3 w-3" />
                                      <span>{tactic.name}</span>
                                    </div>
                                  ) : null;
                                })}
                                
                                {alert.aptGroup && (
                                  <div className="text-xs bg-destructive/10 text-destructive dark:text-destructive/90 rounded-md px-2 py-1 flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{aptGroups.find(group => group.id === alert.aptGroup)?.name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="lg:col-span-4">
                              <div>
                                <div className="text-xs font-medium text-muted-foreground mb-1">Source</div>
                                <div className="text-sm mb-3">
                                  {alert.source.ip} ({alert.source.hostname})
                                </div>
                                
                                <div className="text-xs font-medium text-muted-foreground mb-1">Action Taken</div>
                                <Badge 
                                  variant={alert.actionTaken === 'blocked' ? 'default' : 
                                    alert.actionTaken === 'quarantined' ? 'destructive' : 'outline'}
                                  className="capitalize mb-3"
                                >
                                  {alert.actionTaken}
                                </Badge>
                                
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="outline" className="text-xs flex items-center gap-1">
                                    <Shield className="h-3 w-3" />
                                    Block
                                  </Button>
                                  <Button size="sm" className="text-xs flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    Investigate
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No Wazuh alerts found matching your search criteria.
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

export default WazuhIntegration;
