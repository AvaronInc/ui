
import React, { useState } from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { 
  Tabs, TabsList, TabsTrigger, TabsContent 
} from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '../../../types/gamification';
import BadgeCard from './BadgeCard';

type BadgeCatalogProps = {
  badges: Badge[];
  earnedBadgeIds: string[];
};

const BadgeCatalog: React.FC<BadgeCatalogProps> = ({ badges, earnedBadgeIds }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Filter badges based on search query and active filter
  const filteredBadges = badges.filter(badge => {
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
  );
};

export default BadgeCatalog;
