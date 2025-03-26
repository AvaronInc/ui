
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Check, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CVESearchResult = {
  id: string;
  cveId: string;
  description: string;
  publishedDate: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvssScore: number;
  vectorString: string;
  affectedProducts: string[];
  references: string[];
  applicableToEnv: boolean | null;
};

const mockSearchResults: CVESearchResult[] = [
  {
    id: '1',
    cveId: 'CVE-2023-42753',
    description: 'Buffer overflow in Nginx web server allows remote attackers to execute arbitrary code',
    publishedDate: '2023-10-15',
    severity: 'Critical',
    cvssScore: 9.8,
    vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    affectedProducts: ['nginx/1.18.0', 'nginx/1.19.0-1.19.10'],
    references: [
      'https://nginx.org/en/security_advisories.html',
      'https://nvd.nist.gov/vuln/detail/CVE-2023-42753'
    ],
    applicableToEnv: true
  },
  {
    id: '2',
    cveId: 'CVE-2023-38547',
    description: 'SQL injection vulnerability in WordPress plugin XYZ allows unauthenticated attackers to execute arbitrary SQL commands',
    publishedDate: '2023-11-02',
    severity: 'High',
    cvssScore: 8.2,
    vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L',
    affectedProducts: ['wordpress-plugin-xyz/2.1-2.3.5'],
    references: [
      'https://wordpress.org/plugins/xyz/security',
      'https://nvd.nist.gov/vuln/detail/CVE-2023-38547'
    ],
    applicableToEnv: false
  },
  {
    id: '3',
    cveId: 'CVE-2023-36208',
    description: 'Authentication bypass in Kubernetes API server allows attackers to gain unauthorized access',
    publishedDate: '2023-09-27',
    severity: 'High',
    cvssScore: 7.6,
    vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:L',
    affectedProducts: ['kubernetes/1.24.0-1.25.2', 'kubernetes/1.26.0-1.26.1'],
    references: [
      'https://kubernetes.io/docs/reference/issues-security/CVE-2023-36208',
      'https://nvd.nist.gov/vuln/detail/CVE-2023-36208'
    ],
    applicableToEnv: null
  }
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
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search & Analyze CVE Database</CardTitle>
          <CardDescription>
            Search for CVEs by ID, vendor, product, or keyword, then analyze if they apply to your environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Search by CVE ID, vendor, product, or keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? "Searching..." : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {mockSearchResults.length} vulnerabilities matching your search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CVE ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Severity (CVSS)</TableHead>
                  <TableHead>Affected Products</TableHead>
                  <TableHead>Applicable</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSearchResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.cveId}</TableCell>
                    <TableCell className="max-w-xs truncate">{result.description}</TableCell>
                    <TableCell>{result.publishedDate}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity} ({result.cvssScore})
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {result.affectedProducts.join(', ')}
                    </TableCell>
                    <TableCell>
                      {result.applicableToEnv === null ? (
                        <Badge variant="outline">Unknown</Badge>
                      ) : result.applicableToEnv ? (
                        <span className="flex items-center text-destructive">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Applies
                        </span>
                      ) : (
                        <span className="flex items-center text-green-500">
                          <Check className="h-4 w-4 mr-1" />
                          Safe
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.applicableToEnv === null && (
                        <Button size="sm" variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Analyze
                        </Button>
                      )}
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

export default SearchAnalyze;
