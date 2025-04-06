
import { MarkerType } from '@xyflow/react';
import { AutomationFlow } from '@/types/automation-flow';

export const mockAutomationFlows: AutomationFlow[] = [
  {
    id: 'flow-1',
    name: 'Server Update Automation',
    description: 'Automates the process of updating server OS and software packages',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        subType: 'schedule',
        position: { x: 100, y: 100 },
        data: { label: 'Weekly Server Update', description: 'Runs every Sunday at 2 AM' }
      },
      {
        id: 'action-1',
        type: 'action',
        subType: 'script',
        position: { x: 100, y: 250 },
        data: { label: 'Update OS Packages', description: 'Run apt update && apt upgrade' }
      },
      {
        id: 'outcome-1',
        type: 'outcome',
        subType: 'success',
        position: { x: 100, y: 400 },
        data: { label: 'Update Success', description: 'Server updated successfully' }
      }
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'trigger-1',
        target: 'action-1',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      },
      {
        id: 'edge-2-3',
        source: 'action-1',
        target: 'outcome-1',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }
    ],
    createdBy: 'System Admin',
    lastModified: '2024-04-01T10:00:00Z',
    status: 'active',
    version: 1,
    createdAt: '2024-03-28T15:30:00Z'
  },
  {
    id: 'flow-2',
    name: 'Security Alert Workflow',
    description: 'Automated response to security incidents with notification and remediation',
    nodes: [
      {
        id: 'trigger-2',
        type: 'trigger',
        subType: 'event',
        position: { x: 150, y: 100 },
        data: { label: 'Security Alert', description: 'Triggered by security monitoring system' }
      },
      {
        id: 'action-2',
        type: 'action',
        subType: 'notification',
        position: { x: 150, y: 250 },
        data: { label: 'Notify Security Team', description: 'Send alert to security response team' }
      },
      {
        id: 'action-3',
        type: 'action',
        subType: 'script',
        position: { x: 350, y: 250 },
        data: { label: 'Run Security Scan', description: 'Execute vulnerability assessment' }
      },
      {
        id: 'outcome-2',
        type: 'outcome',
        subType: 'conditional',
        position: { x: 250, y: 400 },
        data: { label: 'Assessment Complete', description: 'Security assessment finished' }
      }
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'trigger-2',
        target: 'action-2',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      },
      {
        id: 'edge-1-3',
        source: 'trigger-2',
        target: 'action-3',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      },
      {
        id: 'edge-2-3',
        source: 'action-2',
        target: 'outcome-2',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      },
      {
        id: 'edge-3-3',
        source: 'action-3',
        target: 'outcome-2',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }
    ],
    createdBy: 'Security Officer',
    lastModified: '2024-04-03T14:30:00Z',
    status: 'active',
    version: 2,
    createdAt: '2024-03-25T09:45:00Z'
  }
];
