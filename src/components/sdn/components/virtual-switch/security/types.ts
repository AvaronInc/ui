
import * as z from 'zod';

// Form schema for the virtual switch security configuration
export const switchSecuritySchema = z.object({
  rbacEnabled: z.boolean().default(true),
  allowedRoles: z.array(z.string()).default(['Admin', 'Engineer']),
  microsegmentationEnabled: z.boolean().default(false),
  securityZones: z.array(z.string()).default([]),
  autoQuarantine: z.boolean().default(true),
  anomalyDetection: z.boolean().default(true),
  alertThreshold: z.enum(['low', 'medium', 'high']).default('medium'),
  encryptionEnabled: z.boolean().default(true),
  encryptionType: z.enum(['wireguard', 'ipsec', 'tls']).default('wireguard'),
  kyberEncryption: z.boolean().default(true),
});

export type SwitchSecurityValues = z.infer<typeof switchSecuritySchema>;
