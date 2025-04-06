
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MarkerType } from '@xyflow/react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  ConnectionLineType,
  NodeTypes as XYFlowNodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Save, List, Trash2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  TriggerNode,
  ActionNode, 
  OutcomeNode, 
  AutomationNode, 
  AutomationEdge,
  AutomationFlow
} from '@/types/automation-flow';
import { Zone } from '@/components/zones/types';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAutomationFlows } from '@/components/regions/tabs/mockAutomationFlows';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Custom node components
const TriggerNodeComponent = ({ data }: { data: any }) => (
  <div className="p-4 rounded-lg border bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 min-w-[180px]">
    <div className="font-semibold mb-1 text-purple-800 dark:text-purple-300">
      {data.label}
    </div>
    <div className="text-xs text-gray-600 dark:text-gray-300">
      {data.description}
    </div>
  </div>
);

const ActionNodeComponent = ({ data }: { data: any }) => (
  <div className="p-4 rounded-lg border bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 min-w-[180px]">
    <div className="font-semibold mb-1 text-blue-800 dark:text-blue-300">
      {data.label}
    </div>
    <div className="text-xs text-gray-600 dark:text-gray-300">
      {data.description}
    </div>
  </div>
);

const OutcomeNodeComponent = ({ data }: { data: any }) => (
  <div className="p-4 rounded-lg border bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600 min-w-[180px]">
    <div className="font-semibold mb-1 text-green-800 dark:text-green-300">
      {data.label}
    </div>
    <div className="text-xs text-gray-600 dark:text-gray-300">
      {data.description}
    </div>
  </div>
);

const nodeTypes = {
  trigger: TriggerNodeComponent,
  action: ActionNodeComponent,
  outcome: OutcomeNodeComponent
};

// Type for available node types to add to the flow
interface NodeTypeOption {
  type: 'trigger' | 'action' | 'outcome';
  subType: string;
  label: string;
  description: string;
}

const triggerNodeOptions: NodeTypeOption[] = [
  {
    type: 'trigger',
    subType: 'schedule',
    label: 'Schedule',
    description: 'Trigger on a time-based schedule'
  },
  {
    type: 'trigger',
    subType: 'event',
    label: 'Event',
    description: 'Trigger on a specific event'
  },
  {
    type: 'trigger',
    subType: 'condition',
    label: 'Condition',
    description: 'Trigger when a condition is met'
  },
  {
    type: 'trigger',
    subType: 'manual',
    label: 'Manual',
    description: 'Manually triggered flow'
  }
];

const actionNodeOptions: NodeTypeOption[] = [
  {
    type: 'action',
    subType: 'script',
    label: 'Execute Script',
    description: 'Run a script or command'
  },
  {
    type: 'action',
    subType: 'api',
    label: 'API Call',
    description: 'Call an external API'
  },
  {
    type: 'action',
    subType: 'notification',
    label: 'Send Notification',
    description: 'Send alert or notification'
  },
  {
    type: 'action',
    subType: 'email',
    label: 'Send Email',
    description: 'Send an email notification'
  }
];

const outcomeNodeOptions: NodeTypeOption[] = [
  {
    type: 'outcome',
    subType: 'success',
    label: 'Success',
    description: 'Successful completion'
  },
  {
    type: 'outcome',
    subType: 'failure',
    label: 'Failure',
    description: 'Failed completion'
  },
  {
    type: 'outcome',
    subType: 'conditional',
    label: 'Conditional',
    description: 'Conditional branch'
  }
];

interface ZoneAutomationBuilderProps {
  zone: Zone;
}

const ZoneAutomationBuilder: React.FC<ZoneAutomationBuilderProps> = ({ zone }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [selectedFlow, setSelectedFlow] = useState<AutomationFlow | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<AutomationNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AutomationEdge>([]);
  const [showAddNode, setShowAddNode] = useState(false);
  const [nodePanel, setNodePanel] = useState<'trigger' | 'action' | 'outcome'>('trigger');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode is enabled in the document
    return document.documentElement.classList.contains('dark');
  });
  const { toast } = useToast();

  // Monitor for theme changes
  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Get a filtered list of automation flows for this specific zone
  const zoneAutomationFlows = mockAutomationFlows.filter(
    flow => flow.name.toLowerCase().includes(zone.name.toLowerCase())
  );

  // If no zone-specific flows, use the mock flows
  const flows = zoneAutomationFlows.length > 0 ? zoneAutomationFlows : mockAutomationFlows;

  // Load a flow when selected
  const loadFlow = useCallback((flow: AutomationFlow) => {
    setSelectedFlow(flow);
    const typedNodes: AutomationNode[] = flow.nodes.map(node => {
      // Ensure each node conforms to the expected types
      if (node.type === 'trigger') {
        return node as TriggerNode;
      } else if (node.type === 'action') {
        return node as ActionNode;
      } else {
        return node as OutcomeNode;
      }
    });
    
    setNodes(typedNodes);
    
    // Ensure edges have all required properties with defaults
    const typedEdges: Edge[] = flow.edges.map(edge => ({
      ...edge,
      animated: edge.animated || false,
      style: edge.style || { stroke: '#2563eb' },
      markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
      sourceHandle: edge.sourceHandle || null,
      targetHandle: edge.targetHandle || null
    }));
    
    setEdges(typedEdges);
  }, [setNodes, setEdges]);

  // Add a new node to the flow
  const addNode = useCallback((nodeOption: NodeTypeOption) => {
    const newNode: AutomationNode = {
      id: `${nodeOption.type}-${Date.now()}`,
      type: nodeOption.type,
      subType: nodeOption.subType,
      position: { x: 100, y: 100 + (nodes.length * 100) },
      data: { label: nodeOption.label, description: nodeOption.description }
    } as AutomationNode;
    
    if (nodeOption.type === 'trigger') {
      setNodes(nds => [...nds, newNode as TriggerNode]);
    } else if (nodeOption.type === 'action') {
      setNodes(nds => [...nds, newNode as ActionNode]);
    } else if (nodeOption.type === 'outcome') {
      setNodes(nds => [...nds, newNode as OutcomeNode]);
    }
    
    setShowAddNode(false);
  }, [nodes, setNodes]);

  // Handle connections between nodes
  const onConnect = useCallback((params: Connection) => {
    const newEdge: Edge = {
      ...params,
      id: `e-${params.source}-${params.target}`,
      animated: true,
      style: { stroke: '#2563eb' },
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    };
    setEdges(eds => addEdge(newEdge, eds));
  }, [setEdges]);

  // Save the current flow
  const saveFlow = useCallback(() => {
    if (!selectedFlow) return;
    
    // Here you would implement the actual save functionality
    toast({
      title: "Flow Saved",
      description: `${selectedFlow.name} has been saved successfully.`
    });
  }, [selectedFlow, toast]);

  // Create a new flow
  const createNewFlow = useCallback(() => {
    const newFlow: AutomationFlow = {
      id: `flow-${Date.now()}`,
      name: `New Flow for ${zone.name}`,
      description: 'Add a description for this flow',
      nodes: [],
      edges: [],
      createdBy: 'Current User',
      lastModified: new Date().toISOString(),
      status: 'draft',
      version: 1,
      createdAt: new Date().toISOString()
    };
    
    setSelectedFlow(newFlow);
    setNodes([]);
    setEdges([]);
    
    toast({
      title: "New Flow Created",
      description: "Start by adding nodes to your flow"
    });
  }, [setNodes, setEdges, toast, zone.name]);

  return (
    <div className="h-[70vh] border rounded-lg overflow-hidden flex flex-col">
      {/* Top toolbar */}
      <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">
            {selectedFlow ? selectedFlow.name : "Zone Automation Builder"}
          </h3>
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <List className="h-4 w-4 mr-2" />
                Flows
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Automation Flows</SheetTitle>
                <SheetDescription>
                  Select an existing flow or create a new one.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={createNewFlow}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Flow
                </Button>
                <Separator />
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {flows.map(flow => (
                    <div
                      key={flow.id}
                      className={`p-3 rounded-md cursor-pointer border ${
                        selectedFlow?.id === flow.id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => loadFlow(flow)}
                    >
                      <h4 className="font-medium">{flow.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {flow.description}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>v{flow.version}</span>
                        <span>{flow.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddNode(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Node
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={saveFlow}
            disabled={!selectedFlow}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Add Node Panel */}
      {showAddNode && (
        <div className="absolute right-8 top-48 z-10 w-72 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
          <div className="p-3 border-b">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Add Node</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddNode(false)}
              >
                &times;
              </Button>
            </div>
            <div className="flex mt-2">
              <Button
                variant={nodePanel === 'trigger' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setNodePanel('trigger')}
              >
                Triggers
              </Button>
              <Button
                variant={nodePanel === 'action' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setNodePanel('action')}
              >
                Actions
              </Button>
              <Button
                variant={nodePanel === 'outcome' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setNodePanel('outcome')}
              >
                Outcomes
              </Button>
            </div>
          </div>
          <div className="p-3 max-h-96 overflow-y-auto">
            {nodePanel === 'trigger' && (
              <div className="space-y-2">
                {triggerNodeOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => addNode(option)}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {nodePanel === 'action' && (
              <div className="space-y-2">
                {actionNodeOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => addNode(option)}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {nodePanel === 'outcome' && (
              <div className="space-y-2">
                {outcomeNodeOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => addNode(option)}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flow canvas */}
      <div className="flex-grow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          className={isDarkMode ? 'flow-dark' : ''}
          fitView
        >
          <Controls />
          <MiniMap 
            zoomable 
            pannable
            className="bg-white dark:bg-gray-800"
          />
          <Background 
            color={isDarkMode ? "#444" : "#aaa"} 
            gap={16} 
            size={1} 
          />
          <Panel position="bottom-right" className="bg-white dark:bg-gray-800 p-2 rounded-md shadow">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Empty state */}
      {(!selectedFlow || (nodes.length === 0 && edges.length === 0)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10 pointer-events-none">
          <Card className="w-96 pointer-events-auto">
            <CardHeader>
              <CardTitle>Get Started with Flow Automation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create a new flow or select an existing one to start building your automation.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={createNewFlow}>
                  <Plus className="mr-2 h-4 w-4" /> Create New Flow
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <List className="mr-2 h-4 w-4" /> Select Flow
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    {/* This is already defined above */}
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ZoneAutomationBuilder;
