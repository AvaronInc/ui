
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Award, Calendar, CheckSquare, MessageSquare, Pencil, ThumbsUp 
} from 'lucide-react';
import { mockUserStats } from '../../mockData/gamificationData';
import { UserStats, TimeFilter, RankingType } from '../../types/gamification';
import { Badge } from '@/components/ui/badge';

const UserLeaderboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('monthly');
  const [rankingType, setRankingType] = useState<RankingType>('solutions');
  
  // Sort users based on the selected ranking type
  const sortedUsers = [...mockUserStats].sort((a, b) => {
    switch (rankingType) {
      case 'solutions':
        return b.solutionsMarked - a.solutionsMarked;
      case 'posts':
        return b.postsCreated - a.postsCreated;
      case 'comments':
        return b.commentsPosted - a.commentsPosted;
      case 'reactions':
        return b.reactionsReceived - a.reactionsReceived;
      default:
        return 0;
    }
  }).map((user, index) => ({...user, rank: index + 1}));
  
  // Get top 3 users for highlighting
  const topUsers = sortedUsers.slice(0, 3);
  
  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case 'monthly':
        return 'Monthly (August 2023)';
      case 'quarterly':
        return 'Quarterly (Q3 2023)';
      case 'all-time':
        return 'All Time';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contributor Leaderboard</h1>
          <p className="text-muted-foreground">
            Recognizing top contributors across the organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeFilter === 'monthly' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTimeFilter('monthly')}
          >
            Monthly
          </Button>
          <Button 
            variant={timeFilter === 'quarterly' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTimeFilter('quarterly')}
          >
            Quarterly
          </Button>
          <Button 
            variant={timeFilter === 'all-time' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTimeFilter('all-time')}
          >
            All Time
          </Button>
        </div>
      </div>
      
      {/* Top Contributors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topUsers.map((user, index) => (
          <Card key={user.id} className={index === 0 ? "border-yellow-400 shadow-md" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base flex items-center gap-2">
                  {index === 0 && <Award className="h-5 w-5 text-yellow-500" />}
                  {index === 1 && <Award className="h-5 w-5 text-gray-400" />}
                  {index === 2 && <Award className="h-5 w-5 text-amber-600" />}
                  #{user.rank} {user.name}
                </CardTitle>
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  {user.department}
                </Badge>
              </div>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <CheckSquare className="h-4 w-4 text-green-500" />
                  <span>{user.solutionsMarked} solutions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Pencil className="h-4 w-4 text-blue-500" />
                  <span>{user.postsCreated} posts</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-violet-500" />
                  <span>{user.commentsPosted} comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-red-500" />
                  <span>{user.reactionsReceived} reactions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Filter and Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              {getTimeFilterLabel()} Rankings
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={rankingType === 'solutions' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRankingType('solutions')}
              >
                <CheckSquare className="h-4 w-4 mr-1" />
                Solutions
              </Button>
              <Button 
                variant={rankingType === 'posts' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRankingType('posts')}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Posts
              </Button>
              <Button 
                variant={rankingType === 'comments' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRankingType('comments')}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Comments
              </Button>
              <Button 
                variant={rankingType === 'reactions' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRankingType('reactions')}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Reactions
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Contributor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">
                  {rankingType === 'solutions' && 'Solutions Marked'}
                  {rankingType === 'posts' && 'Posts Created'}
                  {rankingType === 'comments' && 'Comments Posted'}
                  {rankingType === 'reactions' && 'Reactions Received'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">#{user.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold">
                      {rankingType === 'solutions' && user.solutionsMarked}
                      {rankingType === 'posts' && user.postsCreated}
                      {rankingType === 'comments' && user.commentsPosted}
                      {rankingType === 'reactions' && user.reactionsReceived}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground p-2 border rounded bg-muted/50">
        <p className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          Rankings are updated daily. Last updated: August 15, 2023 at 12:00 AM UTC
        </p>
      </div>
    </div>
  );
};

export default UserLeaderboard;
