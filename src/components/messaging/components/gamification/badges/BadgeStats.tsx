
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, Trophy, BookOpen, List } from 'lucide-react';
import { Badge } from '../../../types/gamification';

type BadgeStatsProps = {
  totalBadges: number;
  earnedBadges: Badge[];
};

const BadgeStats: React.FC<BadgeStatsProps> = ({ totalBadges, earnedBadges }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Total Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalBadges}</div>
          <p className="text-sm text-muted-foreground">Available to earn</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{earnedBadges.length}</div>
          <p className="text-sm text-muted-foreground">
            {Math.round((earnedBadges.length / totalBadges) * 100)}% collected
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Next Badge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">🧩 Problem Solver II</div>
          <p className="text-xs text-muted-foreground">
            17/25 solutions provided
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <List className="h-5 w-5 text-green-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">💬 Conversationalist</div>
          <p className="text-xs text-muted-foreground">
            Earned 2 weeks ago
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeStats;
