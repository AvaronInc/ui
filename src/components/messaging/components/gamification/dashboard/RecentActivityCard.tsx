
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Clock, PenTool, MessageSquare, CheckCircle2, ThumbsUp
} from 'lucide-react';
import { UserContribution } from '../../../types/gamification';
import ActivityItem from './ActivityItem';

type RecentActivityCardProps = {
  contribution: UserContribution;
};

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ contribution }) => {
  const { recentActivity } = contribution;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Your latest contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[340px] pr-4">
          {recentActivity.map(activity => (
            <ActivityItem 
              key={activity.id}
              title={activity.title}
              timestamp={activity.timestamp}
              type={activity.type}
              icon={
                activity.type === 'post' ? <PenTool className="h-4 w-4" /> :
                activity.type === 'comment' ? <MessageSquare className="h-4 w-4" /> :
                activity.type === 'solution' ? <CheckCircle2 className="h-4 w-4" /> :
                <ThumbsUp className="h-4 w-4" />
              }
            />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        <p>Activity is updated in real-time as you contribute.</p>
      </CardFooter>
    </Card>
  );
};

export default RecentActivityCard;
