
import { UserContribution } from '../types/gamification';
import { availableBadges } from './badges';

// Sample user contribution data
export const mockUserContribution: UserContribution = {
  totalPosts: 23,
  totalComments: 145,
  totalSolutions: 17,
  totalReactionsReceived: 210,
  averageEngagement: 9.13,
  badges: [
    {
      ...availableBadges[0],
      earnedAt: new Date(2023, 3, 15)
    },
    {
      ...availableBadges[3],
      earnedAt: new Date(2023, 5, 22)
    },
    {
      ...availableBadges[7],
      earnedAt: new Date(2023, 1, 5)
    }
  ],
  postsOverTime: [
    { date: '2023-01', count: 2 },
    { date: '2023-02', count: 3 },
    { date: '2023-03', count: 1 },
    { date: '2023-04', count: 4 },
    { date: '2023-05', count: 2 },
    { date: '2023-06', count: 5 },
    { date: '2023-07', count: 6 }
  ],
  commentsOverTime: [
    { date: '2023-01', count: 12 },
    { date: '2023-02', count: 18 },
    { date: '2023-03', count: 15 },
    { date: '2023-04', count: 25 },
    { date: '2023-05', count: 19 },
    { date: '2023-06', count: 28 },
    { date: '2023-07', count: 30 }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'post',
      title: 'Network Configuration Best Practices',
      timestamp: new Date(2023, 6, 28)
    },
    {
      id: '2',
      type: 'comment',
      title: 'Re: Firewall Implementation',
      timestamp: new Date(2023, 6, 25)
    },
    {
      id: '3',
      type: 'solution',
      title: 'Fixed: VPN Connection Issues',
      timestamp: new Date(2023, 6, 22)
    },
    {
      id: '4',
      type: 'reaction',
      title: 'Liked: Security Protocol Updates',
      timestamp: new Date(2023, 6, 20)
    }
  ]
};
