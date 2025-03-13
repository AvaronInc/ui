
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAISettings } from './useAISettings';

// Import all the section components
import VoiceCallSettings from './sections/VoiceCallSettings';
import AdminCallRoster from './sections/AdminCallRoster';
import EventTriggers from './sections/EventTriggers';
import CallBehavior from './sections/CallBehavior';
import ConversationMode from './sections/ConversationMode';
import AutoFixes from './sections/AutoFixes';
import SelfLearning from './sections/SelfLearning';
import IncidentResponse from './sections/IncidentResponse';

const AISettings = () => {
  const {
    form,
    isSaving,
    adminOrder,
    handleSave,
    moveAdminUp,
    moveAdminDown,
    handleAdminSelect,
  } = useAISettings();
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure AI-powered analytics, automation rules, and machine learning parameters.
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <VoiceCallSettings form={form} />
          
          <AdminCallRoster 
            form={form}
            adminOrder={adminOrder}
            moveAdminUp={moveAdminUp}
            moveAdminDown={moveAdminDown}
            handleAdminSelect={handleAdminSelect}
          />
          
          <EventTriggers form={form} />
          
          <CallBehavior form={form} />
          
          <ConversationMode form={form} />
          
          <AutoFixes form={form} />
          
          <SelfLearning form={form} />
          
          <IncidentResponse form={form} />
          
          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AISettings;
