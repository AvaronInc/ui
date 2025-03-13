
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import PageTransition from "@/components/transitions/PageTransition";
import EmailSecurityPanel from "@/components/email-security/EmailSecurityPanel";

const EmailSecurity = () => {
  return (
    <PageTransition>
      <DashboardLayout className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Email Security & DLP</h1>
          <p className="text-muted-foreground">Configure AI-driven security policies for email processing</p>
        </div>
        <EmailSecurityPanel />
        <Toaster />
      </DashboardLayout>
    </PageTransition>
  );
};

export default EmailSecurity;
