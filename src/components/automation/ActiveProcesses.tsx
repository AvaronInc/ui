
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  Play, AlertCircle, CheckCircle, Search, Clock, Filter, 
  Download, AlertTriangle
} from 'lucide-react';
import { AutomationProcess, ProcessType } from '@/types/automation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface ActiveProcessesProps {
  processes: AutomationProcess[];
}

export const ActiveProcesses = ({ processes }: ActiveProcessesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ProcessType[]>([]);
  
  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(process.type);
    return matchesSearch && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running':
        return <Play className="h-4 w-4 text-primary" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Completed':
        return 'bg-success/10 text-success border-success/20';
      case 'Failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return '';
    }
  };

  const getTypeIcon = (type: ProcessType) => {
    switch (type) {
      case 'AI':
        return <Brain className="h-4 w-4" />;
      case 'Backup':
        return <HardDrive className="h-4 w-4" />;
      case 'Security':
        return <Shield className="h-4 w-4" />;
      case 'System Maintenance':
        return <Settings className="h-4 w-4" />;
      case 'Custom Script':
        return <Terminal className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Play className="mr-2 h-5 w-5 text-primary" />
            Active Automation & System Processes
          </CardTitle>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.includes('AI')}
                  onCheckedChange={(checked) => {
                    setSelectedTypes(
                      checked
                        ? [...selectedTypes, 'AI']
                        : selectedTypes.filter(t => t !== 'AI')
                    );
                  }}
                >
                  AI Decision-Making
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.includes('Security')}
                  onCheckedChange={(checked) => {
                    setSelectedTypes(
                      checked
                        ? [...selectedTypes, 'Security']
                        : selectedTypes.filter(t => t !== 'Security')
                    );
                  }}
                >
                  Security Reports
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.includes('Backup')}
                  onCheckedChange={(checked) => {
                    setSelectedTypes(
                      checked
                        ? [...selectedTypes, 'Backup']
                        : selectedTypes.filter(t => t !== 'Backup')
                    );
                  }}
                >
                  Backups
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.includes('Custom Script')}
                  onCheckedChange={(checked) => {
                    setSelectedTypes(
                      checked
                        ? [...selectedTypes, 'Custom Script']
                        : selectedTypes.filter(t => t !== 'Custom Script')
                    );
                  }}
                >
                  Custom Scripts
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.includes('System Maintenance')}
                  onCheckedChange={(checked) => {
                    setSelectedTypes(
                      checked
                        ? [...selectedTypes, 'System Maintenance']
                        : selectedTypes.filter(t => t !== 'System Maintenance')
                    );
                  }}
                >
                  System Maintenance
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem>
                  PDF
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  JSON
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  CSV
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search processes by name or type..."
              className="pl-8 rounded-t-md rounded-b-none border-x-0 border-t-0 focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Execution</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled Run Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <AlertTriangle className="h-10 w-10 text-muted-foreground/50 mb-2" />
                      <p>No processes found matching your criteria</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProcesses.map((process) => (
                  <TableRow key={process.id}>
                    <TableCell className="font-medium">{process.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/30">
                        {process.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{process.lastExecutionTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge className={getStatusColor(process.status)}>
                          <span className="flex items-center">
                            {getStatusIcon(process.status)}
                            <span className="ml-1">{process.status}</span>
                          </span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {process.scheduledRunTime ? (
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span>{process.scheduledRunTime}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Adding all necessary imports
import { 
  Brain, 
  HardDrive, 
  Settings, 
  Shield, 
  Terminal 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default ActiveProcesses;
