
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, File, Search, Shield, Mail, Users, Lock, Bell, Phone } from 'lucide-react';
import AIEmailFilteringSection from './sections/AIEmailFilteringSection';
import RiskAssessmentSection from './sections/RiskAssessmentSection';
import IdentityVerificationSection from './sections/IdentityVerificationSection';
import EncryptionControlsSection from './sections/EncryptionControlsSection';
import LoggingComplianceSection from './sections/LoggingComplianceSection';
import ThreatAlertsSection from './sections/ThreatAlertsSection';
import HistoricalAnalysisSection from './sections/HistoricalAnalysisSection';
import VoiceCallAlertsSection from './sections/VoiceCallAlertsSection';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { EmailSecuritySettings } from '@/types/emailSecurity';

const defaultSettings: EmailSecuritySettings = {
  // AI-Powered Email Filtering
  aiDlpEnabled: true,
  detectionSensitivity: 'medium',
  monitorPii: true,
  monitorFinancial: true,
  monitorIntellectualProperty: true,
  monitorCustomerData: true,
  monitorHarmfulLanguage: true,
  monitorRegulatoryViolations: true,
  
  // Risk Assessments
  riskConfidenceThreshold: 75,
  queueForReviewThreshold: 50,
  rejectEmailThreshold: 85,
  alertOnFlag: true,
  
  // Identity Verification
  identityVerificationEnabled: true,
  verifiedUsers: ['admin@company.com', 'security@company.com'],
  autoTaggingEnabled: true,
  internalVerificationBadgeEnabled: true,
  externalVerificationBadgeEnabled: false,
  flagNonVerifiedEmails: true,
  
  // Encryption
  mandatoryEncryptionEnabled: true,
  forceTlsInternal: true,
  rejectUnencryptedEmails: false,
  secureAttachmentsOnly: true,
  
  // Logging
  quarantineEnabled: true,
  quarantineRetentionPeriod: '30',
  aiHistoricalReviewEnabled: true,
  complianceMonitoringEnabled: true,
  
  // Threat Alerts
  aiAlertsEnabled: true,
  alertRecipients: ['security@company.com', 'admin@company.com'],
  autoEscalateAfter: 3,
  blockSenderAfter: 5,
  alertSecurityTeamOnRepeat: true,
  
  // Voice Calls
  aiVoiceCallEnabled: false,
  voiceAlertThreshold: 90,
  callEscalationMinutes: 15,
  
  // Compliance
  scheduleAutomaticReports: true
};

const formSchema = z.object({
  // All the fields corresponding to the EmailSecuritySettings type
  aiDlpEnabled: z.boolean(),
  detectionSensitivity: z.enum(['low', 'medium', 'high']),
  monitorPii: z.boolean(),
  monitorFinancial: z.boolean(),
  monitorIntellectualProperty: z.boolean(),
  monitorCustomerData: z.boolean(),
  monitorHarmfulLanguage: z.boolean(),
  monitorRegulatoryViolations: z.boolean(),
  
  riskConfidenceThreshold: z.number().min(0).max(100),
  queueForReviewThreshold: z.number().min(0).max(100),
  rejectEmailThreshold: z.number().min(0).max(100),
  alertOnFlag: z.boolean(),
  
  identityVerificationEnabled: z.boolean(),
  verifiedUsers: z.array(z.string()),
  autoTaggingEnabled: z.boolean(),
  internalVerificationBadgeEnabled: z.boolean(),
  externalVerificationBadgeEnabled: z.boolean(),
  flagNonVerifiedEmails: z.boolean(),
  
  mandatoryEncryptionEnabled: z.boolean(),
  forceTlsInternal: z.boolean(),
  rejectUnencryptedEmails: z.boolean(),
  secureAttachmentsOnly: z.boolean(),
  
  quarantineEnabled: z.boolean(),
  quarantineRetentionPeriod: z.enum(['7', '30', '90']),
  aiHistoricalReviewEnabled: z.boolean(),
  complianceMonitoringEnabled: z.boolean(),
  
  aiAlertsEnabled: z.boolean(),
  alertRecipients: z.array(z.string()),
  autoEscalateAfter: z.number().int().min(1),
  blockSenderAfter: z.number().int().min(1),
  alertSecurityTeamOnRepeat: z.boolean(),
  
  aiVoiceCallEnabled: z.boolean(),
  voiceAlertThreshold: z.number().min(0).max(100),
  callEscalationMinutes: z.number().int().min(1),
  
  scheduleAutomaticReports: z.boolean()
});

const EmailSecurityPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('filtering');
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<EmailSecuritySettings>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSettings,
  });

  const handleSave = (values: EmailSecuritySettings) => {
    setIsSaving(true);
    console.log('Saving settings:', values);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Email security settings have been updated successfully.",
      });
    }, 1500);
  };

  const handleExport = (format: 'pdf' | 'json') => {
    const values = form.getValues();
    console.log(`Exporting settings as ${format}:`, values);
    
    toast({
      title: `Export as ${format.toUpperCase()}`,
      description: `Email security settings exported as ${format.toUpperCase()} successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search settings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('json')}
            className="flex items-center gap-2"
          >
            <File className="h-4 w-4" />
            Export JSON
          </Button>
          <Button 
            type="submit" 
            onClick={form.handleSubmit(handleSave)} 
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid grid-cols-8 w-full">
          <TabsTrigger value="filtering" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">DLP Filtering</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Risk Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="identity" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Identity Verification</span>
          </TabsTrigger>
          <TabsTrigger value="encryption" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Encryption</span>
          </TabsTrigger>
          <TabsTrigger value="logging" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Logging & Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Threat Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Historical Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">Voice Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="filtering">
          <Card>
            <CardContent className="pt-6">
              <AIEmailFilteringSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risk">
          <Card>
            <CardContent className="pt-6">
              <RiskAssessmentSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="identity">
          <Card>
            <CardContent className="pt-6">
              <IdentityVerificationSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="encryption">
          <Card>
            <CardContent className="pt-6">
              <EncryptionControlsSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logging">
          <Card>
            <CardContent className="pt-6">
              <LoggingComplianceSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardContent className="pt-6">
              <ThreatAlertsSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardContent className="pt-6">
              <HistoricalAnalysisSection />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voice">
          <Card>
            <CardContent className="pt-6">
              <VoiceCallAlertsSection form={form} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailSecurityPanel;
