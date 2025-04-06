
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Save, Play } from 'lucide-react';
import { toast } from 'sonner';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Edge,
  OnConnect,
  NodeChange,
  EdgeChange,
  Connection,
  XYPosition,
  Node,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AutomationNode, AutomationEdge, AutomationFlow, TriggerType, ActionType, OutcomeType } from '@/types/regions';

// Node components
const TriggerNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 rounded-md bg-blue-500 text-white w-[200px]">
    <div className="font-bold">{data.label}</div>
    <div className="text-xs opacity-80">{data.description || 'Trigger'}</div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-700" />
  </div>
);

const ActionNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 rounded-md bg-green-500 text-white w-[200px]">
    <div className="font-bold">{data.label}</div>
    <div className="text-xs opacity-80">{data.description || 'Action'}</div>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-700" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-700" />
  </div>
);

const OutcomeNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 rounded-md bg-orange-500 text-white w-[200px]">
    <div className="font-bold">{data.label}</div>
    <div className="text-xs opacity-80">{data.description || 'Outcome'}</div>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-orange-700" />
  </div>
);

// Define node types
const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  outcome: OutcomeNode,
};

// Sample flow data
const initialFlow: AutomationFlow = {
  id: 'default-flow',
  name: 'Default Flow',
  description: 'A default automation flow',
  nodes: [
    {
      id: 'trigger-1',
      type: 'trigger',
      subType: 'connectivity_issue',
      position: { x: 250, y: 50 },
      data: { label: 'Connectivity Issue', description: 'Triggered when SD-WAN connection is degraded' }
    },
    {
      id: 'action-1',
      type: 'action',
      subType: 'restart_service',
      position: { x: 250, y: 150 },
      data: { label: 'Restart Service', description: 'Attempts to restart the connection service' }
    },
    {
      id: 'outcome-1',
      type: 'outcome',
      subType: 'email',
      position: { x: 250, y: 250 },
      data: { label: 'Send Email', description: 'Sends notification email to admin' }
    }
  ],
  edges: [
    {
      id: 'edge-trigger-action',
      source: 'trigger-1',
      target: 'action-1',
      animated: true
    },
    {
      id: 'edge-action-outcome',
      source: 'action-1',
      target: 'outcome-1',
      animated: true
    }
  ],
  enabled: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Transform flow for ReactFlow (making sure it's safe from undefined)
const transformFlow = (flow: AutomationFlow) => {
  // Safe conversion of nodes
  const nodes = flow.nodes.map(node => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      ...node.data,
      label: node.data?.label || node.subType || 'Unknown',
      description: node.data?.description || ''
    },
  }));

  // Safe conversion of edges
  const edges = flow.edges.map(edge => ({
    id: edge.id || `edge-${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    animated: edge.animated || false,
    // Only add these properties if they exist
    ...(edge.label && { label: edge.label }),
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#888' }
  }));

  return { nodes, edges };
};

// Flow Editor Component
const FlowEditor = ({ flow, onSave }: { flow: AutomationFlow, onSave: (flow: AutomationFlow) => void }) => {
  const { nodes: initialNodes, edges: initialEdges } = transformFlow(flow);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#888' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }, eds));
  }, [setEdges]);

  const handleSave = () => {
    const updatedFlow: AutomationFlow = {
      ...flow,
      nodes: nodes.map(n => {
        const originalNode = flow.nodes.find(on => on.id === n.id);
        return {
          id: n.id,
          type: n.type as 'trigger' | 'action' | 'outcome',
          subType: originalNode?.subType || ('unknown' as TriggerType | ActionType | OutcomeType), // Cast to correct union type
          position: n.position,
          data: n.data
        };
      }),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: e.animated || false,
        label: typeof e.label === 'string' ? e.label : undefined
      })),
      updatedAt: new Date().toISOString()
    };
    
    onSave(updatedFlow);
    toast.success("Flow saved successfully");
  };

  return (
    <div className="w-full h-[600px] border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      
      <div className="p-2 border-t flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-1">
          <Save className="h-4 w-4" /> Save Flow
        </Button>
      </div>
    </div>
  );
};

// Trigger Options
const triggerOptions: { value: TriggerType; label: string }[] = [
  { value: 'log_entry', label: 'Log Entry' },
  { value: 'connectivity_issue', label: 'Connectivity Issue' },
  { value: 'packet_loss', label: 'Packet Loss' },
  { value: 'storage_issue', label: 'Storage Issue' },
  { value: 'cpu_threshold', label: 'CPU Threshold' },
  { value: 'memory_threshold', label: 'Memory Threshold' },
  { value: 'service_down', label: 'Service Down' },
  { value: 'scheduled', label: 'Scheduled' }
];

// Action Options
const actionOptions: { value: ActionType; label: string }[] = [
  { value: 'alert', label: 'Alert' },
  { value: 'restart_service', label: 'Restart Service' },
  { value: 'run_script', label: 'Run Script' },
  { value: 'scale_resources', label: 'Scale Resources' },
  { value: 'switch_region', label: 'Switch Region' },
  { value: 'enable_failover', label: 'Enable Failover' },
  { value: 'update_policy', label: 'Update Policy' }
];

// Outcome Options
const outcomeOptions: { value: OutcomeType; label: string }[] = [
  { value: 'email', label: 'Send Email' },
  { value: 'sms', label: 'Send SMS' },
  { value: 'push_notification', label: 'Push Notification' },
  { value: 'webhook', label: 'Webhook' },
  { value: 'ticket', label: 'Create Ticket' },
  { value: 'log_event', label: 'Log Event' }
];

// Main Component
const AutomationBuilder = () => {
  const [flows, setFlows] = useState<AutomationFlow[]>([initialFlow]);
  const [selectedFlowId, setSelectedFlowId] = useState<string>(initialFlow.id);

  const selectedFlow = flows.find(f => f.id === selectedFlowId) || flows[0];

  const handleSaveFlow = (updatedFlow: AutomationFlow) => {
    setFlows(currentFlows => 
      currentFlows.map(flow => 
        flow.id === updatedFlow.id ? updatedFlow : flow
      )
    );
  };

  const addNode = (type: 'trigger' | 'action' | 'outcome', subType: TriggerType | ActionType | OutcomeType) => {
    const newNodeId = `${type}-${Date.now()}`;
    const option = 
      type === 'trigger' 
        ? triggerOptions.find(o => o.value === subType) 
        : type === 'action'
          ? actionOptions.find(o => o.value === subType)
          : outcomeOptions.find(o => o.value === subType);
    
    const label = option?.label || 'New Node';
    
    // Calculate position based on existing nodes
    const existingNodes = selectedFlow.nodes.filter(n => n.type === type);
    const baseY = type === 'trigger' ? 50 : type === 'action' ? 150 : 250;
    const xOffset = existingNodes.length * 250 + 50;
    
    const newNode: AutomationNode = {
      id: newNodeId,
      type,
      subType,
      position: { x: xOffset, y: baseY },
      data: { label, description: `${label} description` }
    };
    
    const updatedFlow = {
      ...selectedFlow,
      nodes: [...selectedFlow.nodes, newNode],
      updatedAt: new Date().toISOString()
    };
    
    setFlows(currentFlows =>
      currentFlows.map(flow => 
        flow.id === selectedFlow.id ? updatedFlow : flow
      )
    );
    
    toast.success(`Added new ${type}: ${label}`);
  };

  // Run automation simulation
  const runAutomation = () => {
    toast.info("Running automation flow simulation...");
    setTimeout(() => {
      toast.success("Automation flow completed successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <Label htmlFor="add-trigger">Add Trigger</Label>
              <div className="flex items-center gap-2 mt-1">
                <Select onValueChange={(value) => addNode('trigger', value as TriggerType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="add-action">Add Action</Label>
              <div className="flex items-center gap-2 mt-1">
                <Select onValueChange={(value) => addNode('action', value as ActionType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    {actionOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="add-outcome">Add Outcome</Label>
              <div className="flex items-center gap-2 mt-1">
                <Select onValueChange={(value) => addNode('outcome', value as OutcomeType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    {outcomeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="ml-auto">
              <Button onClick={runAutomation} variant="default" className="flex items-center gap-1">
                <Play className="h-4 w-4" /> Run Automation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Flow Editor */}
      <FlowEditor flow={selectedFlow} onSave={handleSaveFlow} />
    </div>
  );
};

export default AutomationBuilder;
