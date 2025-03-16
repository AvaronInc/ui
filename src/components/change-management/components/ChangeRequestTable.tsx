
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChangeRequest, RiskLevel } from '@/types/change-management';
import { FileText, ExternalLink, AlertTriangle, Clock } from 'lucide-react';

interface ChangeRequestTableProps {
  changes: ChangeRequest[];
  type: 'approval' | 'risk' | 'recent' | 'documentation';
}

const ChangeRequestTable: React.FC<ChangeRequestTableProps> = ({ changes, type }) => {
  if (changes.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No change requests available
      </div>
    );
  }

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
                  <Button size="sm">Review</Button>
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
                  <Button size="sm" variant="outline">Details</Button>
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
                  <Button size="sm" variant="outline">View</Button>
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
                  <Button size="sm" variant="outline">
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
    <div className="border rounded-md">
      <Table>
        {renderTableHeader()}
        {renderTableBody()}
      </Table>
    </div>
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric' 
  });
}

export default ChangeRequestTable;
