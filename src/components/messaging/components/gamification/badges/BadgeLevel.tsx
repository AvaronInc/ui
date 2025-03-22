
import React from 'react';
import { Badge as UIBadge } from '@/components/ui/badge';

type BadgeLevelProps = {
  level?: string;
};

const BadgeLevel: React.FC<BadgeLevelProps> = ({ level }) => {
  switch (level) {
    case 'bronze':
      return <UIBadge variant="outline" className="bg-amber-800/20 text-amber-800 border-amber-800/30">Bronze</UIBadge>;
    case 'silver':
      return <UIBadge variant="outline" className="bg-gray-300/20 text-gray-500 border-gray-300/30">Silver</UIBadge>;
    case 'gold':
      return <UIBadge variant="outline" className="bg-yellow-400/20 text-yellow-600 border-yellow-400/30">Gold</UIBadge>;
    case 'platinum':
      return <UIBadge variant="outline" className="bg-cyan-200/20 text-cyan-700 border-cyan-200/30">Platinum</UIBadge>;
    default:
      return null;
  }
};

export default BadgeLevel;
