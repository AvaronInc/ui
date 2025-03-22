
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Award, Trophy, Search, Info, Filter, User, List, BookOpen 
} from 'lucide-react';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockUserStats, availableBadges, getUserBadges } from '../../mockData/gamificationData';
import { Badge } from '../../types/gamification';

const BadgeLevel = ({ level }: { level?: string }) => {
  switch (level) {
    case 'bronze':
      return <UIBadge variant="outline" className="bg-amber-800/20 text-amber-800 border-amber-800/30">Bronze</UIBadge>;
    case 'silver':
      return <UIBadge variant="outline" className="bg-gray-300/20 text-gray-500 border-gray-300/30">Silver</UIBadge>;
    case 'gold':
      return <UIBadge variant="outline" className="bg-yellow-400/20 text-yellow-600 border-yellow-400/30">Gold</UIBadge>;
    case 'platinum':
      return <UIBadge variant="outline" className="bg-cyan-200/20 text-cyan-700 border-cyan-200/30">Platinum</UIBadge>;
    default:
      return null;
  }
};

const BadgeCard = ({ badge, earned = false }: { badge: Badge, earned?: boolean }) => {
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

const BadgeShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // For demo purposes, let's assume the current user is the first user in our mock data
  const currentUser = mockUserStats[0];
  const earnedBadges = getUserBadges(currentUser);
  const earnedBadgeIds = earnedBadges.map(badge => badge.id);
  
  // Filter badges based on search query and active filter
  const filteredBadges = availableBadges.filter(badge => {
    const matchesSearch = 
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'earned') return matchesSearch && earnedBadgeIds.includes(badge.id);
    if (activeFilter === 'unearned') return matchesSearch && !earnedBadgeIds.includes(badge.id);
    
    // Filter by category
    return matchesSearch && badge.category === activeFilter;
  });
  
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Total Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{availableBadges.length}</div>
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
              {Math.round((earnedBadges.length / availableBadges.length) * 100)}% collected
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
      
      {/* Badge Catalog */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Badge Catalog</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search badges..."
                  className="pl-8 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          <CardDescription>
            Explore all available badges and how to earn them
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <Tabs defaultValue="all" onValueChange={setActiveFilter}>
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
              <TabsTrigger value="unearned">Unearned</TabsTrigger>
              <TabsTrigger value="solutions">Solutions</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeFilter} className="mt-0">
              <ScrollArea className="h-[450px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBadges.length > 0 ? (
                    filteredBadges.map(badge => (
                      <BadgeCard 
                        key={badge.id} 
                        badge={badge} 
                        earned={earnedBadgeIds.includes(badge.id)} 
                      />
                    ))
                  ) : (
                    <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No badges found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          <p>
            Badge progress is updated daily. New badges are added periodically.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BadgeShowcase;
