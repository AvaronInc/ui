
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarTrigger } from "@/components/ui/sidebar/sidebar-base";
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyNameProps {
  companyName: string;
}

export const CompanyName: React.FC<CompanyNameProps> = ({ companyName }) => {
  const isMobile = useIsMobile();
  
  // Determine display text based on device size
  const displayText = isMobile ? "AIM" : companyName;
  
  return (
    <div className="flex items-center">
      <SidebarTrigger />
      <div className="ml-4">
        <Link to="/" className="font-bold">{displayText}</Link>
      </div>
    </div>
  );
};
