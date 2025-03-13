
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NetworkOverview from '@/components/sdms/NetworkOverview';
import NetworkTopology from '@/components/sdms/NetworkTopology';
import SecurityDocumentation from '@/components/sdms/SecurityDocumentation';
import ApplicationDocumentation from '@/components/sdms/ApplicationDocumentation';
import ComplianceReports from '@/components/sdms/ComplianceReports';
import CustomDocumentation from '@/components/sdms/CustomDocumentation';
import SDMSSearch from '@/components/sdms/SDMSSearch';
import SaveExport from '@/components/sdms/SaveExport';
import { FileJson, FileText, Save, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SDMS = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);

  const handleGenerateDocumentation = () => {
    setIsGeneratingDocs(true);
    toast({
      title: "Documentation Generation Started",
      description: "AI is analyzing your network to generate comprehensive documentation.",
    });
    
    // Simulate AI generating documentation
    setTimeout(() => {
      setIsGeneratingDocs(false);
      toast({
        title: "Documentation Complete",
        description: "Network documentation has been generated successfully.",
      });
    }, 3000);
  };

  return (
    <PageTransition>
      <DashboardLayout className="p-6">
        <div className="flex flex-col h-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>System Documentation Management</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-2xl font-bold mt-2">System Documentation Management System</h1>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  setActiveTab("search");
                }}
              >
                <Search className="h-4 w-4" />
                Search Documentation
              </Button>
              <Button
                className="gap-2"
                onClick={handleGenerateDocumentation}
                disabled={isGeneratingDocs}
              >
                <FileText className="h-4 w-4" />
                {isGeneratingDocs ? "Generating..." : "Generate Documentation"}
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              <TabsTrigger value="overview">Network Overview</TabsTrigger>
              <TabsTrigger value="topology">Topology & Flow</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="custom">Custom Docs</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="export">Save & Export</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 mt-6 overflow-auto">
              <TabsContent value="overview" className="h-full">
                <NetworkOverview />
              </TabsContent>
              
              <TabsContent value="topology" className="h-full">
                <NetworkTopology />
              </TabsContent>
              
              <TabsContent value="security" className="h-full">
                <SecurityDocumentation />
              </TabsContent>
              
              <TabsContent value="applications" className="h-full">
                <ApplicationDocumentation />
              </TabsContent>
              
              <TabsContent value="compliance" className="h-full">
                <ComplianceReports />
              </TabsContent>
              
              <TabsContent value="custom" className="h-full">
                <CustomDocumentation />
              </TabsContent>
              
              <TabsContent value="search" className="h-full">
                <SDMSSearch />
              </TabsContent>
              
              <TabsContent value="export" className="h-full">
                <SaveExport />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SDMS;
