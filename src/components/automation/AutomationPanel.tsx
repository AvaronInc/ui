
import React, { useState } from 'react';
import AutomationOverview from './AutomationOverview';
import ActiveProcesses from './ActiveProcesses';
import ScriptManagement from './ScriptManagement';
import { PageTitle } from '@/components/common/PageTitle';
import { Zap, Server } from 'lucide-react';
import { Script, AutomationProcess, AutomationOverview as AutomationOverviewType, AIDecision } from '@/types/automation';
import { useToast } from '@/hooks/use-toast';

// Sample data for demonstration
const sampleOverview: AutomationOverviewType = {
  totalAutomations: 42,
  activeScriptCounts: {
    PowerShell: 15,
    Ansible: 8,
    Python: 12,
    GoLang: 7
  },
  lastSecurityReportTime: '2023-07-15 14:30:22',
  lastBackupStatus: 'Success'
};

const sampleAiDecisions: AIDecision[] = [
  {
    id: '1',
    description: 'Server resource allocation',
    timestamp: '10 minutes ago',
    confidenceLevel: 98,
    outcome: 'Optimized CPU allocation for server cluster'
  },
  {
    id: '2',
    description: 'Threat detection analysis',
    timestamp: '35 minutes ago',
    confidenceLevel: 86,
    outcome: 'Quarantined suspicious network activity'
  },
  {
    id: '3',
    description: 'Load balancing adjustment',
    timestamp: '1 hour ago',
    confidenceLevel: 92,
    outcome: 'Traffic redirected to backup CDN'
  },
  {
    id: '4',
    description: 'Database index optimization',
    timestamp: '3 hours ago',
    confidenceLevel: 79,
    outcome: 'Query performance improved by 34%'
  }
];

const sampleProcesses: AutomationProcess[] = [
  {
    id: '1',
    name: 'System Health Check',
    type: 'System Maintenance',
    lastExecutionTime: '2023-07-15 08:30:00',
    status: 'Running',
    scheduledRunTime: 'Every 4 hours'
  },
  {
    id: '2',
    name: 'Network Vulnerability Scan',
    type: 'Security',
    lastExecutionTime: '2023-07-14 23:15:00',
    status: 'Completed',
    scheduledRunTime: 'Daily at 23:00'
  },
  {
    id: '3',
    name: 'Database Backup',
    type: 'Backup',
    lastExecutionTime: '2023-07-15 01:00:00',
    status: 'Completed',
    scheduledRunTime: 'Daily at 01:00'
  },
  {
    id: '4',
    name: 'User Access Review',
    type: 'Security',
    lastExecutionTime: '2023-07-10 09:15:00',
    status: 'Failed',
    scheduledRunTime: 'Weekly on Monday'
  },
  {
    id: '5',
    name: 'Server Resource Optimization',
    type: 'AI',
    lastExecutionTime: '2023-07-15 10:45:00',
    status: 'Running',
    scheduledRunTime: 'Every 6 hours'
  },
  {
    id: '6',
    name: 'License Compliance Check',
    type: 'Custom Script',
    lastExecutionTime: '2023-07-01 08:00:00',
    status: 'Completed',
    scheduledRunTime: 'Monthly on 1st'
  }
];

const sampleScripts: Script[] = [
  {
    id: '1',
    name: 'AD User Sync',
    type: 'PowerShell',
    lastExecutionDate: '2023-07-15',
    createdBy: 'System Admin',
    status: 'Active',
    executionFrequency: 'Recurring',
    content: '# PowerShell code here',
    description: 'Synchronizes Active Directory users with local database'
  },
  {
    id: '2',
    name: 'Kubernetes Deployment',
    type: 'Ansible',
    lastExecutionDate: '2023-07-14',
    createdBy: 'DevOps Engineer',
    status: 'Active',
    executionFrequency: 'One-Time',
    content: '# Ansible code here',
    description: 'Deploys microservices to Kubernetes cluster'
  },
  {
    id: '3',
    name: 'Log Analysis',
    type: 'Python',
    lastExecutionDate: '2023-07-13',
    createdBy: 'Security Analyst',
    status: 'Active',
    executionFrequency: 'Scheduled',
    content: '# Python code here',
    description: 'Analyzes system logs for security incidents'
  },
  {
    id: '4',
    name: 'Network Scanner',
    type: 'GoLang',
    lastExecutionDate: '2023-07-12',
    createdBy: 'Network Engineer',
    status: 'Active',
    executionFrequency: 'Recurring',
    content: '// GoLang code here',
    description: 'Scans network for new devices and vulnerabilities'
  },
  {
    id: '5',
    name: 'Certificate Renewal',
    type: 'PowerShell',
    lastExecutionDate: '2023-07-10',
    createdBy: 'System Admin',
    status: 'Inactive',
    executionFrequency: 'Scheduled',
    content: '# PowerShell code here',
    description: 'Renews SSL certificates before expiration'
  }
];

export const AutomationPanel = () => {
  const [scripts, setScripts] = useState<Script[]>(sampleScripts);
  const [processes, setProcesses] = useState<AutomationProcess[]>(sampleProcesses);
  const { toast } = useToast();
  
  const handleCreateScript = (scriptData: Partial<Script>) => {
    const newScript: Script = {
      id: `script-${Math.random().toString(36).substr(2, 9)}`,
      name: scriptData.name || 'New Script',
      type: scriptData.type || 'PowerShell',
      lastExecutionDate: 'Never',
      createdBy: scriptData.createdBy || 'Current User',
      status: scriptData.status || 'Active',
      executionFrequency: scriptData.executionFrequency || 'One-Time',
      content: scriptData.content || '# Script content here',
      description: scriptData.description || 'No description'
    };
    
    setScripts([...scripts, newScript]);
    
    toast({
      title: "Script Created",
      description: `${newScript.name} has been created successfully.`
    });
  };
  
  const handleRunScript = (id: string) => {
    // In a real application, this would trigger the script execution
    toast({
      title: "Script Execution Started",
      description: `The script is now running. You can see its status in Active Processes.`
    });
    
    // Add to active processes
    const script = scripts.find(s => s.id === id);
    if (script) {
      const newProcess: AutomationProcess = {
        id: `process-${Math.random().toString(36).substr(2, 9)}`,
        name: script.name,
        type: 'Custom Script',
        lastExecutionTime: new Date().toLocaleString(),
        status: 'Running'
      };
      
      setProcesses([newProcess, ...processes]);
    }
  };
  
  const handleScheduleScript = (id: string) => {
    toast({
      title: "Script Scheduled",
      description: "The script has been scheduled for execution."
    });
  };
  
  const handleEditScript = (id: string) => {
    toast({
      title: "Edit Script",
      description: "Script editor would open here in a real application."
    });
  };
  
  const handleDeleteScript = (id: string) => {
    setScripts(scripts.filter(s => s.id !== id));
    toast({
      title: "Script Deleted",
      description: "The script has been deleted successfully."
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <PageTitle
        title="Automation Management Panel"
        icon={<Zap className="h-6 w-6" />}
        description="Manage and monitor automated processes across your network"
      />
      
      <AutomationOverview 
        overview={sampleOverview} 
        aiDecisions={sampleAiDecisions} 
      />
      
      <ActiveProcesses processes={processes} />
      
      <ScriptManagement 
        scripts={scripts}
        onCreateScript={handleCreateScript}
        onRunScript={handleRunScript}
        onScheduleScript={handleScheduleScript}
        onEditScript={handleEditScript}
        onDeleteScript={handleDeleteScript}
      />
    </div>
  );
};

export default AutomationPanel;
