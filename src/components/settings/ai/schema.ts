
import { z } from 'zod';

export const aiSettingsSchema = z.object({
  enableAIVoiceCalls: z.boolean().default(false),
  adminCallRoster: z.array(z.string()).default([]),
  networkOutage: z.boolean().default(true),
  securityIntrusion: z.boolean().default(true),
  hardwareFailure: z.boolean().default(false),
  highLatency: z.boolean().default(false),
  customEvents: z.string().optional(),
  retryCallsOnNoAnswer: z.boolean().default(true),
  callEscalationPolicy: z.enum(['1', '2', '3']).default('2'),
  voiceConversationMode: z.enum(['brief', 'interactive']).default('brief'),
  openSupportTicket: z.boolean().default(true),
  generateTranscript: z.boolean().default(true),
  enableAIRecommendations: z.boolean().default(false),
  autoFixConfidenceThreshold: z.number().min(0).max(100).default(85),
  aiLearningDuration: z.enum(['7', '14', '30']).default('14'),
});

export type AISettingsValues = z.infer<typeof aiSettingsSchema>;

export const adminUsers = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Mark Johnson' },
  { id: '4', name: 'Sarah Williams' },
  { id: '5', name: 'David Brown' },
];
