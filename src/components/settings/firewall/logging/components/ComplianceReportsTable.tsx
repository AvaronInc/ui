
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, RefreshCw, Download } from 'lucide-react';

// Mock data
const complianceReports = [
  { id: 1, name: 'GDPR Compliance Report', type: 'regulatory', date: '2025-03-15', status: 'compliant', score: 98 },
  { id: 2, name: 'PCI-DSS Audit Report', type: 'regulatory', date: '2025-03-01', status: 'compliant', score: 95 },
  { id: 3, name: 'SOC 2 Security Assessment', type: 'audit', date: '2025-02-20', status: 'compliant', score: 92 },
  { id: 4, name: 'HIPAA Compliance Check', type: 'regulatory', date: '2025-02-15', status: 'action-needed', score: 87 },
  { id: 5, name: 'NIST 800-53 Assessment', type: 'audit', date: '2025-02-01', status: 'compliant', score: 94 },
];

interface ComplianceReportsTableProps {
  onExportReport: (id: number) => void;
}

const ComplianceReportsTable: React.FC<ComplianceReportsTableProps> = ({ onExportReport }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Compliance Reports</h3>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-1" />
            Run New Assessment
          </Button>
          
          <Button>
            <FileText className="h-4 w-4 mr-1" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge variant={report.status === 'compliant' ? 'outline' : 'default'} className={
                      report.status === 'compliant' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    }>
                      {report.status === 'compliant' ? 'Compliant' : 'Action Needed'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={report.score} className="h-2 w-16" />
                      <span>{report.score}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onExportReport(report.id)}>
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceReportsTable;
