
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectStatistics, AIProjectSuggestion } from '@/types/projects';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectStatCardsProps {
  statistics: ProjectStatistics;
  aiSuggestions: AIProjectSuggestion[];
}

const ProjectStatCards = ({ statistics, aiSuggestions }: ProjectStatCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <h3 className="text-2xl font-bold mt-1">{statistics.activeProjects}</h3>
              <div className="flex items-center mt-1 text-xs">
                {statistics.trendDirection === 'up' ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">{statistics.trendPercentage}% increase</span>
                  </>
                ) : statistics.trendDirection === 'down' ? (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">{statistics.trendPercentage}% decrease</span>
                  </>
                ) : (
                  <span className="text-gray-500">No change</span>
                )}
              </div>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">At Risk Projects</p>
              <h3 
                className={cn(
                  "text-2xl font-bold mt-1",
                  statistics.atRiskProjects > 0 ? "text-amber-500" : ""
                )}
              >
                {statistics.atRiskProjects}
              </h3>
              <div className="mt-1 text-xs">
                {statistics.atRiskProjects > 0 ? (
                  <span className="text-amber-500">Needs attention</span>
                ) : (
                  <span className="text-green-500">All projects on track</span>
                )}
              </div>
            </div>
            <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</p>
              <h3 className="text-2xl font-bold mt-1">{statistics.upcomingDeadlines}</h3>
              <div className="mt-1 text-xs">
                <span className="text-blue-500">In the next 7 days</span>
              </div>
            </div>
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed Projects</p>
              <h3 className="text-2xl font-bold mt-1">{statistics.completedProjects}</h3>
              <div className="mt-1 text-xs">
                <span className="text-green-500">Successfully delivered</span>
              </div>
            </div>
            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatCards;
