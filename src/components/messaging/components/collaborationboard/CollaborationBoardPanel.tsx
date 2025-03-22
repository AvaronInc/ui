
import { useCollaborationBoard } from './hooks/useCollaborationBoard';
import { mockTags } from '../../mockData';
import BoardContent from './BoardContent';
import FilterSidebar from './FilterSidebar';
import TrendingSidebar from './TrendingSidebar';
import NewPostDialog from './NewPostDialog';
import SidebarToggle from './SidebarToggle';

const CollaborationBoardPanel = () => {
  const {
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
    sortedPosts,
    handleCreatePost,
    handleTogglePin,
    handleAddReaction,
    handleTagClick,
    handlePostClick,
    handleResetFilters
  } = useCollaborationBoard();
  
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
      
      {/* Main Content (Post Feed) */}
      <BoardContent 
        sortedPosts={sortedPosts}
        currentUser={currentUser}
        filterOptions={filterOptions}
        onTogglePin={handleTogglePin}
        onAddReaction={handleAddReaction}
        onResetFilters={handleResetFilters}
        onShowNewPostDialog={() => setShowNewPostDialog(true)}
        showLeftSidebar={showLeftSidebar}
        onToggleLeftSidebar={() => setShowLeftSidebar(!showLeftSidebar)}
      />
      
      {/* Right Sidebar Toggle Button */}
      <SidebarToggle 
        position="right"
        isVisible={showRightSidebar}
        onToggle={() => setShowRightSidebar(!showRightSidebar)}
      />
      
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
