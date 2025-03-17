
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TicketStatistics } from '@/types/tickets';
import { 
  Ticket, 
  CheckCircle2, 
  Bot, 
  Clock, 
  Timer, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Circle
} from 'lucide-react';

interface TicketStatCardsProps {
  statistics: TicketStatistics;
}

const TicketStatCards = ({ statistics }: TicketStatCardsProps) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4" />;
    return <Circle className="h-4 w-4" />;
  };

  const getSeverityColor = (value: number, isInverse: boolean = false) => {
    if (isInverse) {
      if (value < 30) return "text-green-600";
      if (value < 60) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value > 60) return "text-green-600";
      if (value > 30) return "text-yellow-600";
      return "text-red-600";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Open Tickets</span>
            <Ticket className="h-5 w-5 text-primary" />
          </div>
          <div className="text-2xl font-bold">{statistics.openTickets}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Resolved Today</span>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">{statistics.resolvedToday}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">AI Resolved</span>
            <Bot className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">{statistics.aiResolved}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Awaiting Action</span>
            <Clock className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">{statistics.awaitingAction}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Avg Resolution</span>
            <Timer className="h-5 w-5 text-violet-500" />
          </div>
          <div className="text-2xl font-bold">{statistics.avgResolutionTime}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Escalation Rate</span>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex items-center">
            <div className={`text-2xl font-bold ${getSeverityColor(statistics.escalationRate, true)}`}>
              {statistics.escalationRate}%
            </div>
            <div className="ml-2">
              {getTrendIcon(statistics.escalationTrend)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketStatCards;
