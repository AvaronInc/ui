
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw } from 'lucide-react';
import { Registry } from '@/types/containers';

interface RegistryConnectionsProps {
  registries: Registry[];
}

const RegistryConnections: React.FC<RegistryConnectionsProps> = ({ registries }) => {
  return (
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
  );
};

export default RegistryConnections;
