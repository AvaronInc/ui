
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Play, 
  Clock, 
  Edit, 
  Trash, 
  Plus, 
  Calendar,
  Terminal,
  Search,
  Filter,
  BookOpen
} from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Script, ScriptType } from '@/types/automation';
import { Badge } from '@/components/ui/badge';
import NewScriptForm from './NewScriptForm';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

interface ScriptManagementProps {
  scripts: Script[];
  onCreateScript: (script: Partial<Script>) => void;
  onRunScript: (id: string) => void;
  onScheduleScript: (id: string) => void;
  onEditScript: (id: string) => void;
  onDeleteScript: (id: string) => void;
}

export const ScriptManagement = ({
  scripts,
  onCreateScript,
  onRunScript,
  onScheduleScript,
  onEditScript,
  onDeleteScript
}: ScriptManagementProps) => {
  const [selectedTab, setSelectedTab] = useState<ScriptType>('PowerShell');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewScriptForm, setShowNewScriptForm] = useState(false);
  
  const filteredScripts = scripts.filter(script => 
    script.type === selectedTab && 
    script.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Inactive':
        return 'bg-muted text-muted-foreground border-muted-foreground/20';
      case 'Deprecated':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return '';
    }
  };
  
  const handleCreateScript = (data: Partial<Script>) => {
    onCreateScript({
      ...data,
      type: selectedTab
    });
    setShowNewScriptForm(false);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Code className="mr-2 h-5 w-5 text-primary" />
            Script Management System
          </CardTitle>
          <Dialog open={showNewScriptForm} onOpenChange={setShowNewScriptForm}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>Create New Script</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <NewScriptForm onSubmit={handleCreateScript} onCancel={() => setShowNewScriptForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="PowerShell" onValueChange={(value) => setSelectedTab(value as ScriptType)}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="PowerShell" className="flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              PowerShell
            </TabsTrigger>
            <TabsTrigger value="Ansible" className="flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              Ansible
            </TabsTrigger>
            <TabsTrigger value="Python" className="flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              Python
            </TabsTrigger>
            <TabsTrigger value="GoLang" className="flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              GoLang
            </TabsTrigger>
          </TabsList>
          
          {['PowerShell', 'Ansible', 'Python', 'GoLang'].map((scriptType) => (
            <TabsContent key={scriptType} value={scriptType}>
              <div className="rounded-md border">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${scriptType} scripts...`}
                    className="pl-8 rounded-t-md rounded-b-none border-x-0 border-t-0 focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Script Name</TableHead>
                      <TableHead>Last Execution</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Execution Frequency</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScripts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          <div className="flex flex-col items-center justify-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-2" />
                            <p>No {scriptType} scripts found</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => setShowNewScriptForm(true)}
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Create a new script
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredScripts.map((script) => (
                        <TableRow key={script.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              {script.name}
                              <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                                {script.description}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{script.lastExecutionDate}</TableCell>
                          <TableCell>{script.createdBy}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(script.status)}>
                              {script.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{script.executionFrequency}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRunScript(script.id)}
                                title="Run Script Now"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onScheduleScript(script.id)}
                                title="Schedule Execution"
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEditScript(script.id)}
                                title="Edit Script"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDeleteScript(script.id)}
                                title="Delete Script"
                                className="text-destructive"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScriptManagement;
