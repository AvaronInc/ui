
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLogoManagement = () => {
  const { toast } = useToast();
  const [companyLogo, setCompanyLogo] = useState<string | null>(
    localStorage.getItem('companyLogo')
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoData = e.target?.result as string;
        setCompanyLogo(logoData);
        
        // Also update localStorage for backward compatibility
        localStorage.setItem('companyLogo', logoData);
        
        toast({
          title: "Logo updated",
          description: "Your company logo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    companyLogo,
    setCompanyLogo,
    handleLogoUpload
  };
};
