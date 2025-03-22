
import { Filter, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Post, User } from '../../types';
import PostItem from './PostItem';
import SidebarToggle from './SidebarToggle';

interface BoardContentProps {
  sortedPosts: Post[];
  currentUser: User;
  filterOptions: any;
  onTogglePin: (postId: string) => void;
  onAddReaction: (postId: string, reactionType: string) => void;
  onResetFilters: () => void;
  onShowNewPostDialog: () => void;
  showLeftSidebar: boolean;
  onToggleLeftSidebar: () => void;
}

const BoardContent = ({
  sortedPosts,
  currentUser,
  filterOptions,
  onTogglePin,
  onAddReaction,
  onResetFilters,
  onShowNewPostDialog,
  showLeftSidebar,
  onToggleLeftSidebar
}: BoardContentProps) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="h-16 min-h-16 px-4 border-b flex items-center justify-between sticky top-0 bg-background z-10">
        <div>
          <h1 className="text-xl font-semibold">IT Collaboration Board</h1>
          <p className="text-sm text-muted-foreground">
            Share insights, troubleshoot, and discuss with your team
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onToggleLeftSidebar} className="flex items-center">
            <Filter 
              size={18} 
              fill={showLeftSidebar ? 'currentColor' : 'none'} 
              className="mr-2"
            />
            {showLeftSidebar ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button onClick={onShowNewPostDialog}>
            <Plus size={16} className="mr-1" /> New Post
          </Button>
        </div>
      </div>
      
      {/* Filter Status Bar */}
      {(filterOptions.tags.length > 0 || 
        filterOptions.authors.length > 0 || 
        filterOptions.dateRange?.start || 
        filterOptions.dateRange?.end || 
        filterOptions.searchQuery) && (
        <div className="bg-muted/50 px-4 py-2 flex items-center justify-between">
          <div className="text-sm">
            <Filter size={14} className="inline mr-1" />
            <span>Filtered results: {sortedPosts.length} posts</span>
            
            {filterOptions.searchQuery && (
              <span className="ml-2">
                Search: "{filterOptions.searchQuery}"
              </span>
            )}
          </div>
          
          <Button variant="ghost" size="sm" onClick={onResetFilters}>
            <RefreshCw size={14} className="mr-1" /> Clear filters
          </Button>
        </div>
      )}
      
      {/* Post Feed */}
      <ScrollArea className="flex-1 px-4 py-4">
        {sortedPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-muted-foreground mb-4">
              <Filter size={40} />
            </div>
            <h3 className="text-lg font-medium mb-1">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={onResetFilters}>
              <RefreshCw size={16} className="mr-1" /> Clear filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPosts.map(post => (
              <div key={post.id} id={`post-${post.id}`} className="transition-colors duration-300">
                <PostItem
                  post={post}
                  currentUser={currentUser}
                  onTogglePin={onTogglePin}
                  onAddReaction={onAddReaction}
                />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default BoardContent;
