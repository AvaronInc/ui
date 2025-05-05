
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Fingerprint, 
  RefreshCw, 
  Lock, 
  Shield, 
  Key, 
  Save, 
  Layers, 
  Network, 
  Server, 
  FileText, 
  ArrowRightLeft, 
  Download 
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type EncryptionMethod = "standard" | "hybrid" | "kyber-only";
type TunnelInfo = {
  id: string;
  from: string;
  to: string;
  status: "active" | "inactive" | "degraded";
  throughput: number;
  handshakeLatency: number;
  encryptionMethod: EncryptionMethod;
  uptime: number;
};

const QuantumEncryptionPanel = () => {
  const [globalEncryptionMode, setGlobalEncryptionMode] = useState<EncryptionMethod>("hybrid");
  const [allowFallback, setAllowFallback] = useState(true);
  const [enforceSystemWide, setEnforceSystemWide] = useState(false);
  const [kyberVariant, setKyberVariant] = useState("kyber-768");
  const [keyRotationInterval, setKeyRotationInterval] = useState("24");
  const [lastKeyRotation, setLastKeyRotation] = useState<Date>(new Date());
  const [keyExchangeInProgress, setKeyExchangeInProgress] = useState(false);
  const [tunnelList, setTunnelList] = useState<TunnelInfo[]>(generateTunnels());
  const [simulationMode, setSimulationMode] = useState(false);
  const [autoRemediation, setAutoRemediation] = useState(true);
  const [configSaved, setConfigSaved] = useState(false);
  
  function generateTunnels(): TunnelInfo[] {
    const results: TunnelInfo[] = [];
    const locations = ["NYC-Vertex", "LA-Vertex", "CHI-Vertex", "ATL-Vertex", "SFO-Vertex", "MIA-Vertex", "DFW-Vertex", "SEA-Vertex"];
    const encryptionMethods: EncryptionMethod[] = ["standard", "hybrid", "kyber-only"];
    
    for (let i = 0; i < 10; i++) {
      const fromIndex = Math.floor(Math.random() * locations.length);
      let toIndex = Math.floor(Math.random() * locations.length);
      while (fromIndex === toIndex) {
        toIndex = Math.floor(Math.random() * locations.length);
      }
      
      results.push({
        id: `tunnel-${i}`,
        from: locations[fromIndex],
        to: locations[toIndex],
        status: Math.random() > 0.8 ? "degraded" : (Math.random() > 0.1 ? "active" : "inactive"),
        throughput: Math.floor(Math.random() * 900) + 100, // 100-1000 Mbps
        handshakeLatency: Math.floor(Math.random() * 80) + 20, // 20-100ms
        encryptionMethod: encryptionMethods[Math.floor(Math.random() * encryptionMethods.length)],
        uptime: Math.floor(Math.random() * 30 * 24 * 60 * 60) // 0-30 days in seconds
      });
    }
    
    return results;
  }
  
  const handleRefreshTunnels = () => {
    setTunnelList(generateTunnels());
  };
  
  const handleForceKeyRotation = () => {
    setKeyExchangeInProgress(true);
    setTimeout(() => {
      setKeyExchangeInProgress(false);
      setLastKeyRotation(new Date());
    }, 3000);
  };
  
  const handleSaveConfiguration = () => {
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };
  
  const getEncryptionBadgeColor = (method: EncryptionMethod) => {
    switch (method) {
      case "kyber-only": return "bg-green-500";
      case "hybrid": return "bg-blue-500";
      case "standard": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };
  
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };
  
  // Count tunnels by encryption method
  const kyberOnlyCount = tunnelList.filter(t => t.encryptionMethod === "kyber-only").length;
  const hybridCount = tunnelList.filter(t => t.encryptionMethod === "hybrid").length;
  const standardCount = tunnelList.filter(t => t.encryptionMethod === "standard").length;
  const totalTunnels = tunnelList.length;
  
  // Calculate average handshake times
  const avgKyberLatency = tunnelList.filter(t => t.encryptionMethod === "kyber-only").reduce((sum, t) => sum + t.handshakeLatency, 0) / (kyberOnlyCount || 1);
  const avgHybridLatency = tunnelList.filter(t => t.encryptionMethod === "hybrid").reduce((sum, t) => sum + t.handshakeLatency, 0) / (hybridCount || 1);
  const avgStandardLatency = tunnelList.filter(t => t.encryptionMethod === "standard").reduce((sum, t) => sum + t.handshakeLatency, 0) / (standardCount || 1);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Global Configuration</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics & Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Encryption Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Global Mode:</span>
                    <Badge className={`${getEncryptionBadgeColor(globalEncryptionMode)}`}>
                      {globalEncryptionMode === "kyber-only" ? "Quantum-Safe" : 
                       globalEncryptionMode === "hybrid" ? "Hybrid Protection" : "Standard"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Key Rotation:</span>
                    <span className="text-sm">{lastKeyRotation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Key Algorithm:</span>
                    <span className="text-sm font-mono">{kyberVariant}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">FIPS 140-3:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Compliant
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">NIST PQC:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Compliant
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EU Quantum Act:</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Tunnel Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-green-600">Kyber-Only</span>
                      <span>{kyberOnlyCount}/{totalTunnels} ({Math.round(kyberOnlyCount/totalTunnels*100)}%)</span>
                    </div>
                    <Progress value={kyberOnlyCount/totalTunnels*100} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-blue-600">Hybrid Mode</span>
                      <span>{hybridCount}/{totalTunnels} ({Math.round(hybridCount/totalTunnels*100)}%)</span>
                    </div>
                    <Progress value={hybridCount/totalTunnels*100} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-orange-600">Standard X25519</span>
                      <span>{standardCount}/{totalTunnels} ({Math.round(standardCount/totalTunnels*100)}%)</span>
                    </div>
                    <Progress value={standardCount/totalTunnels*100} className="h-2 bg-muted" indicatorClassName="bg-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Encryption Status Overview</CardTitle>
              <Button variant="outline" size="sm" onClick={handleRefreshTunnels}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-2 font-medium text-sm">Tunnel</th>
                        <th className="text-left p-2 font-medium text-sm">Status</th>
                        <th className="text-left p-2 font-medium text-sm">Encryption</th>
                        <th className="text-left p-2 font-medium text-sm">Throughput</th>
                        <th className="text-left p-2 font-medium text-sm">Handshake</th>
                        <th className="text-left p-2 font-medium text-sm">Uptime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tunnelList.map(tunnel => (
                        <tr key={tunnel.id} className="border-t">
                          <td className="p-2 text-sm">
                            {tunnel.from} ↔ {tunnel.to}
                          </td>
                          <td className="p-2">
                            <Badge 
                              variant="outline" 
                              className={
                                tunnel.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                                tunnel.status === "degraded" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {tunnel.status.charAt(0).toUpperCase() + tunnel.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Badge className={getEncryptionBadgeColor(tunnel.encryptionMethod)}>
                              <Lock className="h-3 w-3 mr-1" />
                              {tunnel.encryptionMethod === "kyber-only" ? "Kyber-Only" :
                               tunnel.encryptionMethod === "hybrid" ? "Hybrid" : "Standard"}
                            </Badge>
                          </td>
                          <td className="p-2 text-sm">{tunnel.throughput} Mbps</td>
                          <td className="p-2 text-sm">{tunnel.handshakeLatency} ms</td>
                          <td className="p-2 text-sm">{formatUptime(tunnel.uptime)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Kyber-Only</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Hybrid</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">Standard</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {tunnelList.length} tunnels total • Last updated: {new Date().toLocaleTimeString()}
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Performance Comparison</CardTitle>
              <CardDescription>Encryption method impact on handshake time and throughput</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Kyber-Only (Quantum-Safe)</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg. Handshake Time:</span>
                      <span className="font-mono">{Math.round(avgKyberLatency)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PQ Safety:</span>
                      <span className="text-green-600 font-medium">Very High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CPU Utilization:</span>
                      <span className="text-orange-600 font-medium">Higher</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tunnel Count:</span>
                      <span>{kyberOnlyCount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Hybrid (Kyber + X25519)</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg. Handshake Time:</span>
                      <span className="font-mono">{Math.round(avgHybridLatency)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PQ Safety:</span>
                      <span className="text-blue-600 font-medium">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CPU Utilization:</span>
                      <span className="text-yellow-600 font-medium">Medium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tunnel Count:</span>
                      <span>{hybridCount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">Standard (X25519)</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg. Handshake Time:</span>
                      <span className="font-mono">{Math.round(avgStandardLatency)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PQ Safety:</span>
                      <span className="text-red-600 font-medium">None</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CPU Utilization:</span>
                      <span className="text-green-600 font-medium">Low</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tunnel Count:</span>
                      <span>{standardCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <Alert variant="default" className="bg-amber-50 border-amber-200">
                <Fingerprint className="h-4 w-4 text-amber-700" />
                <AlertTitle className="text-amber-700">Quantum Attack Risk Assessment</AlertTitle>
                <AlertDescription className="text-amber-700 text-sm">
                  Based on current quantum computing advancements, X25519-only tunnels may be vulnerable 
                  within the next 5-10 years. Consider upgrading all tunnels to at least Hybrid mode.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Encryption Settings</CardTitle>
              <CardDescription>
                Configure system-wide post-quantum cryptography settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="encryption-mode">Default Encryption Mode</Label>
                  <Select 
                    value={globalEncryptionMode} 
                    onValueChange={(value) => setGlobalEncryptionMode(value as EncryptionMethod)}
                  >
                    <SelectTrigger id="encryption-mode" className="w-full">
                      <SelectValue placeholder="Select encryption mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kyber-only">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-green-500" />
                          <span>Kyber-Only (Quantum-Safe)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hybrid">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Hybrid Mode (Kyber + X25519)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="standard">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-orange-500" />
                          <span>Standard (X25519)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {globalEncryptionMode === "kyber-only" 
                      ? "Maximum quantum resistance, may impact performance on older hardware."
                      : globalEncryptionMode === "hybrid" 
                        ? "Balanced approach with both quantum-resistant and traditional encryption."
                        : "Traditional encryption only. No quantum resistance."}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="allow-fallback" 
                    checked={allowFallback}
                    onCheckedChange={(checked) => setAllowFallback(checked === true)}
                  />
                  <Label htmlFor="allow-fallback">
                    Allow fallback to less secure encryption when required
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enforce-system" 
                    checked={enforceSystemWide}
                    onCheckedChange={(checked) => setEnforceSystemWide(checked === true)}
                  />
                  <Label htmlFor="enforce-system">
                    Enforce system-wide (overrides individual service settings)
                  </Label>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="kyber-variant">Kyber Variant</Label>
                  <Select 
                    value={kyberVariant} 
                    onValueChange={setKyberVariant}
                  >
                    <SelectTrigger id="kyber-variant">
                      <SelectValue placeholder="Select Kyber variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kyber-512">Kyber-512 (Level 1 Security)</SelectItem>
                      <SelectItem value="kyber-768">Kyber-768 (Level 3 Security - Recommended)</SelectItem>
                      <SelectItem value="kyber-1024">Kyber-1024 (Level 5 Security - Maximum)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Higher security levels provide stronger protection but require more computational resources.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="key-rotation">Key Rotation Interval (hours)</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="number"
                      id="key-rotation"
                      value={keyRotationInterval}
                      onChange={(e) => setKeyRotationInterval(e.target.value)}
                      min="1"
                      max="168"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleForceKeyRotation}
                      disabled={keyExchangeInProgress}
                    >
                      {keyExchangeInProgress ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Rotate Now
                    </Button>
                  </div>
                  {keyExchangeInProgress && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Key exchange in progress...</span>
                      <Progress value={40} className="w-20 h-2" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button onClick={handleSaveConfiguration}>Save Configuration</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apply Encryption Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will update encryption settings system-wide. Some connections may be temporarily reset during key exchange.
                      {globalEncryptionMode === "kyber-only" && (
                        <Alert className="mt-4 bg-green-50 border-green-200">
                          <Shield className="h-4 w-4 text-green-700" />
                          <AlertTitle className="text-green-700">Full Quantum Protection Enabled</AlertTitle>
                          <AlertDescription className="text-green-700 text-sm">
                            You are enabling maximum quantum-resistant protection using Kyber-only mode.
                          </AlertDescription>
                        </Alert>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Apply Changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service-Specific Settings</CardTitle>
                <CardDescription>
                  Configure encryption for specific services and components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Network className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sdwan-encryption">SD-WAN Tunnels</Label>
                    </div>
                    <Select defaultValue="inherit">
                      <SelectTrigger id="sdwan-encryption" className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inherit">Inherit Global Setting</SelectItem>
                        <SelectItem value="kyber-only">Force Kyber-Only</SelectItem>
                        <SelectItem value="hybrid">Force Hybrid Mode</SelectItem>
                        <SelectItem value="standard">Force Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="vpn-encryption">VPN Remote Access</Label>
                    </div>
                    <Select defaultValue="inherit">
                      <SelectTrigger id="vpn-encryption" className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inherit">Inherit Global Setting</SelectItem>
                        <SelectItem value="kyber-only">Force Kyber-Only</SelectItem>
                        <SelectItem value="hybrid">Force Hybrid Mode</SelectItem>
                        <SelectItem value="standard">Force Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="api-encryption">API Gateways</Label>
                    </div>
                    <Select defaultValue="inherit">
                      <SelectTrigger id="api-encryption" className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inherit">Inherit Global Setting</SelectItem>
                        <SelectItem value="kyber-only">Force Kyber-Only</SelectItem>
                        <SelectItem value="hybrid">Force Hybrid Mode</SelectItem>
                        <SelectItem value="standard">Force Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="storage-encryption">Storage Encryption</Label>
                    </div>
                    <Select defaultValue="inherit">
                      <SelectTrigger id="storage-encryption" className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inherit">Inherit Global Setting</SelectItem>
                        <SelectItem value="kyber-only">Force Kyber-Only</SelectItem>
                        <SelectItem value="hybrid">Force Hybrid Mode</SelectItem>
                        <SelectItem value="standard">Force Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Export Controls</CardTitle>
                <CardDescription>
                  Configure settings for compliance with regulatory requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="fips-mode">FIPS 140-3 Mode</Label>
                    </div>
                    <Switch id="fips-mode" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="nist-compliance">NIST PQC Compliance</Label>
                    </div>
                    <Switch id="nist-compliance" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="export-restrictions">Export Restrictions</Label>
                    </div>
                    <Switch id="export-restrictions" />
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="key-escrow">Key Escrow Method</Label>
                    <Select defaultValue="split-knowledge">
                      <SelectTrigger id="key-escrow">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (No Escrow)</SelectItem>
                        <SelectItem value="split-knowledge">Split Knowledge</SelectItem>
                        <SelectItem value="m-of-n">M-of-N Threshold</SelectItem>
                        <SelectItem value="tpm-backed">TPM-Backed Escrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Compliance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="diagnostics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quantum Resistance Testing</CardTitle>
              <CardDescription>
                Evaluate the system's resistance to quantum computing attacks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="simulation-mode" 
                  checked={simulationMode}
                  onCheckedChange={(checked) => setSimulationMode(checked === true)}
                />
                <Label htmlFor="simulation-mode">
                  Enable Simulation Mode (Safe testing environment)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="auto-remediation" 
                  checked={autoRemediation}
                  onCheckedChange={(checked) => setAutoRemediation(checked === true)}
                />
                <Label htmlFor="auto-remediation">
                  Auto-remediate vulnerabilities
                </Label>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Available Tests</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <Button variant="outline" className="justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Shor's Algorithm Simulation
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Grover's Algorithm Test
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Key Exchange Robustness
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Harvest Now / Decrypt Later
                  </Button>
                </div>
              </div>
              
              <Alert>
                <AlertTitle>Test in Safe Environment</AlertTitle>
                <AlertDescription>
                  Tests will be performed in an isolated environment and will not affect production systems when simulation mode is enabled.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">
                Run Comprehensive Quantum Resistance Assessment
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Encryption Performance Analysis</CardTitle>
              <CardDescription>
                Benchmark different encryption methods on your hardware
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Kyber-Only</h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Handshake Time:</span>
                        <span className="font-mono">48 ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Key Gen Time:</span>
                        <span className="font-mono">12 ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>CPU Load:</span>
                        <span className="font-mono">12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Max Throughput:</span>
                        <span className="font-mono">2.4 Gbps</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">Hybrid Mode</h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Handshake Time:</span>
                        <span className="font-mono">57 ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Key Gen Time:</span>
                        <span className="font-mono">18 ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>CPU Load:</span>
                        <span className="font-mono">16%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Max Throughput:</span>
                        <span className="font-mono">2.2 Gbps</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-orange-500" />
                      <h3 className="font-medium">Standard X25519</h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Handshake Time:</span>
                        <span className="font-mono">24 ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Key Gen Time:</span>
                        <span className="font-mono">6 ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>CPU Load:</span>
                        <span className="font-mono">8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Max Throughput:</span>
                        <span className="font-mono">2.8 Gbps</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Alert className="bg-blue-50 border-blue-200">
                    <Fingerprint className="h-4 w-4 text-blue-700" />
                    <AlertTitle className="text-blue-700">Hardware Acceleration Available</AlertTitle>
                    <AlertDescription className="text-blue-700 text-sm">
                      Your hardware supports Kyber acceleration via AES-NI extensions, enabling near-native performance for quantum-resistant encryption.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Benchmark
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {configSaved && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 rounded-md p-4 shadow-md">
          <div className="flex items-center text-green-800">
            <Save className="h-5 w-5 mr-2" />
            <span>Configuration saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumEncryptionPanel;
