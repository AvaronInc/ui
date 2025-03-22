
export interface UserStats {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  role: string;
  solutionsMarked: number;
  postsCreated: number;
  commentsPosted: number;
  reactionsReceived: number;
  rank?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
  category: 'solutions' | 'comments' | 'posts' | 'trending';
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedAt?: Date;
}

export interface UserContribution {
  totalPosts: number;
  totalComments: number;
  totalSolutions: number;
  totalReactionsReceived: number;
  averageEngagement: number;
  badges: Badge[];
  postsOverTime: {
    date: string;
    count: number;
  }[];
  commentsOverTime: {
    date: string;
    count: number;
  }[];
  recentActivity: {
    id: string;
    type: 'post' | 'comment' | 'solution' | 'reaction';
    title: string;
    timestamp: Date;
  }[];
}

export type TimeFilter = 'monthly' | 'quarterly' | 'all-time';
export type RankingType = 'solutions' | 'posts' | 'comments' | 'reactions';
