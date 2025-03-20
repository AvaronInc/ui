
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileSearch, Timer, Search, ArrowUpDown } from 'lucide-react';
import { LoggingControls } from '../components/LoggingControls';
import { HoneypotLogsTable } from '../components/HoneypotLogsTable';
import { ForensicAnalysis } from '../components/ForensicAnalysis';

const HoneypotLogging: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Logging & Analysis</h2>
        <p className="text-muted-foreground text-sm">Comprehensive logging and forensic analysis of honeypot interactions</p>
      </div>
      
      <LoggingControls />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileSearch className="h-5 w-5 mr-2 text-blue-500" />
            Honeypot Activity Logs
          </CardTitle>
          <CardDescription>Detailed logs of all honeypot interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <HoneypotLogsTable />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Search className="h-5 w-5 mr-2 text-purple-500" />
            Forensic Analysis
          </CardTitle>
          <CardDescription>Advanced analysis tools for investigating attack patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ForensicAnalysis />
        </CardContent>
      </Card>
    </div>
  );
};

export default HoneypotLogging;
