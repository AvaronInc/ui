
import { useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';

interface CompanyTabProps {
  form: UseFormReturn<FormValues>;
  companyLogo: string | null;
  setCompanyLogo: (logo: string | null) => void;
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyTab = ({ form, companyLogo, setCompanyLogo, handleLogoUpload }: CompanyTabProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Company Branding</h3>
        <div className="flex items-start gap-4">
          <div>
            <div 
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors mb-2"
              onClick={triggerFileInput}
            >
              {companyLogo ? (
                <img 
                  src={companyLogo} 
                  alt="Company Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Click to upload logo</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={triggerFileInput}
            >
              Upload Logo
            </Button>
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your company's official name displayed in the application header.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTab;
