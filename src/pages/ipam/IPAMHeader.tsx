
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft, Network } from 'lucide-react';

const IPAMHeader: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Network className="h-4 w-4 mr-1 inline" />
              IP Address Management
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-semibold mt-2">IP Address Management</h1>
    </div>
  );
};

export default IPAMHeader;
