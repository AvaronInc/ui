
import { PageTransition } from "@/components/transitions/PageTransition";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SchedulingPanel from "@/components/scheduling/SchedulingPanel";
import { TooltipProvider } from "@/components/ui/tooltip";

const Scheduling = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <TooltipProvider>
          <SchedulingPanel />
        </TooltipProvider>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Scheduling;
