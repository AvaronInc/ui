
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Grid2X2, AlertTriangle, Zap, Eye, Bug } from 'lucide-react';
import { HoneypotStatusCards } from '../components/HoneypotStatusCards';
import { ActiveAttacksChart } from '../components/ActiveAttacksChart';
import { AttackTrendsChart } from '../components/AttackTrendsChart';
import { TopAttackersTable } from '../components/TopAttackersTable';

const HoneypotOverview: React.FC = () => {
  return (
    <div className="space-y-4">
      <HoneypotStatusCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Active Attacks (Real-time)
            </CardTitle>
            <CardDescription>Live view of current honeypot interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveAttacksChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-500" />
              Attack Trends
            </CardTitle>
            <CardDescription>Patterns observed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <AttackTrendsChart />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Bug className="h-5 w-5 mr-2 text-red-500" />
            Top Attackers
          </CardTitle>
          <CardDescription>Most active sources targeting honeypots</CardDescription>
        </CardHeader>
        <CardContent>
          <TopAttackersTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default HoneypotOverview;
