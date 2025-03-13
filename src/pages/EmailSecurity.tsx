
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import PageTransition from "@/components/transitions/PageTransition";
import EmailSecurityPanel from "@/components/email-security/EmailSecurityPanel";

const EmailSecurity = () => {
  return (
    <PageTransition>
      <DashboardLayout
        title="Email Security & DLP"
        subtitle="Configure AI-driven security policies for email processing"
      >
        <EmailSecurityPanel />
        <Toaster />
      </DashboardLayout>
    </PageTransition>
  );
};

export default EmailSecurity;
