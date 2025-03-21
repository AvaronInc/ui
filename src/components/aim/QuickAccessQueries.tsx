
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Activity, Shield, AlertTriangle, Clock, Network, HelpCircle } from 'lucide-react';

const quickQueries = [
  {
    id: 'security-alerts',
    text: 'Show me today\'s security alerts',
    icon: Shield,
  },
  {
    id: 'network-bandwidth',
    text: 'What\'s the network bandwidth usage right now?',
    icon: Network,
  },
  {
    id: 'critical-issues',
    text: 'List all critical issues',
    icon: AlertTriangle,
  },
  {
    id: 'system-performance',
    text: 'Check system performance',
    icon: Activity,
  },
  {
    id: 'maintenance-schedule',
    text: 'Show upcoming maintenance schedule',
    icon: Clock,
  },
  {
    id: 'suggestion',
    text: 'Suggest optimizations for my infrastructure',
    icon: HelpCircle,
  },
];

const QuickAccessQueries: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <span>Quick Access Queries</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickQueries.map((query) => (
            <Button
              key={query.id}
              variant="outline"
              className="justify-start h-auto py-3 text-sm"
              onClick={() => {
                // This would trigger the query in a real implementation
                console.log(`Executing query: ${query.text}`);
              }}
            >
              <query.icon className="h-4 w-4 mr-2 text-primary" />
              <span className="truncate">{query.text}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessQueries;
