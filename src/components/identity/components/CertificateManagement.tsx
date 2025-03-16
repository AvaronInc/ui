
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, RotateCw, Shield, X } from 'lucide-react';

interface Certificate {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  certType: 'kyber' | 'rsa' | 'dsa';
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'revoked';
  fingerprint: string;
}

const CertificateManagement: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: 'cert-1',
      userId: 'user-1',
      username: 'admin123',
      fullName: 'Admin User',
      certType: 'kyber',
      issuedDate: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
      expiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
      status: 'active',
      fingerprint: '4a51cde8f3ce7c290fd77670891583f4'
    },
    {
      id: 'cert-2',
      userId: 'user-2',
      username: 'engineer1',
      fullName: 'John Engineer',
      certType: 'kyber',
      issuedDate: new Date(Date.now() - 5184000000).toISOString(), // 60 days ago
      expiryDate: new Date(Date.now() + 26352000000).toISOString(), // 10 months from now
      status: 'active',
      fingerprint: '2b38ade4b5fa9c170fd77e4089158321'
    },
    {
      id: 'cert-3',
      userId: 'user-4',
      username: 'securityadmin',
      fullName: 'Security Admin',
      certType: 'kyber',
      issuedDate: new Date(Date.now() - 7776000000).toISOString(), // 90 days ago
      expiryDate: new Date(Date.now() + 23760000000).toISOString(), // 9 months from now
      status: 'active',
      fingerprint: '3c49ade8f5ea7b170fd33e408915835c'
    },
    {
      id: 'cert-4',
      userId: 'user-5',
      username: 'revokeduser',
      fullName: 'Revoked User',
      certType: 'rsa',
      issuedDate: new Date(Date.now() - 15552000000).toISOString(), // 180 days ago
      expiryDate: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
      status: 'expired',
      fingerprint: '9b78cad7f2ac8b340ea77e4089158321'
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 flex items-center">
            <RotateCw className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case 'revoked':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 flex items-center">
            <X className="h-3 w-3 mr-1" />
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Cryptographic Identity Certificates
            </h3>
            <Button>
              <ShieldCheck className="h-4 w-4 mr-2" />
              Issue New Certificate
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Certificate Type</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fingerprint</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => {
                const issuedDate = new Date(cert.issuedDate);
                const expiryDate = new Date(cert.expiryDate);
                
                return (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {cert.certType === 'kyber' ? 'Kyber (post-quantum)' : cert.certType.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{issuedDate.toLocaleDateString()}</TableCell>
                    <TableCell>{expiryDate.toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(cert.status)}</TableCell>
                    <TableCell>
                      <code className="bg-muted text-xs p-1 rounded">{cert.fingerprint}</code>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8">View</Button>
                        {cert.status === 'active' && (
                          <Button variant="destructive" size="sm" className="h-8">Revoke</Button>
                        )}
                        {cert.status === 'expired' && (
                          <Button variant="outline" size="sm" className="h-8">Renew</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-medium mb-2">Kyber Quantum-Resistant Certificates</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kyber certificates provide post-quantum cryptographic protection. These certificates 
              are resistant to attacks from both classical and quantum computers.
            </p>
            <Button variant="outline" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Generate Kyber Certificate
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-medium mb-2">Certificate Validation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All certificates are validated in real-time before granting access. This ensures 
              that only valid, non-expired, and non-revoked certificates can be used for authentication.
            </p>
            <Button variant="outline" className="w-full">
              <RotateCw className="h-4 w-4 mr-2" />
              Validate Certificate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CertificateManagement;
