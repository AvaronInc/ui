
import { useState, useEffect } from 'react';

export type BillingData = {
  currentBalance: string;
  paymentDueDate: string;
  subscriptionPlan: 'SMB' | 'Enterprise' | 'Government' | 'Basic' | 'Professional' | 'Enterprise Plus';
  monthlySubscriptionCost: string;
  totalHardwareCount: number;
  activeNestCount: number;
  additionalHardwareCount: number;
  expiringContracts: Array<{
    name: string;
    expirationDate: string;
    renewalCost?: number;
  }>;
};

export const useBillingData = () => {
  const [billing, setBilling] = useState<BillingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call to fetch billing data
    const fetchBillingData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data
        const mockBillingData: BillingData = {
          currentBalance: '1,299.95',
          paymentDueDate: 'November 15, 2023',
          subscriptionPlan: 'Enterprise',
          monthlySubscriptionCost: '999.95',
          totalHardwareCount: 12,
          activeNestCount: 8,
          additionalHardwareCount: 4,
          expiringContracts: [
            { 
              name: 'NEST N1000 (Denver Office)', 
              expirationDate: 'Nov 21, 2023',
              renewalCost: 599
            },
            { 
              name: 'Security Gateway (New York)', 
              expirationDate: 'Dec 29, 2023',
              renewalCost: 599
            }
          ]
        };

        setBilling(mockBillingData);
        setError(null);
      } catch (err) {
        console.error('Error fetching billing data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  return { billing, isLoading, error };
};
