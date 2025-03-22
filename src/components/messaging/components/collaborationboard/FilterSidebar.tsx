
import { useState } from 'react';
import { Calendar as CalendarIcon, Hash, User, Search, X, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilterOption, SortOption } from '../../types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { mockTags, mockUsers } from '../../mockData';

interface FilterSidebarProps {
  filterOptions: FilterOption;
  sortOption: SortOption;
  onFilterChange: (filters: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

const FilterSidebar = ({ 
  filterOptions, 
  sortOption,
  onFilterChange,
  onSortChange,
  onReset
}: FilterSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState(filterOptions.searchQuery);
  
  const handleSearch = () => {
    onFilterChange({
      ...filterOptions,
      searchQuery
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleAddTag = (tag: string) => {
    if (!filterOptions.tags.includes(tag)) {
      onFilterChange({
        ...filterOptions,
        tags: [...filterOptions.tags, tag]
      });
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    onFilterChange({
      ...filterOptions,
      tags: filterOptions.tags.filter(t => t !== tag)
    });
  };
  
  const handleAddAuthor = (authorId: string) => {
    if (!filterOptions.authors.includes(authorId)) {
      onFilterChange({
        ...filterOptions,
        authors: [...filterOptions.authors, authorId]
      });
    }
  };
  
  const handleRemoveAuthor = (authorId: string) => {
    onFilterChange({
      ...filterOptions,
      authors: filterOptions.authors.filter(id => id !== authorId)
    });
  };
  
  const handleStartDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filterOptions,
      dateRange: {
        ...filterOptions.dateRange,
        start: date || null
      }
    });
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filterOptions,
      dateRange: {
        ...filterOptions.dateRange,
        end: date || null
      }
    });
  };
  
  return (
    <div className="space-y-5 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2"
          onClick={onReset}
        >
          <RefreshCw size={14} className="mr-1" /> Reset
        </Button>
      </div>
      
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm">Search</Label>
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => {
                setSearchQuery('');
                onFilterChange({
                  ...filterOptions,
                  searchQuery: ''
                });
              }}
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Sort */}
      <div className="space-y-2">
        <Label htmlFor="sort" className="text-sm">Sort By</Label>
        <Select value={sortOption} onValueChange={value => onSortChange(value as SortOption)}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="most-liked">Most Liked</SelectItem>
            <SelectItem value="most-commented">Most Comments</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-sm">Filter by Tags</Label>
        <Select onValueChange={handleAddTag}>
          <SelectTrigger>
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            {mockTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {filterOptions.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filterOptions.tags.map(tag => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                <Hash size={12} />
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X size={10} />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {/* Authors */}
      <div className="space-y-2">
        <Label className="text-sm">Filter by Author</Label>
        <Select onValueChange={handleAddAuthor}>
          <SelectTrigger>
            <SelectValue placeholder="Select author" />
          </SelectTrigger>
          <SelectContent>
            {mockUsers.map(user => (
              <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {filterOptions.authors.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            {filterOptions.authors.map(authorId => {
              const author = mockUsers.find(u => u.id === authorId);
              return (
                <Badge key={authorId} variant="outline" className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{author?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => handleRemoveAuthor(authorId)}
                  >
                    <X size={10} />
                  </Button>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Date Range */}
      <div className="space-y-2">
        <Label className="text-sm">Date Range</Label>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal h-9"
              >
                <CalendarIcon size={16} className="mr-2" />
                {filterOptions.dateRange?.start ? (
                  format(filterOptions.dateRange.start, 'PP')
                ) : (
                  <span>Start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterOptions.dateRange?.start || undefined}
                onSelect={handleStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal h-9"
              >
                <CalendarIcon size={16} className="mr-2" />
                {filterOptions.dateRange?.end ? (
                  format(filterOptions.dateRange.end, 'PP')
                ) : (
                  <span>End date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterOptions.dateRange?.end || undefined}
                onSelect={handleEndDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {(filterOptions.dateRange?.start || filterOptions.dateRange?.end) && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() => onFilterChange({
                ...filterOptions,
                dateRange: { start: null, end: null }
              })}
            >
              <X size={14} className="mr-1" /> Clear dates
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
