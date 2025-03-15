
export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'error' | 'warning';
  lastSynced: string;
  config?: Record<string, any>;
  recentEvents?: {
    type: 'info' | 'error' | 'warning';
    message: string;
    timestamp: string;
  }[];
}

export interface IntegrationPlatform {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  category: string;
  isConfigured?: boolean;
  config?: Record<string, any>;
}

// Mock data for active integrations
export const mockActiveIntegrations: Integration[] = [
  {
    id: "snow-1",
    name: "ServiceNow",
    description: "ITSM ticket syncing and asset management",
    category: "ITSM",
    status: "active",
    lastSynced: "2 minutes ago",
    recentEvents: [
      {
        type: "info",
        message: "Successfully synced 23 tickets from ServiceNow",
        timestamp: "2023-09-15T14:32:00"
      }
    ]
  },
  {
    id: "splunk-1",
    name: "Splunk",
    description: "Security logging and event monitoring",
    category: "Security & SIEM",
    status: "warning",
    lastSynced: "15 minutes ago",
    recentEvents: [
      {
        type: "warning",
        message: "Partial sync completed - 45 events processed, 12 skipped",
        timestamp: "2023-09-15T14:17:00"
      }
    ]
  },
  {
    id: "aws-1",
    name: "AWS",
    description: "Cloud infrastructure integration",
    category: "Cloud Providers",
    status: "active",
    lastSynced: "5 minutes ago"
  },
  {
    id: "azure-1",
    name: "Microsoft Azure",
    description: "Cloud services and authentication",
    category: "Cloud Providers",
    status: "error",
    lastSynced: "1 hour ago",
    recentEvents: [
      {
        type: "error",
        message: "Authentication failed - invalid API key or expired credentials",
        timestamp: "2023-09-15T13:30:00"
      }
    ]
  },
  {
    id: "datadog-1",
    name: "Datadog",
    description: "Performance monitoring and analytics",
    category: "Monitoring",
    status: "active",
    lastSynced: "10 minutes ago"
  },
  {
    id: "ansible-1",
    name: "Ansible",
    description: "Automation scripts for network devices",
    category: "Automation",
    status: "active",
    lastSynced: "30 minutes ago",
    recentEvents: [
      {
        type: "info",
        message: "Successfully executed 3 automation playbooks",
        timestamp: "2023-09-15T14:02:00"
      }
    ]
  }
];

// ITSM Platforms
export const mockITSMPlatforms: IntegrationPlatform[] = [
  {
    id: "servicenow",
    name: "ServiceNow",
    description: "Enterprise IT service management platform",
    logoUrl: "/placeholder.svg",
    category: "ITSM",
    isConfigured: true,
    config: {
      apiUrl: "https://instance.service-now.com/api",
      apiKey: "***************",
      twoWaySync: true,
      autoSyncAssets: true,
      autoCreateTickets: true,
      syncInterval: 15,
      ticketCategories: "Network,Security,Hardware,Software"
    }
  },
  {
    id: "jira",
    name: "Jira Service Management",
    description: "Atlassian's ITSM solution for service desks",
    logoUrl: "/placeholder.svg",
    category: "ITSM"
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Customer service platform with ticketing system",
    logoUrl: "/placeholder.svg",
    category: "ITSM"
  },
  {
    id: "freshservice",
    name: "Freshservice",
    description: "Cloud-based ITSM solution for enterprise",
    logoUrl: "/placeholder.svg",
    category: "ITSM"
  }
];

// Security Platforms
export const mockSecurityPlatforms: IntegrationPlatform[] = [
  {
    id: "splunk",
    name: "Splunk",
    description: "Data analytics platform for security monitoring",
    logoUrl: "/placeholder.svg",
    category: "Security"
  },
  {
    id: "qradar",
    name: "IBM QRadar",
    description: "Security intelligence platform",
    logoUrl: "/placeholder.svg",
    category: "Security"
  },
  {
    id: "sentinel",
    name: "Microsoft Sentinel",
    description: "Cloud-native SIEM and SOAR solution",
    logoUrl: "/placeholder.svg",
    category: "Security"
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike Falcon",
    description: "Endpoint protection and threat intelligence",
    logoUrl: "/placeholder.svg",
    category: "Security"
  },
  {
    id: "wazuh",
    name: "Wazuh",
    description: "Open source security monitoring solution",
    logoUrl: "/placeholder.svg",
    category: "Security"
  }
];

// Cloud Provider Platforms
export const mockCloudPlatforms: IntegrationPlatform[] = [
  {
    id: "aws",
    name: "AWS",
    description: "Amazon Web Services cloud platform",
    logoUrl: "/placeholder.svg",
    category: "Cloud"
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    description: "Microsoft's cloud computing platform",
    logoUrl: "/placeholder.svg",
    category: "Cloud"
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    description: "Google's suite of cloud computing services",
    logoUrl: "/placeholder.svg",
    category: "Cloud"
  },
  {
    id: "oracle",
    name: "Oracle Cloud",
    description: "Oracle's cloud infrastructure and services",
    logoUrl: "/placeholder.svg",
    category: "Cloud"
  }
];

// Monitoring Platforms
export const mockMonitoringPlatforms: IntegrationPlatform[] = [
  {
    id: "datadog",
    name: "Datadog",
    description: "Monitoring service for cloud applications",
    logoUrl: "/placeholder.svg",
    category: "Monitoring"
  },
  {
    id: "nagios",
    name: "Nagios",
    description: "IT infrastructure monitoring system",
    logoUrl: "/placeholder.svg",
    category: "Monitoring"
  },
  {
    id: "zabbix",
    name: "Zabbix",
    description: "Enterprise-class open source monitoring solution",
    logoUrl: "/placeholder.svg",
    category: "Monitoring"
  },
  {
    id: "newrelic",
    name: "New Relic",
    description: "Application performance monitoring solution",
    logoUrl: "/placeholder.svg",
    category: "Monitoring"
  },
  {
    id: "elastic",
    name: "Elastic Stack",
    description: "Log analytics and search platform",
    logoUrl: "/placeholder.svg",
    category: "Monitoring"
  }
];

// Automation Platforms
export const mockAutomationPlatforms: IntegrationPlatform[] = [
  {
    id: "ansible",
    name: "Ansible",
    description: "Automation platform for configuration management",
    logoUrl: "/placeholder.svg",
    category: "Automation"
  },
  {
    id: "terraform",
    name: "Terraform",
    description: "Infrastructure as code software tool",
    logoUrl: "/placeholder.svg",
    category: "Automation"
  },
  {
    id: "powershell",
    name: "PowerShell",
    description: "Task automation and configuration management",
    logoUrl: "/placeholder.svg",
    category: "Automation"
  },
  {
    id: "python",
    name: "Python Scripts",
    description: "Custom Python-based automation",
    logoUrl: "/placeholder.svg",
    category: "Automation"
  }
];
