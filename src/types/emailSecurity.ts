
export type DetectionSensitivity = 'low' | 'medium' | 'high';
export type RetentionPeriod = '7' | '30' | '90';

export interface EmailSecuritySettings {
  // AI-Powered Email Filtering & DLP Configuration
  aiDlpEnabled: boolean;
  detectionSensitivity: DetectionSensitivity;
  monitorPii: boolean;
  monitorFinancial: boolean;
  monitorIntellectualProperty: boolean;
  monitorCustomerData: boolean;
  monitorHarmfulLanguage: boolean;
  monitorRegulatoryViolations: boolean;
  
  // AI-Generated Risk Assessments & Confidence Levels
  riskConfidenceThreshold: number;
  queueForReviewThreshold: number;
  rejectEmailThreshold: number;
  alertOnFlag: boolean;
  
  // Identity-Verified Emails
  identityVerificationEnabled: boolean;
  verifiedUsers: string[];
  autoTaggingEnabled: boolean;
  internalVerificationBadgeEnabled: boolean;
  externalVerificationBadgeEnabled: boolean;
  flagNonVerifiedEmails: boolean;
  
  // Email Transmission & Encryption Controls
  mandatoryEncryptionEnabled: boolean;
  forceTlsInternal: boolean;
  rejectUnencryptedEmails: boolean;
  secureAttachmentsOnly: boolean;
  
  // Logging & Compliance Audits
  quarantineEnabled: boolean;
  quarantineRetentionPeriod: RetentionPeriod;
  aiHistoricalReviewEnabled: boolean;
  complianceMonitoringEnabled: boolean;
  
  // Real-Time AI Threat Alerts & Reporting
  aiAlertsEnabled: boolean;
  alertRecipients: string[];
  autoEscalateAfter: number;
  blockSenderAfter: number;
  alertSecurityTeamOnRepeat: boolean;
  
  // AI Voice Call Alerts
  aiVoiceCallEnabled: boolean;
  voiceAlertThreshold: number;
  callEscalationMinutes: number;
  
  // Compliance Reports
  scheduleAutomaticReports: boolean;
}
