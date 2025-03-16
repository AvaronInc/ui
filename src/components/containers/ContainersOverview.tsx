
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dock, Cpu, HardDrive, Network, AlertTriangle, Layers, Download } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';
import { ContainerUsageChart } from './charts/ContainerUsageChart';
import ContainerListPanel from './ContainerListPanel';

const ContainersOverview = () => {
  const { containers, stats, events } = useContainersData();
  const [isContainersPanelOpen, setIsContainersPanelOpen] = useState(false);
  
  const handleViewAllContainers = () => {
    setIsContainersPanelOpen(true);
  };
  
  const handleCloseContainersPanel = () => {
    setIsContainersPanelOpen(false);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Containers</CardTitle>
            <Dock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.runningContainers || '0'}</div>
            <p className="text-xs text-muted-foreground">
              of {stats?.totalContainers || '0'} total containers
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleViewAllContainers}>
              View All Containers
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[80px]">
              <ContainerUsageChart data={stats?.resourceUsage || []} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between text-xs text-muted-foreground gap-2">
            <div className="flex items-center">
              <Cpu className="mr-1 h-3 w-3" />
              <span>CPU: {stats?.cpuUsage || '0'}%</span>
            </div>
            <div className="flex items-center">
              <HardDrive className="mr-1 h-3 w-3" />
              <span>MEM: {stats?.memoryUsage || '0'}%</span>
            </div>
            <div className="flex items-center">
              <Network className="mr-1 h-3 w-3" />
              <span>NET: {stats?.networkUsage || '0'} MB/s</span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {stats?.systemHealth === 'Healthy' ? (
                <span className="text-green-500">Healthy</span>
              ) : stats?.systemHealth === 'Warning' ? (
                <span className="text-amber-500">Warning</span>
              ) : (
                <span className="text-red-500">Critical</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.activeAlerts || '0'} active alerts
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Alerts
            </Button>
          </CardFooter>
        </Card>

        {events && events.length > 0 && (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Last container events from your infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {events.slice(0, 3).map((event, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      {event.type === 'error' && <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />}
                      {event.type === 'warning' && <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />}
                      {event.type === 'info' && <Layers className="mr-2 h-4 w-4 text-blue-500" />}
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-none">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-xs">{event.containerName}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Button className="w-full justify-start">
              <Dock className="mr-2 h-4 w-4" /> Deploy New Container
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" /> Pull New Image
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <ContainerListPanel
        containers={containers}
        isOpen={isContainersPanelOpen}
        onClose={handleCloseContainersPanel}
      />
    </>
  );
};

export default ContainersOverview;
