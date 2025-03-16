
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SchedulingStats } from '@/types/scheduling';
import { CalendarDays, Clock, AlertTriangle, GitBranch } from 'lucide-react';

interface StatsCardsProps {
  stats: SchedulingStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Events
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {stats.totalScheduledEvents}
            </h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <Clock className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Meetings This Week
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {stats.meetingsThisWeek}
            </h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Pending Updates
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {stats.pendingUpdates}
            </h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <GitBranch className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Conflicting Events
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {stats.conflictingEvents}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
