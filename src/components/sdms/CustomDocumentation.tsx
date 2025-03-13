
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CustomDocSection } from '@/types/sdms';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock custom documentation sections
const mockCustomDocs: CustomDocSection[] = [
  {
    id: 'doc-1',
    title: 'Emergency Contact Procedures',
    content: 'In case of network emergencies, contact the following personnel in order:\n\n1. John Smith, Network Lead - (555) 123-4567\n2. Sarah Johnson, Security Officer - (555) 765-4321\n3. Mark Davis, IT Director - (555) 987-6543\n\nAll incidents must be logged in the ticketing system within 1 hour.',
    lastUpdated: '2024-01-15T00:00:00.000Z',
    updatedBy: 'Admin User'
  },
  {
    id: 'doc-2',
    title: 'Network Maintenance Windows',
    content: 'Regular maintenance windows are scheduled as follows:\n\n- Weekly: Sundays, 2:00 AM - 5:00 AM EST\n- Monthly: Last Saturday of the month, 11:00 PM - 3:00 AM EST\n\nEmergency maintenance requires approval from IT Director and 4-hour advance notice to all departments when possible.',
    lastUpdated: '2024-02-01T00:00:00.000Z',
    updatedBy: 'Admin User'
  },
  {
    id: 'doc-3',
    title: 'Data Center Access Procedures',
    content: 'Data center access is restricted to authorized personnel only. The following procedures must be followed:\n\n1. Badge access required for all entry\n2. Visitors must be escorted by authorized personnel\n3. All access must be logged in security system\n4. No food or drinks allowed\n5. Tailgating is strictly prohibited',
    lastUpdated: '2024-02-15T00:00:00.000Z',
    updatedBy: 'Security Officer'
  }
];

const CustomDocumentation = () => {
  const { toast } = useToast();
  const [customDocs, setCustomDocs] = useState<CustomDocSection[]>(mockCustomDocs);
  const [selectedDoc, setSelectedDoc] = useState<CustomDocSection | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleEditDoc = (doc: CustomDocSection) => {
    setSelectedDoc(doc);
    setEditTitle(doc.title);
    setEditContent(doc.content);
    setIsEditing(true);
  };

  const handleNewDoc = () => {
    setSelectedDoc(null);
    setEditTitle('');
    setEditContent('');
    setIsCreating(true);
  };

  const handleSaveDoc = () => {
    if (isCreating) {
      const newDoc: CustomDocSection = {
        id: `doc-${Date.now()}`,
        title: editTitle,
        content: editContent,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Current User'
      };
      setCustomDocs([...customDocs, newDoc]);
      toast({
        title: "Documentation Added",
        description: "New documentation section has been created."
      });
    } else if (selectedDoc) {
      const updatedDocs = customDocs.map(doc => {
        if (doc.id === selectedDoc.id) {
          return {
            ...doc,
            title: editTitle,
            content: editContent,
            lastUpdated: new Date().toISOString(),
            updatedBy: 'Current User'
          };
        }
        return doc;
      });
      setCustomDocs(updatedDocs);
      toast({
        title: "Documentation Updated",
        description: "Documentation section has been updated."
      });
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDeleteDoc = (id: string) => {
    setCustomDocs(customDocs.filter(doc => doc.id !== id));
    toast({
      title: "Documentation Deleted",
      description: "Documentation section has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">Customizable Documentation Sections</div>
      <p className="text-muted-foreground">
        Add manual notes and documentation to complement the AI-generated content.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Custom Sections</span>
                <Button size="sm" variant="outline" onClick={handleNewDoc}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                User-defined documentation sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customDocs.map((doc) => (
                  <Card 
                    key={doc.id} 
                    className={`cursor-pointer hover:bg-accent/50 ${selectedDoc?.id === doc.id ? 'bg-accent' : ''}`}
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">{doc.title}</CardTitle>
                      <CardDescription className="text-xs">
                        Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {selectedDoc ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedDoc.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditDoc(selectedDoc)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Documentation Section</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{selectedDoc.title}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>Cancel</Button>
                          <Button variant="destructive" onClick={() => handleDeleteDoc(selectedDoc.id)}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>
                  Last updated: {new Date(selectedDoc.lastUpdated).toLocaleDateString()} by {selectedDoc.updatedBy}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                  {selectedDoc.content}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View as PDF</Button>
                <Button variant="outline">Export Markdown</Button>
              </CardFooter>
            </Card>
          ) : isCreating || isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>{isCreating ? 'Create New Section' : 'Edit Section'}</CardTitle>
                <CardDescription>
                  {isCreating ? 'Add a new documentation section' : 'Modify existing documentation'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Section Title</label>
                    <Input
                      id="title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Enter section title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Content</label>
                    <Textarea
                      id="content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="Enter documentation content"
                      rows={10}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setIsEditing(false);
                  setIsCreating(false);
                }}>
                  Cancel
                </Button>
                <Button className="gap-2" onClick={handleSaveDoc}>
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full border rounded-lg p-8">
              <div className="text-center">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Section Selected</h3>
                <p className="text-muted-foreground mt-2">
                  Please select a section from the list or create a new one
                </p>
                <Button className="mt-4" onClick={handleNewDoc}>Create New Section</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Export your documentation in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Format</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">PDF Document</TableCell>
                <TableCell>Formatted document suitable for printing and sharing</TableCell>
                <TableCell>
                  <Button variant="outline">Export PDF</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Markdown</TableCell>
                <TableCell>Plain text format with simple formatting syntax</TableCell>
                <TableCell>
                  <Button variant="outline">Export Markdown</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">JSON</TableCell>
                <TableCell>Machine-readable format for system integration</TableCell>
                <TableCell>
                  <Button variant="outline">Export JSON</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HTML</TableCell>
                <TableCell>Web-friendly format for browsers</TableCell>
                <TableCell>
                  <Button variant="outline">Export HTML</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomDocumentation;
