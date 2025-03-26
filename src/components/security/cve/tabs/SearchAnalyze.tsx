
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Info, AlertTriangle, Database, Server, CheckCircle, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CVESearchResult = {
  id: string;
  cveId: string;
  description: string;
  cvssScore: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  vectorString: string;
  affectedProducts: string[];
  affectedVersions: string;
  appliesTo: boolean;
  publishedDate: string;
};

const mockSearchResults: CVESearchResult[] = [
  {
    id: '1',
    cveId: 'CVE-2023-45178',
    description: 'Critical remote code execution vulnerability in OpenSSL',
    cvssScore: 9.8,
    severity: 'Critical',
    vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    affectedProducts: ['OpenSSL'],
    affectedVersions: 'OpenSSL versions 3.0.0 to 3.0.11',
    appliesTo: true,
    publishedDate: '2023-11-05'
  },
  {
    id: '2',
    cveId: 'CVE-2023-38408',
    description: 'Authentication bypass in Identity Management System',
    cvssScore: 8.2,
    severity: 'High',
    vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
    affectedProducts: ['Keycloak', 'Auth0'],
    affectedVersions: 'Keycloak <= 21.1.1, Auth0 <= 2.44.0',
    appliesTo: true,
    publishedDate: '2023-10-22'
  },
  {
    id: '3',
    cveId: 'CVE-2023-29200',
    description: 'Privilege escalation in PostgreSQL database',
    cvssScore: 6.5,
    severity: 'Medium',
    vectorString: 'CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:N',
    affectedProducts: ['PostgreSQL'],
    affectedVersions: 'PostgreSQL <= 15.3',
    appliesTo: true,
    publishedDate: '2023-09-15'
  },
  {
    id: '4',
    cveId: 'CVE-2023-12345',
    description: 'Cross-site scripting vulnerability in jQuery',
    cvssScore: 4.3,
    severity: 'Medium',
    vectorString: 'CVSS:3.1/AV:N/AC:M/PR:N/UI:R/S:U/C:L/I:L/A:N',
    affectedProducts: ['jQuery'],
    affectedVersions: 'jQuery < 3.6.4',
    appliesTo: false,
    publishedDate: '2023-08-18'
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-500 hover:bg-red-600';
    case 'High':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'Medium':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'Low':
      return 'bg-blue-500 hover:bg-blue-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const SearchAnalyze = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(true);

  const handleSearch = () => {
    // In a real implementation, this would perform the search
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Analyze CVEs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by vendor, product, keyword or CVE ID..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-slate-800 cursor-pointer">OpenSSL</Badge>
            <Badge variant="outline" className="bg-slate-800 cursor-pointer">PostgreSQL</Badge>
            <Badge variant="outline" className="bg-slate-800 cursor-pointer">Apache</Badge>
            <Badge variant="outline" className="bg-slate-800 cursor-pointer">Node.js</Badge>
            <Badge variant="outline" className="bg-slate-800 cursor-pointer">Windows Server</Badge>
            <Badge variant="outline" className="bg-slate-800 cursor-pointer">Ubuntu</Badge>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CVE ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Affected Products</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Applies To My Env</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSearchResults.map((cve) => (
                  <TableRow key={cve.id}>
                    <TableCell className="font-medium">
                      <a href={`https://nvd.nist.gov/vuln/detail/${cve.cveId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {cve.cveId}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{cve.description}</span>
                        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(cve.severity)}>
                        {cve.severity} ({cve.cvssScore})
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {cve.affectedProducts.map((product, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-800">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{cve.publishedDate}</TableCell>
                    <TableCell>
                      {cve.appliesTo ? (
                        <span className="flex items-center gap-1 text-green-500">
                          <CheckCircle className="h-4 w-4" />
                          Yes
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500">
                          <XCircle className="h-4 w-4" />
                          No
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          Load More Results
        </Button>
      </div>
    </div>
  );
};

export default SearchAnalyze;
