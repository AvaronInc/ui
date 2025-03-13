
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BucketStatistics from '@/components/storage/BucketStatistics';
import BucketManagement from '@/components/storage/bucket/BucketManagement';
import FileBrowser from '@/components/storage/FileBrowser';
import FileDetailPanel from '@/components/storage/FileDetailPanel';
import FileToolbar from '@/components/storage/FileToolbar';
import { FileItem, FileFilter } from '@/types/storage';

const fetchFiles = async (): Promise<FileItem[]> => {
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
  const [activeTab, setActiveTab] = useState('overview');

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

  const currentFiles = files.filter(file => 
    JSON.stringify(file.path) === JSON.stringify(currentPath.slice(0, -1)) && 
    file.parentId === (currentPath.length === 1 ? null : currentPath[currentPath.length - 2])
  );

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">Storage Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage storage resources, including MinIO and S3 buckets
            </p>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="buckets">S3 Management</TabsTrigger>
              <TabsTrigger value="files">File Browser</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <BucketStatistics />
            </TabsContent>
            
            <TabsContent value="buckets" className="mt-6">
              <BucketManagement />
            </TabsContent>
            
            <TabsContent value="files" className="mt-6">
              <FileToolbar 
                filters={filters} 
                onUpdateFilters={handleUpdateFilters}
                onNavigateUp={handleNavigateUp}
                canNavigateUp={currentPath.length > 1}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
                <div className={selectedFile ? "lg:col-span-3" : "lg:col-span-4"}>
                  <FileBrowser 
                    files={currentFiles} 
                    isLoading={isLoading} 
                    onFileSelect={handleFileSelect}
                    onFolderOpen={handleFolderOpen}
                    selectedFileId={selectedFile?.id}
                    currentPath={currentPath}
                    onPathClick={handlePathClick}
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
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Storage;
