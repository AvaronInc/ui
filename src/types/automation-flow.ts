
import { Node, Edge } from '@xyflow/react';

export type TriggerType = 'schedule' | 'event' | 'condition' | 'manual';
export type ActionType = 'script' | 'api' | 'notification' | 'email';
export type OutcomeType = 'success' | 'failure' | 'conditional';

export type TriggerNode = {
  id: string;
  type: 'trigger';
  subType: TriggerType;
  position: { x: number; y: number };
  data: { label: string; description: string };
};

export type ActionNode = {
  id: string;
  type: 'action';
  subType: ActionType;
  position: { x: number; y: number };
  data: { label: string; description: string };
};

export type OutcomeNode = {
  id: string;
  type: 'outcome';
  subType: OutcomeType;
  position: { x: number; y: number };
  data: { label: string; description: string };
};

export type AutomationNode = TriggerNode | ActionNode | OutcomeNode;

export type AutomationEdge = Edge<any>;

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
  edges: AutomationEdge[];
  createdBy: string;
  lastModified: string;
  status: 'active' | 'inactive' | 'draft';
  version: number;
  createdAt: string;
}

export type NodeType = 'trigger' | 'action' | 'outcome';
