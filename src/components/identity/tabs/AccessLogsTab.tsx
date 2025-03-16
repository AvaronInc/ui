
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, DownloadCloud, AlertTriangle } from 'lucide-react';
import SecurityLogsList from '@/components/security/components/SecurityLogsList';
import AIRiskAnalysis from '../components/AIRiskAnalysis';

const AccessLogsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('logs');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Access Logs & Auditing</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search access logs..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto w-full">
          <DownloadCloud className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Tabs defaultValue="logs" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Access Events</CardTitle>
            </CardHeader>
            <CardContent>
              <SecurityLogsList searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-6">
          <AIRiskAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessLogsTab;
