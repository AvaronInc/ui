
import React from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, Award, BarChart, Clock, Lightbulb, MessageSquare, 
  PenTool, ThumbsUp, User, CheckCircle2, Calendar, Shield 
} from 'lucide-react';
import { mockUserContribution } from '../../mockData/gamificationData';

// Simple bar chart component
const SimpleBarChart = ({ data, maxValue }: { data: {date: string, count: number}[], maxValue: number }) => {
  return (
    <div className="flex items-end h-32 gap-1 mt-2">
      {data.map((item) => (
        <div key={item.date} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-primary/80 rounded-t hover:bg-primary transition-all" 
            style={{ height: `${(item.count / maxValue) * 100}%`, minHeight: '4px' }}
          ></div>
          <div className="text-xs text-muted-foreground mt-1 rotate-45 origin-left truncate max-w-[24px]">
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};

const ActivityItem = ({ 
  icon, title, timestamp, type 
}: { 
  icon: React.ReactNode, 
  title: string, 
  timestamp: Date, 
  type: string 
}) => {
  let typeColor = '';
  
  switch (type) {
    case 'post':
      typeColor = 'text-blue-500';
      break;
    case 'comment':
      typeColor = 'text-purple-500';
      break;
    case 'solution':
      typeColor = 'text-green-500';
      break;
    case 'reaction':
      typeColor = 'text-red-500';
      break;
    default:
      typeColor = 'text-gray-500';
  }
  
  return (
    <div className="flex items-start gap-3 py-2 border-b last:border-0">
      <div className={`mt-1 ${typeColor}`}>{icon}</div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {timestamp.toLocaleDateString()} at {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

const UserContributionDashboard: React.FC = () => {
  const {
    totalPosts,
    totalComments,
    totalSolutions,
    totalReactionsReceived,
    averageEngagement,
    badges,
    postsOverTime,
    commentsOverTime,
    recentActivity
  } = mockUserContribution;
  
  // Find the highest value for scaling the charts
  const maxPostCount = Math.max(...postsOverTime.map(item => item.count));
  const maxCommentCount = Math.max(...commentsOverTime.map(item => item.count));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Contribution Dashboard</h1>
          <p className="text-muted-foreground">
            Track your activity and impact on the community
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
          <User className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">John Doe</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Security Engineer
          </span>
        </div>
      </div>
      
      {/* Summary Cards */}
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
      
      {/* Engagement Stats and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contribution Trends */}
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
                    <PenTool className="h-4 w-4" />
                    Posts
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
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
          
          {/* Engagement Metrics */}
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
                    <span className="font-medium">11.7%</span>
                  </div>
                  <Progress value={11.7} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Percentage of posts where you provided the solution
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div>
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
        </div>
      </div>
      
      {/* Security and Compliance Notice */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 text-sm">
            <div className="flex-1">
              <h3 className="font-medium flex items-center gap-1 mb-1">
                <User className="h-4 w-4 text-primary" />
                Role-Based Access
              </h3>
              <p className="text-muted-foreground text-xs">
                All gamification features are fully role-based. Only you and administrators can view your detailed stats.
              </p>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium flex items-center gap-1 mb-1">
                <Activity className="h-4 w-4 text-primary" />
                Activity Logging
              </h3>
              <p className="text-muted-foreground text-xs">
                All actions are logged for auditing purposes in compliance with company policy.
              </p>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium flex items-center gap-1 mb-1">
                <Shield className="h-4 w-4 text-primary" />
                Admin Moderation
              </h3>
              <p className="text-muted-foreground text-xs">
                Administrators can moderate, delete, or lock threads as needed for content management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserContributionDashboard;
