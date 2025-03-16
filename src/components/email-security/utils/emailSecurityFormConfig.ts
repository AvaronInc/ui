
import { z } from 'zod';
import { EmailSecuritySettings } from '@/types/emailSecurity';

export const defaultSettings: EmailSecuritySettings = {
  // AI-Powered Email Filtering
  aiDlpEnabled: true,
  detectionSensitivity: 'medium',
  monitorPii: true,
  monitorFinancial: true,
  monitorIntellectualProperty: true,
  monitorCustomerData: true,
  monitorHarmfulLanguage: true,
  monitorRegulatoryViolations: true,
  
  // Risk Assessments
  riskConfidenceThreshold: 75,
  queueForReviewThreshold: 50,
  rejectEmailThreshold: 85,
  alertOnFlag: true,
  
  // Identity Verification
  identityVerificationEnabled: true,
  verifiedUsers: ['admin@company.com', 'security@company.com'],
  autoTaggingEnabled: true,
  internalVerificationBadgeEnabled: true,
  externalVerificationBadgeEnabled: false,
  flagNonVerifiedEmails: true,
  
  // Encryption
  mandatoryEncryptionEnabled: true,
  forceTlsInternal: true,
  rejectUnencryptedEmails: false,
  secureAttachmentsOnly: true,
  
  // Logging
  quarantineEnabled: true,
  quarantineRetentionPeriod: '30',
  aiHistoricalReviewEnabled: true,
  complianceMonitoringEnabled: true,
  
  // Threat Alerts
  aiAlertsEnabled: true,
  alertRecipients: ['security@company.com', 'admin@company.com'],
  autoEscalateAfter: 3,
  blockSenderAfter: 5,
  alertSecurityTeamOnRepeat: true,
  
  // Voice Calls
  aiVoiceCallEnabled: false,
  voiceAlertThreshold: 90,
  callEscalationMinutes: 15,
  aiResponseMode: 'explain',
  aiVoiceModel: 'gpt-4',
  aiDetailLevel: 'standard',
  includeTechnicalDetails: true,
  
  // Compliance
  scheduleAutomaticReports: true
};

export const formSchema = z.object({
  // All the fields corresponding to the EmailSecuritySettings type
  aiDlpEnabled: z.boolean(),
  detectionSensitivity: z.enum(['low', 'medium', 'high']),
  monitorPii: z.boolean(),
  monitorFinancial: z.boolean(),
  monitorIntellectualProperty: z.boolean(),
  monitorCustomerData: z.boolean(),
  monitorHarmfulLanguage: z.boolean(),
  monitorRegulatoryViolations: z.boolean(),
  
  riskConfidenceThreshold: z.number().min(0).max(100),
  queueForReviewThreshold: z.number().min(0).max(100),
  rejectEmailThreshold: z.number().min(0).max(100),
  alertOnFlag: z.boolean(),
  
  identityVerificationEnabled: z.boolean(),
  verifiedUsers: z.array(z.string()),
  autoTaggingEnabled: z.boolean(),
  internalVerificationBadgeEnabled: z.boolean(),
  externalVerificationBadgeEnabled: z.boolean(),
  flagNonVerifiedEmails: z.boolean(),
  
  mandatoryEncryptionEnabled: z.boolean(),
  forceTlsInternal: z.boolean(),
  rejectUnencryptedEmails: z.boolean(),
  secureAttachmentsOnly: z.boolean(),
  
  quarantineEnabled: z.boolean(),
  quarantineRetentionPeriod: z.enum(['7', '30', '90']),
  aiHistoricalReviewEnabled: z.boolean(),
  complianceMonitoringEnabled: z.boolean(),
  
  aiAlertsEnabled: z.boolean(),
  alertRecipients: z.array(z.string()),
  autoEscalateAfter: z.number().int().min(1),
  blockSenderAfter: z.number().int().min(1),
  alertSecurityTeamOnRepeat: z.boolean(),
  
  aiVoiceCallEnabled: z.boolean(),
  voiceAlertThreshold: z.number().min(0).max(100),
  callEscalationMinutes: z.number().int().min(1),
  aiResponseMode: z.enum(['explain', 'interactive']),
  aiVoiceModel: z.enum(['gpt-4', 'gpt-3.5-turbo']),
  aiDetailLevel: z.enum(['concise', 'standard', 'detailed']),
  includeTechnicalDetails: z.boolean(),
  
  scheduleAutomaticReports: z.boolean()
});
