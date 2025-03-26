
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server } from 'lucide-react';

interface AISystemSummaryProps {}

const AISystemSummary: React.FC<AISystemSummaryProps> = () => {
  // Sample AI summary text
  const aiSummary = "Zone is operating within normal parameters. Storage usage is trending upward and may require attention in the next 30 days. Security posture is strong with all compliance checks passing. Consider optimizing the mixtral service which is consuming 35% more resources than similar deployments.";
  
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          AI System Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm">{aiSummary}</div>
      </CardContent>
    </Card>
  );
};

export default AISystemSummary;
