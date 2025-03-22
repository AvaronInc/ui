
import { UserStats, Badge, UserContribution } from '../types/gamification';
import { mockUsers } from '../mockData';

// Sample user statistics for the leaderboard
export const mockUserStats: UserStats[] = mockUsers.map((user, index) => ({
  id: user.id,
  name: user.name,
  avatar: user.avatar,
  department: user.department,
  role: user.role,
  solutionsMarked: Math.floor(Math.random() * 30),
  postsCreated: Math.floor(Math.random() * 50),
  commentsPosted: Math.floor(Math.random() * 200),
  reactionsReceived: Math.floor(Math.random() * 300),
}));

// Sample badges that users can earn
export const availableBadges: Badge[] = [
  {
    id: 'problem-solver',
    name: '🧩 Problem Solver',
    description: 'Provided 10 or more solutions to community problems',
    icon: '🧩',
    threshold: 10,
    category: 'solutions',
    level: 'bronze'
  },
  {
    id: 'problem-solver-silver',
    name: '🧩 Problem Solver II',
    description: 'Provided 25 or more solutions to community problems',
    icon: '🧩',
    threshold: 25,
    category: 'solutions',
    level: 'silver'
  },
  {
    id: 'problem-solver-gold',
    name: '🧩 Problem Solver III',
    description: 'Provided 50 or more solutions to community problems',
    icon: '🧩',
    threshold: 50,
    category: 'solutions',
    level: 'gold'
  },
  {
    id: 'conversationalist',
    name: '💬 Conversationalist',
    description: 'Posted 100 or more comments',
    icon: '💬',
    threshold: 100,
    category: 'comments',
    level: 'bronze'
  },
  {
    id: 'conversationalist-silver',
    name: '💬 Conversationalist II',
    description: 'Posted 250 or more comments',
    icon: '💬',
    threshold: 250,
    category: 'comments',
    level: 'silver'
  },
  {
    id: 'knowledge-architect',
    name: '🧠 Knowledge Architect',
    description: 'Created 5 or more posts with 10+ reactions each',
    icon: '🧠',
    threshold: 5,
    category: 'posts',
    level: 'silver'
  },
  {
    id: 'hot-topic',
    name: '🔥 Hot Topic',
    description: 'Created a post that reached the Top 3 trending',
    icon: '🔥',
    threshold: 1,
    category: 'trending',
    level: 'gold'
  },
  {
    id: 'first-post',
    name: '🎯 First Post',
    description: 'Created your first post',
    icon: '🎯',
    threshold: 1,
    category: 'posts',
    level: 'bronze'
  },
  {
    id: 'rising-star',
    name: '⭐ Rising Star',
    description: 'Received 50+ reactions on your content',
    icon: '⭐',
    threshold: 50,
    category: 'reactions',
    level: 'bronze'
  },
  {
    id: 'community-pillar',
    name: '🏛️ Community Pillar',
    description: 'Active for 6+ months with consistent contributions',
    icon: '🏛️',
    threshold: 180,
    category: 'posts',
    level: 'platinum'
  }
];

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

// Helper function to get user badges based on their stats
export const getUserBadges = (stats: UserStats): Badge[] => {
  const earnedBadges: Badge[] = [];
  
  if (stats.solutionsMarked >= 10) {
    earnedBadges.push({
      ...availableBadges[0],
      earnedAt: new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1)
    });
  }
  
  if (stats.solutionsMarked >= 25) {
    earnedBadges.push({
      ...availableBadges[1],
      earnedAt: new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1)
    });
  }
  
  if (stats.commentsPosted >= 100) {
    earnedBadges.push({
      ...availableBadges[3],
      earnedAt: new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1)
    });
  }
  
  if (stats.postsCreated >= 1) {
    earnedBadges.push({
      ...availableBadges[7],
      earnedAt: new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1)
    });
  }
  
  if (stats.reactionsReceived >= 50) {
    earnedBadges.push({
      ...availableBadges[8],
      earnedAt: new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1)
    });
  }
  
  return earnedBadges;
};
