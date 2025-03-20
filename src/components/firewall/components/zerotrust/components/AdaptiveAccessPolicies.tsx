
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Shield, AlertTriangle, Calendar, MapPin, RefreshCw } from 'lucide-react';

interface AdaptiveAccessPoliciesProps {
  disabled?: boolean;
}

const AdaptiveAccessPolicies = ({ disabled }: AdaptiveAccessPoliciesProps) => {
  const [aiAdaptiveEnabled, setAiAdaptiveEnabled] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState(65);
  const [realTimeAdaptation, setRealTimeAdaptation] = useState(true);
  const [geofencingEnabled, setGeofencingEnabled] = useState(true);
  const [timeBasedRestrictions, setTimeBasedRestrictions] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Adaptive Access Policies
          </CardTitle>
          <CardDescription>
            Configure rules that dynamically adjust based on real-time risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ai-adaptive" className="font-medium">AI-Driven Adaptive Policies</Label>
                <p className="text-sm text-muted-foreground">Automatically adjust access rights based on risk score</p>
              </div>
              <Switch 
                id="ai-adaptive" 
                checked={aiAdaptiveEnabled} 
                onCheckedChange={setAiAdaptiveEnabled}
                disabled={disabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">Risk Threshold for Enhanced Verification</Label>
              <div className="flex items-center gap-4">
                <Slider 
                  min={0} 
                  max={100} 
                  step={5} 
                  value={[riskThreshold]} 
                  onValueChange={(value) => setRiskThreshold(value[0])}
                  disabled={disabled || !aiAdaptiveEnabled}
                  className="flex-1" 
                />
                <span className="w-12 text-center font-medium">{riskThreshold}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Users with risk scores above this threshold will require additional verification
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="real-time" className="font-medium">Real-Time Policy Adaptation</Label>
                <p className="text-sm text-muted-foreground">Update access rights immediately when risk level changes</p>
              </div>
              <Switch 
                id="real-time" 
                checked={realTimeAdaptation} 
                onCheckedChange={setRealTimeAdaptation}
                disabled={disabled || !aiAdaptiveEnabled}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  Location-Based Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="geofencing" className="font-medium">Geofencing Restrictions</Label>
                  <Switch 
                    id="geofencing" 
                    checked={geofencingEnabled} 
                    onCheckedChange={setGeofencingEnabled}
                    disabled={disabled}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Allowed Regions</Label>
                  <Select defaultValue="usa" disabled={disabled || !geofencingEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="can">Canada</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="aus">Australia</SelectItem>
                      <SelectItem value="custom">Custom Regions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Unusual Location Response</Label>
                    <Badge>Moderate</Badge>
                  </div>
                  <Select defaultValue="mfa" disabled={disabled || !geofencingEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="block">Block Access</SelectItem>
                      <SelectItem value="mfa">Require Additional MFA</SelectItem>
                      <SelectItem value="limit">Limit Accessible Resources</SelectItem>
                      <SelectItem value="alert">Allow but Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Time-Based Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-restrictions" className="font-medium">Time-Based Restrictions</Label>
                  <Switch 
                    id="time-restrictions" 
                    checked={timeBasedRestrictions} 
                    onCheckedChange={setTimeBasedRestrictions}
                    disabled={disabled}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Working Hours</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      type="time" 
                      defaultValue="08:00" 
                      disabled={disabled || !timeBasedRestrictions}
                    />
                    <Input 
                      type="time" 
                      defaultValue="18:00" 
                      disabled={disabled || !timeBasedRestrictions}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Weekend Access</Label>
                  <Select defaultValue="limited" disabled={disabled || !timeBasedRestrictions}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Access</SelectItem>
                      <SelectItem value="limited">Limited Access</SelectItem>
                      <SelectItem value="mfa">Require Additional MFA</SelectItem>
                      <SelectItem value="approval">Require Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-4">Risk-Based Access Controls</h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-lg bg-red-50 dark:bg-red-900/10">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">High Risk (75-100%)</h5>
                  <p className="text-sm text-muted-foreground">Block access or require management approval</p>
                </div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Strict</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg bg-amber-50 dark:bg-amber-900/10">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">Medium Risk (40-74%)</h5>
                  <p className="text-sm text-muted-foreground">Require MFA and limit access to sensitive data</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Moderate</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/10">
                <Shield className="h-5 w-5 text-green-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">Low Risk (0-39%)</h5>
                  <p className="text-sm text-muted-foreground">Standard authentication with normal access</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Standard</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveAccessPolicies;
