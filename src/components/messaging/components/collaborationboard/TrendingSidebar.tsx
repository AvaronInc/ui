
import { Hash, Pin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Post } from '../../types';
import { mockTags } from '../../mockData';

interface TrendingSidebarProps {
  posts: Post[];
  onTagClick: (tag: string) => void;
  onPostClick: (postId: string) => void;
}

const TrendingSidebar = ({ posts, onTagClick, onPostClick }: TrendingSidebarProps) => {
  // Get popular tags based on frequency in posts
  const getPopularTags = () => {
    const tagCounts: Record<string, number> = {};
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  };
  
  // Get most active threads based on comment count
  const getMostActiveThreads = () => {
    return [...posts]
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 5);
  };
  
  // Get pinned posts
  const getPinnedPosts = () => {
    return posts.filter(post => post.isPinned);
  };
  
  const popularTags = getPopularTags();
  const mostActiveThreads = getMostActiveThreads();
  const pinnedPosts = getPinnedPosts();
  
  return (
    <div className="space-y-5 p-4">
      {/* Popular Tags */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {popularTags.map(({ tag, count }) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer"
                onClick={() => onTagClick(tag)}
              >
                <Hash size={12} className="mr-1" />
                {tag} 
                <span className="ml-1 text-xs text-muted-foreground">({count})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Most Active Threads */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Most Active Threads</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-2">
            {mostActiveThreads.map(post => (
              <Button
                key={post.id}
                variant="ghost"
                className="w-full justify-start h-auto py-2 text-left"
                onClick={() => onPostClick(post.id)}
              >
                <div className="truncate">
                  <div className="truncate text-sm font-medium">{post.title}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{post.comments.length} comments</span>
                    <span className="mx-1">•</span>
                    <span>{post.author.name}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pinned Posts</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {pinnedPosts.map(post => (
                <Button
                  key={post.id}
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 text-left"
                  onClick={() => onPostClick(post.id)}
                >
                  <Pin size={14} className="mr-1.5 text-primary shrink-0" />
                  <div className="truncate text-sm">{post.title}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrendingSidebar;
