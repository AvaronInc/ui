
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import FileBrowser from '@/components/storage/FileBrowser';
import FileDetailPanel from '@/components/storage/FileDetailPanel';
import FileToolbar from '@/components/storage/FileToolbar';
import { FileItem, FileFilter } from '@/types/storage';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

// Mock data - replace with actual API calls later
const fetchFiles = async (): Promise<FileItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      size: 0,
      lastModified: '2023-10-15T14:48:00',
      createdBy: 'admin',
      parentId: null,
      permissions: 'full-access',
      path: ['root']
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      size: 0,
      lastModified: '2023-11-20T09:30:00',
      createdBy: 'admin',
      parentId: null,
      permissions: 'full-access',
      path: ['root']
    },
    {
      id: '3',
      name: 'Project Plan.pdf',
      type: 'pdf',
      size: 1240000,
      lastModified: '2023-12-01T16:15:00',
      createdBy: 'john.doe',
      parentId: null,
      permissions: 'read-only',
      path: ['root']
    },
    {
      id: '4',
      name: 'Network Diagram.png',
      type: 'image',
      size: 2800000,
      lastModified: '2023-12-05T10:22:00',
      createdBy: 'jane.smith',
      parentId: null,
      permissions: 'read-write',
      path: ['root']
    },
    {
      id: '5',
      name: 'Server Specs.xlsx',
      type: 'spreadsheet',
      size: 940000,
      lastModified: '2023-12-10T11:05:00',
      createdBy: 'admin',
      parentId: null,
      permissions: 'full-access',
      path: ['root']
    }
  ];
};

const Storage = () => {
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [filters, setFilters] = useState<FileFilter>({
    searchQuery: '',
    fileType: 'all',
    sortBy: 'name',
    sortDirection: 'asc'
  });

  const { data: files = [], isLoading } = useQuery({
    queryKey: ['files', currentPath, filters],
    queryFn: fetchFiles
  });

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  const handleFolderOpen = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath([...file.path, file.name]);
      setSelectedFile(null);
    }
  };

  const handleNavigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const handlePathClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
    setSelectedFile(null);
  };

  const handleUpdateFilters = (newFilters: Partial<FileFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filter files based on current path
  const currentFiles = files.filter(file => 
    JSON.stringify(file.path) === JSON.stringify(currentPath.slice(0, -1)) && 
    file.parentId === (currentPath.length === 1 ? null : currentPath[currentPath.length - 2])
  );

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">File Storage</h1>
              <Breadcrumb className="py-2">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {currentPath.map((pathItem, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {index === currentPath.length - 1 ? (
                          <BreadcrumbPage>{pathItem}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink onClick={() => handlePathClick(index)}>
                            {pathItem}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < currentPath.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          
          <FileToolbar 
            filters={filters} 
            onUpdateFilters={handleUpdateFilters}
            onNavigateUp={handleNavigateUp}
            canNavigateUp={currentPath.length > 1}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className={selectedFile ? "lg:col-span-3" : "lg:col-span-4"}>
              <FileBrowser 
                files={currentFiles} 
                isLoading={isLoading} 
                onFileSelect={handleFileSelect}
                onFolderOpen={handleFolderOpen}
                selectedFileId={selectedFile?.id}
              />
            </div>
            
            {selectedFile && (
              <div className="lg:col-span-1">
                <FileDetailPanel 
                  file={selectedFile} 
                  onClose={() => setSelectedFile(null)} 
                />
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Storage;
