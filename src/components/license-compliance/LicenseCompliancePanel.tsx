
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAlerts } from '@/context/AlertsContext';
import LicenseSummaryCards from './LicenseSummaryCards';
import LicenseTable from './LicenseTable';
import LicenseBreakdownChart from './LicenseBreakdownChart';
import LicenseComplianceActions from './LicenseComplianceActions';
import LicenseDetailDrawer from './LicenseDetailDrawer';
import { LicenseData } from './types';

const LicenseCompliancePanel: React.FC = () => {
  const [selectedLicense, setSelectedLicense] = useState<LicenseData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [licenseTypeFilter, setLicenseTypeFilter] = useState<string[]>([]);
  const [usedInFilter, setUsedInFilter] = useState<string[]>([]);
  const { addAlert } = useAlerts();
  
  // Close license detail drawer
  const handleCloseDetail = () => {
    setSelectedLicense(null);
  };
  
  // Handle license row click to open detail drawer
  const handleLicenseClick = (license: LicenseData) => {
    setSelectedLicense(license);
  };

  // Simulate an automatic license check on page load
  useEffect(() => {
    // Add a timeout to make it feel like it's checking things
    const timer = setTimeout(() => {
      if (Math.random() > 0.5) {
        addAlert({
          title: 'License Update Available',
          message: 'New version of Apache 2.0 license available for React components.',
          type: 'info'
        });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [addAlert]);
  
  return (
    <div className="space-y-6">
      <LicenseSummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <LicenseTable 
                onLicenseClick={handleLicenseClick}
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                licenseTypeFilter={licenseTypeFilter}
                setLicenseTypeFilter={setLicenseTypeFilter}
                usedInFilter={usedInFilter}
                setUsedInFilter={setUsedInFilter}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <LicenseBreakdownChart />
              <div className="mt-auto pt-6">
                <LicenseComplianceActions />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedLicense && (
        <LicenseDetailDrawer
          license={selectedLicense}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default LicenseCompliancePanel;

