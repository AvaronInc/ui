
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Upload, RefreshCw, Plus, CheckCircle, AlertTriangle, Clock, Tag, Server } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';

const RegistryImageManagement = () => {
  const { images, registries } = useContainersData();
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Registry Connections</CardTitle>
                <CardDescription>
                  Manage connections to container image registries
                </CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Registry
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registries?.map((registry, i) => (
                <Card key={i} className="border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{registry.name}</CardTitle>
                      <Badge variant={registry.status === 'connected' ? 'default' : 'destructive'}>
                        {registry.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {registry.url}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Images: {registry.imageCount}</span>
                      <span>Last sync: {registry.lastSync}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm">Settings</Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <RefreshCw className="mr-2 h-3 w-3" /> Sync
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Image Pull</CardTitle>
            <CardDescription>
              Pull container images from registries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form>
              <form className="space-y-4">
                <FormField
                  name="registry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select registry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {registries?.map((registry, i) => (
                            <SelectItem key={i} value={registry.id}>
                              {registry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="imageName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. nginx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. latest" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Pull Image
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistryImageManagement;
