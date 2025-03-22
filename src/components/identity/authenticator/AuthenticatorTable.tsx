
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, RefreshCw, Link, Ban, Eye, ShieldCheck, RotateCw, Lock } from 'lucide-react';
import { formatDistanceToNow, parseISO, isPast } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MfaAppDeployment } from './AuthenticatorPanel';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthenticatorTableProps {
  deployments: MfaAppDeployment[];
  onGenerateLink: () => void;
  onResetLink: (deploymentId: string) => void;
  onRevokeApp: (deploymentId: string) => void;
  isLoading: boolean;
}

export const AuthenticatorTable: React.FC<AuthenticatorTableProps> = ({
  deployments,
  onGenerateLink,
  onResetLink,
  onRevokeApp,
  isLoading
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const isLinkExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    try {
      return isPast(parseISO(expiryDate));
    } catch (error) {
      return false;
    }
  };

  const getStatusBadge = (status: string, expiryDate: string | null) => {
    if (status === 'active') {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          Active
        </Badge>
      );
    } else if (status === 'pending') {
      if (expiryDate && isLinkExpired(expiryDate)) {
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Expired
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          Pending
        </Badge>
      );
    } else if (status === 'revoked') {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          Revoked
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
        Unknown
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Device Type</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Kyber Certificate</TableHead>
            <TableHead>Download Link</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No MFA app deployments found
              </TableCell>
            </TableRow>
          ) : (
            deployments.map((deployment) => (
              <TableRow key={deployment.id} className={deployment.status === 'revoked' ? 'bg-muted/30' : ''}>
                <TableCell>
                  <div className="font-medium">{deployment.userName}</div>
                  <div className="text-sm text-muted-foreground">{deployment.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{deployment.deviceType}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(deployment.assignedDate)}</TableCell>
                <TableCell>{formatDate(deployment.lastUsed)}</TableCell>
                <TableCell>
                  {getStatusBadge(deployment.status, deployment.linkExpiry)}
                </TableCell>
                <TableCell>
                  {deployment.kyberCertHash ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-mono text-xs">{`${deployment.kyberCertHash.substring(0, 6)}...${deployment.kyberCertHash.substring(deployment.kyberCertHash.length - 4)}`}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-mono text-xs">{deployment.kyberCertHash}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className="text-muted-foreground">Not Generated</span>
                  )}
                </TableCell>
                <TableCell>
                  {deployment.downloadLink ? (
                    <div className="flex flex-col">
                      {isLinkExpired(deployment.linkExpiry) ? (
                        <span className="text-red-600 text-sm">Expired</span>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <Link className="h-4 w-4 mr-1 text-blue-600" />
                            <a 
                              href={deployment.downloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Download APK
                            </a>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Expires: {formatDate(deployment.linkExpiry)}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Not Available</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {deployment.status === 'pending' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onResetLink(deployment.id)}
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1" />
                          Reset Link
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => onRevokeApp(deployment.id)}
                        >
                          <Ban className="h-3.5 w-3.5 mr-1" />
                          Revoke
                        </Button>
                      </>
                    ) : deployment.status === 'active' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {}}
                        >
                          <Lock className="h-3.5 w-3.5 mr-1" />
                          Lock
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {}}
                        >
                          <RotateCw className="h-3.5 w-3.5 mr-1" />
                          Reset
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => onRevokeApp(deployment.id)}
                        >
                          <Ban className="h-3.5 w-3.5 mr-1" />
                          Revoke
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={onGenerateLink}
                      >
                        <Smartphone className="h-3.5 w-3.5 mr-1" />
                        Generate
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
