
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Save, Edit, Trash, Copy, X, Check, FileCode, Box } from 'lucide-react';
import { Zone } from '@/components/zones/types';
import { 
  ReactFlow,
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  type Node,
  type Edge,
  Connection,
  MarkerType,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type AutomationFlow, type AutomationNode, type AutomationEdge, type TriggerType, type ActionType, type OutcomeType } from '@/types/automation-flow';

type NodeData = {
  label: string;
  description: string;
  type?: string;
  subType?: string;
};

const nodeTypes = {
  trigger: ({ data }: { data: NodeData }) => (
    <div className="p-3 rounded-lg bg-blue-100 border border-blue-300 shadow-sm">
      <div className="font-semibold text-blue-800">{data.label}</div>
      <div className="text-xs text-blue-600 mt-1">{data.description}</div>
      <Badge variant="outline" className="mt-2 bg-blue-50">{data.subType}</Badge>
    </div>
  ),
  action: ({ data }: { data: NodeData }) => (
    <div className="p-3 rounded-lg bg-purple-100 border border-purple-300 shadow-sm">
      <div className="font-semibold text-purple-800">{data.label}</div>
      <div className="text-xs text-purple-600 mt-1">{data.description}</div>
      <Badge variant="outline" className="mt-2 bg-purple-50">{data.subType}</Badge>
    </div>
  ),
  outcome: ({ data }: { data: NodeData }) => (
    <div className="p-3 rounded-lg bg-green-100 border border-green-300 shadow-sm">
      <div className="font-semibold text-green-800">{data.label}</div>
      <div className="text-xs text-green-600 mt-1">{data.description}</div>
      <Badge variant="outline" className="mt-2 bg-green-50">{data.subType}</Badge>
    </div>
  ),
};

// This is a simplified version for the zone-specific automation flows
const initialEmptyFlow: AutomationFlow = {
  id: '',
  name: 'New Automation Flow',
  description: 'Describe your automation flow',
  nodes: [],
  edges: [],
  createdBy: 'Admin',
  lastModified: new Date().toISOString(),
  status: 'draft',
  version: 1,
  createdAt: new Date().toISOString(),
};

// Example zone-specific flows (would come from an API in a real application)
const sampleZoneFlows: AutomationFlow[] = [
  {
    id: 'zone-flow-1',
    name: 'Zone Backup Verification',
    description: 'Automated NestVault backup verification for this zone',
    nodes: [
      {
        id: 'ztrigger-1',
        type: 'trigger',
        subType: 'schedule',
        position: { x: 100, y: 100 },
        data: { label: 'Daily Backup Check', description: 'Runs at 3 AM daily' }
      },
      {
        id: 'zaction-1',
        type: 'action',
        subType: 'script',
        position: { x: 100, y: 250 },
        data: { label: 'Verify Backup Integrity', description: 'Check backup files' }
      },
      {
        id: 'zoutcome-1',
        type: 'outcome',
        subType: 'conditional',
        position: { x: 100, y: 400 },
        data: { label: 'Backup Status', description: 'Reports backup health' }
      }
    ],
    edges: [
      {
        id: 'ze1-2',
        source: 'ztrigger-1',
        target: 'zaction-1',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      },
      {
        id: 'ze2-3',
        source: 'zaction-1',
        target: 'zoutcome-1',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }
    ],
    createdBy: 'Zone Admin',
    lastModified: '2025-02-15T09:30:00Z',
    status: 'active',
    version: 1,
    createdAt: '2025-02-10T14:20:00Z'
  }
];

interface ZoneAutomationBuilderProps {
  zone: Zone;
}

const ZoneAutomationBuilder: React.FC<ZoneAutomationBuilderProps> = ({ zone }) => {
  const [flows, setFlows] = useState<AutomationFlow[]>(sampleZoneFlows);
  const [selectedFlow, setSelectedFlow] = useState<AutomationFlow | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAddNodeDialogOpen, setIsAddNodeDialogOpen] = useState(false);
  const [nodeFormData, setNodeFormData] = useState({
    type: 'trigger' as 'trigger' | 'action' | 'outcome',
    subType: '' as TriggerType | ActionType | OutcomeType,
    label: '',
    description: '',
  });
  const [isEditFlowDialogOpen, setIsEditFlowDialogOpen] = useState(false);
  const [flowFormData, setFlowFormData] = useState({
    name: '',
    description: '',
    status: 'draft' as 'draft' | 'active' | 'inactive',
  });
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Initialize with the first flow if available
  useEffect(() => {
    if (flows.length > 0 && !selectedFlow) {
      handleSelectFlow(flows[0]);
    }
  }, [flows]);

  const handleSelectFlow = (flow: AutomationFlow) => {
    setSelectedFlow(flow);
    
    // Convert the flow nodes and edges to ReactFlow format
    const flowNodes = flow.nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: { 
        ...node.data,
        subType: node.subType
      }
    }));
    
    // Convert edges and ensure all required properties are present
    const flowEdges = flow.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: edge.animated || false, // Provide default for optional property
      style: edge.style || { stroke: '#2563eb' }, // Provide default style
      markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed }, // Provide default marker
      sourceHandle: edge.sourceHandle || null, // Provide default for optional property
      targetHandle: edge.targetHandle || null, // Provide default for optional property
    }));
    
    setNodes(flowNodes);
    setEdges(flowEdges);
  };

  const handleCreateFlow = () => {
    const newFlow = {
      ...initialEmptyFlow,
      id: `zone-flow-${Date.now()}`,
      name: 'New Zone Flow',
      description: `Automation flow for ${zone.name} zone`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setFlows([...flows, newFlow]);
    handleSelectFlow(newFlow);
    handleEditFlowMetadata(newFlow);
  };

  const handleDuplicateFlow = (flow: AutomationFlow) => {
    const duplicatedFlow = {
      ...flow,
      id: `zone-flow-${Date.now()}`,
      name: `${flow.name} (Copy)`,
      lastModified: new Date().toISOString(),
      status: 'draft' as const,
    };
    setFlows([...flows, duplicatedFlow]);
    toast.success("Flow duplicated successfully");
  };

  const handleDeleteFlow = (flowId: string) => {
    const updatedFlows = flows.filter(flow => flow.id !== flowId);
    setFlows(updatedFlows);
    
    // If the deleted flow was selected, select the first available flow or clear selection
    if (selectedFlow?.id === flowId) {
      if (updatedFlows.length > 0) {
        handleSelectFlow(updatedFlows[0]);
      } else {
        setSelectedFlow(null);
        setNodes([]);
        setEdges([]);
      }
    }
    
    toast.success("Flow deleted successfully");
  };

  const handleEditFlowMetadata = (flow: AutomationFlow) => {
    setFlowFormData({
      name: flow.name,
      description: flow.description,
      status: flow.status,
    });
    setIsEditFlowDialogOpen(true);
  };

  const handleSaveFlowMetadata = () => {
    if (!selectedFlow) return;
    
    const updatedFlow = {
      ...selectedFlow,
      name: flowFormData.name,
      description: flowFormData.description,
      status: flowFormData.status,
      lastModified: new Date().toISOString(),
    };
    
    setFlows(flows.map(flow => flow.id === selectedFlow.id ? updatedFlow : flow));
    setSelectedFlow(updatedFlow);
    setIsEditFlowDialogOpen(false);
    toast.success("Flow details updated");
  };

  const handleSaveFlow = () => {
    if (!selectedFlow) return;
    
    // Convert ReactFlow nodes and edges back to AutomationFlow format
    const updatedNodes = nodes.map(node => ({
      id: node.id,
      type: node.type as 'trigger' | 'action' | 'outcome',
      subType: node.data.subType as any,
      position: node.position,
      data: {
        label: node.data.label,
        description: node.data.description,
      },
    }));
    
    const updatedFlow = {
      ...selectedFlow,
      nodes: updatedNodes,
      edges: edges as AutomationEdge[],
      lastModified: new Date().toISOString(),
    };
    
    setFlows(flows.map(flow => flow.id === selectedFlow.id ? updatedFlow : flow));
    setSelectedFlow(updatedFlow);
    toast.success("Flow saved successfully");
  };

  const onConnect = useCallback((connection: Connection) => {
    setEdges(eds => addEdge({
      ...connection,
      animated: true,
      style: { stroke: '#2563eb' },
      markerEnd: { type: MarkerType.ArrowClosed },
    }, eds));
  }, [setEdges]);

  const getNodeTypesForCurrentSelection = () => {
    switch(nodeFormData.type) {
      case 'trigger':
        return [
          { value: 'schedule', label: 'Schedule' },
          { value: 'event', label: 'Event' },
          { value: 'condition', label: 'Condition' },
          { value: 'manual', label: 'Manual' },
        ];
      case 'action':
        return [
          { value: 'script', label: 'Script' },
          { value: 'api', label: 'API Call' },
          { value: 'notification', label: 'Notification' },
          { value: 'email', label: 'Email' },
        ];
      case 'outcome':
        return [
          { value: 'success', label: 'Success' },
          { value: 'failure', label: 'Failure' },
          { value: 'conditional', label: 'Conditional' },
        ];
      default:
        return [];
    }
  };

  const handleAddNode = () => {
    if (!reactFlowWrapper.current) return;
    
    // Calculate position for new node - center of the visible area
    // This is a simplified approach; you may want to position based on existing nodes
    const position = { x: 100, y: 100 };
    
    const newNode: Node<NodeData> = {
      id: `${nodeFormData.type}-${Date.now()}`,
      type: nodeFormData.type,
      position,
      data: {
        label: nodeFormData.label,
        description: nodeFormData.description,
        subType: nodeFormData.subType
      },
    };
    
    setNodes(nds => [...nds, newNode]);
    setIsAddNodeDialogOpen(false);
    setNodeFormData({
      type: 'trigger',
      subType: '' as TriggerType,
      label: '',
      description: '',
    });
  };

  const handleStartResizing = () => {
    setIsResizing(true);
  };
  
  const handleResizing = (e: React.MouseEvent) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < 500) {
      setSidebarWidth(newWidth);
    }
  };
  
  const handleStopResizing = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizing as any);
      document.addEventListener('mouseup', handleStopResizing);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleResizing as any);
      document.removeEventListener('mouseup', handleStopResizing);
    };
  }, [isResizing]);

  return (
    <div className="h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Zone Automation Builder</h2>
          <p className="text-muted-foreground">
            Create and manage automation flows for {zone.name}
          </p>
        </div>
        
        <div className="space-x-2">
          <Button
            onClick={() => setIsAddNodeDialogOpen(true)}
            disabled={!selectedFlow}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Node
          </Button>
          
          <Button
            onClick={handleSaveFlow}
            disabled={!selectedFlow}
            variant="default"
            size="sm"
          >
            <Save className="w-4 h-4 mr-1" />
            Save Flow
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 border rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div 
          className="bg-muted/50 p-4 flex flex-col overflow-y-auto"
          style={{ width: `${sidebarWidth}px`, minWidth: '200px', maxWidth: '500px' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Automation Flows</h3>
            <Button onClick={handleCreateFlow} size="sm" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2 flex-1 overflow-y-auto">
            {flows.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileCode className="w-10 h-10 mx-auto opacity-50 mb-2" />
                <p>No automation flows created yet</p>
                <Button onClick={handleCreateFlow} variant="link" size="sm">
                  Create your first flow
                </Button>
              </div>
            ) : (
              flows.map(flow => (
                <div 
                  key={flow.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedFlow?.id === flow.id ? 'bg-primary/10 border-primary/30' : 'bg-card hover:bg-accent/50'
                  }`}
                  onClick={() => handleSelectFlow(flow)}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{flow.name}</div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-6 h-6" 
                        onClick={(e) => { 
                          e.stopPropagation();
                          handleEditFlowMetadata(flow);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-6 h-6" 
                        onClick={(e) => { 
                          e.stopPropagation();
                          handleDuplicateFlow(flow);
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-6 h-6 text-destructive hover:text-destructive" 
                        onClick={(e) => { 
                          e.stopPropagation();
                          handleDeleteFlow(flow.id);
                        }}
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">{flow.description}</div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={
                      flow.status === 'active' ? 'default' :
                      flow.status === 'inactive' ? 'secondary' : 'outline'
                    }>
                      {flow.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      v{flow.version}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Resizer handle */}
        <div
          className="w-1 bg-border hover:bg-primary/50 cursor-col-resize"
          onMouseDown={handleStartResizing}
        />
        
        {/* Flow editor */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          {selectedFlow ? (
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
              <MiniMap />
              <Background />
              <Panel position="top-right">
                <div className="bg-card p-2 rounded-md shadow-sm">
                  <div className="text-sm font-medium">{selectedFlow.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Last modified: {new Date(selectedFlow.lastModified).toLocaleDateString()}
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Box className="w-12 h-12 mx-auto opacity-30 mb-3" />
                <h3 className="font-medium mb-2">No Flow Selected</h3>
                <p className="text-muted-foreground max-w-md text-sm mb-4">
                  Select an existing automation flow from the sidebar or create a new one to get started.
                </p>
                <Button onClick={handleCreateFlow}>Create New Flow</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Node Dialog */}
      <Dialog open={isAddNodeDialogOpen} onOpenChange={setIsAddNodeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Automation Node</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="node-type">Node Type</Label>
                <Select 
                  value={nodeFormData.type} 
                  onValueChange={(value: 'trigger' | 'action' | 'outcome') => 
                    setNodeFormData({ ...nodeFormData, type: value, subType: '' as any })}
                >
                  <SelectTrigger id="node-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trigger">Trigger</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="outcome">Outcome</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="subtype">Subtype</Label>
                <Select 
                  value={nodeFormData.subType} 
                  onValueChange={(value) => 
                    setNodeFormData({ ...nodeFormData, subType: value as any })}
                  disabled={!nodeFormData.type}
                >
                  <SelectTrigger id="subtype">
                    <SelectValue placeholder="Select subtype" />
                  </SelectTrigger>
                  <SelectContent>
                    {getNodeTypesForCurrentSelection().map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={nodeFormData.label}
                onChange={(e) => setNodeFormData({ ...nodeFormData, label: e.target.value })}
                placeholder="Node Label"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={nodeFormData.description}
                onChange={(e) => setNodeFormData({ ...nodeFormData, description: e.target.value })}
                placeholder="Describe what this node does"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNodeDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddNode}
              disabled={!nodeFormData.label || !nodeFormData.subType}
            >
              Add Node
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Flow Dialog */}
      <Dialog open={isEditFlowDialogOpen} onOpenChange={setIsEditFlowDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Flow Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="flow-name">Flow Name</Label>
              <Input
                id="flow-name"
                value={flowFormData.name}
                onChange={(e) => setFlowFormData({ ...flowFormData, name: e.target.value })}
                placeholder="Flow Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flow-description">Description</Label>
              <Textarea
                id="flow-description"
                value={flowFormData.description}
                onChange={(e) => setFlowFormData({ ...flowFormData, description: e.target.value })}
                placeholder="Describe what this flow does"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flow-status">Status</Label>
              <Select 
                value={flowFormData.status} 
                onValueChange={(value: 'draft' | 'active' | 'inactive') => 
                  setFlowFormData({ ...flowFormData, status: value })}
              >
                <SelectTrigger id="flow-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditFlowDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveFlowMetadata}
              disabled={!flowFormData.name}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ZoneAutomationBuilder;
