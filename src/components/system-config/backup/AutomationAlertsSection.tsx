
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Mail, MessageSquare, Send, Bell, Webhook, BellRing, FileWarning, Cpu, MailCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const AutomationAlertsSection: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [webhookAlerts, setWebhookAlerts] = useState(false);
  const [configChangeDetection, setConfigChangeDetection] = useState(true);
  const [auditTrailIntegration, setAuditTrailIntegration] = useState(true);
  const [aiAssisted, setAiAssisted] = useState(true);
  const [emailAddress, setEmailAddress] = useState('admin@example.com');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [alertLevel, setAlertLevel] = useState('failure');
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingAlert, setIsTestingAlert] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Alert settings saved successfully");
      setIsSaving(false);
    }, 1500);
  };

  const handleTestAlert = () => {
    if (!emailAlerts && !smsAlerts && !webhookAlerts) {
      toast.error("Please enable at least one alert method");
      return;
    }

    setIsTestingAlert(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Test alert sent successfully");
      setIsTestingAlert(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Backup Failure Alerts
            </CardTitle>
            <CardDescription>
              Configure how you want to be notified about backup events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-xs text-muted-foreground">Receive backup alerts via email</p>
                  </div>
                </div>
                <Switch 
                  id="email-alerts" 
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>
              
              {emailAlerts && (
                <div className="pl-6 space-y-2 animate-in fade-in-50">
                  <Label htmlFor="email-address" className="text-xs">Email Address</Label>
                  <Input 
                    id="email-address" 
                    type="email" 
                    value={emailAddress}
                    onChange={e => setEmailAddress(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-xs text-muted-foreground">Receive backup alerts via SMS</p>
                  </div>
                </div>
                <Switch 
                  id="sms-alerts" 
                  checked={smsAlerts}
                  onCheckedChange={setSmsAlerts}
                />
              </div>
              
              {smsAlerts && (
                <div className="pl-6 space-y-2 animate-in fade-in-50">
                  <Label htmlFor="phone-number" className="text-xs">Phone Number</Label>
                  <Input 
                    id="phone-number" 
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Webhook className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="webhook-alerts">Webhook Integration</Label>
                    <p className="text-xs text-muted-foreground">Send backup alerts to external systems</p>
                  </div>
                </div>
                <Switch 
                  id="webhook-alerts" 
                  checked={webhookAlerts}
                  onCheckedChange={setWebhookAlerts}
                />
              </div>
              
              {webhookAlerts && (
                <div className="pl-6 space-y-2 animate-in fade-in-50">
                  <Label htmlFor="webhook-url" className="text-xs">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                    placeholder="Enter webhook URL"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="alert-level">Alert Trigger Level</Label>
              <Select 
                value={alertLevel} 
                onValueChange={setAlertLevel}
              >
                <SelectTrigger id="alert-level">
                  <SelectValue placeholder="Select alert level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events (Success and Failures)</SelectItem>
                  <SelectItem value="warning">Warnings and Failures</SelectItem>
                  <SelectItem value="failure">Failures Only</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose which events should trigger alerts
              </p>
            </div>
            
            <Button variant="outline" onClick={handleTestAlert} disabled={isTestingAlert} className="w-full">
              {isTestingAlert ? "Sending Test Alert..." : "Send Test Alert"}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-primary" />
              Configuration Detection & Audit
            </CardTitle>
            <CardDescription>
              Monitor for unauthorized configuration changes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="config-change-detection">Config Change Detection</Label>
                    <p className="text-xs text-muted-foreground">
                      Alert if system config files change outside of normal procedures
                    </p>
                  </div>
                </div>
                <Switch 
                  id="config-change-detection" 
                  checked={configChangeDetection}
                  onCheckedChange={setConfigChangeDetection}
                />
              </div>
              
              <div className="space-y-2 pl-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-trail-integration">Audit Trail Integration</Label>
                    <p className="text-xs text-muted-foreground">
                      Log each backup/restore event to Logging & Audit module
                    </p>
                  </div>
                  <Switch 
                    id="audit-trail-integration" 
                    checked={auditTrailIntegration}
                    onCheckedChange={setAuditTrailIntegration}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-assisted">AI-Assisted Configuration Analysis</Label>
                    <p className="text-xs text-muted-foreground">
                      Use AI to analyze configuration changes and detect anomalies
                    </p>
                  </div>
                </div>
                <Switch 
                  id="ai-assisted" 
                  checked={aiAssisted}
                  onCheckedChange={setAiAssisted}
                />
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-md space-y-4 mt-4">
              <h4 className="font-medium text-sm">Security Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Config change detection is enabled (recommended)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Audit trail integration is enabled (recommended)</span>
                </li>
                {!smsAlerts && (
                  <li className="flex items-start gap-2 text-amber-600">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>Consider enabling SMS alerts for critical backups</span>
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <MailCheck className="h-5 w-5 text-primary" />
            Alert Templates
          </CardTitle>
          <CardDescription>
            Customize notification messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-failure-template">Backup Failure Template</Label>
              <textarea 
                id="backup-failure-template" 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={`[URGENT] Backup Failure - Network Pulse Management System

Backup ID: {backup_id}
Attempted at: {timestamp}
Status: Failed
Error: {error_message}

Please check the system configuration and resolve any issues.
View details at: {dashboard_url}`}
              />
              <p className="text-xs text-muted-foreground">
                You can use template variables like {'{backup_id}'}, {'{timestamp}'}, {'{error_message}'}, and {'{dashboard_url}'}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? "Saving Settings..." : "Save Alert Configuration"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AutomationAlertsSection;
