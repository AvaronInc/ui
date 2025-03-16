
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Container } from '@/types/containers';
import { Badge } from '@/components/ui/badge';
import { Search, Container as ContainerIcon, Server } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ContainerDetailDrawer from './ContainerDetailDrawer';

interface ContainerListPanelProps {
  containers: Container[];
  isOpen: boolean;
  onClose: () => void;
}

const ContainerListPanel: React.FC<ContainerListPanelProps> = ({
  containers,
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const filteredContainers = containers.filter(container => 
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.image.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleContainerClick = (container: Container) => {
    setSelectedContainer(container);
    setIsDetailOpen(true);
  };
  
  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-gray-500';
      case 'restarting':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'exited':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b sticky top-0 bg-background z-10">
            <SheetTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              All Containers
            </SheetTitle>
            <SheetDescription>
              Manage and monitor your containerized applications
            </SheetDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search containers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </SheetHeader>
          
          <div className="p-4">
            <div className="space-y-2">
              {filteredContainers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No containers found matching your search
                </div>
              ) : (
                filteredContainers.map((container) => (
                  <div
                    key={container.id}
                    className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => handleContainerClick(container)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(container.status)}`} />
                        <div>
                          <div className="font-medium flex items-center gap-1">
                            <ContainerIcon className="h-3.5 w-3.5" />
                            {container.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{container.image}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={container.status === 'running' ? 'outline' : 'secondary'}>
                          {container.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">CPU:</span> {container.cpu}%
                      </div>
                      <div>
                        <span className="font-medium">MEM:</span> {container.memory} MB
                      </div>
                      <div>
                        <span className="font-medium">Uptime:</span> {container.uptime}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <ContainerDetailDrawer
        container={selectedContainer}
        isOpen={isDetailOpen}
        onClose={handleDetailClose}
      />
    </>
  );
};

export default ContainerListPanel;
