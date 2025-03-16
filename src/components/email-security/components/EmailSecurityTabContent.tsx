
import { UseFormReturn } from 'react-hook-form';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import AIEmailFilteringSection from '../sections/AIEmailFilteringSection';
import RiskAssessmentSection from '../sections/RiskAssessmentSection';
import IdentityVerificationSection from '../sections/IdentityVerificationSection';
import EncryptionControlsSection from '../sections/EncryptionControlsSection';
import LoggingComplianceSection from '../sections/LoggingComplianceSection';
import ThreatAlertsSection from '../sections/ThreatAlertsSection';
import HistoricalAnalysisSection from '../sections/HistoricalAnalysisSection';
import VoiceCallAlertsSection from '../sections/VoiceCallAlertsSection';
import OverviewSection from '../sections/OverviewSection';
import { EmailSecuritySettings } from '@/types/emailSecurity';

interface EmailSecurityTabContentProps {
  activeTab: string;
  form: UseFormReturn<EmailSecuritySettings>;
}

const EmailSecurityTabContent = ({ activeTab, form }: EmailSecurityTabContentProps) => {
  return (
    <>
      <TabsContent value="overview">
        <Card>
          <CardContent className="pt-6">
            <OverviewSection />
          </CardContent>
        </Card>
      </TabsContent>

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
    </>
  );
};

export default EmailSecurityTabContent;
