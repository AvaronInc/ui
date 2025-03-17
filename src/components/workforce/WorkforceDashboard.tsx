
import React from 'react';
import WorkforceHealthChart from '@/components/workforce/WorkforceHealthChart';
import RecentActivityCard from '@/components/workforce/RecentActivityCard';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart3, PieChart } from 'lucide-react';

interface WorkforceDashboardProps {
  healthData: any[];
}

const WorkforceDashboard = ({ healthData }: WorkforceDashboardProps) => {
  return (
    <>
      <section>
        <StatusCardGrid />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <Tabs defaultValue="health">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Workforce Metrics</CardTitle>
                <TabsList>
                  <TabsTrigger value="health" className="text-xs h-8">
                    <LineChart className="h-3.5 w-3.5 mr-1" />
                    Health
                  </TabsTrigger>
                  <TabsTrigger value="devices" className="text-xs h-8">
                    <BarChart3 className="h-3.5 w-3.5 mr-1" />
                    Devices
                  </TabsTrigger>
                  <TabsTrigger value="compliance" className="text-xs h-8">
                    <PieChart className="h-3.5 w-3.5 mr-1" />
                    Compliance
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="health" className="pt-4 px-0">
                <WorkforceHealthChart 
                  data={healthData}
                />
              </TabsContent>
              
              <TabsContent value="devices" className="pt-4 px-0">
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  Device metrics visualization
                </div>
              </TabsContent>
              
              <TabsContent value="compliance" className="pt-4 px-0">
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  Compliance metrics visualization
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Chart content is handled by the tabs */}
          </CardContent>
        </Card>
        <RecentActivityCard />
      </section>
    </>
  );
};

export default WorkforceDashboard;
