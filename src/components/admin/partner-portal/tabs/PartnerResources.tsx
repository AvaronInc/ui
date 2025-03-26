
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPartnerResources } from '../mockData';
import { Search, Download, FileText, FileType, Video, File, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const PartnerResources: React.FC = () => {
  return (
    <Tabs defaultValue="all" className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Partner Resources</h2>
          <p className="text-muted-foreground">Access marketing collateral and product information</p>
        </div>
        <div className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="collateral">Collateral</TabsTrigger>
            <TabsTrigger value="product">Product Sheets</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <ResourceSearch />
      
      <TabsContent value="all">
        <ResourceGrid resources={mockPartnerResources} />
      </TabsContent>
      
      <TabsContent value="collateral">
        <ResourceGrid 
          resources={mockPartnerResources.filter(
            resource => resource.type === 'Collateral' || resource.type === 'Case Study'
          )} 
        />
      </TabsContent>
      
      <TabsContent value="product">
        <ResourceGrid 
          resources={mockPartnerResources.filter(
            resource => resource.type === 'Product Sheet'
          )} 
        />
      </TabsContent>
      
      <TabsContent value="videos">
        <ResourceGrid 
          resources={mockPartnerResources.filter(
            resource => resource.type === 'Video'
          )} 
        />
      </TabsContent>
    </Tabs>
  );
};

const ResourceSearch: React.FC = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search resources by keyword..." 
        className="pl-9"
      />
    </div>
  );
};

const ResourceGrid: React.FC<{ resources: typeof mockPartnerResources }> = ({ resources }) => {
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'Collateral':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'Product Sheet':
        return <FileType className="h-6 w-6 text-red-500" />;
      case 'Video':
        return <Video className="h-6 w-6 text-purple-500" />;
      case 'Case Study':
        return <File className="h-6 w-6 text-green-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'Collateral':
        return 'bg-blue-600/20 text-blue-500 hover:bg-blue-600/30';
      case 'Product Sheet':
        return 'bg-red-600/20 text-red-500 hover:bg-red-600/30';
      case 'Video':
        return 'bg-purple-600/20 text-purple-500 hover:bg-purple-600/30';
      case 'Case Study':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <Card key={resource.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="bg-secondary/50 p-2 rounded-md">
                {getResourceIcon(resource.type)}
              </div>
              <Badge className={`${getTypeBadgeColor(resource.type)}`}>
                {resource.type}
              </Badge>
            </div>
            <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>Added {formatDate(resource.dateAdded)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PartnerResources;
