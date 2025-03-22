
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { Trophy, Info } from 'lucide-react';
import { Badge } from '../../../types/gamification';
import BadgeLevel from './BadgeLevel';

type BadgeCardProps = { 
  badge: Badge;
  earned?: boolean;
};

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, earned = false }) => {
  return (
    <Card className={`transition-all ${earned ? 'border-primary/50 bg-primary/5' : 'opacity-70'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={badge.name}>{badge.icon}</span>
            {badge.name}
          </CardTitle>
          <BadgeLevel level={badge.level} />
        </div>
        <CardDescription>{badge.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {earned ? 'Earned' : 'Progress'}: 
            {earned && badge.earnedAt 
              ? ` ${badge.earnedAt.toLocaleDateString()}` 
              : ' Not yet earned'}
          </span>
          {earned && (
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>Achieved</span>
            </div>
          )}
        </div>
      </CardContent>
      {!earned && (
        <CardFooter className="pt-0">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Required: {badge.threshold} {badge.category}</span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BadgeCard;
