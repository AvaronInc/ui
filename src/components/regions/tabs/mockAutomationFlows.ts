
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
          type: 'arrowclosed'
        }
      },
      {
        id: 'edge-2-3',
        source: 'action-1',
        target: 'outcome-1',
        animated: true,
        style: { stroke: '#2563eb' },
        markerEnd: {
          type: 'arrowclosed'
        }
      }
    ],
    createdBy: 'System Admin',
    lastModified: '2024-04-01T10:00:00Z',
    status: 'active',
    version: 1,
    createdAt: '2024-03-28T15:30:00Z'
  }
];
