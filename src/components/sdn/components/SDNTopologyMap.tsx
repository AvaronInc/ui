
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RefreshCw, Filter } from 'lucide-react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom node types will be defined here in the future
const nodeTypes = {};

// Initial demo data
const initialNodes: Node[] = [
  {
    id: 'headquarters',
    type: 'default',
    data: { 
      label: 'Headquarters Vertex',
      status: 'healthy'
    },
    position: { x: 250, y: 100 },
    style: { 
      background: '#f0f9ff', 
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      padding: '10px',
      width: 150 
    }
  },
  {
    id: 'datacenter',
    type: 'default',
    data: { 
      label: 'Data Center',
      status: 'healthy'
    },
    position: { x: 250, y: 300 },
    style: { 
      background: '#f0f9ff', 
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      padding: '10px',
      width: 150 
    }
  },
  {
    id: 'cloud1',
    type: 'default',
    data: { 
      label: 'AWS Cloud',
      status: 'healthy'
    },
    position: { x: 500, y: 100 },
    style: { 
      background: '#f0fdf4', 
      border: '2px solid #22c55e',
      borderRadius: '8px',
      padding: '10px',
      width: 120 
    }
  },
  {
    id: 'cloud2',
    type: 'default',
    data: { 
      label: 'Azure Cloud',
      status: 'healthy'
    },
    position: { x: 500, y: 300 },
    style: { 
      background: '#f0fdf4', 
      border: '2px solid #22c55e',
      borderRadius: '8px',
      padding: '10px',
      width: 120 
    }
  },
  {
    id: 'branch1',
    type: 'default',
    data: { 
      label: 'Branch Office 1',
      status: 'degraded'
    },
    position: { x: 50, y: 200 },
    style: { 
      background: '#fefce8', 
      border: '2px solid #eab308',
      borderRadius: '8px',
      padding: '10px',
      width: 140 
    }
  },
  {
    id: 'branch2',
    type: 'default',
    data: { 
      label: 'Branch Office 2',
      status: 'offline'
    },
    position: { x: 450, y: 450 },
    style: { 
      background: '#fef2f2', 
      border: '2px solid #ef4444',
      borderRadius: '8px',
      padding: '10px',
      width: 140 
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'headquarters',
    target: 'datacenter',
    animated: false,
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  },
  {
    id: 'e1-3',
    source: 'headquarters',
    target: 'cloud1',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  },
  {
    id: 'e2-4',
    source: 'datacenter',
    target: 'cloud2',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  },
  {
    id: 'e1-5',
    source: 'headquarters',
    target: 'branch1',
    animated: false,
    style: { stroke: '#eab308', strokeWidth: 2 }
  },
  {
    id: 'e2-6',
    source: 'datacenter',
    target: 'branch2',
    animated: false,
    style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '5,5' }
  }
];

const SDNTopologyMap: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate network refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filter</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-[500px] w-full border rounded-md bg-muted/20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              const nodeData = node as Node<{ status: string }>;
              if (!nodeData.data?.status) return '#888';
              
              switch (nodeData.data.status) {
                case 'healthy': return '#22c55e';
                case 'degraded': return '#eab308';
                case 'offline': return '#ef4444';
                default: return '#888';
              }
            }}
          />
        </ReactFlow>
      </div>
      
      <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="block h-3 w-3 rounded-full bg-green-500"></span>
          <span>Healthy Connection</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="block h-3 w-3 rounded-full bg-amber-500"></span>
          <span>Degraded Performance</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="block h-3 w-3 rounded-full bg-red-500"></span>
          <span>Connection Down</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="block h-1 w-8 bg-blue-500"></span>
          <span>Secure Tunnel</span>
        </div>
      </div>
    </div>
  );
};

export default SDNTopologyMap;
