
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, ZoomIn, ZoomOut, Filter } from 'lucide-react';
import { VertexNode } from '@/types/sdwan';
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

// Mock data for demonstration purposes
const mockVertexNodes: VertexNode[] = [
  {
    id: 'headquarters',
    name: 'Headquarters',
    location: {
      lat: 47.6062,
      lng: -122.3321,
      address: '123 Main St, Seattle, WA 98101'
    },
    primaryConnection: {
      id: 'primary-hq',
      type: 'fiber',
      status: 'active',
      uptime: 2592000, // 30 days in seconds
      bandwidth: {
        download: 1000,
        upload: 1000
      }
    },
    failoverConnection1: {
      id: 'failover1-hq',
      type: 'copper',
      status: 'active',
      uptime: 2592000,
      bandwidth: {
        download: 500,
        upload: 500
      }
    },
    ipAddress: '10.0.1.1',
    networkStatus: 'active',
    metrics: {
      latency: 15,
      packetLoss: 0.01,
      jitter: 2,
      activeConnections: 548
    }
  },
  {
    id: 'branch1',
    name: 'Branch Office 1',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '456 Market St, San Francisco, CA 94105'
    },
    primaryConnection: {
      id: 'primary-b1',
      type: 'fiber',
      status: 'degraded',
      uptime: 1296000, // 15 days in seconds
      bandwidth: {
        download: 500,
        upload: 500
      }
    },
    failoverConnection1: {
      id: 'failover1-b1',
      type: 'copper',
      status: 'active',
      uptime: 2592000,
      bandwidth: {
        download: 250,
        upload: 250
      }
    },
    ipAddress: '10.0.2.1',
    networkStatus: 'degraded',
    metrics: {
      latency: 35,
      packetLoss: 1.2,
      jitter: 4.5,
      activeConnections: 245
    }
  },
  {
    id: 'branch2',
    name: 'Branch Office 2',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '789 Broadway, New York, NY 10003'
    },
    primaryConnection: {
      id: 'primary-b2',
      type: 'copper',
      status: 'down',
      uptime: 0,
      bandwidth: {
        download: 500,
        upload: 500
      }
    },
    failoverConnection1: {
      id: 'failover1-b2',
      type: 'starlink',
      status: 'active',
      uptime: 864000, // 10 days in seconds
      bandwidth: {
        download: 150,
        upload: 20
      }
    },
    ipAddress: '10.0.3.1',
    networkStatus: 'degraded',
    metrics: {
      latency: 85,
      packetLoss: 2.5,
      jitter: 8.2,
      activeConnections: 78
    }
  },
  {
    id: 'datacenter',
    name: 'Data Center',
    location: {
      lat: 39.0997,
      lng: -94.5786,
      address: '101 Server Rd, Kansas City, MO 64105'
    },
    primaryConnection: {
      id: 'primary-dc',
      type: 'fiber',
      status: 'active',
      uptime: 7776000, // 90 days in seconds
      bandwidth: {
        download: 10000,
        upload: 10000
      }
    },
    failoverConnection1: {
      id: 'failover1-dc',
      type: 'fiber',
      status: 'active',
      uptime: 7776000,
      bandwidth: {
        download: 5000,
        upload: 5000
      }
    },
    failoverConnection2: {
      id: 'failover2-dc',
      type: 'copper',
      status: 'active',
      uptime: 7776000,
      bandwidth: {
        download: 1000,
        upload: 1000
      }
    },
    ipAddress: '10.0.0.1',
    networkStatus: 'active',
    metrics: {
      latency: 8,
      packetLoss: 0.001,
      jitter: 1.2,
      activeConnections: 1245
    }
  },
  {
    id: 'cloud1',
    name: 'AWS Cloud',
    location: {
      lat: 39.0997,
      lng: -94.5786,
      address: 'AWS US-East-1'
    },
    primaryConnection: {
      id: 'primary-aws',
      type: 'fiber',
      status: 'active',
      uptime: 7776000,
      bandwidth: {
        download: 5000,
        upload: 5000
      }
    },
    ipAddress: '172.31.0.1',
    networkStatus: 'active',
    metrics: {
      latency: 12,
      packetLoss: 0.01,
      jitter: 1.5,
      activeConnections: 325
    }
  }
];

interface SDWANTopologyMapProps {
  onNodeClick?: (node: VertexNode) => void;
}

// Custom node component for SDWAN nodes
const SDWANNode = ({ data }: { data: { label: string; status: string; node: VertexNode; onClick: () => void } }) => {
  const getStatusColor = () => {
    switch(data.status) {
      case 'active': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="px-4 py-2 bg-white dark:bg-slate-800 border-2 rounded-md shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
      style={{ borderColor: data.status === 'active' ? '#22c55e' : data.status === 'degraded' ? '#eab308' : '#ef4444' }}
      onClick={data.onClick}
    >
      <div className="font-medium">{data.label}</div>
      <div className="flex items-center mt-1">
        <div className={`h-3 w-3 rounded-full ${getStatusColor()} mr-2`}></div>
        <span className="text-xs">{data.status}</span>
      </div>
    </div>
  );
};

const nodeTypes = {
  sdwanNode: SDWANNode,
};

const SDWANTopologyMap: React.FC<SDWANTopologyMapProps> = ({ onNodeClick }) => {
  const [selectedNode, setSelectedNode] = useState<VertexNode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create nodes for ReactFlow
  const initialNodes: Node[] = mockVertexNodes.map((vertex, index) => {
    const angle = (index / mockVertexNodes.length) * 2 * Math.PI;
    const radius = 200;
    // Position nodes in a circle for a full mesh visualization
    const x = 300 + radius * Math.cos(angle);
    const y = 250 + radius * Math.sin(angle);
    
    return {
      id: vertex.id,
      type: 'sdwanNode',
      position: { x, y },
      data: { 
        label: vertex.name, 
        status: vertex.networkStatus,
        node: vertex,
        onClick: () => handleNodeClick(vertex)
      }
    };
  });

  // Create edges for full mesh (every node connected to every other node)
  const initialEdges: Edge[] = [];
  mockVertexNodes.forEach(source => {
    mockVertexNodes.forEach(target => {
      if (source.id !== target.id) {
        // Avoid duplicate connections by using IDs in specific order
        const edgeIds = [source.id, target.id].sort();
        const edgeId = `${edgeIds[0]}-${edgeIds[1]}`;
        
        if (!initialEdges.some(edge => edge.id === edgeId)) {
          initialEdges.push({
            id: edgeId,
            source: source.id,
            target: target.id,
            animated: source.networkStatus === 'degraded' || target.networkStatus === 'degraded',
            style: { 
              stroke: source.networkStatus === 'active' && target.networkStatus === 'active' 
                ? '#22c55e' 
                : source.networkStatus === 'down' || target.networkStatus === 'down'
                  ? '#ef4444'
                  : '#eab308',
              strokeWidth: 2,
              strokeDasharray: source.networkStatus === 'down' || target.networkStatus === 'down' ? '5 5' : undefined
            }
          });
        }
      }
    });
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  fetch("/api/sdwan")
    .then(r => r.json())
    .then(nodes => nodes.map((vertex, index) => {
        const angle = (index / mockVertexNodes.length) * 2 * Math.PI;
        const radius = 200;
        // Position nodes in a circle for a full mesh visualization
        const x = 300 + radius * Math.cos(angle);
        const y = 250 + radius * Math.sin(angle);
        return {
          id: vertex.id,
          type: 'sdwanNode',
          position: { x, y },
          data: {
            label: vertex.name,
            status: vertex.networkStatus,
            node: vertex,
            onClick: () => handleNodeClick(vertex)
          }
        };
      })
    )
    .then(setNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = (node: VertexNode) => {
    setSelectedNode(node);
    setIsDialogOpen(true);
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate network refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Format uptime from seconds to human-readable
  const formatUptime = (seconds: number) => {
    if (seconds === 0) return 'Down';

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    
    let uptimeString = '';
    if (days > 0) uptimeString += `${days}d `;
    if (hours > 0) uptimeString += `${hours}h `;
    if (minutes > 0) uptimeString += `${minutes}m`;
    
    return uptimeString.trim();
  };

  // Format bandwidth
  const formatBandwidth = (mbps: number) => {
    if (mbps >= 1000) {
      return `${(mbps / 1000).toFixed(1)} Gbps`;
    }
    return `${mbps} Mbps`;
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filter</span>
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Vertex Sites" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vertex Sites</SelectItem>
              {mockVertexNodes.map(vertex => (
                <SelectItem key={vertex.id} value={vertex.id}>{vertex.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                case 'active': return '#22c55e';
                case 'degraded': return '#eab308';
                case 'down': return '#ef4444';
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

      {/* Vertex Node Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedNode && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${
                    selectedNode.networkStatus === 'active' ? 'bg-green-500' : 
                    selectedNode.networkStatus === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  {selectedNode.name}
                </DialogTitle>
                <DialogDescription>
                  IP Address: {selectedNode.ipAddress} • Location: {selectedNode.location.address}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Connection Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Primary ({selectedNode.primaryConnection.type}):</span>
                        <span className={
                          selectedNode.primaryConnection.status === 'active' ? 'text-green-500' : 
                          selectedNode.primaryConnection.status === 'degraded' ? 'text-yellow-500' : 'text-red-500'
                        }>
                          {selectedNode.primaryConnection.status === 'active' ? 'Active' : 
                           selectedNode.primaryConnection.status === 'degraded' ? 'Degraded' : 'Down'}
                        </span>
                      </div>
                      {selectedNode.failoverConnection1 && (
                        <div className="flex justify-between text-sm border-b pb-1">
                          <span>Failover 1 ({selectedNode.failoverConnection1.type}):</span>
                          <span className={
                            selectedNode.failoverConnection1.status === 'active' ? 'text-green-500' : 
                            selectedNode.failoverConnection1.status === 'degraded' ? 'text-yellow-500' : 'text-red-500'
                          }>
                            {selectedNode.failoverConnection1.status === 'active' ? 'Active' : 
                             selectedNode.failoverConnection1.status === 'degraded' ? 'Degraded' : 'Down'}
                          </span>
                        </div>
                      )}
                      {selectedNode.failoverConnection2 && (
                        <div className="flex justify-between text-sm border-b pb-1">
                          <span>Failover 2 ({selectedNode.failoverConnection2.type}):</span>
                          <span className={
                            selectedNode.failoverConnection2.status === 'active' ? 'text-green-500' : 
                            selectedNode.failoverConnection2.status === 'degraded' ? 'text-yellow-500' : 'text-red-500'
                          }>
                            {selectedNode.failoverConnection2.status === 'active' ? 'Active' : 
                             selectedNode.failoverConnection2.status === 'degraded' ? 'Degraded' : 'Down'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Bandwidth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Download:</span>
                        <span>{formatBandwidth(selectedNode.primaryConnection.bandwidth.download)}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Upload:</span>
                        <span>{formatBandwidth(selectedNode.primaryConnection.bandwidth.upload)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Latency:</span>
                        <span>{selectedNode.metrics.latency} ms</span>
                      </div>
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Packet Loss:</span>
                        <span 
                          className={
                            selectedNode.metrics.packetLoss < 0.1 ? 'text-green-500' : 
                            selectedNode.metrics.packetLoss < 1 ? 'text-yellow-500' : 'text-red-500'
                          }
                        >
                          {selectedNode.metrics.packetLoss}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Jitter:</span>
                        <span>{selectedNode.metrics.jitter} ms</span>
                      </div>
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Active Connections:</span>
                        <span>{selectedNode.metrics.activeConnections}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Uptime</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm border-b pb-1">
                        <span>Primary Connection:</span>
                        <span>{formatUptime(selectedNode.primaryConnection.uptime)}</span>
                      </div>
                      {selectedNode.failoverConnection1 && (
                        <div className="flex justify-between text-sm border-b pb-1">
                          <span>Failover 1:</span>
                          <span>{formatUptime(selectedNode.failoverConnection1.uptime)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                <Button variant="default">View Detailed Analytics</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SDWANTopologyMap;
