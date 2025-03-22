
import { UserStats, Badge } from '../types/gamification';
import { availableBadges } from './badges';

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
