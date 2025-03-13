
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { aiSettingsSchema, AISettingsValues } from './schema';

export const useAISettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [adminOrder, setAdminOrder] = useState<string[]>([]);
  
  const savedSettings = localStorage.getItem('aiVoiceCallSettings');
  const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {};
  
  const defaultValues: AISettingsValues = {
    enableAIVoiceCalls: parsedSettings.enableAIVoiceCalls || false,
    adminCallRoster: parsedSettings.adminCallRoster || [],
    networkOutage: parsedSettings.networkOutage !== undefined ? parsedSettings.networkOutage : true,
    securityIntrusion: parsedSettings.securityIntrusion !== undefined ? parsedSettings.securityIntrusion : true,
    hardwareFailure: parsedSettings.hardwareFailure || false,
    highLatency: parsedSettings.highLatency || false,
    customEvents: parsedSettings.customEvents || '',
    retryCallsOnNoAnswer: parsedSettings.retryCallsOnNoAnswer !== undefined ? parsedSettings.retryCallsOnNoAnswer : true,
    callEscalationPolicy: parsedSettings.callEscalationPolicy || '2',
    voiceConversationMode: parsedSettings.voiceConversationMode || 'brief',
    openSupportTicket: parsedSettings.openSupportTicket !== undefined ? parsedSettings.openSupportTicket : true,
    generateTranscript: parsedSettings.generateTranscript !== undefined ? parsedSettings.generateTranscript : true,
    enableAIRecommendations: parsedSettings.enableAIRecommendations || false,
    autoFixConfidenceThreshold: parsedSettings.autoFixConfidenceThreshold || 85,
    aiLearningDuration: parsedSettings.aiLearningDuration || '14',
  };

  useState(() => {
    if (parsedSettings.adminOrder) {
      setAdminOrder(parsedSettings.adminOrder);
    }
  });
  
  const form = useForm<AISettingsValues>({
    resolver: zodResolver(aiSettingsSchema),
    defaultValues,
  });
  
  const handleSave = (values: AISettingsValues) => {
    setIsSaving(true);
    
    setTimeout(() => {
      const settingsToSave = {
        ...values,
        adminOrder: adminOrder
      };
      localStorage.setItem('aiVoiceCallSettings', JSON.stringify(settingsToSave));
      
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "AI & Automation settings have been updated successfully.",
      });
    }, 500);
  };

  const moveAdminUp = (id: string) => {
    const currentIndex = adminOrder.indexOf(id);
    if (currentIndex > 0) {
      const newOrder = [...adminOrder];
      [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
      setAdminOrder(newOrder);
    }
  };

  const moveAdminDown = (id: string) => {
    const currentIndex = adminOrder.indexOf(id);
    if (currentIndex < adminOrder.length - 1 && currentIndex !== -1) {
      const newOrder = [...adminOrder];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      setAdminOrder(newOrder);
    }
  };

  const handleAdminSelect = (selectedAdmins: string[]) => {
    form.setValue('adminCallRoster', selectedAdmins);
    
    const newOrder = adminOrder.filter(id => selectedAdmins.includes(id));
    const newAdmins = selectedAdmins.filter(id => !adminOrder.includes(id));
    setAdminOrder([...newOrder, ...newAdmins]);
  };

  return {
    form,
    isSaving,
    adminOrder,
    handleSave,
    moveAdminUp,
    moveAdminDown,
    handleAdminSelect,
  };
};
