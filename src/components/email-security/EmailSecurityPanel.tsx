
import { Tabs } from '@/components/ui/tabs';
import { useEmailSecurityForm } from './hooks/useEmailSecurityForm';
import EmailSecurityHeader from './components/EmailSecurityHeader';
import EmailSecurityTabs from './components/EmailSecurityTabs';
import EmailSecurityTabContent from './components/EmailSecurityTabContent';

const EmailSecurityPanel = () => {
  const {
    form,
    isSaving,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleSave,
    handleExport
  } = useEmailSecurityForm();

  return (
    <div className="space-y-6">
      <EmailSecurityHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleExport={handleExport}
        isSaving={isSaving}
        onSave={handleSave}
        formValues={form.getValues()}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <EmailSecurityTabs activeTab={activeTab} />
        <EmailSecurityTabContent activeTab={activeTab} form={form} />
      </Tabs>
    </div>
  );
};

export default EmailSecurityPanel;
