
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardContent
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  PenTool, MessageSquare, CheckCircle2, Award
} from 'lucide-react';
import { UserContribution } from '../../../types/gamification';

type SummaryCardsProps = {
  contribution: UserContribution;
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ contribution }) => {
  const {
    totalPosts,
    totalComments,
    totalSolutions,
    badges,
    postsOverTime,
    commentsOverTime
  } = contribution;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <PenTool className="h-5 w-5 text-blue-500" />
            Total Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalPosts}</div>
          <p className="text-sm text-muted-foreground">
            {postsOverTime[postsOverTime.length - 1].count} new in last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalComments}</div>
          <p className="text-sm text-muted-foreground">
            {commentsOverTime[commentsOverTime.length - 1].count} new in last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalSolutions}</div>
          <div className="flex items-center mt-1">
            <Progress value={68} className="h-2" />
            <span className="text-xs text-muted-foreground ml-2">68%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Of all your comments marked as solutions
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Badges Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{badges.length}</div>
          <div className="flex mt-1">
            {badges.map((badge, index) => (
              <div 
                key={badge.id} 
                className="text-xl" 
                style={{ marginLeft: index > 0 ? '-5px' : '0' }}
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
