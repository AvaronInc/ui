
import { Conversation, Message, User, Post } from './types';

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  avatar: '/lovable-uploads/7a756512-0fbb-4a57-8285-428cb5a8bd2c.png',
  department: 'Network Operations',
  role: 'Senior Network Engineer',
  status: 'online'
};

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Network Team',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Discussions about network infrastructure and security.',
    isGroup: true,
    participants: [
      currentUser,
      {
        id: 'user2',
        name: 'Sarah Chen',
        avatar: '/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png',
        department: 'Security',
        role: 'CISO',
        status: 'online'
      },
      {
        id: 'user3',
        name: 'Marcus Williams',
        avatar: '/lovable-uploads/e05794c6-4e4e-4e35-903f-c2f666cf5d6d.png',
        department: 'Infrastructure',
        role: 'Systems Administrator',
        status: 'away'
      }
    ],
    lastMessage: {
      sender: {
        id: 'user3',
        name: 'Marcus Williams',
        department: 'Infrastructure',
        role: 'Systems Administrator'
      },
      content: 'Updated firewall rules.',
      timestamp: new Date()
    },
    unreadCount: 0
  },
  {
    id: '2',
    name: 'Sarah Chen',
    type: 'direct',
    avatar: '/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png',
    description: 'Direct messages with Sarah Chen',
    isGroup: false,
    participants: [
      currentUser,
      {
        id: 'user2',
        name: 'Sarah Chen',
        avatar: '/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png',
        department: 'Security',
        role: 'CISO',
        status: 'online'
      }
    ],
    lastMessage: {
      sender: {
        id: 'user2',
        name: 'Sarah Chen',
        department: 'Security',
        role: 'CISO'
      },
      content: 'Let\'s schedule a call.',
      timestamp: new Date()
    },
    unreadCount: 1
  },
  {
    id: '3',
    name: 'Incident Response',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Coordination for security incidents.',
    lastMessage: {
      sender: {
        id: 'user3',
        name: 'Marcus Williams',
        department: 'Infrastructure',
        role: 'Systems Administrator'
      },
      content: 'Investigating the recent breach attempt.',
      timestamp: new Date()
    }
  },
  {
    id: '4',
    name: 'Infrastructure Updates',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Announcements about infrastructure changes.',
    lastMessage: {
      sender: {
        id: 'user4',
        name: 'Priya Patel',
        department: 'DevOps',
        role: 'DevOps Engineer'
      },
      content: 'Migrated database to new server.',
      timestamp: new Date()
    }
  },
  {
    id: '5',
    name: 'Troubleshooting',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'General troubleshooting discussions.',
    lastMessage: {
      sender: {
        id: 'user5',
        name: 'Robert',
        department: 'Support',
        role: 'Technical Support'
      },
      content: 'Having issues with VPN connectivity.',
      timestamp: new Date()
    }
  },
  {
    id: '6',
    name: 'Database Team',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Discussions about database management and optimization.',
    lastMessage: {
      sender: {
        id: 'user6',
        name: 'Emily',
        department: 'Database',
        role: 'Database Administrator'
      },
      content: 'Optimized query performance.',
      timestamp: new Date()
    }
  },
  {
    id: '7',
    name: 'DevOps Team',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Coordination for DevOps tasks.',
    lastMessage: {
      sender: {
        id: 'user7',
        name: 'David',
        department: 'DevOps',
        role: 'DevOps Engineer'
      },
      content: 'Automated deployment pipeline.',
      timestamp: new Date()
    }
  },
  {
    id: '8',
    name: 'Cloud Services',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Discussions about cloud services and architecture.',
    lastMessage: {
      sender: {
        id: 'user8',
        name: 'Jessica',
        department: 'Cloud',
        role: 'Cloud Architect'
      },
      content: 'Implemented autoscaling for web servers.',
      timestamp: new Date()
    }
  },
  {
    id: '9',
    name: 'Security Alerts',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Real-time security alerts and notifications.',
    lastMessage: {
      sender: {
        id: 'user9',
        name: 'Kevin',
        department: 'Security',
        role: 'Security Analyst'
      },
      content: 'Detected suspicious activity on the network.',
      timestamp: new Date()
    }
  },
  {
    id: '10',
    name: 'System Monitoring',
    type: 'channel',
    avatar: '/placeholder.svg',
    description: 'Discussions about system monitoring and performance.',
    lastMessage: {
      sender: {
        id: 'user10',
        name: 'Linda',
        department: 'Operations',
        role: 'System Monitor'
      },
      content: 'Set up new monitoring dashboards.',
      timestamp: new Date()
    }
  }
];

export const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: 'm1',
      sender: {
        id: 'user3',
        name: 'Marcus Williams',
        avatar: '/lovable-uploads/e05794c6-4e4e-4e35-903f-c2f666cf5d6d.png',
        department: 'Infrastructure',
        role: 'Systems Administrator'
      },
      content: 'Updated firewall rules to block suspicious IPs.',
      timestamp: new Date(),
      attachments: [],
    },
    {
      id: 'm2',
      sender: {
        id: 'user2',
        name: 'Sarah Chen',
        avatar: '/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png',
        department: 'Security',
        role: 'CISO'
      },
      content: 'Thanks, Marcus! Can you share the list of blocked IPs?',
      timestamp: new Date(Date.now() + 3600000),
      attachments: [],
    },
  ],
  '2': [
    {
      id: 'm3',
      sender: currentUser,
      content: 'Hi Sarah, are you available for a quick call?',
      timestamp: new Date(),
      attachments: [],
    },
    {
      id: 'm4',
      sender: {
        id: 'user2',
        name: 'Sarah Chen',
        avatar: '/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png',
        department: 'Security',
        role: 'CISO'
      },
      content: 'Yes, I am. Let\'s schedule it for tomorrow morning.',
      timestamp: new Date(Date.now() + 3600000),
      attachments: [],
    },
  ],
};

// Add mock data for the collaboration board
export const mockUsers: User[] = [
  currentUser,
  {
    id: 'user2',
    name: 'Sarah Chen',
    avatar: '/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png',
    department: 'Security',
    role: 'CISO',
    status: 'online'
  },
  {
    id: 'user3',
    name: 'Marcus Williams',
    avatar: '/lovable-uploads/e05794c6-4e4e-4e35-903f-c2f666cf5d6d.png',
    department: 'Infrastructure',
    role: 'Systems Administrator',
    status: 'away'
  },
  {
    id: 'user4',
    name: 'Priya Patel',
    department: 'DevOps',
    role: 'DevOps Engineer',
    status: 'offline'
  }
];

export const mockTags = [
  'Networking', 'Firewall', 'Wazuh', 'Security', 'Incident', 
  'Infrastructure', 'Linux', 'Windows', 'Cloud', 'AWS', 
  'Azure', 'Docker', 'Kubernetes', 'Monitoring', 'Alert',
  'Hardware', 'Software', 'Updates', 'Database', 'Backup',
  'Storage', 'Authentication', 'Encryption', 'Performance'
];

const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

const fiveDaysAgo = new Date();
fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const mockPosts: Post[] = [
  {
    id: 'post1',
    title: 'Upgraded Firewall Firmware - Important Changes',
    content: `We've successfully upgraded the main firewall to version 9.2.1. There are several important changes to be aware of:

* New TLS inspection capabilities
* Improved application recognition
* Changed default behavior for zone transfers

Please test your critical applications and report any issues.

\`\`\`
fw1> show system info
Model: PA-5280
Version: 9.2.1
Uptime: 2h 15m
\`\`\``,
    author: mockUsers[0],
    timestamp: fiveDaysAgo,
    tags: ['Firewall', 'Security', 'Updates'],
    reactions: {
      like: { type: 'like', count: 12, reactedBy: ['user2', 'user3'] },
      heart: { type: 'heart', count: 5, reactedBy: [] },
      rocket: { type: 'rocket', count: 3, reactedBy: [] },
      laugh: { type: 'laugh', count: 0, reactedBy: [] }
    },
    comments: [
      {
        id: 'comment1',
        author: mockUsers[1],
        content: 'Great work! Have you noticed any performance improvements with the new version?',
        timestamp: new Date(fiveDaysAgo.getTime() + 3600000),
        reactions: [
          { type: 'like', count: 2, reactedBy: ['user1'] }
        ]
      },
      {
        id: 'comment2',
        author: mockUsers[0],
        content: 'Yes, there\'s about a 15% improvement in throughput for TLS inspection.',
        timestamp: new Date(fiveDaysAgo.getTime() + 7200000),
        reactions: [
          { type: 'like', count: 1, reactedBy: [] }
        ]
      }
    ],
    isPinned: true,
    visibility: 'everyone'
  },
  {
    id: 'post2',
    title: 'Wazuh Alert Increase in Dev Environment',
    content: `We're seeing a significant increase in Wazuh alerts from the dev environment over the past 48 hours. Most appear to be related to unusual file modifications in /var/www.

I've added a temporary exception while we investigate. Can someone from the dev team confirm if there's been a deployment or testing that might explain this?

![Alert Graph](/placeholder.svg)`,
    author: mockUsers[1],
    timestamp: threeDaysAgo,
    tags: ['Wazuh', 'Security', 'Alert', 'Monitoring'],
    reactions: {
      like: { type: 'like', count: 8, reactedBy: [] },
      heart: { type: 'heart', count: 2, reactedBy: [] },
      rocket: { type: 'rocket', count: 0, reactedBy: [] },
      laugh: { type: 'laugh', count: 0, reactedBy: [] }
    },
    comments: [
      {
        id: 'comment3',
        author: mockUsers[3],
        content: 'This is likely related to our automated testing pipeline. We added some new test cases that create and modify files in that directory. Sorry for the noise!',
        timestamp: new Date(threeDaysAgo.getTime() + 5400000),
        reactions: [
          { type: 'like', count: 3, reactedBy: [] }
        ]
      }
    ],
    isPinned: false,
    visibility: 'everyone'
  },
  {
    id: 'post3',
    title: 'New Kubernetes Cluster Configuration Guide',
    content: `I've documented our process for setting up and hardening new Kubernetes clusters according to our security standards.

You can find the full guide here: [Internal Wiki Link](#)

Key points:
1. Network policy configuration
2. RBAC setup with least privilege
3. Resource limits and quotas
4. Security context constraints

Let me know if you have any questions or suggestions for improvements.`,
    author: mockUsers[3],
    timestamp: yesterday,
    tags: ['Kubernetes', 'Cloud', 'Security', 'Infrastructure'],
    reactions: {
      like: { type: 'like', count: 15, reactedBy: [] },
      heart: { type: 'heart', count: 7, reactedBy: [] },
      rocket: { type: 'rocket', count: 12, reactedBy: [] },
      laugh: { type: 'laugh', count: 0, reactedBy: [] }
    },
    comments: [],
    isPinned: true,
    visibility: 'everyone'
  },
  {
    id: 'post4',
    title: 'Storage Array Performance Issue',
    content: `We're investigating slow performance on the main storage array (SAN-01). Initial analysis shows unusually high read latency:

\`\`\`
Average read latency: 15.3ms (normal is <5ms)
Write latency: 2.1ms (normal)
Queue depth: 35 (high)
\`\`\`

We're working with the vendor to identify the root cause. Please delay any non-critical large file operations until further notice.`,
    author: mockUsers[2],
    timestamp: new Date(),
    tags: ['Storage', 'Hardware', 'Performance'],
    reactions: {
      like: { type: 'like', count: 3, reactedBy: [] },
      heart: { type: 'heart', count: 0, reactedBy: [] },
      rocket: { type: 'rocket', count: 0, reactedBy: [] },
      laugh: { type: 'laugh', count: 0, reactedBy: [] }
    },
    comments: [],
    isPinned: false,
    visibility: 'admin'
  }
];
