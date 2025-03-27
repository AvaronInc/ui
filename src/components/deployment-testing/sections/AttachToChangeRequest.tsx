
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, ClipboardList, LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useChangeManagement } from '@/hooks/use-change-management';

interface AttachToChangeRequestProps {
  results: any | null;
}

const AttachToChangeRequest: React.FC<AttachToChangeRequestProps> = ({ results }) => {
  const [changeId, setChangeId] = useState('');
  const [changeType, setChangeType] = useState('new');
  const [summary, setSummary] = useState('');
  const [approver, setApprover] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Get pending changes from change management
  const { 
    getPendingChanges, 
    changeRequests,
    loading: changeManagementLoading 
  } = useChangeManagement();
  
  const pendingChanges = getPendingChanges();

  if (!results) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Test Results Available</h2>
        <p className="text-muted-foreground">
          Run a deployment test to attach results to a change request.
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (changeType === 'existing' && !changeId) {
      toast({
        title: "Missing Information",
        description: "Please select a Change Request",
        variant: "destructive"
      });
      return;
    }
    
    if (!summary) {
      toast({
        title: "Missing Information",
        description: "Please enter a summary of the change",
        variant: "destructive"
      });
      return;
    }
    
    if (!approver) {
      toast({
        title: "Missing Information",
        description: "Please select an approver",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Success!",
        description: changeType === 'new' 
          ? "New Change Request created with test results attached" 
          : "Test results attached to existing Change Request",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Attach to Change Request</h2>
        <p className="text-sm text-muted-foreground">
          Link your deployment test results to a change request for approval and deployment.
        </p>
      </div>
      
      {!isSuccess ? (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Change Request Type</Label>
                  <Select 
                    value={changeType} 
                    onValueChange={setChangeType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Create New Change Request</SelectItem>
                      <SelectItem value="existing">Attach to Existing Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {changeType === 'existing' && (
                  <div className="space-y-2">
                    <Label htmlFor="change-id">Change Request</Label>
                    <Select 
                      value={changeId} 
                      onValueChange={setChangeId}
                      disabled={changeManagementLoading || pendingChanges.length === 0}
                    >
                      <SelectTrigger id="change-id" className="w-full">
                        <SelectValue placeholder={
                          changeManagementLoading 
                          ? "Loading change requests..." 
                          : pendingChanges.length === 0 
                          ? "No pending change requests available" 
                          : "Select a change request"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {pendingChanges.length === 0 ? (
                          <SelectItem value="none" disabled>No pending change requests available</SelectItem>
                        ) : (
                          pendingChanges.map((change) => (
                            <SelectItem key={change.id} value={change.id}>
                              {change.id} - {change.title} ({change.status})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Change Summary</Label>
                  <Textarea 
                    id="summary" 
                    placeholder="Brief description of the changes being made" 
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Change Risk Assessment</Label>
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">AI Risk Assessment:</span>
                        <span className="text-sm font-medium">
                          {results.criticalIssues > 0 ? "High Risk" : results.warnings > 0 ? "Medium Risk" : "Low Risk"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Confidence Score:</span>
                        <span className="text-sm font-medium">{results.riskScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Critical Issues:</span>
                        <span className="text-sm font-medium">{results.criticalIssues}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Warnings:</span>
                        <span className="text-sm font-medium">{results.warnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Services Affected:</span>
                        <span className="text-sm font-medium">{results.affectedServices.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Change Approver</Label>
                  <Select 
                    value={approver} 
                    onValueChange={setApprover}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select approver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="michael.zhang">Michael Zhang (Network Admin)</SelectItem>
                      <SelectItem value="sarah.johnson">Sarah Johnson (Security Lead)</SelectItem>
                      <SelectItem value="david.patel">David Patel (IT Director)</SelectItem>
                      <SelectItem value="emma.wilson">Emma Wilson (System Architect)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting 
                  ? "Processing..." 
                  : changeType === 'new' 
                    ? "Create Change Request with Test Results" 
                    : "Attach Results to Change Request"
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
              </div>
              <h3 className="text-xl font-bold">
                {changeType === 'new' ? 'Change Request Created' : 'Results Attached Successfully'}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {changeType === 'new' 
                  ? 'A new change request has been created with your test results attached.' 
                  : `Your test results have been attached to change request ${changeId}.`
                }
              </p>
              <div className="pt-4 space-y-3 w-full max-w-sm">
                <Button variant="outline" className="w-full justify-center" size="sm">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  {changeType === 'new' ? 'View New Change Request' : 'View Change Request'}
                </Button>
                <Button variant="outline" className="w-full justify-center" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy Link to Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttachToChangeRequest;
