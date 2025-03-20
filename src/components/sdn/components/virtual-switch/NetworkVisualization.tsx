
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface NetworkVisualizationProps {
  onSelectSwitch: (switchId: string) => void;
  selectedSwitch: string | null;
}

interface NetworkNode {
  id: string;
  type: 'switch' | 'router' | 'server' | 'client';
  name: string;
  status: 'active' | 'inactive' | 'error';
  position: { x: number, y: number };
}

interface NetworkLink {
  source: string;
  target: string;
  status: 'active' | 'congested' | 'down';
  bandwidth: string;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({ 
  onSelectSwitch, 
  selectedSwitch 
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for network nodes and links
  const networkNodes: NetworkNode[] = [
    { id: 'vs-001', type: 'switch', name: 'Core-Switch-01', status: 'active', position: { x: 400, y: 200 } },
    { id: 'vs-002', type: 'switch', name: 'Edge-Switch-01', status: 'active', position: { x: 600, y: 300 } },
    { id: 'vs-003', type: 'switch', name: 'DMZ-Switch-01', status: 'active', position: { x: 200, y: 300 } },
    { id: 'vs-004', type: 'switch', name: 'Backup-Switch-01', status: 'inactive', position: { x: 400, y: 400 } },
    { id: 'vs-005', type: 'switch', name: 'Dev-Switch-01', status: 'error', position: { x: 300, y: 100 } },
    { id: 'r-001', type: 'router', name: 'Core-Router', status: 'active', position: { x: 400, y: 300 } },
    { id: 's-001', type: 'server', name: 'App-Server-01', status: 'active', position: { x: 500, y: 150 } },
    { id: 's-002', type: 'server', name: 'DB-Server-01', status: 'active', position: { x: 300, y: 350 } },
    { id: 'c-001', type: 'client', name: 'Client-Workstation', status: 'active', position: { x: 600, y: 400 } },
  ];

  const networkLinks: NetworkLink[] = [
    { source: 'vs-001', target: 'r-001', status: 'active', bandwidth: '10Gbps' },
    { source: 'vs-002', target: 'r-001', status: 'congested', bandwidth: '1Gbps' },
    { source: 'vs-003', target: 'r-001', status: 'active', bandwidth: '10Gbps' },
    { source: 'vs-004', target: 'r-001', status: 'down', bandwidth: '10Gbps' },
    { source: 'vs-005', target: 'r-001', status: 'active', bandwidth: '1Gbps' },
    { source: 'vs-001', target: 's-001', status: 'active', bandwidth: '10Gbps' },
    { source: 'vs-003', target: 's-002', status: 'active', bandwidth: '10Gbps' },
    { source: 'vs-002', target: 'c-001', status: 'active', bandwidth: '1Gbps' },
  ];

  useEffect(() => {
    // Simulate loading of network data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSwitchClick = (switchId: string) => {
    onSelectSwitch(switchId);
    toast({
      title: "Switch Selected",
      description: `Selected switch: ${networkNodes.find(node => node.id === switchId)?.name}`
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // In a real implementation, we would use a library like @xyflow/react to render a proper network topology
  // For demonstration purposes, we're creating a simplified visualization

  return (
    <div className="relative h-[400px] border rounded-md bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      {/* Network links */}
      <svg className="absolute inset-0 w-full h-full">
        {networkLinks.map((link, index) => {
          const source = networkNodes.find(node => node.id === link.source);
          const target = networkNodes.find(node => node.id === link.target);
          
          if (!source || !target) return null;
          
          let strokeColor = "stroke-gray-400";
          let strokeWidth = "1";
          let dashArray = "";
          
          if (link.status === 'congested') {
            strokeColor = "stroke-amber-500";
            strokeWidth = "2";
          } else if (link.status === 'down') {
            strokeColor = "stroke-red-500";
            strokeWidth = "1";
            dashArray = "5,5";
          } else {
            strokeColor = "stroke-green-500";
            strokeWidth = "1.5";
          }
          
          return (
            <line
              key={`link-${index}`}
              x1={source.position.x}
              y1={source.position.y}
              x2={target.position.x}
              y2={target.position.y}
              className={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
            />
          );
        })}
      </svg>

      {/* Network nodes */}
      {networkNodes.map((node) => {
        let bgColor = "bg-gray-200 dark:bg-gray-700";
        let textColor = "text-gray-700 dark:text-gray-300";
        let borderColor = "border-gray-400";
        
        if (node.status === 'active') {
          if (node.type === 'switch') {
            bgColor = "bg-blue-100 dark:bg-blue-900/30";
            borderColor = "border-blue-500";
            textColor = "text-blue-700 dark:text-blue-300";
          } else if (node.type === 'router') {
            bgColor = "bg-purple-100 dark:bg-purple-900/30";
            borderColor = "border-purple-500";
            textColor = "text-purple-700 dark:text-purple-300";
          } else if (node.type === 'server') {
            bgColor = "bg-green-100 dark:bg-green-900/30";
            borderColor = "border-green-500";
            textColor = "text-green-700 dark:text-green-300";
          } else {
            bgColor = "bg-amber-100 dark:bg-amber-900/30";
            borderColor = "border-amber-500";
            textColor = "text-amber-700 dark:text-amber-300";
          }
        } else if (node.status === 'error') {
          bgColor = "bg-red-100 dark:bg-red-900/30";
          borderColor = "border-red-500";
          textColor = "text-red-700 dark:text-red-300";
        }
        
        // Add highlight for selected switch
        if (node.id === selectedSwitch) {
          borderColor = "border-primary";
          bgColor += " ring-2 ring-primary ring-offset-2";
        }
        
        return (
          <div
            key={node.id}
            className={`absolute rounded-md p-2 border-2 ${borderColor} ${bgColor} ${textColor} transition-all
                       ${node.type === 'switch' ? 'cursor-pointer hover:scale-105' : ''}`}
            style={{
              left: `${node.position.x - 40}px`,
              top: `${node.position.y - 20}px`,
              width: '80px',
              textAlign: 'center'
            }}
            onClick={() => node.type === 'switch' ? handleSwitchClick(node.id) : null}
          >
            <div className="text-xs font-medium truncate">{node.name}</div>
            <div className="text-[10px] uppercase mt-1 truncate">
              <Badge variant="outline" className="text-[8px] py-0 px-1">
                {node.type}
              </Badge>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span> Switch
          <span className="inline-block w-2 h-2 rounded-full bg-purple-500 ml-2"></span> Router
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-2"></span> Server
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 ml-2"></span> Client
        </div>
      </div>

      <div className="absolute top-2 left-2 text-xs">
        <p className="text-muted-foreground">
          Click on switches to select and perform actions
        </p>
      </div>
    </div>
  );
};

export default NetworkVisualization;
