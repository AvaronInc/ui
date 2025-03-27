
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Link, ClipboardList, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useChangeManagement } from '@/hooks/use-change-management';

interface AttachToChangeRequestProps {
  testResults: any;
  testId: string | null;
}

const AttachToChangeRequest: React.FC<AttachToChangeRequestProps> = ({ testResults, testId }) => {
  const [selectedOption, setSelectedOption] = useState('new');
  const [changeId, setChangeId] = useState('');
  const [signatureComplete, setSignatureComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { changeRequests, submitChangeRequest } = useChangeManagement();

  if (!testResults || !testId) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Test Results Available</h3>
        <p className="text-sm text-muted-foreground mb-6">Run a deployment test simulation first before attaching to a change request.</p>
        <Button variant="outline">Go to Run Test Scenario</Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedOption === 'new') {
        // Create a new change request
        submitChangeRequest({
          title: `Deploy ${testResults.configType} changes`,
          description: `Deployment of new ${testResults.configType} with successful AI risk assessment (${testResults.riskScore}% score).`,
          requestedBy: 'Current User',
          type: 'standard',
          riskLevel: testResults.riskScore > 90 ? 'low' : testResults.riskScore > 75 ? 'medium' : 'high',
          affectedComponents: testResults.impactedServices,
          rollbackPlan: 'Revert to previous configuration using version control system'
        });
        
        toast({
          title: "Change Request Created",
          description: "Test results have been attached to a new change request"
        });
      } else {
        // Attach to existing change request
        toast({
          title: "Change Request Updated",
          description: `Test results have been attached to existing change request ${changeId}`
        });
      }
      
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Attach to Change Request</h2>
        <p className="text-sm text-muted-foreground">
          Link these test results to a change request for approval and implementation tracking.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-3 mb-3">
                  <ClipboardList className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Test Results Summary</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Test ID</p>
                    <p className="text-sm font-mono">{testId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm">{testResults.configType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                    <p className="text-sm">{testResults.riskScore}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm">{new Date(testResults.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-primary/10">
                    {testResults.criticalIssues.length === 0 ? "No Critical Issues" : `${testResults.criticalIssues.length} Critical Issues`}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10">
                    {testResults.affectedEndpoints} Endpoints Affected
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10">
                    {testResults.estimatedDowntime}m Est. Downtime
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Attach Options</h3>
                
                <RadioGroup defaultValue={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="new" id="new" className="mt-1" />
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="new" className="font-medium">Create New Change Request</Label>
                      <p className="text-sm text-muted-foreground">
                        Generate a new change request with these test results attached.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="existing" id="existing" className="mt-1" />
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="existing" className="font-medium">Attach to Existing Change Request</Label>
                      <p className="text-sm text-muted-foreground">
                        Link these test results to an already created change request.
                      </p>
                      
                      {selectedOption === 'existing' && (
                        <div className="pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="change-id">Change Request ID</Label>
                            <Select onValueChange={setChangeId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a change request" />
                              </SelectTrigger>
                              <SelectContent>
                                {changeRequests.slice(0, 5).map((change) => (
                                  <SelectItem key={change.id} value={change.id}>
                                    {change.id}: {change.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">VaultID Signature</h3>
                <p className="text-sm text-muted-foreground">
                  A cryptographic signature is required to validate these test results for change approval.
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="w-full">
                      <Link className="h-4 w-4 mr-2" />
                      Authenticate with VaultID
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>VaultID Authentication</DialogTitle>
                      <DialogDescription>
                        Sign this test result to verify its authenticity and authorize it for change review.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="vault-username">VaultID Username</Label>
                        <Input id="vault-username" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vault-password">Passphrase</Label>
                        <Input id="vault-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vault-notes">Verification Notes (Optional)</Label>
                        <Textarea id="vault-notes" placeholder="Add any notes about this verification..." />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" type="button">Cancel</Button>
                      <Button type="button" onClick={() => setSignatureComplete(true)}>
                        Verify and Sign
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {signatureComplete && (
                  <div className="flex items-center p-2 bg-primary/10 text-primary rounded border border-primary/20">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">VaultID signature complete</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => window.open('/change-management', '_blank')}
                className="sm:flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Change Management
              </Button>
              
              <Button 
                type="submit" 
                disabled={submitting || (selectedOption === 'existing' && !changeId) || !signatureComplete}
                className="sm:flex-1"
              >
                {submitting ? "Processing..." : "Submit and Attach Test Results"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AttachToChangeRequest;
