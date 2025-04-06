
import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel,
  MarkerType,
  Position,
  NodeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Save, Play, Trash2, Edit, Share2, FileText } from 'lucide-react';
import { Handle } from '@xyflow/react';

// Node types for our automation flow
type TriggerType = 'webhook' | 'scheduled' | 'event' | 'api';
type ActionType = 'provision' | 'connect' | 'configure' | 'alert' | 'script';
type OutcomeType = 'success' | 'failure' | 'conditional';

// Node components
const TriggerNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 rounded-md bg-blue-500 text-white w-[150px]">
    <div className="font-bold">{data.label}</div>
    <div className="text-xs opacity-80">{data.description || 'Trigger'}</div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-700" />
  </div>
);

const ActionNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 rounded-md bg-green-500 text-white w-[150px]">
    <div className="font-bold">{data.label}</div>
    <div className="text-xs opacity-80">{data.description || 'Action'}</div>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-700" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-700" />
  </div>
);

const OutcomeNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 rounded-md bg-orange-500 text-white w-[150px]">
    <div className="font-bold">{data.label}</div>
    <div className="text-xs opacity-80">{data.description || 'Outcome'}</div>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-orange-700" />
  </div>
);

// Define types for our automation flow
type AutomationNodeBase = {
  id: string;
  position: { x: number; y: number };
  data: { label: string; description: string };
};

type TriggerNode = AutomationNodeBase & { 
  type: 'trigger';
  subType: TriggerType;
};

type ActionNode = AutomationNodeBase & { 
  type: 'action';
  subType: ActionType;
};

type OutcomeNode = AutomationNodeBase & { 
  type: 'outcome';
  subType: OutcomeType;
};

type AutomationNode = TriggerNode | ActionNode | OutcomeNode;

type AutomationEdge = Edge & {
  label: string;
};

type AutomationFlow = {
  id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
  edges: AutomationEdge[];
  createdAt: string;
  updatedAt: string;
};

// Map node types to their components
const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  outcome: OutcomeNode,
};

// Convert between our domain model and ReactFlow's model
const transformFlow = (flow: AutomationFlow | null) => {
  if (!flow) {
    return { nodes: [], edges: [] };
  }
  
  const nodes = flow.nodes.map(node => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      label: node.data.label,
      description: node.data.description,
    },
  }));
  
  const edges = flow.edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: edge.animated || false,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }));
  
  return { nodes, edges };
};

// Flow Editor component
const FlowEditor = ({ flow, onSave }: { flow: AutomationFlow | null, onSave: (flow: AutomationFlow) => void }) => {
  const { nodes: initialNodes, edges: initialEdges } = transformFlow(flow);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge({
      ...params,
      animated: true,
      label: 'flow',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }, eds));
  }, [setEdges]);
  
  const handleSave = () => {
    if (!flow) return;
    
    // Here we create a new flow object with the updated nodes and edges
    const updatedFlow: AutomationFlow = {
      ...flow,
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.type as 'trigger' | 'action' | 'outcome',
        subType: (n.type === 'trigger' ? 'event' : 
                 n.type === 'action' ? 'script' : 
                 'success') as TriggerType | ActionType | OutcomeType,
        position: n.position,
        data: {
          label: n.data.label,
          description: n.data.description
        }
      })) as AutomationNode[],
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label || 'flow',
        animated: e.animated || false,
      })),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(updatedFlow);
  };

  // Create a reference to the flow instance
  const flowRef = useRef<any>(null);

  return (
    <div className="h-[500px] border rounded-md">
      <ReactFlow
        ref={flowRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="automation-flow-editor"
        // Use defaultViewport instead of defaultZoom
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        minZoom={0.2}
        maxZoom={2}
      >
        <MiniMap 
          nodeClassName={(node) => `minimap-node minimap-node-${node.type}`}
          className="bg-background border border-border rounded-sm shadow-md"
        />
        <Controls className="flow-controls bg-background border border-border rounded-sm shadow-md" />
        <Background />
      </ReactFlow>
      
      <div className="absolute bottom-4 right-4">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Flow
        </Button>
      </div>
    </div>
  );
};

// Mock data for automation flows
const mockFlows: AutomationFlow[] = [
  {
    id: '1',
    name: 'New Region Provisioning',
    description: 'Automatically provisions resources when a new region is created',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        subType: 'event',
        position: { x: 250, y: 100 },
        data: {
          label: 'Region Created',
          description: 'Triggered when a new region is created'
        }
      },
      {
        id: 'node-2',
        type: 'action',
        subType: 'provision',
        position: { x: 250, y: 200 },
        data: {
          label: 'Provision SDWAN',
          description: 'Provisions SD-WAN connectivity'
        }
      },
      {
        id: 'node-3',
        type: 'action',
        subType: 'configure',
        position: { x: 250, y: 300 },
        data: {
          label: 'Configure Network',
          description: 'Sets up base network configuration'
        }
      },
      {
        id: 'node-4',
        type: 'outcome',
        subType: 'success',
        position: { x: 250, y: 400 },
        data: {
          label: 'Completion',
          description: 'Region provisioning completed'
        }
      },
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'node-1',
        target: 'node-2',
        label: 'trigger',
        animated: true,
      },
      {
        id: 'edge-2-3',
        source: 'node-2',
        target: 'node-3',
        label: 'next',
        animated: true,
      },
      {
        id: 'edge-3-4',
        source: 'node-3',
        target: 'node-4',
        label: 'complete',
        animated: true,
      },
    ],
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-09-15T12:45:00Z',
  },
  {
    id: '2',
    name: 'Network Policy Enforcement',
    description: 'Enforces network policies across regions',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        subType: 'scheduled',
        position: { x: 250, y: 100 },
        data: {
          label: 'Policy Schedule',
          description: 'Runs every 6 hours'
        }
      },
      {
        id: 'node-2',
        type: 'action',
        subType: 'script',
        position: { x: 250, y: 200 },
        data: {
          label: 'Audit Compliance',
          description: 'Check compliance with network policies'
        }
      },
      {
        id: 'node-3',
        type: 'outcome',
        subType: 'conditional',
        position: { x: 250, y: 300 },
        data: {
          label: 'Evaluation',
          description: 'Policy enforcement result'
        }
      },
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'node-1',
        target: 'node-2',
        label: 'run',
        animated: true,
      },
      {
        id: 'edge-2-3',
        source: 'node-2',
        target: 'node-3',
        label: 'complete',
        animated: true,
      },
    ],
    createdAt: '2023-10-05T08:20:00Z',
    updatedAt: '2023-10-06T15:30:00Z',
  },
];

const AutomationBuilder = () => {
  const [flows, setFlows] = useState<AutomationFlow[]>(mockFlows);
  const [selectedFlow, setSelectedFlow] = useState<AutomationFlow | null>(null);
  const [isNewFlowDialogOpen, setIsNewFlowDialogOpen] = useState(false);
  const [newFlowData, setNewFlowData] = useState({
    name: '',
    description: '',
  });
  
  const handleFlowSelect = (flow: AutomationFlow) => {
    setSelectedFlow(flow);
  };
  
  const handleSaveFlow = (updatedFlow: AutomationFlow) => {
    const updatedFlows = flows.map(f => 
      f.id === updatedFlow.id ? updatedFlow : f
    );
    setFlows(updatedFlows);
    setSelectedFlow(updatedFlow);
  };
  
  const handleCreateFlow = () => {
    const newFlow: AutomationFlow = {
      id: `flow-${Date.now()}`,
      name: newFlowData.name,
      description: newFlowData.description,
      nodes: [
        {
          id: `node-${Date.now()}-1`,
          type: 'trigger',
          subType: 'event',
          position: { x: 250, y: 100 },
          data: {
            label: 'Start',
            description: 'Flow trigger point'
          }
        },
      ],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setFlows([...flows, newFlow]);
    setSelectedFlow(newFlow);
    setIsNewFlowDialogOpen(false);
    setNewFlowData({ name: '', description: '' });
  };
  
  const addNode = (type: 'trigger' | 'action' | 'outcome') => {
    if (!selectedFlow) return;
    
    // Define sensible defaults for different node types
    let subType: TriggerType | ActionType | OutcomeType;
    let label = '';
    let description = '';
    
    switch (type) {
      case 'trigger':
        subType = 'event' as TriggerType;
        label = 'New Trigger';
        description = 'Flow starting point';
        break;
      case 'action':
        subType = 'script' as ActionType;
        label = 'New Action';
        description = 'Performs an operation';
        break;
      case 'outcome':
        subType = 'success' as OutcomeType;
        label = 'New Outcome';
        description = 'Flow result';
        break;
    }
    
    const newNode: AutomationNode = {
      id: `node-${Date.now()}`,
      type,
      subType,
      position: { x: 250, y: 200 }, // We'll position it somewhere reasonable
      data: {
        label,
        description
      }
    };
    
    const updatedFlow = {
      ...selectedFlow,
      nodes: [...selectedFlow.nodes, newNode],
      updatedAt: new Date().toISOString()
    };
    
    handleSaveFlow(updatedFlow);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Automation Builder</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage automated workflows for regions
          </p>
        </div>
        
        <Button onClick={() => setIsNewFlowDialogOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> New Flow
        </Button>
      </div>
      
      {/* Automation Flows List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flows.map((flow) => (
          <Card 
            key={flow.id} 
            className={`cursor-pointer hover:shadow transition-shadow ${selectedFlow?.id === flow.id ? 'border-primary' : ''}`}
            onClick={() => handleFlowSelect(flow)}
          >
            <CardHeader className="pb-2">
              <CardTitle>{flow.name}</CardTitle>
              <CardDescription>{flow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-muted-foreground">Nodes:</span> {flow.nodes.length}
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span> {new Date(flow.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Selected Flow Tools */}
      {selectedFlow && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{selectedFlow.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedFlow.description}</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => addNode('trigger')}>
                Add Trigger
              </Button>
              <Button variant="outline" size="sm" onClick={() => addNode('action')}>
                Add Action
              </Button>
              <Button variant="outline" size="sm" onClick={() => addNode('outcome')}>
                Add Outcome
              </Button>
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-1" /> Test
              </Button>
            </div>
          </div>
          
          {/* Flow Editor */}
          <FlowEditor flow={selectedFlow} onSave={handleSaveFlow} />
        </div>
      )}
      
      {/* New Flow Dialog */}
      <Dialog open={isNewFlowDialogOpen} onOpenChange={setIsNewFlowDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Automation Flow</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newFlowData.name}
                onChange={(e) => setNewFlowData({...newFlowData, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newFlowData.description}
                onChange={(e) => setNewFlowData({...newFlowData, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFlowDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateFlow}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add CSS for the flow editor */}
      <style>
        {`
        .automation-flow-editor .react-flow__node {
          width: auto;
          transform-origin: center center;
          transition: none;
        }
        
        .automation-flow-editor .react-flow__controls {
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        }
        
        .automation-flow-editor .react-flow__controls button {
          background-color: #1A1F2C;
          color: #fff;
          border-color: #8E9196;
        }
        
        .automation-flow-editor .react-flow__controls button:hover {
          background-color: #222;
        }
        
        .automation-flow-editor .react-flow__minimap {
          background-color: #1A1F2C;
          border: 1px solid #8E9196;
        }
        
        /* Mini map node styles */
        .minimap-node-trigger {
          fill: #3b82f6 !important;
        }
        
        .minimap-node-action {
          fill: #10b981 !important;
        }
        
        .minimap-node-outcome {
          fill: #f97316 !important;
        }
        `}
      </style>
    </div>
  );
};

export default AutomationBuilder;
