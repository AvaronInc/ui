
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulationConfiguration from './sections/SimulationConfiguration';
import RunTestScenario from './sections/RunTestScenario';
import AIImpactReport from './sections/AIImpactReport';
import AttachToChangeRequest from './sections/AttachToChangeRequest';
import SimulationHistory from './sections/SimulationHistory';

const DeploymentTestingPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('configuration');
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  
  const handleRunSimulation = (configData: any) => {
    setIsSimulationRunning(true);
    
    // In a real app, this would be an API call
    // For now, we use a timeout to simulate the process
    setTimeout(() => {
      setIsSimulationRunning(false);
      setSimulationResults({
        riskScore: 92,
        configDiff: {
          added: 7,
          removed: 2,
          modified: 4
        },
        affectedServices: [
          { name: "Authentication Service", impact: "none" },
          { name: "Web Proxy", impact: "minor" },
          { name: "DNS", impact: "none" }
        ],
        criticalIssues: 0,
        warnings: 2,
        timestamp: new Date().toISOString()
      });
      
      // Auto-switch to the results tab
      setActiveTab('results');
    }, 15000); // Simulate a 15 second test
  };
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-1">
        <TabsTrigger value="configuration">Configuration</TabsTrigger>
        <TabsTrigger value="run" disabled={isSimulationRunning}>
          Run Test
        </TabsTrigger>
        <TabsTrigger 
          value="results" 
          disabled={!simulationResults && !isSimulationRunning}
        >
          Results
        </TabsTrigger>
        <TabsTrigger 
          value="attach" 
          disabled={!simulationResults}
        >
          Change Request
        </TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="configuration">
        <SimulationConfiguration />
      </TabsContent>

      <TabsContent value="run">
        <RunTestScenario 
          onRunSimulation={handleRunSimulation} 
          isRunning={isSimulationRunning}
        />
      </TabsContent>

      <TabsContent value="results">
        <AIImpactReport results={simulationResults} />
      </TabsContent>

      <TabsContent value="attach">
        <AttachToChangeRequest results={simulationResults} />
      </TabsContent>

      <TabsContent value="history">
        <SimulationHistory />
      </TabsContent>
    </Tabs>
  );
};

export default DeploymentTestingPanel;
