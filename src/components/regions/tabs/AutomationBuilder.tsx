
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Save, Play, Pause } from 'lucide-react';
import { mockAutomationFlows } from '../data/mockData';
import { AutomationFlow, AutomationNode, AutomationEdge } from '@/types/regions';

import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom node types
const TriggerNode = ({ data }: { data: any }) => (
  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-md border-2 border-blue-500 min-w-[180px]">
    <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">Trigger: {data.label}</div>
    <div className="text-xs text-blue-800 dark:text-blue-200">
      {Object.entries(data.properties || {}).map(([key, value]: [string, any]) => (
        <div key={key} className="flex justify-between">
          <span>{key}:</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
    <Handle 
      type="source" 
      position={Position.Bottom} 
      id="trigger-out" 
      style={{ background: '#4299e1', width: '10px', height: '10px', bottom: '-6px' }}
    />
  </div>
);

const ActionNode = ({ data }: { data: any }) => (
  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-md border-2 border-purple-500 min-w-[180px]">
    <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">Action: {data.label}</div>
    <div className="text-xs text-purple-800 dark:text-purple-200">
      {Object.entries(data.properties || {}).map(([key, value]: [string, any]) => (
        <div key={key} className="flex justify-between">
          <span>{key}:</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
    <Handle 
      type="target" 
      position={Position.Top} 
      id="action-in" 
      style={{ background: '#9f7aea', width: '10px', height: '10px', top: '-6px' }}
    />
    <Handle 
      type="source" 
      position={Position.Bottom} 
      id="action-out" 
      style={{ background: '#9f7aea', width: '10px', height: '10px', bottom: '-6px' }}
    />
  </div>
);

const OutcomeNode = ({ data }: { data: any }) => (
  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-md border-2 border-green-500 min-w-[180px]">
    <div className="font-bold text-green-700 dark:text-green-300 mb-1">Outcome: {data.label}</div>
    <div className="text-xs text-green-800 dark:text-green-200">
      {Object.entries(data.properties || {}).map(([key, value]: [string, any]) => (
        <div key={key} className="flex justify-between">
          <span>{key}:</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
    <Handle 
      type="target" 
      position={Position.Top} 
      id="outcome-in" 
      style={{ background: '#48bb78', width: '10px', height: '10px', top: '-6px' }}
    />
  </div>
);

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  outcome: OutcomeNode,
};

// Transform flow data to Reactflow format
const transformFlow = (flow: AutomationFlow): { nodes: Node[], edges: Edge[] } => {
  // Map nodes
  const nodes = flow.nodes.map((node: AutomationNode) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: { 
      label: node.subType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      properties: node.data
    },
    draggable: true,
    connectable: true,
  }));

  // Map edges
  const edges = flow.edges.map((edge: AutomationEdge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.animated || false,
    label: edge.label,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#9b87f5' }
  }));

  return { nodes, edges };
};

// Flow Editor component
const FlowEditor = ({ initialFlow, onFlowChange }: { initialFlow: AutomationFlow, onFlowChange?: (nodes: Node[], edges: Edge[]) => void }) => {
  const { nodes: initialNodes, edges: initialEdges } = transformFlow(initialFlow);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Connection) => {
      // Create a new edge with a unique ID
      const newEdge = {
        ...params,
        id: `edge-${Date.now()}`,
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: { stroke: '#9b87f5' }
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      
      // Notify parent component of changes if callback provided
      if (onFlowChange) {
        onFlowChange(nodes, [...edges, newEdge]);
      }
    },
    [setEdges, nodes, edges, onFlowChange]
  );

  // Update parent component when nodes change
  React.useEffect(() => {
    if (onFlowChange) {
      onFlowChange(nodes, edges);
    }
  }, [nodes, edges, onFlowChange]);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#9b87f5', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

const AutomationBuilder = () => {
  const [flows, setFlows] = useState(mockAutomationFlows);
  const [selectedFlow, setSelectedFlow] = useState<AutomationFlow | null>(flows[0] || null);
  
  // Toggle flow enabled status
  const toggleFlowStatus = (id: string) => {
    const updatedFlows = flows.map(flow => 
      flow.id === id ? { ...flow, enabled: !flow.enabled } : flow
    );
    setFlows(updatedFlows);
    
    // Update selected flow if it's the one being toggled
    if (selectedFlow && selectedFlow.id === id) {
      setSelectedFlow({ ...selectedFlow, enabled: !selectedFlow.enabled });
    }
  };

  // Handle flow changes (nodes and edges updates)
  const handleFlowChange = (nodes: Node[], edges: Edge[]) => {
    if (!selectedFlow) return;
    
    // Transform React Flow nodes back to our AutomationNode format
    const updatedNodes = nodes.map(node => {
      const originalNode = selectedFlow.nodes.find(n => n.id === node.id);
      return {
        ...originalNode!,
        position: node.position,
      };
    });

    // Transform React Flow edges back to our AutomationEdge format
    const updatedEdges = edges.map(edge => {
      const originalEdge = selectedFlow.edges.find(e => e.id === edge.id);
      if (originalEdge) {
        return {
          ...originalEdge,
          source: edge.source,
          target: edge.target,
        };
      } else {
        // This is a new edge
        return {
          id: edge.id,
          source: edge.source!,
          target: edge.target!,
          animated: edge.animated || false,
          label: edge.label,
        };
      }
    });

    const updatedFlow = {
      ...selectedFlow,
      nodes: updatedNodes,
      edges: updatedEdges,
    };

    // Update the selected flow
    setSelectedFlow(updatedFlow);
    
    // Update the flow in the flows array
    const updatedFlows = flows.map(flow => 
      flow.id === updatedFlow.id ? updatedFlow : flow
    );
    setFlows(updatedFlows);
  };

  // Add a new node to the flow
  const addNode = (type: 'trigger' | 'action' | 'outcome') => {
    if (!selectedFlow) return;

    const newNode: AutomationNode = {
      id: `${type}-${Date.now()}`,
      type,
      subType: type === 'trigger' ? 'log_entry' : 
               type === 'action' ? 'alert' : 'email',
      position: { 
        x: Math.random() * 300, 
        y: Math.random() * 300 
      },
      data: {
        name: `New ${type}`,
        description: `This is a new ${type} node`
      }
    };

    const updatedFlow = {
      ...selectedFlow,
      nodes: [...selectedFlow.nodes, newNode]
    };

    setSelectedFlow(updatedFlow);
    
    const updatedFlows = flows.map(flow => 
      flow.id === updatedFlow.id ? updatedFlow : flow
    );
    setFlows(updatedFlows);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Automation Builder</h2>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> New Flow
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Flows Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Automation Flows</CardTitle>
            <CardDescription>
              Select a flow to edit or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {flows.map((flow) => (
                <div
                  key={flow.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedFlow?.id === flow.id
                      ? 'border-primary bg-primary/10'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedFlow(flow)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{flow.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={flow.enabled ? 'text-green-500' : 'text-muted-foreground'}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlowStatus(flow.id);
                      }}
                    >
                      {flow.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {flow.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
                    <span>{flow.nodes.length} nodes</span>
                    <span className={flow.enabled ? 'text-green-500' : 'text-yellow-500'}>
                      {flow.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Flow Canvas */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedFlow?.name || 'Select a flow'}</CardTitle>
              <CardDescription>
                {selectedFlow?.description || 'Select a flow from the sidebar to edit'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => addNode('trigger')}
                  size="sm"
                >
                  Add Trigger
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addNode('action')}
                  size="sm"
                >
                  Add Action
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addNode('outcome')}
                  size="sm"
                >
                  Add Outcome
                </Button>
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Flow
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 border-t">
            {selectedFlow ? (
              <ReactFlowProvider>
                <FlowEditor 
                  initialFlow={selectedFlow} 
                  onFlowChange={handleFlowChange} 
                />
              </ReactFlowProvider>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                Select a flow to edit or create a new one
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Connection Types Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-500">Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Log Entry Detected</li>
              <li>Degraded Connection</li>
              <li>Packet Loss Threshold</li>
              <li>Storage Unavailable</li>
              <li>CPU Threshold</li>
              <li>Memory Threshold</li>
              <li>Service Down</li>
              <li>Scheduled Event</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-500">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Generate Alert</li>
              <li>Restart Service</li>
              <li>Run Custom Script</li>
              <li>Scale Resources</li>
              <li>Switch Active Region</li>
              <li>Enable Failover</li>
              <li>Update Network Policy</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-500">Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Send Email</li>
              <li>Send SMS</li>
              <li>Send Push Notification</li>
              <li>Call Webhook</li>
              <li>Create Support Ticket</li>
              <li>Log Event</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomationBuilder;
