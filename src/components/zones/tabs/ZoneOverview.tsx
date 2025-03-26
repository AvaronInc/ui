
import React from 'react';
import { Zone } from '../types';
import ZoneOverviewLayout from './overview/ZoneOverviewLayout';

interface ZoneOverviewProps {
  zone: Zone;
}

const ZoneOverview: React.FC<ZoneOverviewProps> = ({ zone }) => {
  return <ZoneOverviewLayout zone={zone} />;
};

export default ZoneOverview;
