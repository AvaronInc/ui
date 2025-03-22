import { useState, useEffect } from 'react';
import { Plus, Filter, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Post, FilterOption, SortOption, User } from '../../types';
import { mockPosts, mockUsers, mockTags } from '../../mockData';
import PostItem from './PostItem';
import NewPostDialog from './NewPostDialog';
import FilterSidebar from './FilterSidebar';
import TrendingSidebar from './TrendingSidebar';
import { toast } from 'sonner';

const CollaborationBoardPanel = () => {
  // State
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOption>({
    tags: [],
    authors: [],
    dateRange: { start: null, end: null },
    searchQuery: '',
  });
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    // Filter by tags
    if (filterOptions.tags.length > 0 && !filterOptions.tags.some(tag => post.tags.includes(tag))) {
      return false;
    }
    
    // Filter by authors
    if (filterOptions.authors.length > 0 && !filterOptions.authors.includes(post.author.id)) {
      return false;
    }
    
    // Filter by date range
    if (filterOptions.dateRange?.start && post.timestamp < filterOptions.dateRange.start) {
      return false;
    }
    if (filterOptions.dateRange?.end) {
      // Add one day to include the end date fully
      const endDate = new Date(filterOptions.dateRange.end);
      endDate.setDate(endDate.getDate() + 1);
      if (post.timestamp > endDate) {
        return false;
      }
    }
    
    // Filter by search query
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(query);
      const contentMatch = post.content.toLowerCase().includes(query);
      const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(query));
      const authorMatch = post.author.name.toLowerCase().includes(query);
      
      if (!(titleMatch || contentMatch || tagMatch || authorMatch)) {
        return false;
      }
    }
    
    return true;
  });
  
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'most-liked':
        return b.reactions.like.count - a.reactions.like.count;
      case 'most-commented':
        return b.comments.length - a.comments.length;
      default:
        return 0;
    }
  });
  
  // Handlers
  const handleCreatePost = (postData: any) => {
    const newPost: Post = {
      id: `post${Date.now()}`,
      title: postData.title,
      content: postData.content,
      author: currentUser,
      timestamp: new Date(),
      tags: postData.tags,
      reactions: {
        like: { type: 'like', count: 0, reactedBy: [] },
        heart: { type: 'heart', count: 0, reactedBy: [] },
        rocket: { type: 'rocket', count: 0, reactedBy: [] },
        laugh: { type: 'laugh', count: 0, reactedBy: [] }
      },
      comments: [],
      isPinned: false,
      visibility: postData.visibility,
    };
    
    setPosts([newPost, ...posts]);
    toast({
      title: "Post created",
      description: "Your post has been published successfully"
    });
  };
  
  const handleTogglePin = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isPinned: !post.isPinned } 
        : post
    ));
  };
  
  const handleAddReaction = (postId: string, reactionType: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const reaction = post.reactions[reactionType as keyof typeof post.reactions];
        const userHasReacted = reaction.reactedBy.includes(currentUser.id);
        
        const updatedReaction = userHasReacted
          ? {
              ...reaction,
              count: reaction.count - 1,
              reactedBy: reaction.reactedBy.filter(id => id !== currentUser.id)
            }
          : {
              ...reaction,
              count: reaction.count + 1,
              reactedBy: [...reaction.reactedBy, currentUser.id]
            };
        
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: updatedReaction
          }
        };
      }
      return post;
    }));
  };
  
  const handleTagClick = (tag: string) => {
    if (!filterOptions.tags.includes(tag)) {
      setFilterOptions({
        ...filterOptions,
        tags: [...filterOptions.tags, tag]
      });
    }
  };
  
  const handlePostClick = (postId: string) => {
    // Scroll to the post
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
      postElement.scrollIntoView({ behavior: 'smooth' });
      postElement.classList.add('bg-primary/5');
      setTimeout(() => {
        postElement.classList.remove('bg-primary/5');
      }, 2000);
    }
  };
  
  const handleResetFilters = () => {
    setFilterOptions({
      tags: [],
      authors: [],
      dateRange: { start: null, end: null },
      searchQuery: '',
    });
    setSortOption('newest');
  };
  
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Left Sidebar (Filters) */}
      <div className={`border-r ${showLeftSidebar ? 'w-64' : 'w-0'} transition-all duration-300 flex flex-col bg-background`}>
        {showLeftSidebar && (
          <FilterSidebar
            filterOptions={filterOptions}
            sortOption={sortOption}
            onFilterChange={setFilterOptions}
            onSortChange={setSortOption}
            onReset={handleResetFilters}
          />
        )}
      </div>
      
      {/* Left Sidebar Toggle Button */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full shadow-md"
          onClick={() => setShowLeftSidebar(!showLeftSidebar)}
        >
          {showLeftSidebar ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </Button>
      </div>
      
      {/* Main Content (Post Feed) */}
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
            <Button onClick={() => setShowNewPostDialog(true)}>
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
              <span>Filtered results: {filteredPosts.length} posts</span>
              
              {filterOptions.searchQuery && (
                <span className="ml-2">
                  Search: "{filterOptions.searchQuery}"
                </span>
              )}
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
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
              <Button onClick={handleResetFilters}>
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
                    onTogglePin={handleTogglePin}
                    onAddReaction={handleAddReaction}
                  />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
      
      {/* Right Sidebar Toggle Button */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full shadow-md"
          onClick={() => setShowRightSidebar(!showRightSidebar)}
        >
          {showRightSidebar ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </Button>
      </div>
      
      {/* Right Sidebar (Trending) */}
      <div className={`border-l ${showRightSidebar ? 'w-64' : 'w-0'} transition-all duration-300 flex flex-col bg-background`}>
        {showRightSidebar && (
          <TrendingSidebar
            posts={posts}
            onTagClick={handleTagClick}
            onPostClick={handlePostClick}
          />
        )}
      </div>
      
      {/* New Post Dialog */}
      <NewPostDialog
        open={showNewPostDialog}
        onOpenChange={setShowNewPostDialog}
        onSubmit={handleCreatePost}
        availableTags={mockTags}
      />
    </div>
  );
};

export default CollaborationBoardPanel;
