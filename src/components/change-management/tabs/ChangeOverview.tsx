
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChangeManagement } from '@/hooks/use-change-management';
import { ChangeRequest } from '@/types/change-management';
import { 
  ClipboardPlus, 
  History, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar 
} from 'lucide-react';
import ChangeRequestTable from '../components/ChangeRequestTable';
import RiskDistributionChart from '../components/RiskDistributionChart';
import ChangeTypeDistribution from '../components/ChangeTypeDistribution';

const ChangeOverview: React.FC = () => {
  const isMobile = useIsMobile();
  const { 
    changeStats, 
    getPendingChanges, 
    getChangesAwaitingApproval, 
    getRecentlyApprovedChanges,
    getHighRiskChanges
  } = useChangeManagement();

  // Get the data for display
  const pendingChanges = getPendingChanges();
  const changesAwaitingApproval = getChangesAwaitingApproval();
  const recentlyApprovedChanges = getRecentlyApprovedChanges();
  const highRiskChanges = getHighRiskChanges();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard 
          title="Pending Changes"
          value={changeStats.totalPending.toString()}
          icon={<Clock className="h-5 w-5 text-blue-500" />}
          description="Awaiting review or approval"
        />
        
        <StatsCard 
          title="Awaiting Approval"
          value={changeStats.pendingApproval.toString()}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          description="In approval workflow"
        />
        
        <StatsCard 
          title="Recently Approved"
          value={changeStats.recentlyApproved.toString()}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          description="Approved in last 7 days"
        />
        
        <StatsCard 
          title="High Risk Changes"
          value={changeStats.highRiskChanges.toString()}
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          description="Requiring special attention"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              Change Approval Queue
              <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {changesAwaitingApproval.length} Awaiting Action
              </Badge>
            </CardTitle>
            <CardDescription>Changes requiring review and approval</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <ChangeRequestTable 
              changes={changesAwaitingApproval.slice(0, isMobile ? 3 : 5)} 
              type="approval" 
            />
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full mt-3">
              View All Pending Approvals
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            <CardDescription>Change management operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
            >
              <ClipboardPlus className="mr-2 h-4 w-4" />
              Create New Change Request
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              variant="outline"
            >
              <History className="mr-2 h-4 w-4" />
              View Change History
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              variant="outline"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure Approval Policies
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              variant="outline"
            >
              <Calendar className="mr-2 h-4 w-4" />
              View Change Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              High Risk Changes
              <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                {highRiskChanges.length} Changes
              </Badge>
            </CardTitle>
            <CardDescription>Changes flagged by AI assessment as high risk</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangeRequestTable 
              changes={highRiskChanges.slice(0, isMobile ? 2 : 3)} 
              type="risk" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
            <CardDescription>Recently approved and implemented changes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangeRequestTable 
              changes={recentlyApprovedChanges.slice(0, isMobile ? 2 : 3)} 
              type="recent" 
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Change Risk Distribution</CardTitle>
            <CardDescription>Risk level breakdown of current changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <RiskDistributionChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Change Type Distribution</CardTitle>
            <CardDescription>Distribution of changes by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ChangeTypeDistribution />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, description }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ChangeOverview;
