
import { UserStats } from '../types/gamification';
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
