
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, RefreshCw, CheckCircle, AlertTriangle, Clock, Tag, Server } from 'lucide-react';
import { ContainerImage, Registry } from '@/types/containers';

interface ContainerImagesTableProps {
  images: ContainerImage[];
  registries: Registry[];
}

const ContainerImagesTable: React.FC<ContainerImagesTableProps> = ({ images, registries }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistry, setSelectedRegistry] = useState<string | null>(null);
  
  // Filter images based on search query and selected registry
  const filteredImages = images.filter(image => {
    const matchesSearch = searchQuery ? 
      image.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      image.tag.toLowerCase().includes(searchQuery.toLowerCase()) :
      true;
    
    const matchesRegistry = selectedRegistry ? image.registry === selectedRegistry : true;
    
    return matchesSearch && matchesRegistry;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Container Images</CardTitle>
            <CardDescription>
              Manage and view available container images
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select 
              onValueChange={(value) => setSelectedRegistry(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select registry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Registries</SelectItem>
                {registries?.map((registry, i) => (
                  <SelectItem key={i} value={registry.id}>{registry.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-8 md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ImageTabs filteredImages={filteredImages} />
      </CardContent>
    </Card>
  );
};

interface ImageTabsProps {
  filteredImages: ContainerImage[];
}

const ImageTabs: React.FC<ImageTabsProps> = ({ filteredImages }) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Images</TabsTrigger>
        <TabsTrigger value="local">Local Images</TabsTrigger>
        <TabsTrigger value="remote">Remote Images</TabsTrigger>
        <TabsTrigger value="vulnerable">Vulnerable</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Image</TableHead>
                <TableHead className="w-[100px]">Tag</TableHead>
                <TableHead className="w-[100px]">Size</TableHead>
                <TableHead className="w-[150px]">Registry</TableHead>
                <TableHead className="w-[150px]">Created</TableHead>
                <TableHead className="w-[100px]">Security</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.length > 0 ? (
                filteredImages.map((image, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{image.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Tag className="mr-1 h-3 w-3" />
                        {image.tag}
                      </div>
                    </TableCell>
                    <TableCell>{image.size}</TableCell>
                    <TableCell>{image.registry}</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {image.created}
                      </div>
                    </TableCell>
                    <TableCell>
                      {image.vulnerabilities === 0 ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="mr-1 h-3 w-3" /> Secure
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertTriangle className="mr-1 h-3 w-3" /> {image.vulnerabilities} issues
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Server className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No images found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      
      <TabsContent value="local">
        <div className="border rounded-md p-8 text-center text-muted-foreground">
          Similar table for local images would be displayed here.
        </div>
      </TabsContent>
      
      <TabsContent value="remote">
        <div className="border rounded-md p-8 text-center text-muted-foreground">
          Similar table for remote images would be displayed here.
        </div>
      </TabsContent>
      
      <TabsContent value="vulnerable">
        <div className="border rounded-md p-8 text-center text-muted-foreground">
          Similar table for vulnerable images would be displayed here.
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ContainerImagesTable;
