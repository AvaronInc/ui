import React from 'react';
import { useZoneData } from '../hooks/useZoneData';
import ZoneOverviewLayout from './overview/ZoneOverviewLayout';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface ZoneOverviewProps {
  zone: {
    id: string;
    // Other zone properties might be used for initial display
    // before the full data is loaded
  };
}

const ZoneOverview: React.FC<ZoneOverviewProps> = ({ zone: initialZone }) => {
  const { zone, isLoading, error } = useZoneData(initialZone.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !zone) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || 'Failed to load zone data. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  return <ZoneOverviewLayout zone={zone} />;
};

export default ZoneOverview;
