
import React from 'react';
import { NestLocation } from '@/types/nest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Thermometer, Clock, Signal, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface NestTableProps {
  locations: NestLocation[];
  selectedNestId: string | null;
  onSelectNest: (id: string) => void;
  isLoading: boolean;
}

const NestTable: React.FC<NestTableProps> = ({ 
  locations, 
  selectedNestId, 
  onSelectNest,
  isLoading 
}) => {
  const formatLastCheckIn = (dateString: string) => {
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
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
            <TableHead>Location Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Check-in</TableHead>
            <TableHead>Hardware Model</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead>Live Stream</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No N.E.S.T. locations found
              </TableCell>
            </TableRow>
          ) : (
            locations.map((location) => (
              <TableRow 
                key={location.id} 
                className={`cursor-pointer ${selectedNestId === location.id ? 'bg-muted' : ''}`}
                onClick={() => onSelectNest(location.id)}
              >
                <TableCell className="font-medium">{location.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      location.status === 'online' ? 'default' : 
                      location.status === 'degraded' ? 'warning' : 
                      'destructive'
                    }
                  >
                    {location.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatLastCheckIn(location.lastCheckIn)}</TableCell>
                <TableCell>{location.hardwareModel}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{location.temperature ? `${location.temperature}°C` : 'N/A'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{location.uptime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Signal className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{location.hasLiveStream ? 'Available' : 'Unavailable'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={!location.hasLiveStream}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle view live stream
                      console.log('View live stream for', location.id);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NestTable;
