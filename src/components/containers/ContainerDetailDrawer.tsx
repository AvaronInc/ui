
import React from 'react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerFooter
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw,
  AlarmClock,
  TerminalSquare,
  Zap,
  AlertTriangle,
  Layers,
  Container
} from 'lucide-react';
import { Container as ContainerType } from '@/types/containers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ContainerDetailDrawerProps {
  container: ContainerType | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContainerDetailDrawer: React.FC<ContainerDetailDrawerProps> = ({
  container,
  isOpen,
  onClose
}) => {
  if (!container) return null;

  const isRunning = container.status === 'running';
  
  return (
    <Drawer open={isOpen} onOpenChange={() => onClose()}>
      <DrawerContent className="max-h-[85dvh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Container className="h-5 w-5" />
            <span className="truncate">{container.name}</span>
          </DrawerTitle>
          <DrawerDescription className="truncate">
            {container.image} • {container.status}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="col-span-1">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">CPU Usage</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="text-xl font-bold">{container.cpu}%</div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="text-xl font-bold">{container.memory} MB</div>
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Uptime</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="text-xl font-bold truncate">{container.uptime}</div>
              </CardContent>
            </Card>
          </div>
          
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="details">
              <AccordionTrigger>Container Details</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">ID:</span>
                    <span className="text-muted-foreground break-all">{container.id}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">Ports:</span>
                    <span className="text-muted-foreground">{container.ports}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">Image:</span>
                    <span className="text-muted-foreground break-all">{container.image}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">Status:</span>
                    <span className={`${container.status === 'running' ? 'text-green-500' : 'text-amber-500'}`}>
                      {container.status}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="monitoring">
              <AccordionTrigger>Real-time Monitoring</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Real-time metrics for this container will appear here. Click the button below to start 
                    advanced monitoring.
                  </p>
                  <Button variant="outline" className="w-full text-xs" size="sm">
                    <AlarmClock className="h-3 w-3 mr-1" />
                    Enable Advanced Monitoring
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="logs">
              <AccordionTrigger>Container Logs</AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-2 rounded-md h-24 overflow-y-auto text-xs font-mono">
                  <p>2023-07-18 09:30:22 INFO: Container started successfully</p>
                  <p>2023-07-18 09:30:23 INFO: Initializing services</p>
                  <p>2023-07-18 09:30:24 INFO: Services initialized</p>
                  <p>2023-07-18 09:30:25 INFO: Ready to accept connections</p>
                </div>
                <Button variant="outline" className="w-full mt-2 text-xs" size="sm">
                  <TerminalSquare className="h-3 w-3 mr-1" />
                  View Full Logs
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="aiTroubleshooting">
              <AccordionTrigger>AI Troubleshooting</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Let AI analyze this container for potential issues and optimization opportunities.
                  </p>
                  <Button variant="default" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Start AI Analysis
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <DrawerFooter className="border-t pt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            {isRunning ? (
              <Button variant="destructive" className="flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Stop Container
              </Button>
            ) : (
              <Button variant="default" className="flex-1">
                <Layers className="h-4 w-4 mr-2" />
                Start Container
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ContainerDetailDrawer;
