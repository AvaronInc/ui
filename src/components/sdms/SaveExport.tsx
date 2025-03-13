
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentExportFormat } from '@/types/sdms';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, File, FileJson, FileCode, Save, Download, Calendar } from 'lucide-react';

const SaveExport = () => {
  const [exportFormat, setExportFormat] = useState<DocumentExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const getFormatIcon = (format: DocumentExportFormat) => {
    switch (format) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'json':
        return <FileJson className="h-5 w-5 text-yellow-500" />;
      case 'markdown':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'html':
        return <FileCode className="h-5 w-5 text-green-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">Save & Export Documentation</div>
      <p className="text-muted-foreground">
        Save your network documentation and export it in various formats
      </p>
      
      <Tabs defaultValue="export" className="space-y-6">
        <TabsList>
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Export</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="export">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Format</CardTitle>
                <CardDescription>
                  Choose the format for your documentation export
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={exportFormat}
                  onValueChange={(value) => setExportFormat(value as DocumentExportFormat)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-5 w-5 text-red-500" />
                      <span>PDF Document</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="json" id="json" />
                    <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer">
                      <FileJson className="h-5 w-5 text-yellow-500" />
                      <span>JSON Format</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="markdown" id="markdown" />
                    <Label htmlFor="markdown" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span>Markdown</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="html" id="html" />
                    <Label htmlFor="html" className="flex items-center gap-2 cursor-pointer">
                      <FileCode className="h-5 w-5 text-green-500" />
                      <span>HTML Document</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Options</CardTitle>
                <CardDescription>
                  Select which sections to include in the export
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="overview" defaultChecked />
                    <Label htmlFor="overview">Network Overview</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="topology" defaultChecked />
                    <Label htmlFor="topology">Network Topology</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="security" defaultChecked />
                    <Label htmlFor="security">Security Documentation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="apps" defaultChecked />
                    <Label htmlFor="apps">Application Services</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compliance" defaultChecked />
                    <Label htmlFor="compliance">Compliance Reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="custom" defaultChecked />
                    <Label htmlFor="custom">Custom Documentation</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="target">Export Target</Label>
                  <Select defaultValue="download">
                    <SelectTrigger id="target" className="mt-1.5">
                      <SelectValue placeholder="Select Target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">Browser Download</SelectItem>
                      <SelectItem value="storage">Save to Storage</SelectItem>
                      <SelectItem value="email">Email as Attachment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="quality">Image Quality</Label>
                  <Select defaultValue="high">
                    <SelectTrigger id="quality" className="mt-1.5">
                      <SelectValue placeholder="Select Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Smaller File)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="security">Document Security</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="security" className="mt-1.5">
                      <SelectValue placeholder="Select Security" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                      <SelectItem value="encrypted">Encrypted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {isExporting && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exporting documentation...</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? (
                  <>Processing...</>
                ) : (
                  <>
                    {getFormatIcon(exportFormat)}
                    <span>Export Documentation</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Automatic Exports</CardTitle>
              <CardDescription>
                Configure automatic exports of your documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Export Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Export Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="markdown">Markdown</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Delivery Method</Label>
                    <Select defaultValue="storage">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="storage">Save to Storage</SelectItem>
                        <SelectItem value="both">Email & Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Save Schedule</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Active Schedules</h3>
                  
                  <div className="space-y-3">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Weekly PDF Export</span>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Every Sunday at 11:00 PM • Storage
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Monthly Full Export</span>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">
                          1st of each month • All formats • Email & Storage
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>
                Recent documentation exports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-03-12 09:15</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <span>PDF</span>
                    </TableCell>
                    <TableCell>4.2 MB</TableCell>
                    <TableCell>System Admin</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-03-05 14:30</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <FileJson className="h-4 w-4 text-yellow-500" />
                      <span>JSON</span>
                    </TableCell>
                    <TableCell>1.8 MB</TableCell>
                    <TableCell>API Service</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-03-01 00:00</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Markdown</span>
                    </TableCell>
                    <TableCell>825 KB</TableCell>
                    <TableCell>Automated Task</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SaveExport;
