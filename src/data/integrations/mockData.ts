
// Mock data for active integrations
export const mockActiveIntegrations = [
  {
    id: '1',
    name: 'ServiceNow',
    description: 'Enterprise IT service management platform',
    category: 'ITSM',
    status: 'active' as 'active' | 'inactive' | 'error' | 'warning',
    lastSynced: '10 minutes ago',
    logoUrl: '/placeholder.svg',
    recentEvents: [
      {
        type: 'success',
        message: 'Successfully synced 24 tickets',
        timestamp: '2023-07-15 14:32:00'
      }
    ]
  },
  {
    id: '2',
    name: 'Splunk',
    description: 'Security information and event management',
    category: 'Security & SIEM',
    status: 'warning' as 'active' | 'inactive' | 'error' | 'warning',
    lastSynced: '1 hour ago',
    logoUrl: '/placeholder.svg',
    recentEvents: [
      {
        type: 'warning',
        message: 'Partial sync completed - 5 events failed to sync',
        timestamp: '2023-07-15 13:45:00'
      }
    ]
  },
  {
    id: '3',
    name: 'AWS',
    description: 'Amazon Web Services cloud platform',
    category: 'Cloud Provider',
    status: 'active' as 'active' | 'inactive' | 'error' | 'warning',
    lastSynced: '30 minutes ago',
    logoUrl: '/placeholder.svg',
    recentEvents: [
      {
        type: 'success',
        message: 'Successfully synced EC2 instances',
        timestamp: '2023-07-15 14:15:00'
      }
    ]
  },
  {
    id: '4',
    name: 'Datadog',
    description: 'Cloud monitoring and analytics platform',
    category: 'Monitoring',
    status: 'error' as 'active' | 'inactive' | 'error' | 'warning',
    lastSynced: '2 hours ago',
    logoUrl: '/placeholder.svg',
    recentEvents: [
      {
        type: 'error',
        message: 'API connection failed - invalid API key',
        timestamp: '2023-07-15 12:45:00'
      }
    ]
  },
  {
    id: '5',
    name: 'Ansible',
    description: 'Automation platform for configuration management',
    category: 'Automation',
    status: 'active' as 'active' | 'inactive' | 'error' | 'warning',
    lastSynced: '45 minutes ago',
    logoUrl: '/placeholder.svg'
  }
];

// Mock data for ITSM platforms
export const mockITSMPlatforms = [
  {
    id: 'snow',
    name: 'ServiceNow',
    description: 'Enterprise service management platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'jira',
    name: 'Jira Service Management',
    description: 'Issue tracking and service management',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer service and engagement platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'freshservice',
    name: 'Freshservice',
    description: 'IT service management solution',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'BMC',
    name: 'BMC Remedy',
    description: 'IT Service Management Suite',
    logoUrl: '/placeholder.svg'
  }
];

// Mock data for Security platforms
export const mockSecurityPlatforms = [
  {
    id: 'splunk',
    name: 'Splunk',
    description: 'Security information and event management',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'qradar',
    name: 'IBM QRadar',
    description: 'Security intelligence platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'sentinel',
    name: 'Microsoft Sentinel',
    description: 'Cloud-native SIEM solution',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'crowdstrike',
    name: 'CrowdStrike Falcon',
    description: 'Endpoint protection platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'wazuh',
    name: 'Wazuh',
    description: 'Open source security monitoring',
    logoUrl: '/placeholder.svg'
  }
];

// Mock data for Cloud platforms
export const mockCloudPlatforms = [
  {
    id: 'aws',
    name: 'AWS',
    description: 'Amazon Web Services cloud platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Microsoft cloud computing platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    description: 'Google\'s suite of cloud computing services',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'oracle',
    name: 'Oracle Cloud',
    description: 'Enterprise cloud computing solutions',
    logoUrl: '/placeholder.svg'
  }
];

// Mock data for Monitoring platforms
export const mockMonitoringPlatforms = [
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Cloud monitoring and analytics platform',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'nagios',
    name: 'Nagios',
    description: 'IT infrastructure monitoring solution',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'zabbix',
    name: 'Zabbix',
    description: 'Enterprise-class open source monitoring',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'newrelic',
    name: 'New Relic',
    description: 'Observability platform for application performance monitoring',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'elk',
    name: 'Elastic Stack (ELK)',
    description: 'Log management and analytics platform',
    logoUrl: '/placeholder.svg'
  }
];

// Mock data for Automation platforms
export const mockAutomationPlatforms = [
  {
    id: 'ansible',
    name: 'Ansible',
    description: 'Automation platform for configuration management',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'terraform',
    name: 'Terraform',
    description: 'Infrastructure as code software tool',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'powershell',
    name: 'PowerShell',
    description: 'Task automation and configuration management framework',
    logoUrl: '/placeholder.svg'
  },
  {
    id: 'python',
    name: 'Python Scripting',
    description: 'Custom Python scripts for automation',
    logoUrl: '/placeholder.svg'
  }
];
