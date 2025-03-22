
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { mockUserStats, availableBadges, getUserBadges } from '../../mockData/gamificationData';
import { 
  BadgeStats, 
  BadgeCatalog 
} from './badges';

const BadgeShowcase: React.FC = () => {
  // For demo purposes, let's assume the current user is the first user in our mock data
  const currentUser = mockUserStats[0];
  const earnedBadges = getUserBadges(currentUser);
  const earnedBadgeIds = earnedBadges.map(badge => badge.id);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Badges</h1>
          <p className="text-muted-foreground">
            Earn badges for your contributions to the community
          </p>
        </div>
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-1" />
          View My Badges
        </Button>
      </div>
      
      {/* Badge Stats Overview */}
      <BadgeStats 
        totalBadges={availableBadges.length} 
        earnedBadges={earnedBadges} 
      />
      
      {/* Badge Catalog */}
      <BadgeCatalog 
        badges={availableBadges}
        earnedBadgeIds={earnedBadgeIds}
      />
    </div>
  );
};

export default BadgeShowcase;
