
import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

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
  
  // Dialog states
  const [newChangeDialogOpen, setNewChangeDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [policiesDialogOpen, setPoliciesDialogOpen] = useState(false);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  
  // Handle quick action buttons
  const handleCreateNewChange = () => {
    setNewChangeDialogOpen(true);
  };
  
  const handleViewHistory = () => {
    setHistoryDialogOpen(true);
  };
  
  const handleConfigurePolicies = () => {
    setPoliciesDialogOpen(true);
  };
  
  const handleViewCalendar = () => {
    setCalendarDialogOpen(true);
  };
  
  const handleReviewChange = (change: ChangeRequest) => {
    toast.info(`Reviewing change: ${change.title}`);
  };

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
              onReview={handleReviewChange}
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
              onClick={handleCreateNewChange}
            >
              <ClipboardPlus className="mr-2 h-4 w-4" />
              Create New Change Request
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              variant="outline"
              onClick={handleViewHistory}
            >
              <History className="mr-2 h-4 w-4" />
              View Change History
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              variant="outline"
              onClick={handleConfigurePolicies}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure Approval Policies
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              variant="outline"
              onClick={handleViewCalendar}
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
      
      {/* Create New Change Request Dialog */}
      <Dialog open={newChangeDialogOpen} onOpenChange={setNewChangeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Change Request</DialogTitle>
            <DialogDescription>
              Create a new change request to track changes across your infrastructure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              This feature will allow you to create a new change request with detailed information about the proposed change, 
              affected components, risk assessments, and approval workflows.
            </p>
            <p className="text-sm text-muted-foreground">
              The complete form implementation will be available in a future update.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setNewChangeDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Change History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Change History</DialogTitle>
            <DialogDescription>
              View the history of all change requests and their status.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              This feature will provide a comprehensive view of all change requests, including their status, 
              approval history, implementation details, and audit logs.
            </p>
            <p className="text-sm text-muted-foreground">
              The complete implementation will be available in a future update.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setHistoryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Configure Approval Policies Dialog */}
      <Dialog open={policiesDialogOpen} onOpenChange={setPoliciesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configure Approval Policies</DialogTitle>
            <DialogDescription>
              Set up and manage approval workflows and policies for different types of changes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              This feature will allow you to configure custom approval workflows based on change type, risk level, 
              and affected components. You can define required approvers, escalation paths, and SLAs.
            </p>
            <p className="text-sm text-muted-foreground">
              The complete implementation will be available in a future update.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setPoliciesDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Change Calendar Dialog */}
      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Change Calendar</DialogTitle>
            <DialogDescription>
              View scheduled changes in a calendar view.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              This feature will provide a calendar view of all scheduled changes, allowing you to plan and 
              coordinate changes to minimize business impact. You can view conflicts, blackout periods, and 
              maintenance windows.
            </p>
            <p className="text-sm text-muted-foreground">
              The complete implementation will be available in a future update.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setCalendarDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
