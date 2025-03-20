
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RefreshCw, Activity, AlertTriangle, Shield, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ContinuousVerificationProps {
  disabled?: boolean;
}

const ContinuousVerification = ({ disabled }: ContinuousVerificationProps) => {
  const [continuousMonitoring, setContinuousMonitoring] = useState(true);
  const [behaviorBasedDetection, setBehaviorBasedDetection] = useState(true);
  const [autoRevokeEnabled, setAutoRevokeEnabled] = useState(true);
  const [reauthenticationInterval, setReauthenticationInterval] = useState(15);
  
  // Sample data for behavior monitoring chart
  const behaviorData = [
    { name: 'User Activity', normal: 85, suspicious: 12, anomalous: 3 },
    { name: 'Resource Access', normal: 92, suspicious: 7, anomalous: 1 },
    { name: 'Auth Patterns', normal: 78, suspicious: 18, anomalous: 4 },
    { name: 'Device Health', normal: 88, suspicious: 10, anomalous: 2 },
    { name: 'Login Times', normal: 95, suspicious: 4, anomalous: 1 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Continuous Trust Verification
          </CardTitle>
          <CardDescription>
            Configure AI-driven monitoring for continuous verification of user trust
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="continuous-monitoring" className="font-medium">Continuous Session Monitoring</Label>
                <p className="text-sm text-muted-foreground">
                  Continuously verify user identity and behavior during active sessions
                </p>
              </div>
              <Switch 
                id="continuous-monitoring" 
                checked={continuousMonitoring} 
                onCheckedChange={setContinuousMonitoring}
                disabled={disabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="behavior-detection" className="font-medium">AI Behavior-Based Detection</Label>
                <p className="text-sm text-muted-foreground">
                  Use machine learning to detect unusual user behavior patterns
                </p>
              </div>
              <Switch 
                id="behavior-detection" 
                checked={behaviorBasedDetection} 
                onCheckedChange={setBehaviorBasedDetection}
                disabled={disabled || !continuousMonitoring}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-4">Behavior Monitoring Analytics</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={behaviorData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="normal" stackId="a" fill="#22c55e" name="Normal" />
                  <Bar dataKey="suspicious" stackId="a" fill="#f59e0b" name="Suspicious" />
                  <Bar dataKey="anomalous" stackId="a" fill="#ef4444" name="Anomalous" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-4">Trust Verification Settings</h4>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="font-medium">Re-authentication Interval</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    min={5} 
                    max={60} 
                    step={5} 
                    value={[reauthenticationInterval]} 
                    onValueChange={(value) => setReauthenticationInterval(value[0])}
                    disabled={disabled || !continuousMonitoring}
                    className="flex-1" 
                  />
                  <span className="w-16 text-center font-medium">{reauthenticationInterval} min</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Prompt for re-authentication every {reauthenticationInterval} minutes for sensitive actions
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-revoke" className="font-medium">Automatic Access Revocation</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically revoke access when suspicions behavior is detected
                  </p>
                </div>
                <Switch 
                  id="auto-revoke" 
                  checked={autoRevokeEnabled} 
                  onCheckedChange={setAutoRevokeEnabled}
                  disabled={disabled || !continuousMonitoring}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Response to Trust Violations</Label>
                <Select defaultValue="revoke" disabled={disabled || !continuousMonitoring}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notify">Notify User Only</SelectItem>
                    <SelectItem value="reverify">Require Re-verification</SelectItem>
                    <SelectItem value="revoke">Revoke Access</SelectItem>
                    <SelectItem value="isolate">Isolate User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-4">Behavior Anomaly Rules</h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-lg">
                <Activity className="h-5 w-5 text-blue-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">Unusual Access Patterns</h5>
                  <p className="text-sm text-muted-foreground">Accessing resources not typically used by role</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">Off-hours Access</h5>
                  <p className="text-sm text-muted-foreground">Access attempts outside normal working hours</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">Data Exfiltration Attempts</h5>
                  <p className="text-sm text-muted-foreground">Unusual amounts of data being accessed or exported</p>
                </div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-red-500 mr-3" />
                <div className="flex-1">
                  <h5 className="font-medium">Privilege Escalation</h5>
                  <p className="text-sm text-muted-foreground">Attempts to gain higher privileges than assigned</p>
                </div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuousVerification;
