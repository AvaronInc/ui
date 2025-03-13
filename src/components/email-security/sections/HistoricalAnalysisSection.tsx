
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Mail, 
  FileType, 
  AlertTriangle,
  Shield,
  Download
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for security incidents
const securityIncidents = [
  {
    id: '001',
    date: '2023-11-15',
    sender: 'external@example.com',
    recipient: 'employee@company.com',
    subject: 'Invoice Payment Urgent',
    riskLevel: 'high',
    type: 'Phishing Attempt',
    action: 'Quarantined',
  },
  {
    id: '002',
    date: '2023-11-13',
    sender: 'finance@company.com',
    recipient: 'team@company.com',
    subject: 'Q3 Financial Reports',
    riskLevel: 'medium',
    type: 'PII Exposure',
    action: 'Warned User',
  },
  {
    id: '003',
    date: '2023-11-10',
    sender: 'partner@external.com',
    recipient: 'sales@company.com',
    subject: 'Partnership Agreement',
    riskLevel: 'low',
    type: 'Suspicious Link',
    action: 'Reviewed & Approved',
  },
];

const HistoricalAnalysisSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter the incidents based on search and filters
  const filteredIncidents = securityIncidents.filter((incident) => {
    const matchesSearch = 
      incident.sender.includes(searchTerm) || 
      incident.recipient.includes(searchTerm) || 
      incident.subject.includes(searchTerm) ||
      incident.type.includes(searchTerm);
    
    const matchesRisk = riskFilter === 'all' || incident.riskLevel === riskFilter;
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    
    return matchesSearch && matchesRisk && matchesType;
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Search & Historical Data Analysis</h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by sender, recipient, subject, or risk type..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Risk Level</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Type</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Phishing Attempt">Phishing</SelectItem>
              <SelectItem value="PII Exposure">PII Exposure</SelectItem>
              <SelectItem value="Suspicious Link">Suspicious Link</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action Taken</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>{incident.sender}</TableCell>
                  <TableCell>{incident.recipient}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={incident.subject}>
                    {incident.subject}
                  </TableCell>
                  <TableCell>
                    {incident.riskLevel === 'high' ? (
                      <Badge variant="destructive">High</Badge>
                    ) : incident.riskLevel === 'medium' ? (
                      <Badge variant="default">Medium</Badge>
                    ) : (
                      <Badge variant="outline">Low</Badge>
                    )}
                  </TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{incident.action}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No security incidents found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredIncidents.length} of {securityIncidents.length} incidents
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysisSection;
