
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, MoreHorizontal, Plus, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Stub data for retention policies
const retentionPoliciesData = [
  {
    id: '1',
    name: 'System Logs',
    category: 'logs',
    period: '90 days',
    status: 'active',
    priority: 'medium',
  },
  {
    id: '2',
    name: 'Security Events',
    category: 'security',
    period: '180 days',
    status: 'active',
    priority: 'high',
  },
  {
    id: '3',
    name: 'Audit Trails',
    category: 'audit',
    period: '365 days',
    status: 'active',
    priority: 'high',
  },
  {
    id: '4',
    name: 'Network Traffic',
    category: 'network',
    period: '30 days',
    status: 'active',
    priority: 'medium',
  },
  {
    id: '5',
    name: 'Performance Metrics',
    category: 'performance',
    period: '14 days',
    status: 'inactive',
    priority: 'low',
  },
];

const RetentionPoliciesTab: React.FC = () => {
  const [policies, setPolicies] = useState(retentionPoliciesData);
  const [selectedPolicy, setSelectedPolicy] = useState<typeof retentionPoliciesData[0] | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  // Safely handle policy editing
  const handleEditPolicy = useCallback((policy: typeof retentionPoliciesData[0]) => {
    try {
      setSelectedPolicy(policy);
      setEditDialogOpen(true);
    } catch (error) {
      console.error("Error opening edit dialog:", error);
      setIsError(true);
      toast.error("Failed to open edit dialog");
    }
  }, []);

  // Safely handle policy deletion
  const handleDeletePolicy = useCallback((policy: typeof retentionPoliciesData[0]) => {
    try {
      setSelectedPolicy(policy);
      setDeleteDialogOpen(true);
    } catch (error) {
      console.error("Error opening delete dialog:", error);
      setIsError(true);
      toast.error("Failed to open delete dialog");
    }
  }, []);

  // Safe dialog close handlers
  const handleEditDialogClose = useCallback(() => {
    try {
      setEditDialogOpen(false);
      // Use a timeout to ensure state changes don't overlap
      setTimeout(() => {
        setSelectedPolicy(null);
      }, 300);
    } catch (error) {
      console.error("Error closing edit dialog:", error);
      // Force reset of dialog state
      setEditDialogOpen(false);
      setSelectedPolicy(null);
      setIsError(true);
      toast.error("Error closing dialog");
    }
  }, []);

  const handleDeleteDialogClose = useCallback(() => {
    try {
      setDeleteDialogOpen(false);
      // Use a timeout to ensure state changes don't overlap
      setTimeout(() => {
        setSelectedPolicy(null);
      }, 300);
    } catch (error) {
      console.error("Error closing delete dialog:", error);
      // Force reset of dialog state
      setDeleteDialogOpen(false);
      setSelectedPolicy(null);
      setIsError(true);
      toast.error("Error closing dialog");
    }
  }, []);

  // Save policy changes
  const handleSavePolicy = useCallback(() => {
    try {
      // In a real implementation, this would save changes to the API
      toast.success("Policy updated successfully");
      handleEditDialogClose();
    } catch (error) {
      console.error("Error saving policy:", error);
      setIsError(true);
      toast.error("Failed to save policy changes");
      // Still close the dialog to prevent freezing
      handleEditDialogClose();
    }
  }, [handleEditDialogClose]);

  // Delete policy
  const handleConfirmDelete = useCallback(() => {
    try {
      if (!selectedPolicy) return;
      
      // Filter out the deleted policy
      const updatedPolicies = policies.filter(p => p.id !== selectedPolicy.id);
      setPolicies(updatedPolicies);
      
      toast.success("Policy deleted successfully");
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Error deleting policy:", error);
      setIsError(true);
      toast.error("Failed to delete policy");
      // Still close the dialog to prevent freezing
      handleDeleteDialogClose();
    }
  }, [selectedPolicy, policies, handleDeleteDialogClose]);

  // Error state
  if (isError) {
    return (
      <Card className="p-6 border-destructive">
        <CardHeader className="p-0">
          <CardTitle className="text-destructive flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Error Loading Retention Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            There was an error loading the retention policies. Please try refreshing the page.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Get status badge styles
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Active</Badge>;
    }
    return <Badge variant="outline">Inactive</Badge>;
  };

  // Get priority badge styles
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Retention Policies</CardTitle>
          <Button size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-1" />
            Add New Policy
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Retention Period</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.name}</TableCell>
                  <TableCell className="capitalize">{policy.category}</TableCell>
                  <TableCell>{policy.period}</TableCell>
                  <TableCell>{getPriorityBadge(policy.priority)}</TableCell>
                  <TableCell>{getStatusBadge(policy.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditPolicy(policy)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePolicy(policy)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Policy Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={handleEditDialogClose}>
          <DialogHeader>
            <DialogTitle>Edit Retention Policy</DialogTitle>
            <DialogDescription>
              Make changes to the retention policy. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedPolicy && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium col-span-4">
                  Editing: {selectedPolicy.name}
                </p>
                <p className="text-xs text-muted-foreground col-span-4">
                  Policy details would be editable here in a complete implementation.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleEditDialogClose}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleSavePolicy}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Policy Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={handleDeleteDialogClose}>
          <DialogHeader>
            <DialogTitle>Delete Retention Policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this policy? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedPolicy && (
            <div className="py-4">
              <p className="text-sm font-medium">
                Policy: {selectedPolicy.name}
              </p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleDeleteDialogClose}>Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RetentionPoliciesTab;
