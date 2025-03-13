
export interface APISettingsFormValues {
  enableApiAccess: boolean;
  apiKeys: string[];
  allowedIps: string[];
}

export const defaultApiSettings: APISettingsFormValues = {
  enableApiAccess: false,
  apiKeys: [],
  allowedIps: [],
};
