
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, AlertTriangle, ArrowRight, CheckCircle2, DiffIcon, FileText, FolderDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const mockVersions = [
  { id: 'v1.0.14', date: '2023-11-15T08:00:00', label: 'v1.0.14 (Current)' },
  { id: 'v1.0.13', date: '2023-11-14T08:00:00', label: 'v1.0.13' },
  { id: 'v1.0.12', date: '2023-11-13T08:00:00', label: 'v1.0.12' },
  { id: 'v1.0.11', date: '2023-11-12T08:00:00', label: 'v1.0.11' },
  { id: 'v1.0.10', date: '2023-11-11T08:00:00', label: 'v1.0.10' },
  { id: 'v1.0.9', date: '2023-11-10T08:00:00', label: 'v1.0.9' },
];

const mockDiffData = {
  network: {
    changes: 2,
    severity: 'high',
    items: [
      { path: '/etc/network/interfaces', type: 'modified', severity: 'high' },
      { path: '/etc/resolv.conf', type: 'modified', severity: 'medium' },
    ]
  },
  identityRbac: {
    changes: 1,
    severity: 'medium',
    items: [
      { path: '/etc/ldap/ldap.conf', type: 'modified', severity: 'medium' },
    ]
  },
  firewall: {
    changes: 3,
    severity: 'high',
    items: [
      { path: '/etc/firewall/rules.d/01-base.conf', type: 'modified', severity: 'high' },
      { path: '/etc/firewall/policies.d/sdwan.conf', type: 'added', severity: 'high' },
      { path: '/etc/firewall/zones.d/internal.conf', type: 'modified', severity: 'medium' },
    ]
  },
  integration: {
    changes: 0,
    severity: 'none',
    items: []
  },
  storage: {
    changes: 1,
    severity: 'low',
    items: [
      { path: '/etc/fstab', type: 'modified', severity: 'low' },
    ]
  },
  compliance: {
    changes: 0,
    severity: 'none',
    items: []
  },
  custom: {
    changes: 2,
    severity: 'medium',
    items: [
      { path: '/etc/wazuh/wazuh.conf', type: 'modified', severity: 'medium' },
      { path: '/etc/arkime/config.ini', type: 'modified', severity: 'medium' },
    ]
  }
};

const VersionDiffSection: React.FC = () => {
  const [selectedVersion1, setSelectedVersion1] = useState('v1.0.14');
  const [selectedVersion2, setSelectedVersion2] = useState('v1.0.13');
  const [activeTab, setActiveTab] = useState('network');
  const [isRestoring, setIsRestoring] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    network: true,
    firewall: true
  });

  const handleCompare = () => {
    // Mock API call for comparison would happen here
    toast.success(`Comparing ${selectedVersion1} with ${selectedVersion2}`);
  };

  const handleRestore = () => {
    setIsRestoring(true);
    // Mock restore API call
    setTimeout(() => {
      toast.success(`Restored system to version ${selectedVersion2}`);
      setIsRestoring(false);
    }, 2000);
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-100';
      case 'medium':
        return 'text-orange-500 bg-orange-100';
      case 'low':
        return 'text-yellow-500 bg-yellow-100';
      default:
        return 'text-green-500 bg-green-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'modified':
        return <RefreshCw className="h-4 w-4 text-orange-500" />;
      case 'deleted':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <DiffIcon className="h-5 w-5 text-primary" />
            Version Comparison & Restore
          </CardTitle>
          <CardDescription>
            Compare configuration versions and restore previous settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="col-span-2">
              <Select value={selectedVersion1} onValueChange={setSelectedVersion1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {mockVersions.map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.label} ({formatDate(version.date)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            
            <div className="col-span-2">
              <Select value={selectedVersion2} onValueChange={setSelectedVersion2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {mockVersions.map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.label} ({formatDate(version.date)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleCompare}>
              Compare Versions
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start border-b rounded-none bg-card">
                <TabsTrigger value="network" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Network
                  {mockDiffData.network.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.network.severity)}`}>
                      {mockDiffData.network.changes}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="identityRbac" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Identity & RBAC
                  {mockDiffData.identityRbac.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.identityRbac.severity)}`}>
                      {mockDiffData.identityRbac.changes}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="firewall" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Firewall & Security
                  {mockDiffData.firewall.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.firewall.severity)}`}>
                      {mockDiffData.firewall.changes}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="integration" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Integrations
                  {mockDiffData.integration.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.integration.severity)}`}>
                      {mockDiffData.integration.changes}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="storage" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Storage
                  {mockDiffData.storage.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.storage.severity)}`}>
                      {mockDiffData.storage.changes}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Compliance
                  {mockDiffData.compliance.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.compliance.severity)}`}>
                      {mockDiffData.compliance.changes}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="custom" className="flex items-center gap-1 data-[state=active]:bg-muted">
                  Custom Settings
                  {mockDiffData.custom.changes > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${getSeverityColor(mockDiffData.custom.severity)}`}>
                      {mockDiffData.custom.changes}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(mockDiffData).map(([key, data]) => (
                <TabsContent key={key} value={key} className="p-0 m-0">
                  <div className="p-4">
                    {data.changes === 0 ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="text-center text-muted-foreground">
                          <CheckCircle2 className="mx-auto h-10 w-10 text-green-500 mb-2" />
                          <p>No changes detected in this section</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {data.items.map((item, idx) => (
                          <Collapsible
                            key={idx}
                            open={openCategories[item.path] || false}
                            onOpenChange={() => toggleCategory(item.path)}
                            className="border rounded-md"
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 flex-shrink-0" />
                                <span className="font-medium text-sm">{item.path}</span>
                                <span className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${getSeverityColor(item.severity)}`}>
                                  {item.severity}
                                </span>
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded-full">
                                  {getTypeIcon(item.type)}
                                  <span className="text-xs">{item.type}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                View Changes
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="p-3 border-t bg-muted/20">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="p-2 border rounded-md bg-muted/30">
                                    <div className="font-mono text-xs whitespace-pre overflow-auto h-40 p-2">
                                      {/* Mock code diff - in real app this would be proper syntax highlighted diff */}
                                      <div className="text-red-500">- Previous configuration</div>
                                      <div className="text-green-500">+ New configuration</div>
                                      {item.path.includes('firewall') && (
                                        <>
                                          <div className="text-red-500">- port 22 allow 10.0.0.0/8</div>
                                          <div className="text-green-500">+ port 22 allow 10.0.0.0/16</div>
                                          <div className="text-green-500">+ port 443 allow 10.0.0.0/16</div>
                                        </>
                                      )}
                                      {item.path.includes('network') && (
                                        <>
                                          <div className="text-red-500">- gateway 192.168.1.1</div>
                                          <div className="text-green-500">+ gateway 192.168.1.254</div>
                                        </>
                                      )}
                                      {item.path.includes('wazuh') && (
                                        <>
                                          <div className="text-red-500">- &lt;server-address&gt;old.wazuh.com&lt;/server-address&gt;</div>
                                          <div className="text-green-500">+ &lt;server-address&gt;new.wazuh.com&lt;/server-address&gt;</div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-2 border rounded-md">
                                    <h4 className="font-medium mb-2">Change Impact Analysis</h4>
                                    {item.severity === 'high' && (
                                      <div className="flex items-start gap-2 p-2 bg-red-50 rounded-md mb-2">
                                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                          <p className="text-red-800 text-xs font-medium">High Impact Change</p>
                                          <p className="text-xs text-red-700">This change may affect system connectivity or security.</p>
                                        </div>
                                      </div>
                                    )}
                                    <div className="space-y-2 text-xs">
                                      <div>
                                        <span className="font-medium">Affected Components:</span>
                                        <ul className="list-disc list-inside pl-2">
                                          {item.path.includes('firewall') && (
                                            <>
                                              <li>Firewall Rules</li>
                                              <li>SSH Access</li>
                                              <li>HTTPS Access</li>
                                            </>
                                          )}
                                          {item.path.includes('network') && (
                                            <>
                                              <li>Internet Connectivity</li>
                                              <li>Routing</li>
                                            </>
                                          )}
                                          {item.path.includes('wazuh') && (
                                            <>
                                              <li>Security Monitoring</li>
                                              <li>Compliance Reports</li>
                                            </>
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" disabled={selectedVersion2 === selectedVersion1}>
            <FolderDown className="h-4 w-4 mr-2" />
            Download Diff Report
          </Button>
          <Button 
            onClick={handleRestore} 
            disabled={isRestoring || selectedVersion2 === selectedVersion1}
            variant="default"
          >
            {isRestoring ? "Restoring..." : "Restore to Selected Version"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VersionDiffSection;
