
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { IPThreat, SecuritySeverity, ThreatType } from '@/types/security';
import { 
  Shield, 
  AlertTriangle, 
  Ban, 
  FileText, 
  Eye, 
  LockKeyhole, 
  ExternalLink, 
  AlertCircle 
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IPThreatTableProps {
  threats: IPThreat[];
  onSelectThreat: (threat: IPThreat) => void;
  severityFilter: SecuritySeverity[];
  onSeverityFilterChange: (severity: SecuritySeverity[]) => void;
  typeFilter: string[];
  onTypeFilterChange: (types: string[]) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const IPThreatTable: React.FC<IPThreatTableProps> = ({ 
  threats, 
  onSelectThreat,
  severityFilter,
  onSeverityFilterChange,
  typeFilter,
  onTypeFilterChange,
  searchQuery,
  onSearchQueryChange
}) => {
  const [expandedThreatId, setExpandedThreatId] = useState<string | null>(null);
  
  const handleRowClick = (threat: IPThreat) => {
    if (expandedThreatId === threat.id) {
      setExpandedThreatId(null);
    } else {
      setExpandedThreatId(threat.id);
      onSelectThreat(threat);
    }
  };
  
  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-white bg-destructive';
    if (score >= 60) return 'text-white bg-orange-500';
    if (score >= 40) return 'text-white bg-yellow-500';
    return 'text-white bg-blue-500';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'blocked':
        return <Badge variant="destructive" className="flex items-center gap-1"><Ban className="h-3 w-3" /> Blocked</Badge>;
      case 'quarantined':
        return <Badge variant="outline" className="flex items-center gap-1 bg-orange-100 text-orange-800 border-orange-300"><LockKeyhole className="h-3 w-3" /> Quarantined</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="flex items-center gap-1 bg-blue-100 text-blue-800 border-blue-300"><Eye className="h-3 w-3" /> Under Review</Badge>;
      default:
        return <Badge variant="outline" className="flex items-center gap-1">None</Badge>;
    }
  };
  
  // Get all available threat types from the data
  const threatTypes = Array.from(new Set(threats.map(threat => threat.threatType)));
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              IP Threat Intelligence
            </CardTitle>
            <CardDescription>
              Monitored IPs and domains with suspicious activity
            </CardDescription>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Search by IP or domain..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select onValueChange={(value) => {
              if (value === 'all') {
                onSeverityFilterChange([]);
              } else {
                onSeverityFilterChange([value as SecuritySeverity]);
              }
            }}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => {
              onTypeFilterChange(value === 'all' ? [] : [value]);
            }}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Threat Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {threatTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {threats.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IP / Domain</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Threat Type</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threats.map((threat) => (
                  <React.Fragment key={threat.id}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/50" 
                      onClick={() => handleRowClick(threat)}
                    >
                      <TableCell className="font-medium">
                        {threat.ipAddress}
                        {threat.domain && (
                          <div className="text-xs text-muted-foreground">{threat.domain}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskScoreColor(threat.riskScore)}>
                          {threat.riskScore}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">
                        {threat.threatType.replace('_', ' ')}
                      </TableCell>
                      <TableCell className="capitalize">
                        {threat.confidenceLevel}
                      </TableCell>
                      <TableCell>{formatDate(threat.lastSeen)}</TableCell>
                      <TableCell>
                        {threat.sourceDevice}
                        {threat.sourceUser && (
                          <div className="text-xs text-muted-foreground">{threat.sourceUser}</div>
                        )}
                      </TableCell>
                      <TableCell>{getActionBadge(threat.actionTaken)}</TableCell>
                    </TableRow>
                    
                    {expandedThreatId === threat.id && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-muted/30 p-4">
                          <div className="space-y-3">
                            <div className="text-sm text-muted-foreground">
                              <div className="font-medium text-foreground mb-1 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1 text-primary" />
                                Threat Summary
                              </div>
                              {threat.summary || "No summary available."}
                            </div>
                            
                            {threat.externalFeeds && threat.externalFeeds.length > 0 && (
                              <div className="text-sm">
                                <div className="font-medium mb-1">External Intelligence Sources</div>
                                <div className="flex flex-wrap gap-2">
                                  {threat.externalFeeds.map((feed, index) => (
                                    <Button 
                                      key={index} 
                                      variant="outline" 
                                      size="sm"
                                      className="flex items-center gap-1 h-8"
                                      asChild
                                    >
                                      <a href={feed.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3 w-3" />
                                        {feed.name}
                                      </a>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-2">
                              <Button 
                                variant="default" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Ban className="h-4 w-4" />
                                Block IP
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                              >
                                <LockKeyhole className="h-4 w-4" />
                                Quarantine Device
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <FileText className="h-4 w-4" />
                                Open Ticket
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md bg-muted/40">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No threats found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IPThreatTable;
