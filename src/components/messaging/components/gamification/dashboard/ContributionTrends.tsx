
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Calendar } from 'lucide-react';
import { UserContribution } from '../../../types/gamification';
import SimpleBarChart from './SimpleBarChart';

type ContributionTrendsProps = {
  contribution: UserContribution;
};

const ContributionTrends: React.FC<ContributionTrendsProps> = ({ contribution }) => {
  const { postsOverTime, commentsOverTime } = contribution;
  
  // Find the highest value for scaling the charts
  const maxPostCount = Math.max(...postsOverTime.map(item => item.count));
  const maxCommentCount = Math.max(...commentsOverTime.map(item => item.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart className="h-5 w-5 text-muted-foreground" />
          Contribution Trends
        </CardTitle>
        <CardDescription>
          Your activity over the past 7 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="posts">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="posts" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              Comments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-4">
            <SimpleBarChart data={postsOverTime} maxValue={maxPostCount} />
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <SimpleBarChart data={commentsOverTime} maxValue={maxCommentCount} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        <Calendar className="h-3 w-3 mr-1" />
        Data updated daily. Charts show activity by month.
      </CardFooter>
    </Card>
  );
};

export default ContributionTrends;
