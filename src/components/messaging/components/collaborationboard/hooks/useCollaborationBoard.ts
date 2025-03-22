
import { useState } from 'react';
import { Post, FilterOption, SortOption, User } from '../../../types';
import { mockPosts, mockUsers } from '../../../mockData';
import { toast } from 'sonner';

export const useCollaborationBoard = () => {
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
    toast("Your post has been published successfully");
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

  return {
    posts,
    currentUser,
    showNewPostDialog,
    setShowNewPostDialog,
    showLeftSidebar,
    setShowLeftSidebar,
    showRightSidebar,
    setShowRightSidebar,
    filterOptions,
    setFilterOptions,
    sortOption,
    setSortOption,
    filteredPosts,
    sortedPosts,
    handleCreatePost,
    handleTogglePin,
    handleAddReaction,
    handleTagClick,
    handlePostClick,
    handleResetFilters
  };
};
