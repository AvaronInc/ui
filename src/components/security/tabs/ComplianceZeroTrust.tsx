
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileCheck, Fingerprint, UserCheck, Shield, RefreshCw, FileText, Download } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ComplianceAuditTable from '../components/ComplianceAuditTable';
import ZeroTrustStatusChart from '../components/ZeroTrustStatusChart';

const ComplianceZeroTrust: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState('compliance');
  
  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your compliance report is being generated and will be available shortly.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Compliance & Zero-Trust Security</h2>
          <p className="text-muted-foreground">
            Regulatory enforcement and identity-based security
          </p>
        </div>
        <Button size="sm" onClick={handleGenerateReport}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Compliance Report
        </Button>
      </div>
      
      <Tabs defaultValue="compliance" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>{isMobile ? "Compliance" : "Compliance & Audit"}</span>
          </TabsTrigger>
          <TabsTrigger value="zero-trust" className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4" />
            <span>{isMobile ? "Zero-Trust" : "Zero-Trust Security"}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="compliance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status Overview</CardTitle>
                <CardDescription>
                  Regulatory frameworks and compliance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {['SOC 2', 'ISO 27001', 'NIST 800-53', 'HIPAA', 'GDPR'].map((framework, index) => (
                    <Card key={index} className="p-4">
                      <div className="font-medium text-sm mb-2">{framework}</div>
                      <div className="w-full flex items-center gap-2">
                        <Progress value={75 + index * 5} className="flex-1" />
                        <span className="text-sm font-medium">{75 + index * 5}%</span>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="border rounded-lg">
                  <ComplianceAuditTable />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run Compliance Audit
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Audit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configuration & Policy Enforcement</CardTitle>
                <CardDescription>
                  Monitor configuration drift and security policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="password-policy">Password Policy Enforcement</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce complex passwords and regular rotation
                      </p>
                    </div>
                    <Switch id="password-policy" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="firewall-policy">Firewall Rules Enforcement</Label>
                      <p className="text-sm text-muted-foreground">
                        Prevent configuration drift in firewall rules
                      </p>
                    </div>
                    <Switch id="firewall-policy" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="device-encryption">Full Device Encryption</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce disk encryption on all endpoints
                      </p>
                    </div>
                    <Switch id="device-encryption" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="patch-compliance">Security Patch Compliance</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce timely security patches on all systems
                      </p>
                    </div>
                    <Switch id="patch-compliance" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="zero-trust">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Zero-Trust Security Status</CardTitle>
                <CardDescription>
                  Identity-based network access verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ZeroTrustStatusChart />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5" />
                    Identity Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-identity">AI-Based Identity Verification</Label>
                    <Switch id="ai-identity" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="kyber-cert">Kyber Certificate Authentication</Label>
                    <Switch id="kyber-cert" defaultChecked />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="revalidate">Identity Revalidation Interval</Label>
                    <Select defaultValue="15">
                      <SelectTrigger id="revalidate">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every 60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Adaptive Access Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="risk-based-access">Risk-Based Access Control</Label>
                    <Switch id="risk-based-access" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contextual-access">Contextual Access Policies</Label>
                    <Switch id="contextual-access" defaultChecked />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="risk-threshold">Risk Score Threshold</Label>
                    <div className="flex gap-2 items-center">
                      <Input id="risk-threshold" type="range" min="0" max="100" defaultValue="75" className="w-full" />
                      <span className="text-sm font-medium w-8">75</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Users with risk scores above threshold require additional verification
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceZeroTrust;
