
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { History, Search, Eye, AlertTriangle, CheckCircle, FileText, Download, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SimulationHistoryProps {
  onSelectTest: (testId: string, results: any) => void;
}

// Mock data for simulation history
const mockHistoryData = [
  {
    id: 'test-1686823450',
    timestamp: '2023-06-15T08:30:50Z',
    configType: 'Firewall Rules',
    riskScore: 96,
    user: 'John Smith',
    status: 'Approved',
    criticalIssues: []
  },
  {
    id: 'test-1686910390',
    timestamp: '2023-06-16T12:13:10Z',
    configType: 'Network Configuration',
    riskScore: 82,
    user: 'Maria Garcia',
    status: 'Pending',
    criticalIssues: []
  },
  {
    id: 'test-1687219500',
    timestamp: '2023-06-20T09:45:00Z',
    configType: 'DNS/IPAM Updates',
    riskScore: 65,
    user: 'Ahmed Ali',
    status: 'Failed',
    criticalIssues: ['DNS resolution failure detected']
  },
  {
    id: 'test-1687651450',
    timestamp: '2023-06-25T14:10:50Z',
    configType: 'Routing/SD-WAN Policies',
    riskScore: 91,
    user: 'Samantha Lee',
    status: 'Approved',
    criticalIssues: []
  },
  {
    id: 'test-1687823450',
    timestamp: '2023-06-27T10:30:50Z',
    configType: 'Software Update',
    riskScore: 78,
    user: 'John Smith',
    status: 'In Review',
    criticalIssues: []
  }
];

const SimulationHistory: React.FC<SimulationHistoryProps> = ({ onSelectTest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyData, setHistoryData] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo, we'll combine mock data with any locally stored tests
    setHistoryData(mockHistoryData);
  }, []);
  
  const filteredHistory = historyData.filter(item => 
    item.configType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    setHistoryData(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Test Deleted",
      description: `Test record ${id} has been removed`
    });
  };
  
  const handleExport = (id: string) => {
    toast({
      title: "Report Exported",
      description: `Test report ${id} has been exported as PDF`
    });
  };

  const viewTest = (test: any) => {
    // Generate mock test results based on history data
    const mockResults = {
      id: test.id,
      timestamp: test.timestamp,
      configType: test.configType,
      configData: '{ "name": "Sample Config", "version": "1.0" }',
      riskScore: test.riskScore,
      confidence: Math.floor(Math.random() * 10) + 90, // 90-99
      impactedServices: ["DNS", "DHCP", "VoIP Gateway"],
      criticalIssues: test.criticalIssues,
      warnings: ["Service dependency warning: Auth service restart required"],
      affectedEndpoints: Math.floor(Math.random() * 50) + 10,
      estimatedDowntime: Math.floor(Math.random() * 5),
      recommendations: [
        "Consider deploying during non-peak hours",
        "Add exception for internal monitoring services",
        "Update documentation to reflect new flow paths"
      ]
    };
    
    onSelectTest(test.id, mockResults);
    
    toast({
      title: "Test Loaded",
      description: `Viewing test results for ${test.id}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Simulation History</h2>
        <p className="text-sm text-muted-foreground">
          View past deployment tests, their results, and approval status.
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by type, ID, or user..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <History className="h-4 w-4 mr-2" />
          Recent
        </Button>
      </div>
      
      {filteredHistory.length === 0 ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No simulation history found. Run a deployment test to see results here.
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Past Deployment Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Configuration Type</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{new Date(item.timestamp).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">{item.user}</div>
                    </TableCell>
                    <TableCell>
                      {item.configType}
                      {item.criticalIssues.length > 0 && (
                        <div className="mt-1">
                          <Badge variant="destructive" className="text-[10px] h-4 py-0">
                            {item.criticalIssues.length} Critical Issues
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {item.riskScore >= 90 ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : item.riskScore >= 75 ? (
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        )}
                        <span>{item.riskScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          item.status === 'Approved' ? 'default' : 
                          item.status === 'Failed' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => viewTest(item)}
                          title="View Test Results"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleExport(item.id)}
                          title="Export Report"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulationHistory;
