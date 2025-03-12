
import React, { useState } from 'react';
import { FileFilter, FileType } from '@/types/storage';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Download,
  Search,
  Folder,
  FolderPlus,
  ArrowUpCircle,
  FilePlus,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface FileToolbarProps {
  filters: FileFilter;
  onUpdateFilters: (filters: Partial<FileFilter>) => void;
  onNavigateUp: () => void;
  canNavigateUp: boolean;
}

const FileToolbar: React.FC<FileToolbarProps> = ({
  filters,
  onUpdateFilters,
  onNavigateUp,
  canNavigateUp,
}) => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateFilters({ searchQuery: e.target.value });
  };

  const handleFilterByType = (value: string) => {
    onUpdateFilters({ fileType: value as FileType | 'all' });
  };

  const handleCreateFolder = () => {
    // This would be connected to the actual API later
    toast.success(`Folder "${newFolderName}" created successfully`);
    setNewFolderName('');
    setIsCreateFolderOpen(false);
  };

  const handleUploadClick = () => {
    // This would trigger the file browser later
    toast.info('File upload feature will be connected to MinIO');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 py-2">
      <div className="flex gap-2 md:w-1/2">
        <Button
          variant="outline"
          size="icon"
          disabled={!canNavigateUp}
          onClick={onNavigateUp}
          title="Go up one level"
        >
          <ArrowUpCircle className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          onClick={handleUploadClick}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">Upload</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FolderPlus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild onClick={() => setIsCreateFolderOpen(true)}>
              <DropdownMenuItem>
                <Folder className="h-4 w-4 mr-2" />
                Folder
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <FilePlus className="h-4 w-4 mr-2" />
              Text Document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
        
        <Button variant="outline" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2 md:w-1/2 md:justify-end">
        <div className="relative w-full md:w-auto md:min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files..."
            className="pl-9"
            value={filters.searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <Select
          value={filters.fileType?.toString() || 'all'}
          onValueChange={handleFilterByType}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="folder">Folders</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
            <SelectItem value="presentation">Presentations</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for the new folder.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder Name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileToolbar;
