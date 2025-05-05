
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Plus, RefreshCw, AlertTriangle, BrainCircuit, Trash2, PencilLine } from 'lucide-react';

import { DNSCacheConfig } from '../types';

const CachingTab: React.FC = () => {
  // Mock data for DNS cache configuration
  const [cacheConfigs, setCacheConfigs] = useState<DNSCacheConfig[]>([
    { id: 1, domain: "*.internal.avaron-vertex.com", ttl: 3600, recommended_ttl: 7200, negativeCache: true, status: 'active' },
    { id: 2, domain: "api.avaron-vertex.com", ttl: 300, recommended_ttl: 300, negativeCache: false, status: 'active' },
    { id: 3, domain: "static.avaron-vertex.com", ttl: 86400, recommended_ttl: 86400, negativeCache: false, status: 'active' },
    { id: 4, domain: "*.client.avaron-vertex.com", ttl: 1800, recommended_ttl: 3600, negativeCache: true, status: 'inactive' },
  ]);

  const [globalCacheTTL, setGlobalCacheTTL] = useState(3600);
  const [negativeCacheTTL, setNegativeCacheTTL] = useState(300);

  const formatTTL = (seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    return `${Math.floor(seconds / 86400)} days`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">DNS Cache Configuration</h3>
                <p className="text-sm text-muted-foreground">Configure TTL settings and caching behavior for optimal DNS performance</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Flush Cache</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Domain Rule</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Global Cache TTL</h4>
                  <p className="text-xs text-muted-foreground">Default TTL for cached DNS records ({formatTTL(globalCacheTTL)})</p>
                  <div className="pt-2">
                    <Slider
                      value={[globalCacheTTL]}
                      min={60}
                      max={86400}
                      step={60}
                      onValueChange={values => setGlobalCacheTTL(values[0])}
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>1 min</span>
                      <span>1 hour</span>
                      <span>1 day</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Negative Cache TTL</h4>
                  <p className="text-xs text-muted-foreground">Cache time for negative responses ({formatTTL(negativeCacheTTL)})</p>
                  <div className="pt-2">
                    <Slider
                      value={[negativeCacheTTL]}
                      min={0}
                      max={3600}
                      step={60}
                      onValueChange={values => setNegativeCacheTTL(values[0])}
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>Disabled</span>
                      <span>30 min</span>
                      <span>1 hour</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Cache Prefetching</h4>
                      <p className="text-xs text-muted-foreground">Proactively refresh frequently used DNS records</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Cache Poisoning Protection</h4>
                      <p className="text-xs text-muted-foreground">Actively monitor and prevent DNS cache poisoning</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-medium">AI Cache Recommendations</h4>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-0.5">Increase TTL for static.avaron-vertex.com</p>
                      <p className="text-muted-foreground">Static content rarely changes. Consider increasing TTL to 7 days for better performance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-0.5">High DNS Query Rate for api.example.com</p>
                      <p className="text-muted-foreground">Frequent queries detected. Consider adding a specific caching rule.</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    Apply AI Recommendations
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Domain-Specific Cache Rules</h3>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain Pattern</TableHead>
                    <TableHead>TTL</TableHead>
                    <TableHead>Recommended</TableHead>
                    <TableHead>Negative Cache</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cacheConfigs.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell className="font-medium">{config.domain}</TableCell>
                      <TableCell>{formatTTL(config.ttl)}</TableCell>
                      <TableCell>
                        {config.recommended_ttl && config.recommended_ttl !== config.ttl ? (
                          <Badge variant="outline" className="text-amber-500 border-amber-500">
                            {formatTTL(config.recommended_ttl)}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-500 border-green-500">
                            Optimal
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch checked={config.negativeCache} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={config.status === 'active'} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <PencilLine className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CachingTab;
