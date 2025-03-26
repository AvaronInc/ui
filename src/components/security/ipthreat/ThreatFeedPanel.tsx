
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IPThreatFeedItem, SecuritySeverity } from '@/types/security';
import { ActivitySquare, Filter } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ThreatFeedPanelProps {
  feedItems: IPThreatFeedItem[];
}

const ThreatFeedPanel: React.FC<ThreatFeedPanelProps> = ({ feedItems }) => {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  
  const filteredFeedItems = feedItems.filter(item => {
    if (severityFilter === 'all') return true;
    return item.severity === severityFilter;
  });
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getSeverityBadge = (severity: SecuritySeverity) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <ActivitySquare className="h-5 w-5 mr-2 text-primary" />
            Live Threat Feed
          </CardTitle>
          
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <Select 
              value={severityFilter} 
              onValueChange={setSeverityFilter}
            >
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {filteredFeedItems.length > 0 ? (
              filteredFeedItems.map((item) => (
                <div key={item.id} className="p-3 border rounded-md bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{item.ipAddress}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">
                        {formatTime(item.timestamp)}
                      </div>
                      {getSeverityBadge(item.severity)}
                    </div>
                  </div>
                  
                  {item.domain && (
                    <div className="text-sm text-muted-foreground mb-2">
                      Domain: <span className="font-mono">{item.domain}</span>
                      {item.domainType && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {item.domainType}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="text-sm mb-2">{item.message}</div>
                  
                  <div className="text-xs text-muted-foreground">
                    Source: {item.sourceDevice}
                    {item.sourceUser && ` (${item.sourceUser})`}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                No threats matching current filters
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ThreatFeedPanel;
