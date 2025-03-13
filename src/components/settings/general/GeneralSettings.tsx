
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useTheme } from '@/context/ThemeContext';
import { useGeneralSettings } from './useGeneralSettings';
import LoadingState from './LoadingState';
import CompanyTab from './tabs/CompanyTab';
import SystemTab from './tabs/SystemTab';
import AppearanceTab from './tabs/AppearanceTab';
import DateTimeTab from './tabs/DateTimeTab';
import ContactsTab from './tabs/ContactsTab';

const GeneralSettings = () => {
  const { isDarkMode, toggleDarkMode, primaryColor, setPrimaryColor } = useTheme();
  const {
    form,
    isLoading,
    loadError,
    maintenanceMode,
    setMaintenanceMode,
    companyLogo,
    setCompanyLogo,
    handleLogoUpload,
    onSubmit,
    handleReset,
    loadSettings
  } = useGeneralSettings();
  
  console.log("GeneralSettings rendering. Loading:", isLoading, "Error:", loadError);
  
  return (
    <div className="space-y-6">
      <LoadingState 
        isLoading={isLoading} 
        error={loadError} 
        onRetry={loadSettings}
      />
      
      {!isLoading && !loadError && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="company">
              <TabsList className="mb-4">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="datetime">Date & Time</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="company" className="space-y-4">
                <CompanyTab 
                  form={form} 
                  companyLogo={companyLogo} 
                  setCompanyLogo={setCompanyLogo}
                  handleLogoUpload={handleLogoUpload}
                />
              </TabsContent>
              
              <TabsContent value="system" className="space-y-4">
                <SystemTab 
                  form={form} 
                  maintenanceMode={maintenanceMode} 
                  setMaintenanceMode={setMaintenanceMode}
                />
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-4">
                <AppearanceTab 
                  form={form} 
                  isDarkMode={isDarkMode} 
                  toggleDarkMode={toggleDarkMode}
                  primaryColor={primaryColor}
                  setPrimaryColor={setPrimaryColor}
                />
              </TabsContent>
              
              <TabsContent value="datetime" className="space-y-4">
                <DateTimeTab form={form} />
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-4">
                <ContactsTab form={form} />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset to Defaults
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default GeneralSettings;
