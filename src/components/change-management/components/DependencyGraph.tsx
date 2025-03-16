
import React from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Node, 
  Edge, 
  Position, 
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ChangeRequest } from '@/types/change-management';

interface DependencyGraphProps {
  changeRequest: ChangeRequest;
  dependencies: string[];
}

const DependencyGraph: React.FC<DependencyGraphProps> = ({ 
  changeRequest, 
  dependencies 
}) => {
  // Generate nodes and edges based on the change request and dependencies
  const nodes: Node[] = [
    {
      id: 'change',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-bold">Change Request</div>
            <div className="text-xs">{changeRequest.title}</div>
          </div>
        ) 
      },
      position: { x: 250, y: 50 },
      className: 'bg-primary/10 border-2 border-primary shadow-md px-4 py-2 rounded-md',
    },
    ...dependencies.map((dep, index) => {
      // Calculate position in a semi-circle below the main node
      const angle = (Math.PI / (dependencies.length + 1)) * (index + 1);
      const radius = 150;
      const x = 250 + radius * Math.cos(angle);
      const y = 160 + radius * Math.sin(angle);
      
      return {
        id: `dep-${index}`,
        data: { label: dep },
        position: { x, y },
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
        className: 'bg-muted/50 border border-muted-foreground/20 shadow-sm px-3 py-1 rounded-md',
      };
    }),
  ];
  
  const edges: Edge[] = dependencies.map((_, index) => ({
    id: `e-change-${index}`,
    source: 'change',
    target: `dep-${index}`,
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
    },
    className: 'text-muted-foreground',
  }));
  
  // Add some cross-dependencies between systems
  if (dependencies.length > 1) {
    for (let i = 0; i < Math.min(dependencies.length - 1, 3); i++) {
      const source = `dep-${i}`;
      const target = `dep-${(i + 1) % dependencies.length}`;
      
      edges.push({
        id: `e-${i}-${(i + 1) % dependencies.length}`,
        source,
        target,
        animated: false,
        style: { strokeDasharray: '5,5' },
        className: 'text-muted-foreground/50',
      });
    }
  }
  
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DependencyGraph;
