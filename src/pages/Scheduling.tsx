
import { PageTransition } from "@/components/transitions/PageTransition";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SchedulingPanel from "@/components/scheduling/SchedulingPanel";

const Scheduling = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <SchedulingPanel />
      </DashboardLayout>
    </PageTransition>
  );
};

export default Scheduling;
