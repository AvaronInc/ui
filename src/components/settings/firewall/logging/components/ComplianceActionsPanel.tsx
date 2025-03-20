
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const ComplianceActionsPanel: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Compliance Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300">PCI-DSS Issue</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Requirement 3.4: Encrypt transmission of cardholder data across open, public networks.
                Some internal services are using outdated TLS versions.
              </p>
              <Button variant="outline" size="sm" className="mt-2 bg-white dark:bg-background">
                View Details
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300">HIPAA Compliance</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                §164.312(e)(1): Implement technical security measures to guard against unauthorized
                access to PHI being transmitted over an electronic network.
              </p>
              <Button variant="outline" size="sm" className="mt-2 bg-white dark:bg-background">
                View Details
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300">SOC 2 Compliant</h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                All Type II requirements are met. Next assessment due in 6 months.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceActionsPanel;
