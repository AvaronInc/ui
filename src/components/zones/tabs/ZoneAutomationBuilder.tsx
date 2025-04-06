
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Trash2, 
  Save, 
  PlusSquare, 
  Copy, 
  Layers, 
  AlertCircle, 
  Clock, 
  Play, 
  Mail 
} from 'lucide-react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Node,
  Edge,
  Connection,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  ConnectionLineType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card } from '@/components/ui/card';
import { AutomationFlow } from '@/types/automation-flow';
import { mockAutomationFlows } from '@/components/regions/tabs/mockAutomationFlows';
import { useTheme } from '@/context/ThemeContext';

type NodeData = {
  label: string;
  description: string;
  subType?: string;
};

type NodeTypes = 'trigger' | 'action' | 'outcome';
type TriggerType = 'schedule' | 'event' | 'condition' | 'manual';
type ActionType = 'script' | 'api' | 'notification' | 'email';
type OutcomeType = 'success' | 'failure' | 'conditional';

// Define node components
const TriggerNode: React.FC<{
  data: { label: string; description: string; subType: TriggerType }
}> = ({ data }) => {
  return (
    <div className="p-3 rounded-lg border min-w-[180px] bg-card border-primary/20">
      <div className="flex items-center gap-2">
        {data.subType === 'schedule' && <Clock size={16} className="text-primary" />}
        {data.subType === 'event' && <AlertCircle size={16} className="text-orange-500" />}
        {data.subType === 'condition' && <Layers size={16} className="text-blue-500" />}
        {data.subType === 'manual' && <Play size={16} className="text-green-500" />}
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="text-muted-foreground text-xs mt-1">{data.description}</div>
    </div>
  );
};

const ActionNode: React.FC<{
  data: { label: string; description: string; subType: ActionType }
}> = ({ data }) => {
  return (
    <div className="p-3 rounded-lg border min-w-[180px] bg-card border-blue-500/20">
      <div className="flex items-center gap-2">
        {data.subType === 'script' && <Layers size={16} className="text-blue-500" />}
        {data.subType === 'api' && <PlusSquare size={16} className="text-purple-500" />}
        {data.subType === 'notification' && <AlertCircle size={16} className="text-amber-500" />}
        {data.subType === 'email' && <Mail size={16} className="text-cyan-500" />}
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="text-muted-foreground text-xs mt-1">{data.description}</div>
    </div>
  );
};

const OutcomeNode: React.FC<{
  data: { label: string; description: string; subType: OutcomeType }
}> = ({ data }) => {
  return (
    <div className="p-3 rounded-lg border min-w-[180px] bg-card border-green-500/20">
      <div className="flex items-center gap-2">
        {data.subType === 'success' && <Play size={16} className="text-green-500" />}
        {data.subType === 'failure' && <AlertCircle size={16} className="text-red-500" />}
        {data.subType === 'conditional' && <Layers size={16} className="text-amber-500" />}
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="text-muted-foreground text-xs mt-1">{data.description}</div>
    </div>
  );
};

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  outcome: OutcomeNode,
};

const ZoneAutomationBuilder: React.FC<{ zone: any }> = ({ zone }) => {
  const { isDarkMode } = useTheme();
  const [currentFlow, setCurrentFlow] = useState<AutomationFlow | null>(null);
  const [flows, setFlows] = useState<AutomationFlow[]>(mockAutomationFlows);
  const [isCreating, setIsCreating] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  
  // Initial nodes and edges setup
  const initialNodes: Node[] = []; 
  const initialEdges: Edge[] = [];
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Function to load a flow
  const loadFlow = useCallback((flow: AutomationFlow) => {
    setCurrentFlow(flow);
    
    // Convert AutomationNodes to ReactFlow nodes
    const rfNodes: Node[] = flow.nodes.map((node) => ({
      id: node.id,
      type: node.type as NodeTypes,
      position: node.position,
      data: { 
        label: node.data.label, 
        description: node.data.description,
        subType: node.subType
      },
    }));
    
    // Convert AutomationEdges to ReactFlow edges
    const rfEdges: Edge[] = flow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: edge.animated || false,
      style: edge.style || { stroke: '#2563eb' },
      markerEnd: edge.markerEnd || {
        type: MarkerType.ArrowClosed
      },
      sourceHandle: edge.sourceHandle || null,
      targetHandle: edge.targetHandle || null
    }));
    
    setNodes(rfNodes);
    setEdges(rfEdges);
  }, [setNodes, setEdges]);
  
  // Create a new flow
  const createNewFlow = () => {
    if (newFlowName.trim()) {
      const newFlow: AutomationFlow = {
        id: `flow-${Date.now()}`,
        name: newFlowName,
        description: `Automation flow for ${zone.name}`,
        nodes: [],
        edges: [],
        createdBy: 'Current User',
        lastModified: new Date().toISOString(),
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString()
      };
      
      setFlows([...flows, newFlow]);
      loadFlow(newFlow);
      setIsCreating(false);
      setNewFlowName('');
    }
  };
  
  // Duplicate a flow
  const duplicateFlow = (flow: AutomationFlow) => {
    const duplicatedFlow: AutomationFlow = {
      ...flow,
      id: `flow-${Date.now()}`,
      name: `${flow.name} (Copy)`,
      lastModified: new Date().toISOString(),
      version: flow.version + 1
    };
    
    setFlows([...flows, duplicatedFlow]);
    loadFlow(duplicatedFlow);
  };
  
  // Delete a flow
  const deleteFlow = (flowId: string) => {
    const updatedFlows = flows.filter(f => f.id !== flowId);
    setFlows(updatedFlows);
    
    if (currentFlow && currentFlow.id === flowId) {
      setCurrentFlow(null);
      setNodes([]);
      setEdges([]);
    }
  };
  
  // Save flow changes
  const saveFlow = () => {
    if (!currentFlow) return;
    
    const updatedFlow: AutomationFlow = {
      ...currentFlow,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type as 'trigger' | 'action' | 'outcome',
        position: node.position,
        data: node.data,
        subType: node.data.subType as any
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        style: edge.style,
        markerEnd: edge.markerEnd,
        sourceHandle: edge.sourceHandle || undefined,
        targetHandle: edge.targetHandle || undefined
      })),
      lastModified: new Date().toISOString()
    };
    
    const updatedFlows = flows.map(f => 
      f.id === currentFlow.id ? updatedFlow : f
    );
    
    setFlows(updatedFlows);
    setCurrentFlow(updatedFlow);
  };
  
  // Add new node
  const addNode = (type: NodeTypes, subType: TriggerType | ActionType | OutcomeType) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50
      },
      data: {
        subType,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${subType}`,
        description: `A ${subType} ${type.toLowerCase()}`
      }
    };
    
    setNodes(nds => [...nds, newNode]);
  };
  
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: isDarkMode ? '#5d87e0' : '#2563eb' },
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    }, eds)),
    [setEdges, isDarkMode]
  );
  
  const removeNode = useCallback((nodeId: string) => {
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    setEdges(eds => eds.filter(
      edge => edge.source !== nodeId && edge.target !== nodeId
    ));
  }, [setNodes, setEdges]);
  
  // Handle node menu items for our context menu
  const onNodesDelete = useCallback((nodesToDelete: Node[]) => {
    nodesToDelete.forEach(node => removeNode(node.id));
  }, [removeNode]);
  
  // Filter flows specific to this zone
  const zoneFlows = useMemo(() => {
    // In a real application, you would filter flows based on zone ID
    // For now, we'll just return all mock flows
    return flows;
  }, [flows]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Left sidebar - flows list */}
      <div className="md:col-span-1 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Automation Flows</h3>
          <div className="flex items-center gap-2 mb-3">
            {isCreating ? (
              <>
                <input
                  type="text"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                  placeholder="Flow name..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button size="sm" onClick={createNewFlow}>Add</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              </>
            ) : (
              <Button 
                size="sm" 
                onClick={() => setIsCreating(true)}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Flow
              </Button>
            )}
          </div>
          
          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {zoneFlows.length === 0 ? (
              <p className="text-sm text-muted-foreground">No automation flows yet.</p>
            ) : (
              zoneFlows.map(flow => (
                <div 
                  key={flow.id} 
                  className={`p-2 rounded border cursor-pointer ${
                    currentFlow?.id === flow.id 
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-accent'
                  } transition-colors`}
                  onClick={() => loadFlow(flow)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{flow.name}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6" 
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateFlow(flow);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 hover:text-destructive" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFlow(flow.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{flow.status} • v{flow.version}</p>
                </div>
              ))
            )}
          </div>
        </Card>
        
        {/* Node palette */}
        {currentFlow && (
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Node Palette</h3>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h4 className="text-xs font-medium mb-1 text-muted-foreground">TRIGGERS</h4>
                <div className="flex flex-wrap gap-1">
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('trigger', 'schedule')}>
                    <Clock className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('trigger', 'event')}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Event
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('trigger', 'condition')}>
                    <Layers className="h-3 w-3 mr-1" />
                    Condition
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium mb-1 text-muted-foreground">ACTIONS</h4>
                <div className="flex flex-wrap gap-1">
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('action', 'script')}>
                    <Layers className="h-3 w-3 mr-1" />
                    Script
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('action', 'api')}>
                    <PlusSquare className="h-3 w-3 mr-1" />
                    API
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('action', 'notification')}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Notify
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium mb-1 text-muted-foreground">OUTCOMES</h4>
                <div className="flex flex-wrap gap-1">
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('outcome', 'success')}>
                    <Play className="h-3 w-3 mr-1" />
                    Success
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => addNode('outcome', 'failure')}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Failure
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Main flow area */}
      <div className="md:col-span-3 h-[calc(100vh-300px)] min-h-[500px] rounded-md border">
        {currentFlow ? (
          <div className="relative h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodesDelete={onNodesDelete}
              fitView
              className={isDarkMode ? "flow-dark" : ""}
              connectionLineType={ConnectionLineType.SmoothStep}
            >
              <Background 
                color={isDarkMode ? "#555" : "#aaa"} 
                gap={16} 
                size={1} 
              />
              <Controls />
              <MiniMap 
                nodeColor={n => {
                  if (n.type === 'trigger') return isDarkMode ? '#7E869A' : '#2563eb';
                  if (n.type === 'action') return isDarkMode ? '#6B7280' : '#3B82F6';
                  return isDarkMode ? '#57746C' : '#10B981';
                }}
                maskColor={isDarkMode ? 'rgba(25, 25, 28, 0.6)' : 'rgba(240, 240, 250, 0.6)'}
                style={{
                  backgroundColor: isDarkMode ? '#1F1F23' : '#FAFAFA'
                }}
              />
            </ReactFlow>
            
            {/* Flow controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                onClick={saveFlow}
                size="sm"
                className="flex items-center gap-1"
              >
                <Save size={16} />
                Save Flow
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col gap-2">
            <p className="text-muted-foreground">Select a flow to begin, or create a new flow</p>
            <Button onClick={() => setIsCreating(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Flow
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneAutomationBuilder;
