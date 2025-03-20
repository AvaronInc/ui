
import { PageTransition } from "@/components/transitions/PageTransition";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageTitle from "@/components/common/PageTitle";
import IntegrationsPanel from "@/components/integrations/IntegrationsPanel";

const Integrations = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6">
          <PageTitle 
            title="Integrations Hub" 
            subtitle="Connect and manage your IT infrastructure integrations"
          />
          <IntegrationsPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Integrations;
