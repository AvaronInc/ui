
import { User, Team, DirectMessage, Channel, Message, UserStatus } from './types';

export const mockCurrentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  avatar: undefined,
  email: 'alex.morgan@company.com',
  status: 'online',
  role: 'Network Engineer'
};

export const mockUsers: User[] = [
  mockCurrentUser,
  { 
    id: 'u2', 
    name: 'Sam Wilson', 
    email: 'sam.wilson@company.com',
    status: 'online', 
    role: 'System Admin' 
  },
  { 
    id: 'u3', 
    name: 'Taylor Chen', 
    email: 'taylor.chen@company.com',
    status: 'away', 
    role: 'Security Analyst' 
  },
  { 
    id: 'u4', 
    name: 'Jamie Rodriguez', 
    email: 'jamie.rodriguez@company.com',
    status: 'dnd', 
    role: 'IT Manager' 
  },
  { 
    id: 'u5', 
    name: 'Morgan Smith', 
    email: 'morgan.smith@company.com',
    status: 'offline', 
    role: 'DevOps Engineer' 
  },
];

// Generate a channel with messages
const createChannel = (id: string, name: string, isPrivate: boolean, members: User[], topic?: string): Channel => {
  const messages: Message[] = Array(5).fill(null).map((_, idx) => ({
    id: `msg-${id}-${idx}`,
    content: `This is a message in ${name} channel - ${idx}`,
    sender: members[idx % members.length],
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7) // Random time in last week
  }));
  
  return {
    id,
    name,
    isPrivate,
    members,
    messages,
    topic
  };
};

// Create IT Team
const itTeamChannels: Channel[] = [
  createChannel('ch1', 'general', false, mockUsers, 'General IT discussions'),
  createChannel('ch2', 'security', false, [mockUsers[0], mockUsers[2], mockUsers[3]], 'Security discussions'),
  createChannel('ch3', 'network', false, [mockUsers[0], mockUsers[1], mockUsers[4]], 'Network infrastructure'),
  createChannel('ch4', 'project-x', true, [mockUsers[0], mockUsers[3]], 'Confidential project X')
];

// Create DevOps Team
const devopsTeamChannels: Channel[] = [
  createChannel('ch5', 'general', false, [mockUsers[0], mockUsers[1], mockUsers[4]], 'General DevOps discussions'),
  createChannel('ch6', 'ci-cd', false, [mockUsers[0], mockUsers[1], mockUsers[4]], 'CI/CD pipeline'),
  createChannel('ch7', 'kubernetes', false, [mockUsers[0], mockUsers[4]], 'Kubernetes cluster management')
];

// Create Security Team
const securityTeamChannels: Channel[] = [
  createChannel('ch8', 'general', false, [mockUsers[0], mockUsers[2], mockUsers[3]], 'General security discussions'),
  createChannel('ch9', 'incidents', false, [mockUsers[0], mockUsers[2], mockUsers[3]], 'Security incidents'),
  createChannel('ch10', 'compliance', true, [mockUsers[0], mockUsers[2], mockUsers[3]], 'Compliance and audit')
];

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'IT Operations',
    description: 'IT Operations team',
    channels: itTeamChannels,
    members: mockUsers
  },
  {
    id: 't2',
    name: 'DevOps',
    description: 'DevOps team',
    channels: devopsTeamChannels,
    members: [mockUsers[0], mockUsers[1], mockUsers[4]]
  },
  {
    id: 't3',
    name: 'Security',
    description: 'Security team',
    channels: securityTeamChannels,
    members: [mockUsers[0], mockUsers[2], mockUsers[3]]
  }
];

// Create direct messages
const createDirectMessage = (id: string, recipient: User): DirectMessage => {
  const messages: Message[] = Array(3).fill(null).map((_, idx) => ({
    id: `dm-${id}-${idx}`,
    content: `Direct message ${idx + 1} between you and ${recipient.name}`,
    sender: idx % 2 === 0 ? mockCurrentUser : recipient,
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24) // Random time in last day
  }));
  
  return {
    id,
    recipient,
    messages
  };
};

export const mockDirectMessages: DirectMessage[] = [
  createDirectMessage('dm1', mockUsers[1]),
  createDirectMessage('dm2', mockUsers[2]),
  createDirectMessage('dm3', mockUsers[3]),
  createDirectMessage('dm4', mockUsers[4])
];
