
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import PageTransition from "@/components/transitions/PageTransition";
import AssetManagementPanel from "@/components/asset-management/AssetManagementPanel";
import { Server } from "lucide-react";

const AssetManagement = () => {
  return (
    <PageTransition>
      <DashboardLayout className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Server className="h-5 w-5 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Asset Management</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Full lifecycle tracking of IT assets, devices, and infrastructure</p>
        </div>
        <AssetManagementPanel />
        <Toaster />
      </DashboardLayout>
    </PageTransition>
  );
};

export default AssetManagement;
