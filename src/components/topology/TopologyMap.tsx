
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NetworkDevice } from '@/types/topology';
import { getMockNetworkConnections } from '@/data/topologyData';
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
import NetworkNode from './NetworkNode';
import { cn } from '@/lib/utils';

interface TopologyMapProps {
  devices: NetworkDevice[];
  onDeviceSelect: (device: NetworkDevice) => void;
  className?: string;
}

const nodeTypes = {
  networkDevice: NetworkNode,
};

const TopologyMap = ({ devices, onDeviceSelect, className }: TopologyMapProps) => {
  // Get network connections
  const { data: connections = [] } = useQuery({
    queryKey: ['networkConnections'],
    queryFn: getMockNetworkConnections,
  });

  // Initialize nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convert devices to reactflow nodes
  useEffect(() => {
    const newNodes: Node[] = devices.map((device) => {
      // Create positions based on device type for initial layout
      let position = { x: 0, y: 0 };
      
      // Basic layout strategy
      switch (device.type) {
        case 'firewall':
          position = { x: 300, y: 50 };
          break;
        case 'router':
          position = { x: 300, y: 150 };
          break;
        case 'switch':
          // Distribute switches horizontally
          const switchIndex = devices
            .filter(d => d.type === 'switch')
            .findIndex(d => d.id === device.id);
          position = { x: 100 + switchIndex * 200, y: 250 };
          break;
        case 'server':
          // Position servers on the right
          const serverIndex = devices
            .filter(d => d.type === 'server')
            .findIndex(d => d.id === device.id);
          position = { x: 500 + serverIndex * 100, y: 150 + serverIndex * 80 };
          break;
        case 'workstation':
        case 'printer':
        case 'camera':
        case 'iot':
          // Distribute endpoints below switches
          const endpointIndex = devices
            .filter(d => ['workstation', 'printer', 'camera', 'iot'].includes(d.type))
            .findIndex(d => d.id === device.id);
          position = { x: 50 + endpointIndex * 100, y: 350 + Math.floor(endpointIndex / 5) * 80 };
          break;
        case 'vpn':
          // Position VPN users at the top
          const vpnIndex = devices
            .filter(d => d.type === 'vpn')
            .findIndex(d => d.id === device.id);
          position = { x: 500 + vpnIndex * 150, y: 50 };
          break;
        default:
          position = { x: Math.random() * 500, y: Math.random() * 400 };
      }

      return {
        id: device.id,
        type: 'networkDevice',
        position,
        data: { 
          device,
          onSelect: () => onDeviceSelect(device)
        }
      };
    });

    setNodes(newNodes);
  }, [devices, onDeviceSelect]);

  // Convert connections to reactflow edges
  useEffect(() => {
    if (connections.length > 0) {
      const newEdges: Edge[] = connections.map((connection) => ({
        id: connection.id,
        source: connection.source,
        target: connection.target,
        animated: connection.type === 'vpn',
        style: {
          strokeDasharray: connection.type === 'vpn' ? '5, 5' : 'none',
          stroke: connection.type === 'vpn' ? '#888' : '#555',
        },
      }));
      
      setEdges(newEdges);
    }
  }, [connections, setEdges]);

  return (
    <div className={cn("h-[600px] w-full", className)}>
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
            const deviceNode = node as Node<{ device: NetworkDevice }>;
            if (!deviceNode.data?.device) return '#eee';
            
            switch (deviceNode.data.device.status) {
              case 'online': return '#10b981';
              case 'warning': return '#f59e0b';
              case 'offline': return '#ef4444';
              default: return '#94a3b8';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default TopologyMap;
