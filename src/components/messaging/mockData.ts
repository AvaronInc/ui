
import { User, Conversation, Message } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  status: 'online',
  role: 'Network Engineer'
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'u2', name: 'Sam Wilson', status: 'online', role: 'System Admin' },
  { id: 'u3', name: 'Taylor Chen', status: 'away', role: 'Security Analyst' },
  { id: 'u4', name: 'Jamie Rodriguez', status: 'dnd', role: 'IT Manager' },
  { id: 'u5', name: 'Morgan Smith', status: 'offline', role: 'DevOps Engineer' },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Security Team',
    isGroup: true,
    participants: [mockUsers[0], mockUsers[1], mockUsers[2]],
    lastMessage: {
      id: 'm1',
      content: 'Has everyone reviewed the new firewall rules?',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    unreadCount: 2,
  },
  {
    id: 'c2',
    name: 'Sam Wilson',
    isGroup: false,
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: 'm2',
      content: 'I\'ll prepare the server maintenance report by EOD',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    unreadCount: 0,
  },
  {
    id: 'c3',
    name: 'Network Ops',
    isGroup: true,
    participants: [mockUsers[0], mockUsers[1], mockUsers[3], mockUsers[4]],
    lastMessage: {
      id: 'm3',
      content: 'Datacenter migration planning meeting at 3 PM tomorrow',
      sender: mockUsers[3],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
    unreadCount: 0,
  },
  {
    id: 'c4',
    name: 'Jamie Rodriguez',
    isGroup: false,
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      id: 'm4',
      content: 'Please review the updated disaster recovery procedures',
      sender: mockUsers[3],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    unreadCount: 1,
  },
];

export const mockMessages: Record<string, Message[]> = {
  'c1': [
    {
      id: 'm11',
      content: 'Team, we need to review our security protocols this week.',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: 'm12',
      content: 'I\'ve prepared the initial assessment, will share later today.',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: 'm13',
      content: 'Great, I\'ll start on the network vulnerability scans.',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
    },
    {
      id: 'm14',
      content: 'Has everyone reviewed the new firewall rules?',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isPinned: true,
    },
  ],
};
