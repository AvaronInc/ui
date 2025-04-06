
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  MarkerType,
  NodeTypes,
  Node,
  EdgeTypes,
} from '@xyflow/react';
import { Plus, X, Save, Copy, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  AutomationFlow,
  AutomationNode,
  AutomationEdge,
  TriggerType,
  ActionType,
  OutcomeType,
  NodeType
} from '@/types/automation-flow';
import type { Zone } from '@/components/zones/types';
import '@xyflow/react/dist/style.css';

// Custom nodes for different types
const TriggerNode = ({ data }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-blue-500/10 border border-blue-500 rounded-lg min-w-[150px]">
    <div className="text-blue-600 font-semibold">{data.label}</div>
    <div className="text-xs text-muted-foreground mt-1">{data.description}</div>
  </div>
);

const ActionNode = ({ data }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-green-500/10 border border-green-500 rounded-lg min-w-[150px]">
    <div className="text-green-600 font-semibold">{data.label}</div>
    <div className="text-xs text-muted-foreground mt-1">{data.description}</div>
  </div>
);

const OutcomeNode = ({ data }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-purple-500/10 border border-purple-500 rounded-lg min-w-[150px]">
    <div className="text-purple-600 font-semibold">{data.label}</div>
    <div className="text-xs text-muted-foreground mt-1">{data.description}</div>
  </div>
);

// Sample initial flows for a zone - this would usually come from an API
const createDefaultZoneFlow = (zoneId: string): AutomationFlow => ({
  id: `zone-flow-${zoneId}-default`,
  name: 'Default Zone Workflow',
  description: 'Default automation workflow for this zone',
  nodes: [
    {
      id: `trigger-${zoneId}-1`,
      type: 'trigger' as const,
      subType: 'event' as TriggerType,
      position: { x: 100, y: 100 },
      data: { label: 'Zone Alert Triggered', description: 'Triggered when the zone detects an issue' }
    },
    {
      id: `action-${zoneId}-1`,
      type: 'action' as const,
      subType: 'notification' as ActionType,
      position: { x: 100, y: 250 },
      data: { label: 'Send Zone Alert', description: 'Notify administrators about the issue' }
    },
    {
      id: `outcome-${zoneId}-1`,
      type: 'outcome' as const,
      subType: 'success' as OutcomeType,
      position: { x: 100, y: 400 },
      data: { label: 'Notification Sent', description: 'Alert was successfully delivered' }
    }
  ],
  edges: [
    {
      id: `edge-${zoneId}-1-2`,
      source: `trigger-${zoneId}-1`,
      target: `action-${zoneId}-1`,
      animated: true,
      style: { stroke: '#2563eb' },
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    },
    {
      id: `edge-${zoneId}-2-3`,
      source: `action-${zoneId}-1`,
      target: `outcome-${zoneId}-1`,
      animated: true,
      style: { stroke: '#2563eb' },
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    }
  ],
  createdBy: 'System',
  lastModified: new Date().toISOString(),
  status: 'active',
  version: 1,
  createdAt: new Date().toISOString()
});

// Generate mock flows for a zone
const generateZoneFlows = (zoneId: string): AutomationFlow[] => {
  return [
    createDefaultZoneFlow(zoneId),
    {
      id: `zone-flow-${zoneId}-maintenance`,
      name: 'Scheduled Maintenance',
      description: 'Automated zone maintenance workflow',
      nodes: [
        {
          id: `trigger-${zoneId}-maint-1`,
          type: 'trigger' as const,
          subType: 'schedule' as TriggerType,
          position: { x: 150, y: 100 },
          data: { label: 'Weekly Maintenance', description: 'Runs every Sunday at 2 AM' }
        },
        {
          id: `action-${zoneId}-maint-1`,
          type: 'action' as const,
          subType: 'script' as ActionType,
          position: { x: 150, y: 250 },
          data: { label: 'Run Zone Health Check', description: 'Execute comprehensive diagnostics' }
        },
        {
          id: `action-${zoneId}-maint-2`,
          type: 'action' as const,
          subType: 'script' as ActionType,
          position: { x: 350, y: 250 },
          data: { label: 'Optimize Resources', description: 'Balance zone resource allocation' }
        },
        {
          id: `outcome-${zoneId}-maint-1`,
          type: 'outcome' as const,
          subType: 'conditional' as OutcomeType,
          position: { x: 250, y: 400 },
          data: { label: 'Maintenance Complete', description: 'All maintenance tasks completed' }
        }
      ],
      edges: [
        {
          id: `edge-${zoneId}-maint-1-2`,
          source: `trigger-${zoneId}-maint-1`,
          target: `action-${zoneId}-maint-1`,
          animated: true,
          style: { stroke: '#2563eb' },
          markerEnd: {
            type: MarkerType.ArrowClosed
          }
        },
        {
          id: `edge-${zoneId}-maint-1-3`,
          source: `trigger-${zoneId}-maint-1`,
          target: `action-${zoneId}-maint-2`,
          animated: true,
          style: { stroke: '#2563eb' },
          markerEnd: {
            type: MarkerType.ArrowClosed
          }
        },
        {
          id: `edge-${zoneId}-maint-2-4`,
          source: `action-${zoneId}-maint-1`,
          target: `outcome-${zoneId}-maint-1`,
          animated: true,
          style: { stroke: '#2563eb' },
          markerEnd: {
            type: MarkerType.ArrowClosed
          }
        },
        {
          id: `edge-${zoneId}-maint-3-4`,
          source: `action-${zoneId}-maint-2`,
          target: `outcome-${zoneId}-maint-1`,
          animated: true,
          style: { stroke: '#2563eb' },
          markerEnd: {
            type: MarkerType.ArrowClosed
          }
        }
      ],
      createdBy: 'System Admin',
      lastModified: new Date().toISOString(),
      status: 'active',
      version: 1,
      createdAt: new Date().toISOString()
    }
  ];
};

interface ZoneAutomationBuilderProps {
  zone: Zone;
}

const ZoneAutomationBuilder: React.FC<ZoneAutomationBuilderProps> = ({ zone }) => {
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [flows, setFlows] = useState<AutomationFlow[]>(() => generateZoneFlows(zone.id));
  const [activeFlowId, setActiveFlowId] = useState<string | null>(flows[0]?.id || null);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNodeType, setNewNodeType] = useState<NodeType>('trigger');
  const [newNodeSubType, setNewNodeSubType] = useState<TriggerType | ActionType | OutcomeType>('event');
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeDescription, setNewNodeDescription] = useState('');
  const [isAddingFlow, setIsAddingFlow] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  const [newFlowDescription, setNewFlowDescription] = useState('');

  // Get the active flow based on the active ID
  const activeFlow = flows.find(flow => flow.id === activeFlowId) || flows[0];

  // Set up nodes and edges states
  const [nodes, setNodes, onNodesChange] = useNodesState(activeFlow?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(activeFlow?.edges || []);

  // Define the node types for ReactFlow
  const nodeTypes: NodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    outcome: OutcomeNode,
  };

  // Handle connection between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `edge-${Math.random().toString(36).substring(2, 9)}`,
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Update active flow when switching between flows
  const handleFlowSelect = (flowId: string) => {
    const selectedFlow = flows.find(flow => flow.id === flowId);
    if (selectedFlow) {
      setActiveFlowId(flowId);
      setNodes(selectedFlow.nodes);
      setEdges(selectedFlow.edges);
    }
  };

  // Add a new node to the canvas
  const addNode = () => {
    if (!newNodeLabel) {
      toast({
        title: "Error",
        description: "Node label is required",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new node based on selected type
    const newNode: AutomationNode = {
      id: `${newNodeType}-${Math.random().toString(36).substring(2, 9)}`,
      type: newNodeType,
      subType: newNodeSubType,
      position: { x: 100, y: 100 },
      data: { label: newNodeLabel, description: newNodeDescription }
    } as AutomationNode;
    
    setNodes(nds => [...nds, newNode]);
    setIsAddingNode(false);
    setNewNodeLabel('');
    setNewNodeDescription('');
  };

  // Save the current flow state
  const saveFlow = () => {
    if (!activeFlowId) return;

    const updatedFlow = {
      ...activeFlow,
      nodes,
      edges,
      lastModified: new Date().toISOString(),
    };

    setFlows(currentFlows => 
      currentFlows.map(flow => 
        flow.id === activeFlowId ? updatedFlow : flow
      )
    );

    toast({
      title: "Flow Saved",
      description: `Flow "${updatedFlow.name}" has been saved successfully.`
    });
  };

  // Create a new flow
  const createFlow = () => {
    if (!newFlowName) {
      toast({
        title: "Error",
        description: "Flow name is required",
        variant: "destructive"
      });
      return;
    }
    
    const newFlow: AutomationFlow = {
      id: `flow-${Math.random().toString(36).substring(2, 9)}`,
      name: newFlowName,
      description: newFlowDescription,
      nodes: [],
      edges: [],
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: 'draft',
      version: 1
    };
    
    setFlows([...flows, newFlow]);
    setActiveFlowId(newFlow.id);
    setNodes([]);
    setEdges([]);
    setIsAddingFlow(false);
    setNewFlowName('');
    setNewFlowDescription('');
  };

  // Duplicate the current flow
  const duplicateFlow = () => {
    if (!activeFlow) return;
    
    const duplicatedFlow: AutomationFlow = {
      ...activeFlow,
      id: `flow-${Math.random().toString(36).substring(2, 9)}`,
      name: `${activeFlow.name} (Copy)`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: 1
    };
    
    setFlows([...flows, duplicatedFlow]);
    toast({
      title: "Flow Duplicated",
      description: `"${duplicatedFlow.name}" has been created.`
    });
  };

  // Delete the current flow
  const deleteFlow = (flowId: string) => {
    if (flows.length <= 1) {
      toast({
        title: "Error",
        description: "Cannot delete the only flow",
        variant: "destructive"
      });
      return;
    }
    
    const updatedFlows = flows.filter(flow => flow.id !== flowId);
    setFlows(updatedFlows);
    
    // If we're deleting the active flow, switch to another one
    if (flowId === activeFlowId) {
      setActiveFlowId(updatedFlows[0].id);
      setNodes(updatedFlows[0].nodes);
      setEdges(updatedFlows[0].edges);
    }
    
    toast({
      title: "Flow Deleted",
      description: "The flow has been deleted successfully."
    });
  };

  // Get appropriate sub-types based on selected node type
  const getSubTypeOptions = () => {
    switch (newNodeType) {
      case 'trigger':
        return (
          <>
            <SelectItem value="schedule">Schedule</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="condition">Condition</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </>
        );
      case 'action':
        return (
          <>
            <SelectItem value="script">Script</SelectItem>
            <SelectItem value="api">API Call</SelectItem>
            <SelectItem value="notification">Notification</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </>
        );
      case 'outcome':
        return (
          <>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failure">Failure</SelectItem>
            <SelectItem value="conditional">Conditional</SelectItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[70vh]">
      {/* Flow Sidebar */}
      <div className="w-72 border-r bg-background p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Zone Automation</h3>
          <Button size="sm" variant="outline" onClick={() => setIsAddingFlow(true)}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-1">
            {flows.map(flow => (
              <div
                key={flow.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  activeFlowId === flow.id ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
                onClick={() => handleFlowSelect(flow.id)}
              >
                <div>
                  <div className="font-medium">{flow.name}</div>
                  <div className="text-xs text-muted-foreground">{flow.description}</div>
                </div>
                <Badge variant={flow.status === 'active' ? 'default' : 'outline'}>
                  {flow.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {activeFlow && (
          <div className="mt-4 border-t pt-4 space-y-2">
            <Button size="sm" variant="secondary" className="w-full" onClick={saveFlow}>
              <Save className="h-4 w-4 mr-2" /> Save Flow
            </Button>
            <Button size="sm" variant="outline" className="w-full" onClick={duplicateFlow}>
              <Copy className="h-4 w-4 mr-2" /> Duplicate
            </Button>
            <Button 
              size="sm" 
              variant="destructive" 
              className="w-full" 
              onClick={() => deleteFlow(activeFlow.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </div>
        )}
      </div>
      
      {/* Flow Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Actions toolbar */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{activeFlow?.name}</h2>
            <p className="text-sm text-muted-foreground">{activeFlow?.description}</p>
          </div>
          <Button onClick={() => setIsAddingNode(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </div>
        
        {/* ReactFlow canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          {activeFlow && (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          )}
        </div>
      </div>
      
      {/* Add Node Dialog */}
      <Dialog open={isAddingNode} onOpenChange={setIsAddingNode}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Node</DialogTitle>
            <DialogDescription>
              Create a new node for your automation flow.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="node-type" className="text-right">Type</label>
              <Select
                value={newNodeType}
                onValueChange={(value) => setNewNodeType(value as NodeType)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trigger">Trigger</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="outcome">Outcome</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="node-subtype" className="text-right">Subtype</label>
              <Select 
                value={newNodeSubType}
                onValueChange={(value) => setNewNodeSubType(value as TriggerType | ActionType | OutcomeType)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select subtype" />
                </SelectTrigger>
                <SelectContent>
                  {getSubTypeOptions()}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="node-label" className="text-right">Label</label>
              <Input
                id="node-label"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                className="col-span-3"
                placeholder="Enter node label"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="node-description" className="text-right">Description</label>
              <Textarea
                id="node-description"
                value={newNodeDescription}
                onChange={(e) => setNewNodeDescription(e.target.value)}
                className="col-span-3"
                placeholder="Enter node description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNode(false)}>Cancel</Button>
            <Button onClick={addNode}>Add Node</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Flow Dialog */}
      <Dialog open={isAddingFlow} onOpenChange={setIsAddingFlow}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Flow</DialogTitle>
            <DialogDescription>
              Create a new automation flow for this zone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="flow-name" className="text-right">Name</label>
              <Input
                id="flow-name"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                className="col-span-3"
                placeholder="Enter flow name"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="flow-description" className="text-right">Description</label>
              <Textarea
                id="flow-description"
                value={newFlowDescription}
                onChange={(e) => setNewFlowDescription(e.target.value)}
                className="col-span-3"
                placeholder="Enter flow description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingFlow(false)}>Cancel</Button>
            <Button onClick={createFlow}>Create Flow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ZoneAutomationBuilder;
