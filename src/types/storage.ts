
export type FilePermission = 'read-only' | 'read-write' | 'full-access';
export type FileType = 'folder' | 'pdf' | 'image' | 'text' | 'video' | 'audio' | 'spreadsheet' | 'presentation' | 'archive' | 'code' | 'other';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number; // in bytes
  lastModified: string; // ISO date string
  createdBy: string;
  parentId: string | null; // null if in root directory
  permissions: FilePermission;
  path: string[];
  isStarred?: boolean;
  tags?: string[];
}

export interface FileFilter {
  searchQuery?: string;
  fileType?: FileType | 'all';
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
  sortBy?: 'name' | 'size' | 'date';
  sortDirection?: 'asc' | 'desc';
}
