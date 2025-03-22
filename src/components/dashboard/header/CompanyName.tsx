
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarTrigger } from "@/components/ui/sidebar/sidebar-base";

interface CompanyNameProps {
  companyName: string;
}

export const CompanyName: React.FC<CompanyNameProps> = ({ companyName }) => {
  return (
    <div className="flex items-center">
      <SidebarTrigger />
      <div className="ml-4">
        <Link to="/" className="font-bold">{companyName}</Link>
      </div>
    </div>
  );
};
