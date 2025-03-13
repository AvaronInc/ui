
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import PageTransition from "@/components/transitions/PageTransition";
import AssetManagementPanel from "@/components/asset-management/AssetManagementPanel";

const AssetManagement = () => {
  return (
    <PageTransition>
      <DashboardLayout className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Asset Management System</h1>
          <p className="text-muted-foreground">Full lifecycle tracking of IT assets, devices, and infrastructure</p>
        </div>
        <AssetManagementPanel />
        <Toaster />
      </DashboardLayout>
    </PageTransition>
  );
};

export default AssetManagement;
