
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChangeRequest, RiskLevel } from '@/types/change-management';
import { FileText, ExternalLink, AlertTriangle, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ChangeRequestTableProps {
  changes: ChangeRequest[];
  type: 'approval' | 'risk' | 'recent' | 'documentation';
  onReview?: (change: ChangeRequest) => void;
  onViewDetails?: (change: ChangeRequest) => void;
}

const ChangeRequestTable: React.FC<ChangeRequestTableProps> = ({ 
  changes, 
  type,
  onReview,
  onViewDetails
}) => {
  const [selectedChange, setSelectedChange] = useState<ChangeRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  
  if (changes.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No change requests available
      </div>
    );
  }

  const handleReviewClick = (change: ChangeRequest) => {
    setSelectedChange(change);
    setReviewDialogOpen(true);
    if (onReview) onReview(change);
  };

  const handleDetailsClick = (change: ChangeRequest) => {
    setSelectedChange(change);
    setDetailsDialogOpen(true);
    if (onViewDetails) onViewDetails(change);
  };

  const handleSubmitReview = () => {
    toast.success("Review submitted successfully");
    setReviewDialogOpen(false);
    setReviewComments('');
  };

  const renderTableHeader = () => {
    switch (type) {
      case 'approval':
        return (
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Requester</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
        );
      case 'risk':
        return (
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Risk Level</TableHead>
              <TableHead className="hidden md:table-cell">AI Score</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
        );
      case 'recent':
        return (
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
        );
      case 'documentation':
        return (
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
        );
      default:
        return null;
    }
  };

  const renderTableBody = () => {
    switch (type) {
      case 'approval':
        return (
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id}>
                <TableCell className="font-medium">{change.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">
                    {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{change.requestedBy}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(change.plannedDate)}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => handleReviewClick(change)}>Review</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      case 'risk':
        return (
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id}>
                <TableCell className="font-medium">{change.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className={getRiskBadgeClass(change.riskLevel)}>
                    {change.riskLevel.charAt(0).toUpperCase() + change.riskLevel.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {change.aiAssessment?.riskScore || 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => handleDetailsClick(change)}>Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      case 'recent':
        return (
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id}>
                <TableCell className="font-medium">{change.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">
                    {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(change.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => handleDetailsClick(change)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      case 'documentation':
        return (
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {change.title}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{formatDate(change.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => handleDetailsClick(change)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Review Change Request</DialogTitle>
            <DialogDescription>
              {selectedChange?.title} - Submitted by {selectedChange?.requestedBy}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm mt-1">{selectedChange?.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Risk Assessment</h3>
              <Badge className={selectedChange?.riskLevel ? getRiskBadgeClass(selectedChange.riskLevel) : ''}>
                {selectedChange?.riskLevel?.charAt(0).toUpperCase() + selectedChange?.riskLevel?.slice(1) || 'N/A'} Risk
              </Badge>
            </div>
            <div>
              <Label htmlFor="comments">Review Comments</Label>
              <Textarea 
                id="comments"
                className="mt-1"
                placeholder="Enter your review comments here..."
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Change Request Details</DialogTitle>
            <DialogDescription>
              {selectedChange?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Type</h3>
                <p className="text-sm mt-1">
                  {selectedChange?.type.charAt(0).toUpperCase() + selectedChange?.type.slice(1)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Status</h3>
                <p className="text-sm mt-1">
                  {selectedChange?.status.charAt(0).toUpperCase() + selectedChange?.status.slice(1)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Requested By</h3>
                <p className="text-sm mt-1">{selectedChange?.requestedBy}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Assigned To</h3>
                <p className="text-sm mt-1">{selectedChange?.assignedTo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Planned Date</h3>
                <p className="text-sm mt-1">{selectedChange?.plannedDate ? formatDate(selectedChange.plannedDate, true) : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Risk Level</h3>
                <Badge className={selectedChange?.riskLevel ? getRiskBadgeClass(selectedChange.riskLevel) : ''}>
                  {selectedChange?.riskLevel?.charAt(0).toUpperCase() + selectedChange?.riskLevel?.slice(1) || 'N/A'}
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm mt-1 border rounded-md p-2">{selectedChange?.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Rollback Plan</h3>
              <p className="text-sm mt-1 border rounded-md p-2">{selectedChange?.rollbackPlan}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Approvals</h3>
              <div className="mt-1 space-y-2">
                {selectedChange?.approvals?.map((approval, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-1 last:border-b-0">
                    <span className="text-sm">{approval.role}</span>
                    <Badge variant="outline" className={getApprovalBadgeClass(approval.status)}>
                      {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Helper functions
function getRiskBadgeClass(riskLevel: RiskLevel) {
  switch (riskLevel) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'high':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return '';
  }
}

function getApprovalBadgeClass(status: string) {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'pending':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'on-hold':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'more-info':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    default:
      return '';
  }
}

function formatDate(dateString: string, includeTime = false) {
  const date = new Date(dateString);
  if (includeTime) {
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return date.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric' 
  });
}

export default ChangeRequestTable;
