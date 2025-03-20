
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TestTube, Play, Pause, RotateCw, Plus, AlertCircle } from 'lucide-react';

interface SimulationTabProps {
  selectedSwitch: string;
}

const SimulationTab: React.FC<SimulationTabProps> = ({ selectedSwitch }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [trafficLoad, setTrafficLoad] = useState(50);
  
  // Mock simulation results data
  const simulationResults = [
    { time: '0s', latency: 5, throughput: 100, packetLoss: 0 },
    { time: '10s', latency: 8, throughput: 200, packetLoss: 0 },
    { time: '20s', latency: 12, throughput: 350, packetLoss: 0.2 },
    { time: '30s', latency: 18, throughput: 500, packetLoss: 0.5 },
    { time: '40s', latency: 25, throughput: 650, packetLoss: 1.2 },
    { time: '50s', latency: 35, throughput: 780, packetLoss: 2.5 },
    { time: '60s', latency: 28, throughput: 720, packetLoss: 1.8 },
    { time: '70s', latency: 22, throughput: 650, packetLoss: 1.0 },
    { time: '80s', latency: 15, throughput: 500, packetLoss: 0.5 },
    { time: '90s', latency: 10, throughput: 350, packetLoss: 0.2 },
    { time: '100s', latency: 8, throughput: 200, packetLoss: 0 },
  ];

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setTrafficLoad(50);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Network Simulation & Load Testing</h3>
        <Badge className={isSimulating ? "bg-green-500" : "bg-amber-500"}>
          {isSimulating ? "Simulation Running" : "Ready to Simulate"}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h4 className="text-sm font-medium mb-2">Simulation Configuration</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Traffic Load</label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[trafficLoad]}
                  onValueChange={(values) => setTrafficLoad(values[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="w-10 text-right">{trafficLoad}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (seconds)</label>
              <Input type="number" defaultValue={100} min={10} max={3600} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Traffic Pattern</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="steady">Steady</option>
                <option value="burst">Burst</option>
                <option value="ramp">Ramp Up/Down</option>
                <option value="random">Random</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Button onClick={toggleSimulation} className="flex items-center gap-2">
              {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isSimulating ? "Pause Simulation" : "Start Simulation"}
            </Button>
            <Button variant="outline" onClick={resetSimulation} className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Scenario
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-4">Simulation Results</h4>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={simulationResults}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="latency" 
                stroke="#ef4444" 
                name="Latency (ms)" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="throughput" 
                stroke="#3b82f6" 
                name="Throughput (Mbps)" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="packetLoss" 
                stroke="#f97316" 
                name="Packet Loss (%)" 
                strokeWidth={2}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">Performance Analysis</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <span>Latency spikes to 35ms at peak traffic (50s mark)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                <span>Packet loss exceeds 2% at 780Mbps throughput</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Switch performs optimally up to 650Mbps</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                <span>Recovery time from peak load: ~30 seconds</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">AI "What-If" Recommendations</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <TestTube className="h-4 w-4 text-purple-500 mt-0.5" />
                <span>Increasing buffer size could reduce packet loss by 60%</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <TestTube className="h-4 w-4 text-purple-500 mt-0.5" />
                <span>Enable weighted fair queuing to improve latency under load</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <TestTube className="h-4 w-4 text-purple-500 mt-0.5" />
                <span>Consider upgrading uplink capacity for sustained loads above 700Mbps</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <TestTube className="h-4 w-4 text-purple-500 mt-0.5" />
                <span>Load balancing across ports 3, 7, and 12 would optimize performance</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
        <div className="flex items-start">
          <TestTube className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Optimal Placement</h4>
            <p className="text-sm text-muted-foreground">Based on simulation results, optimal placement for this virtual switch is in Zone B with direct connections to distribution switches DS-03 and DS-04.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationTab;
