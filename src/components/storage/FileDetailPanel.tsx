
import React from 'react';
import { FileItem } from '@/types/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFileIcon, formatFileSize } from '@/lib/fileUtils';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Trash2, 
  Share2, 
  Edit, 
  Star,
  User, 
  Calendar, 
  FileType, 
  HardDrive,
  Lock
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilePermission } from '@/types/storage';
import { toast } from 'sonner';

interface FileDetailPanelProps {
  file: FileItem;
  onClose: () => void;
}

const FileDetailPanel: React.FC<FileDetailPanelProps> = ({ file, onClose }) => {
  const FileIcon = getFileIcon(file.type);
  
  const handlePermissionChange = (value: string) => {
    // This would connect to the API later
    toast.success(`Permission updated to ${value}`);
  };
  
  const handleRename = () => {
    // This would open a rename dialog later
    toast.info('Rename functionality will be implemented with API');
  };
  
  const getFilePreview = () => {
    // In a real implementation, this would show an actual preview based on file type
    if (file.type === 'folder') {
      return (
        <div className="h-40 flex items-center justify-center bg-muted/20 rounded-md">
          <FileIcon className="h-16 w-16 text-amber-500" />
        </div>
      );
    } else if (file.type === 'image') {
      return (
        <div className="h-40 flex items-center justify-center bg-muted/20 rounded-md">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            alt={file.name}
            className="h-full w-full object-contain"
          />
        </div>
      );
    } else {
      return (
        <div className="h-40 flex items-center justify-center bg-muted/20 rounded-md">
          <FileIcon className="h-16 w-16 text-primary/60" />
        </div>
      );
    }
  };
  
  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex gap-3 items-center">
          <FileIcon className={`h-5 w-5 ${file.type === 'folder' ? 'text-amber-500' : 'text-primary'}`} />
          <span className="truncate">{file.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-6">
        {getFilePreview()}
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex gap-1.5">
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1.5" onClick={handleRename}>
            <Edit className="h-4 w-4" />
            <span>Rename</span>
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1.5">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1.5">
            <Star className="h-4 w-4" />
            <span>Star</span>
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1.5 text-destructive">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileType className="h-4 w-4" />
              <span>Type</span>
            </div>
            <Badge variant="outline" className="capitalize">{file.type}</Badge>
          </div>
          
          {file.type !== 'folder' && (
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <HardDrive className="h-4 w-4" />
                <span>Size</span>
              </div>
              <span>{formatFileSize(file.size)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Modified</span>
            </div>
            <span>{format(new Date(file.lastModified), 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Created by</span>
            </div>
            <span>{file.createdBy}</span>
          </div>
          
          <div className="flex justify-between text-sm items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Permissions</span>
            </div>
            <Select
              defaultValue={file.permissions}
              onValueChange={handlePermissionChange as (value: string) => void}
            >
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read-only">Read Only</SelectItem>
                <SelectItem value="read-write">Read & Write</SelectItem>
                <SelectItem value="full-access">Full Access</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileDetailPanel;
