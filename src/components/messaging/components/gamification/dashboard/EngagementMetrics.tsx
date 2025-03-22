
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, ThumbsUp, Lightbulb } from 'lucide-react';
import { UserContribution } from '../../../types/gamification';

type EngagementMetricsProps = {
  contribution: UserContribution;
};

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ contribution }) => {
  const { averageEngagement, totalReactionsReceived, totalSolutions, totalPosts } = contribution;
  const solutionRate = totalPosts > 0 ? (totalSolutions / totalPosts) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          Engagement Metrics
        </CardTitle>
        <CardDescription>
          How your content performs in the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Avg. Reactions Per Post</span>
              <span className="font-medium">{averageEngagement}</span>
            </div>
            <Progress value={averageEngagement * 10} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Above average by 23%
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Total Reactions</span>
              <span className="font-medium">{totalReactionsReceived}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4 text-blue-500" />
              <Progress value={70} className="h-2 flex-1" />
              <span className="text-xs">70%</span>
            </div>
            <div className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <Progress value={30} className="h-2 flex-1" />
              <span className="text-xs">30%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Solution Rate</span>
              <span className="font-medium">{solutionRate.toFixed(1)}%</span>
            </div>
            <Progress value={solutionRate} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Percentage of posts where you provided the solution
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
