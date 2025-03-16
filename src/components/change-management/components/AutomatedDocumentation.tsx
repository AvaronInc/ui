
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { ChangeRequest } from '@/types/change-management';
import ChangeRequestTable from './ChangeRequestTable';

interface AutomatedDocumentationProps {
  closedChanges: ChangeRequest[];
}

const AutomatedDocumentation: React.FC<AutomatedDocumentationProps> = ({ closedChanges }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automated Documentation</CardTitle>
        <CardDescription>AI-generated documentation based on change requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Change Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <ChangeRequestTable 
                changes={closedChanges.slice(0, 3)} 
                type="documentation" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Documentation Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Network Configuration Change", 
                  "Server Deployment", 
                  "Application Update", 
                  "Security Patch", 
                  "Database Schema Change"
                ].map(template => (
                  <div key={template} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{template}</span>
                    </div>
                    <Button variant="ghost" size="sm">Use</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedDocumentation;
