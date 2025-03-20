
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Clock, User, Settings, RotateCcw, Search, Download, Filter } from 'lucide-react';

interface ChangeHistoryTabProps {
  selectedSwitch: string;
}

const ChangeHistoryTab: React.FC<ChangeHistoryTabProps> = ({ selectedSwitch }) => {
  // Mock change history data
  const changeHistory = [
    {
      id: 1,
      type: "configuration",
      description: "QoS settings updated on ports 3, 7, and 12",
      user: "admin@example.com",
      timestamp: "2023-06-15 14:32:45",
      status: "success",
    },
    {
      id: 2,
      type: "security",
      description: "Updated ACL rules for VLAN 20",
      user: "security@example.com",
      timestamp: "2023-06-14 09:15:22",
      status: "success",
    },
    {
      id: 3,
      type: "performance",
      description: "Buffer allocation adjusted for high-traffic ports",
      user: "system",
      timestamp: "2023-06-13 23:45:18",
      status: "success",
      automatic: true,
    },
    {
      id: 4,
      type: "topology",
      description: "Connected to new distribution switch DS-05",
      user: "network@example.com",
      timestamp: "2023-06-12 11:22:36",
      status: "warning",
    },
    {
      id: 5,
      type: "security",
      description: "Failed attempt to modify encryption settings",
      user: "intern@example.com",
      timestamp: "2023-06-11 16:08:54",
      status: "error",
    },
    {
      id: 6,
      type: "performance",
      description: "Traffic routing policy optimized by AI",
      user: "system",
      timestamp: "2023-06-10 08:12:02",
      status: "success",
      automatic: true,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'configuration':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'security':
        return <Database className="h-4 w-4 text-red-500" />;
      case 'performance':
        return <Clock className="h-4 w-4 text-green-500" />;
      case 'topology':
        return <Database className="h-4 w-4 text-purple-500" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>;
      case 'warning':
        return <Badge className="bg-amber-500">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-medium">Comprehensive Logging & Change History</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search Logs</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {changeHistory.map((change) => (
          <Card key={change.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(change.type)}
                    <h5 className="font-medium">{change.description}</h5>
                    {change.automatic && (
                      <Badge variant="outline" className="text-xs border-purple-500 text-purple-500">AI</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    <span>{change.user}</span>
                    <span>•</span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>{change.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(change.status)}
                  {change.status !== 'error' && (
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Rollback</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span>Load More History</span>
        </Button>
      </div>

      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
        <div className="flex items-start">
          <Database className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Retention Policy</h4>
            <p className="text-sm text-muted-foreground">Change logs are retained for 90 days. Configuration backups are stored for 12 months. Use export feature to archive logs for longer periods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeHistoryTab;
