
import React from 'react';
import { FileItem } from '@/types/storage';
import { formatDistanceToNow } from 'date-fns';
import { getFileIcon, formatFileSize } from '@/lib/fileUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle } from 'lucide-react';

interface FileBrowserProps {
  files: FileItem[];
  isLoading: boolean;
  onFileSelect: (file: FileItem) => void;
  onFolderOpen: (file: FileItem) => void;
  selectedFileId?: string;
  currentPath?: string[];
  onPathClick?: (index: number) => void;
}

const FileBrowser: React.FC<FileBrowserProps> = ({
  files,
  isLoading,
  onFileSelect,
  onFolderOpen,
  selectedFileId,
  currentPath = ['root'],
  onPathClick,
}) => {
  
  const handleRowClick = (file: FileItem) => {
    onFileSelect(file);
  };
  
  const handleRowDoubleClick = (file: FileItem) => {
    if (file.type === 'folder') {
      onFolderOpen(file);
    }
  };

  return (
    <div className="border rounded-md shadow-sm bg-card">
      {currentPath && currentPath.length > 0 && onPathClick && (
        <div className="flex items-center gap-1 p-2 text-sm text-muted-foreground border-b">
          {currentPath.map((pathPart, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              <button
                onClick={() => onPathClick(index)}
                className="hover:text-primary hover:underline"
              >
                {pathPart}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              </TableRow>
            ))
          ) : files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                This folder is empty
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <TableRow 
                  key={file.id}
                  className={`cursor-pointer hover:bg-muted/50 ${selectedFileId === file.id ? 'bg-muted' : ''}`}
                  onClick={() => handleRowClick(file)}
                  onDoubleClick={() => handleRowDoubleClick(file)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileIcon className={`h-5 w-5 ${file.type === 'folder' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                      <span className="font-medium truncate">{file.name}</span>
                      {file.isStarred && <CheckCircle className="h-4 w-4 text-amber-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    {file.type === 'folder' ? '—' : formatFileSize(file.size)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {file.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(file.lastModified), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${
                        file.permissions === 'full-access' ? 'bg-success/10 text-success' :
                        file.permissions === 'read-write' ? 'bg-info/10 text-info' :
                        'bg-warning/10 text-warning'
                      }`}
                    >
                      {file.permissions}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileBrowser;
