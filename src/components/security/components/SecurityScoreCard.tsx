
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SecurityScoreCardProps {
  score: {
    overall: number;
    lastUpdate: string;
    components: {
      network: number;
      endpoints: number;
      authentication: number;
      dataProtection: number;
      patchStatus: number;
    }
  }
}

const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({ score }) => {
  const getScoreColor = (value: number): string => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-blue-500';
    if (value >= 50) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (value: number): string => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Shield className="h-4 w-4 mr-2 text-primary" />
          AI Security Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-2">
          <div className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last updated: {formatDistanceToNow(new Date(score.lastUpdate), { addSuffix: true })}
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Network Security</span>
              <span className="text-xs">{score.components.network}</span>
            </div>
            <Progress value={score.components.network} className={`h-1.5 ${getProgressColor(score.components.network)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Endpoint Protection</span>
              <span className="text-xs">{score.components.endpoints}</span>
            </div>
            <Progress value={score.components.endpoints} className={`h-1.5 ${getProgressColor(score.components.endpoints)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Authentication & Access</span>
              <span className="text-xs">{score.components.authentication}</span>
            </div>
            <Progress value={score.components.authentication} className={`h-1.5 ${getProgressColor(score.components.authentication)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Data Protection</span>
              <span className="text-xs">{score.components.dataProtection}</span>
            </div>
            <Progress value={score.components.dataProtection} className={`h-1.5 ${getProgressColor(score.components.dataProtection)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Patch Status</span>
              <span className="text-xs">{score.components.patchStatus}</span>
            </div>
            <Progress value={score.components.patchStatus} className={`h-1.5 ${getProgressColor(score.components.patchStatus)}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityScoreCard;
