
import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  MarkerType,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlusCircle, Save, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  TriggerType, 
  ActionType, 
  OutcomeType, 
  AutomationFlow, 
  AutomationNode,
  TriggerNode,
  ActionNode,
  OutcomeNode,
  NodeType
} from '@/types/automation-flow';

type NodeData = {
  label: string;
  description: string;
};

const TriggerNode: React.FC<{
  data: NodeData;
}> = ({ data }) => {
  return (
    <div className="trigger-node node">
      <div className="node-header">Trigger</div>
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        <div className="node-description">{data.description}</div>
      </div>
      <div className="node-handles">
        <div className="handle-bottom" style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="handle" />
        </div>
      </div>
    </div>
  );
};

const ActionNode: React.FC<{
  data: NodeData;
}> = ({ data }) => {
  return (
    <div className="action-node node">
      <div className="node-header">Action</div>
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        <div className="node-description">{data.description}</div>
      </div>
      <div className="node-handles">
        <div className="handle-top" style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="handle" />
        </div>
        <div className="handle-bottom" style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="handle" />
        </div>
      </div>
    </div>
  );
};

const OutcomeNode: React.FC<{
  data: NodeData;
}> = ({ data }) => {
  return (
    <div className="outcome-node node">
      <div className="node-header">Outcome</div>
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        <div className="node-description">{data.description}</div>
      </div>
      <div className="node-handles">
        <div className="handle-top" style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="handle" />
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  outcome: OutcomeNode,
};

const AutomationBuilder: React.FC = () => {
  const [flowName, setFlowName] = useState('New Automation Flow');
  const [flowDescription, setFlowDescription] = useState('Description of the automation flow');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedNodeType, setSelectedNodeType] = useState<NodeType>('trigger');
  const [selectedSubType, setSelectedSubType] = useState<TriggerType | ActionType | OutcomeType>('schedule');
  const [nodeName, setNodeName] = useState('');
  const [nodeDescription, setNodeDescription] = useState('');

  const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

  const subTypeOptions = useMemo(() => {
    switch (selectedNodeType) {
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
  }, [selectedNodeType]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({
        ...connection,
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }, eds));
    },
    [setEdges]
  );

  const handleSave = () => {
    const automationFlow: AutomationFlow = {
      id: `flow-${Date.now()}`,
      name: flowName,
      description: flowDescription,
      nodes: nodes as AutomationNode[],
      edges: edges,
      createdBy: 'Current User',
      lastModified: new Date().toISOString(),
      status: 'draft',
      version: 1,
      createdAt: new Date().toISOString(),
    };

    console.log('Saving automation flow:', automationFlow);
    toast({
      title: 'Automation Flow Saved',
      description: `Successfully saved "${flowName}"`,
    });
  };

  const addNode = () => {
    if (!nodeName) {
      toast({
        title: 'Validation Error',
        description: 'Node name is required',
        variant: 'destructive',
      });
      return;
    }

    const id = `${selectedNodeType}-${Date.now()}`;
    const x = Math.random() * 400;
    const y = Math.random() * 400;

    let newNode: AutomationNode;

    // Create node with proper typing based on node type
    switch(selectedNodeType) {
      case 'trigger':
        newNode = {
          id,
          type: 'trigger',
          subType: selectedSubType as TriggerType,
          position: { x, y },
          data: { label: nodeName, description: nodeDescription }
        } as TriggerNode;
        break;
      case 'action':
        newNode = {
          id,
          type: 'action',
          subType: selectedSubType as ActionType,
          position: { x, y },
          data: { label: nodeName, description: nodeDescription }
        } as ActionNode;
        break;
      case 'outcome':
        newNode = {
          id,
          type: 'outcome',
          subType: selectedSubType as OutcomeType,
          position: { x, y },
          data: { label: nodeName, description: nodeDescription }
        } as OutcomeNode;
        break;
      default:
        return;
    }

    setNodes((nds) => [...nds, newNode]);
    setNodeName('');
    setNodeDescription('');
  };

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[300px]">
          <Label htmlFor="flow-name">Flow Name</Label>
          <Input
            id="flow-name"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="mb-2"
          />
          <Label htmlFor="flow-description">Description</Label>
          <Textarea
            id="flow-description"
            value={flowDescription}
            onChange={(e) => setFlowDescription(e.target.value)}
            className="h-20"
          />
        </div>
        
        <div className="flex-1 min-w-[300px]">
          <div className="flex flex-wrap gap-2 items-end">
            <div className="flex-1 min-w-[150px]">
              <Label>Node Type</Label>
              <Select value={selectedNodeType} onValueChange={(val) => setSelectedNodeType(val as NodeType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trigger">Trigger</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="outcome">Outcome</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <Label>Sub Type</Label>
              <Select 
                value={selectedSubType} 
                onValueChange={(val) => setSelectedSubType(val as TriggerType | ActionType | OutcomeType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub type" />
                </SelectTrigger>
                <SelectContent>
                  {subTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="node-name">Name</Label>
              <Input
                id="node-name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="node-description">Description</Label>
              <Input
                id="node-description"
                value={nodeDescription}
                onChange={(e) => setNodeDescription(e.target.value)}
              />
            </div>

            <Button onClick={addNode} className="flex-none">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Node
            </Button>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="p-0 h-[600px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            defaultViewport={defaultViewport}
            fitView
            className="bg-muted/30"
          >
            <Background />
            <Controls />
            <MiniMap nodeColor={(node) => {
              switch (node.type) {
                case 'trigger':
                  return '#3b82f6';
                case 'action':
                  return '#10b981';
                case 'outcome':
                  return '#f59e0b';
                default:
                  return '#64748b';
              }
            }} />
            <Panel position="top-right">
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Flow
              </Button>
            </Panel>
          </ReactFlow>
        </CardContent>
      </Card>

      <style>
        {`
        .react-flow__controls {
          background-color: rgba(30, 41, 59, 0.8);
          padding: 8px;
          border-radius: 6px;
        }
        
        .react-flow__controls-button {
          background-color: rgba(51, 65, 85, 0.9);
          border-color: #475569;
          color: #f8fafc;
        }
        
        .react-flow__controls-button svg {
          fill: #f8fafc;
        }
        
        .react-flow__controls-button:hover {
          background-color: #475569;
        }
        
        .react-flow__minimap {
          background-color: rgba(30, 41, 59, 0.8);
          border-radius: 6px;
        }
        
        .node {
          padding: 0;
          border-radius: 6px;
          width: 180px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          font-size: 12px;
        }
        
        .node-header {
          padding: 6px 10px;
          font-weight: 500;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          font-size: 11px;
          text-transform: uppercase;
        }
        
        .node-content {
          padding: 10px;
        }
        
        .node-title {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .node-description {
          font-size: 11px;
          opacity: 0.8;
        }
        
        .trigger-node .node-header {
          background-color: #3b82f6;
          color: white;
        }
        
        .action-node .node-header {
          background-color: #10b981;
          color: white;
        }
        
        .outcome-node .node-header {
          background-color: #f59e0b;
          color: white;
        }
        
        .handle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #333;
          background-color: white;
        }
        `}
      </style>
    </div>
  );
};

export default AutomationBuilder;
