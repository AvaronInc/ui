
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimulationConfiguration from './sections/SimulationConfiguration';
import RunTestScenario from './sections/RunTestScenario';
import AIImpactReport from './sections/AIImpactReport';
import AttachToChangeRequest from './sections/AttachToChangeRequest';
import SimulationHistory from './sections/SimulationHistory';
import { Card } from "@/components/ui/card";

const DeploymentTestingPanel = () => {
  const [activeTestId, setActiveTestId] = React.useState<string | null>(null);
  const [testResults, setTestResults] = React.useState<any | null>(null);
  const [isRunning, setIsRunning] = React.useState(false);
  
  // Handle starting a new test simulation
  const handleRunSimulation = (configData: any) => {
    setIsRunning(true);
    
    // Simulate API call to run the test
    setTimeout(() => {
      const mockResults = {
        id: `test-${Date.now()}`,
        timestamp: new Date().toISOString(),
        configType: configData.configType,
        configData: configData.configContent,
        zoneData: configData.replicateZone ? "Zone 3 - HQ" : null,
        trafficProfile: configData.trafficProfile,
        riskScore: Math.floor(Math.random() * 30) + 70, // 70-99
        confidence: Math.floor(Math.random() * 15) + 85, // 85-99
        impactedServices: ["DNS", "DHCP", "VoIP Gateway"],
        criticalIssues: configData.configType === "Firewall Rules" ? ["Rule conflict detected with existing rule ID: FR-892"] : [],
        warnings: ["Service dependency warning: Auth service restart required"],
        affectedEndpoints: Math.floor(Math.random() * 50) + 10,
        estimatedDowntime: Math.floor(Math.random() * 5),
        recommendations: [
          "Consider deploying during non-peak hours",
          "Add exception for internal monitoring services",
          "Update documentation to reflect new flow paths"
        ]
      };
      
      setTestResults(mockResults);
      setActiveTestId(mockResults.id);
      setIsRunning(false);
    }, 3000);
  };
  
  return (
    <Card className="border rounded-lg shadow-sm overflow-hidden">
      <div className="p-0">
        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
            <TabsTrigger 
              value="configuration" 
              className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Simulation Configuration
            </TabsTrigger>
            <TabsTrigger 
              value="run-test" 
              className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Run Test Scenario
            </TabsTrigger>
            <TabsTrigger 
              value="impact-report" 
              className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
              disabled={!testResults}
            >
              AI-Generated Impact Report
            </TabsTrigger>
            <TabsTrigger 
              value="change-request" 
              className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
              disabled={!testResults}
            >
              Attach to Change Request
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Simulation History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="configuration" className="mt-0 p-4">
            <SimulationConfiguration />
          </TabsContent>
          
          <TabsContent value="run-test" className="mt-0 p-4">
            <RunTestScenario 
              onRunSimulation={handleRunSimulation} 
              isRunning={isRunning}
            />
          </TabsContent>
          
          <TabsContent value="impact-report" className="mt-0 p-4">
            <AIImpactReport 
              testResults={testResults} 
              testId={activeTestId}
            />
          </TabsContent>
          
          <TabsContent value="change-request" className="mt-0 p-4">
            <AttachToChangeRequest 
              testResults={testResults} 
              testId={activeTestId}
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0 p-4">
            <SimulationHistory 
              onSelectTest={(testId, results) => {
                setActiveTestId(testId);
                setTestResults(results);
              }} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default DeploymentTestingPanel;
